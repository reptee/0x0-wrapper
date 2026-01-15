<script lang="ts">
  import { formatBytes } from "$lib";
  import type { UploadedFile } from "$lib/types";
  import { upload_index } from "$lib/stores/UploadIndex";

  let { uploadedFile }: { uploadedFile: UploadedFile } = $props();
  const url = new URL(uploadedFile.url);
  let expiry_date = "unknown";

  if (uploadedFile.expiration_epoch_ms) {
    expiry_date = new Date(uploadedFile.expiration_epoch_ms).toLocaleString();
  }

  async function removeFile(event: Event) {
    const confirmation = confirm(
      `Czy na pewno chcesz usunąć ${uploadedFile.name}?`,
    );

    if (!confirmation) {
      return;
    }

    let resp: { ok: boolean; error: string | undefined } = await fetch(
      "/browse",
      {
        method: "DELETE",
        body: JSON.stringify(uploadedFile),
      },
    ).then((it) => it.json());
    // TODO: remove from index only on success
    upload_index.update((list) =>
      list.filter(({ token }) => token != uploadedFile.token),
    );
  }
</script>

<tr>
  <td>{uploadedFile.name}</td>
  <td>
    {(uploadedFile.size && formatBytes(uploadedFile.size)) || "unknown"}
  </td>
  <td>{url.hostname}</td>
  <td>{expiry_date}</td>
  <td><button class="remove" onclick={removeFile}>Remove</button></td>
</tr>

<style lang="scss">
  .remove {
    display: block;
    margin: auto;
  }
</style>
