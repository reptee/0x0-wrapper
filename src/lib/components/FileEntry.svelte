<script lang="ts">
  import { formatBytes } from "$lib";
  import type { UploadedFile } from "$lib/types";
  import { upload_index } from "$lib/stores/UploadIndex";

  let { uploadedFile }: { uploadedFile: UploadedFile } = $props();

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
  <td>{uploadedFile.url.hostname}</td>
  <td>{new Date(uploadedFile.expiration_epoch_ms).toLocaleString()}</td>
  <td><a class="link" href={uploadedFile.url.toString()}>link</a></td>
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

  .link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    min-width: 4.25rem;
    background: #2563eb;
    color: #fff;
    border: none;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
    text-decoration: none;
    white-space: nowrap;
    transition:
      transform 150ms ease,
      box-shadow 150ms ease,
      background 150ms ease;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }
  }

  .remove {
    display: block;
    margin: auto;
    background: #D45500;
    color: #fff;
    border: none;
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
    transition:
      transform 150ms ease,
      box-shadow 150ms ease,
      background 150ms ease;
    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }

    &:disabled {
      background: #b91c1c;
      box-shadow: 0 6px 16px rgba(185, 28, 28, 0.3);
      cursor: not-allowed;
      opacity: 0.9;
    }
  }
</style>
