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
