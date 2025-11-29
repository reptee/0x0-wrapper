import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { UploadConfig, UploadFileRes } from "$lib/types";
import {
  calculate_file_retention,
  isProviderFull,
  providers,
  uploadFile,
} from "$lib";

export const POST: RequestHandler = async ({ request }) => {
  let body: FormData = await request.formData();
  const entries = body
    .getAll("files")
    .filter((v) => v instanceof File && v.size > 0) as File[];
  const uploadConfig = body.get("config") as UploadConfig | null;
  const token = uploadConfig?.token;
  const provider_id = uploadConfig?.provider;

  if (typeof token !== "string" || token.length == 0) {
    return json("expected token");
  }

  if (!provider_id || !providers[provider_id]?.url) {
    return json(`provider expected to be natural up to ${providers.length}`);
  }

  let provider = providers[provider_id];

  console.log(entries);
  console.log(provider_id);

  let uploadedFilesPromises = entries.map<Promise<UploadFileRes>>(
    async (file) => {
      let res = await uploadFile(file, provider);
      console.log(res);
      if (res instanceof Error) {
        return { ok: false, error: res.message };
      }

      let expiration_epoch_s = null;
      let now = Date.now();

      if (isProviderFull(provider)) {
        let days_left = calculate_file_retention(
          provider.min_age,
          provider.max_age,
          provider.max_size,
          file.size / 1024 / 1024,
        );

        expiration_epoch_s = Math.floor(now + days_left * 86_400_000);
      }

      return {
        ok: true,
        uploaded_file: {
          name: file.name,
          expiration_epoch_s: expiration_epoch_s,
          token: token,
          upload_epoch_s: now,
          url: await res.text(),
          mime: file.type,
        },
      };
    },
  );

  return json(await Promise.all(uploadedFilesPromises));
};
