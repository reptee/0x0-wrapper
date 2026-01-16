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

  // TODO: make button inactive until transaction is finished
  async function removeFile(event: Event) {
    const confirmation = confirm(
      `Czy na pewno chcesz usunąć ${uploadedFile.name}?`,
    );

    if (!confirmation) {
      return;
    }

    const button = event.currentTarget as HTMLButtonElement;

    button.disabled = true;

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
    button.disabled = false;
  }
</script>

<tr>
  <td>{uploadedFile.name}</td>
  <td>
    {(uploadedFile.size && formatBytes(uploadedFile.size)) || "unknown"}
  </td>
  <td>{url.hostname}</td>
  <td>{expiry_date}</td>
  <td><a href={uploadedFile.url}>link</a></td>
  <td><button class="remove" onclick={removeFile}>Remove</button></td>
</tr>

<style lang="scss">
  :global(.uploads-table tbody tr) {
    border-bottom: 1px solid #e5e7eb;
  }

  :global(.uploads-table tbody tr:nth-child(odd)) {
    background: #fafafa;
  }

  :global(.uploads-table tbody tr:hover) {
    background: #eef2ff;
  }

  .remove {
    display: block;
    margin: auto;
    background: #2563eb;
    color: #fff;
    border: none;
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
    transition: transform 150ms ease, box-shadow 150ms ease,
      background 150ms ease;
  }

  .remove:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
  }

  .remove:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  }

  .remove:disabled {
    background: #b91c1c;
    box-shadow: 0 6px 16px rgba(185, 28, 28, 0.3);
    cursor: not-allowed;
    opacity: 0.9;
  }
</style>
