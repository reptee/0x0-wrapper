<script lang="ts">
  let uploaded = $state<string | null>(null);
  let error = $state<string | null>(null);
  let { data } = $props();

  async function onclick() {
    let request = {
      provider: data.providers[0],
    };

    let resp = await fetch("/", {
      method: "POST",
      body: JSON.stringify(request),
    });

    $inspect(resp);

    if (resp.ok) {
      try {
        uploaded = await resp.json();
      } catch (error) {
        error = (error as Error).message;
      }
    } else {
      try {
        error = await resp.json();
      } catch (error) {
        error = (error as Error).message;
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
  <button type="button" {onclick}>Upload</button>
</div>
