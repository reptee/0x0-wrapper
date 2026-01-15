<script lang="ts">
  import FileEntry from "$lib/components/FileEntry.svelte";
  import type { UploadedFile } from "$lib/types";
  import { onMount } from "svelte";

  let uploadFiles: UploadedFile[] = [];
  onMount(() => {
    const upload_index_raw = localStorage.getItem("upload-index") || "[]";
    uploadFiles = JSON.parse(upload_index_raw);
  });
</script>

<div>
  <table>
    <thead>
      <tr>
        <th>Nazwa pliku</th>
        <th>Rozmiar</th>
        <th>Dostawca</th>
        <th>Data ważności</th>
      </tr>
    </thead>
    <tbody>
      {#each uploadFiles as uploadedFile}
        <FileEntry {uploadedFile} />
      {/each}
    </tbody>
  </table>
</div>
