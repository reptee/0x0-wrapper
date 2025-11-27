import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  let body = await request.json();
  console.log(body);
  return json(body);
  const form = new FormData();
  form.append("file", new Blob(["test input"]), "test.txt");

  try {
    const response = await fetch("https://0x0.st", {
      method: "POST",
      body: form,
      headers: {
        "User-Agent": "a-unique-UA-hopefully",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText}`,
      );
    }
  } catch (err) { }
};
