<script lang="ts">
  import FileEntry from "$lib/components/FileEntry.svelte";
  import type { UploadedFile } from "$lib/types";
  import { onMount } from "svelte";
  import { upload_index } from "$lib/stores/UploadIndex";
  import { browser } from "$app/environment";

  let uploadFiles: UploadedFile[] = [];

  if (browser) {
    upload_index.subscribe((files) => {
      uploadFiles = files;
    });
  }
</script>

<div>
  <table class="uploads-table">
    <thead>
      <tr>
        <th>Nazwa pliku</th>
        <th>Rozmiar</th>
        <th>Dostawca</th>
        <th>Data ważności</th>
        <th>Link</th>
        <th>Usuń</th>
      </tr>
    </thead>
    <tbody>
      {#each uploadFiles as uploadedFile}
        <FileEntry {uploadedFile} />
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
  .uploads-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    border-radius: 0.35rem;
  }

  .uploads-table thead {
    background: #f6f6f6;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-weight: 700;
  }

  .uploads-table th,
  .uploads-table td {
    padding: 0.9rem 1rem;
    text-align: left;
  }
</style>
