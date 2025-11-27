<script lang="ts">
  let uploaded = $state<string | null>(null);
  let error = $state<string | null>(null);

  let files = $state<FileList>();

  async function upload_files() {
    let form = new FormData();

    // TODO: don't hardcode, generate new per session
    let token = "fdc34670-1a17-41c3-89ba-f0b492e8997a";

    // TODO: allow to select provider from known + custom
    form.set("provider", JSON.stringify(0));
    form.set("token", JSON.stringify(token));

    if (!files) {
      // TODO: report an error?
      return;
    }

    // TODO: respect file limit?
    Array.from(files).forEach((file) => form.append("files", file, file.name));

    let resp = await fetch("/", {
      method: "POST",
      body: form,
    });

    $inspect(resp);

    if (resp.ok) {
      try {
        uploaded = await resp.text();
      } catch (err) {
        error = (err as Error).message;
      }
    } else {
      try {
        error = await resp.text();
      } catch (err) {
        error = (err as Error).message;
      }
    }
  }

  // async function onclick() {
  //   error = null;
  //   uploaded = null;
  //
  //   const form = new FormData();
  //   form.append("file", new Blob(["test input"]), "test.txt");
  //   // TODO: server-side verification
  //   form.set("provider", JSON.stringify(data.providers[0]));
  //
  //   try {
  //     const response = await fetch("/", {
  //       method: "POST",
  //       body: form,
  //       headers: {
  //         "User-Agent": "a-unique-UA-hopefully",
  //       },
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error(
  //         `Upload failed: ${response.status} ${response.statusText}`,
  //       );
  //     }
  //
  //     uploaded = await response.text();
  //   } catch (err) {
  //     error = err instanceof Error ? err.message : "Upload failed.";
  //   }
  // }
</script>

<h1>Upload files</h1>

{#if uploaded}
  <p>Uploaded: {uploaded}</p>
{:else if error}
  <p>{error}</p>
{:else}
  <p>Not uploaded yet</p>
{/if}

<div>
  <input type="file" multiple id="fileInput" bind:files />
  <button type="button" onclick={upload_files} disabled={!files}>Upload</button>
  {#if files && Array.from(files).length !== 0}
    <div>
      <h2>Selected files</h2>
      <ul>
        {#each files as file}
          <li>{file.name}</li>
        {/each}
      </ul>
    </div>
    <!-- content here -->
  {/if}
</div>
