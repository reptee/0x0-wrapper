import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type {
  NullPointerProvider,
  UploadConfig,
  UploadFileRes,
  UploadManifest,
  UploadOverrides,
} from "$lib/types";
import { calculate_file_retention, isProviderFull, providers } from "$lib";

export async function uploadFile(
  file: File,
  provider: NullPointerProvider,
  expiration_epoch_s: number | null = null,
  secret: boolean | null = null,
): Promise<Response | Error> {
  const form = new FormData();

  form.append("file", file, file.name);

  if (secret) {
    form.append("secret", "");
  }

  if (expiration_epoch_s) {
    form.append("expires", Math.floor(expiration_epoch_s * 1000).toString());
  }

  try {
    const response = await fetch(provider.url, {
      method: "POST",
      body: form,
      headers: {
        // TODO: change UA
        "User-Agent": "curl/a-unique-UA-hopefully",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Upload failed: status=${response.status} status_text=${response.statusText}`,
      );
    }
    return response;
  } catch (error) {
    return error as Error;
  }
}

function mk_parameters(
  config: UploadConfig,
  overrides: UploadOverrides,
): { expiration_epoch_s: number | null; secret: boolean | null } {
  let expiration_epoch_s: number | null = null;
  let secret: boolean | null = null;
  if (config.expires instanceof Date) {
    expiration_epoch_s = Math.round(config.expires.getTime() / 1000);
  }
  if (overrides.expiration instanceof Date) {
    expiration_epoch_s = Math.round(overrides.expiration.getTime() / 1000);
  }

  if (config.secret !== null) {
    secret = config.secret;
  }
  if (overrides.secret !== null) {
    secret = overrides.secret;
  }
  const res = { secret, expiration_epoch_s };
  console.log(res);
  return res;
}

export const POST: RequestHandler = async ({ request }) => {
  let body: FormData = await request.formData();
  const configRaw = body.get("config");
  const manifestRaw = body.get("manifest");

  if (typeof configRaw !== "string")
    return json({ error: "missing config", status: 400 });
  if (typeof manifestRaw !== "string")
    return json({ error: "missing manifest", status: 400 });

  let config: UploadConfig;
  let manifest: UploadManifest;

  try {
    config = JSON.parse(configRaw);
    manifest = JSON.parse(manifestRaw);
  } catch {
    return json({ error: "invalid JSON payload", status: 400 });
  }

  const files = body
    .getAll("files")
    .filter((v): v is File => v instanceof File);
  if (files.length !== manifest.length)
    return json({ error: "files/manifest length mismatch" }, { status: 400 });

  const items = files.map((file, idx) => ({
    file: file,
    overrides: manifest[idx].overrides,
  }));

  // console.log(items);

  const provider_id = config.provider;

  // console.log(provider_id);
  // console.log(providers[provider_id]);

  if (typeof provider_id !== "number" || !providers[provider_id]?.url) {
    return json({
      error: `provider id expected to be natural up to ${providers.length}`,
      status: 400,
    });
  }

  let provider = providers[provider_id];

  // console.log(items);
  // console.log(provider_id);

  let uploadedFilesPromises = items.map<Promise<UploadFileRes>>(
    async ({ file, overrides }) => {
      let estimated_expiration_epoch_s: number | null = null;
      let now = Date.now();

      if (isProviderFull(provider)) {
        const file_size_MiB = file.size / 1024 / 1024;
        if (file_size_MiB > provider.max_size) {
          return {
            ok: false,
            error: "file size exceeds maximum file size allowed by provider",
          };
        }

        let days_left = calculate_file_retention(
          provider.min_age,
          provider.max_age,
          provider.max_size,
          file_size_MiB,
        );

        estimated_expiration_epoch_s = Math.floor(now + days_left * 86_400_000);
      }

      let { expiration_epoch_s, secret } = mk_parameters(config, overrides);

      let res = await uploadFile(file, provider, expiration_epoch_s, secret);

      console.log(res);
      if (res instanceof Error) {
        return { ok: false, error: res.message };
      }

      const token = res.headers.get("X-Token");
      if (!token) {
        return {
          ok: false,
          error: "Failed to retrieve management token from response.",
        };
      }
      const expiry_ms =
        Math.floor(Number(res.headers.get("X-Expires"))) || expiration_epoch_s;

      return {
        ok: true,
        uploaded_file: {
          name: file.name,
          token: token,
          expiration_epoch_s: expiry_ms,
          upload_epoch_s: now,
          url: await res.text(),
          mime: file.type,
        },
      };
    },
  );

  // TODO: remove successfully uploaded files from the list on the client
  return json(await Promise.all(uploadedFilesPromises));
};
