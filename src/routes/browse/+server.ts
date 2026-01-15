import type { UploadedFile } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ request }) => {
  let to_remove: UploadedFile = await request.json();
  if (to_remove === null) {
    return json({ ok: false, error: "Failed to get file for deletion" });
  }
  console.log(to_remove);

  // TODO: create a simple wrapper in a separate library with `upload`,
  // `delete`, `reschedule`?
  let form = new FormData();
  form.set("delete", "");
  form.set("token", to_remove.token);
  let resp = await fetch(
    // TODO: remove trim after changing the type to URL
    to_remove.url.trim(),
    { method: "POST", body: form },
  );

  if (resp.ok) {
    return json({ ok: true });
  } else {
    const resp_text = await resp.text().then((it) => it.trim());
    return json({
      ok: false,
      error: "Error: " + resp_text || "Error: Failed to remove file.",
    });
  }
};
