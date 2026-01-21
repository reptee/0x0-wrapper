import type { UploadedFile } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ request }) => {
  let to_remove: UploadedFile = await request.json();
  if (to_remove === null) {
    return json(
      { ok: false, error: "Failed to get file for deletion" },
      { status: 500 },
    );
  }
  // console.log(to_remove);

  let form = new FormData();
  form.set("delete", "");
  form.set("token", to_remove.token);
  let resp = await fetch(to_remove.url, { method: "POST", body: form });

  if (resp.ok) {
    return json({ ok: true }, { status: 200 });
  } else {
    const resp_text = await resp.text().then((it) => it.trim());
    return json({
      ok: false,
      error: "Error: " + resp_text || "Error: Failed to remove file.",
    });
  }
};
