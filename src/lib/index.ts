import type { NullPointerProvider, NullPointerProviderFull } from "$lib/types";

/**
 * @param min_age minimum retention of a file (in days)
 * @param max_age maximum retention of a file (in days)
 * @param max_size maximum file size (in MiB)
 * @param file_size given file size (in MiB)
 * @returns Retention lengths (in days). 0 for file_size bigger then max_size.
 */
export function calculate_file_retention(
  min_age: number,
  max_age: number,
  max_size: number,
  file_size: number,
): number {
  if (file_size > max_size) {
    return 0;
  }
  let retention =
    min_age + (min_age - max_age) * Math.pow(file_size / max_size - 1, 3);
  return Math.min(retention, max_age);
}

export const provider_0x0: NullPointerProviderFull = {
  url: new URL("https://0x0.st/"),
  min_age: 30,
  max_age: 365,
  max_size: 512,
};

export const provider_vern: NullPointerProviderFull = {
  url: new URL("https://0.vern.cc/"),
  min_age: 10 * 365,
  max_age: 10 * 365,
  max_size: 256,
};

export const provider_boop: NullPointerProviderFull = {
  url: new URL("https://boop.icu/"),
  min_age: 30,
  max_age: 365,
  max_size: 256,
};

// TODO: remove localhost
export const provider_local: NullPointerProviderFull = {
  url: new URL("http://localhost:8080"),
  min_age: 30,
  max_age: 365,
  max_size: 512,
};

export const providers: Array<NullPointerProvider> = [
  provider_0x0,
  provider_vern,
  provider_boop,
  provider_local,
];

export function isProviderFull(
  obj: NullPointerProvider,
): obj is NullPointerProviderFull {
  return (obj as any).min_age !== undefined;
}

export async function uploadFile(
  file: File,
  provider: NullPointerProvider,
): Promise<Response | Error> {
  const form = new FormData();

  form.append("file", file, file.name);

  try {
    const response = await fetch(provider.url, {
      method: "POST",
      body: form,
      headers: {
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
