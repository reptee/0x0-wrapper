<script lang="ts">
  import { providers } from "$lib";
  import FileUploadWidget from "$lib/components/FileUploadWidget.svelte";
  import UploadConfigPanel from "$lib/components/UploadConfigPanel.svelte";
  import UploadInfoPanel from "$lib/components/UploadInfoPanel.svelte";
  import type {
    CandidateMeta,
    NullPointerProvider,
    UploadCandidate,
    UploadConfig,
  } from "$lib/types";

  let uploaded = $state<string | null>(null);
  let error = $state<string | null>(null);

  let candidates = $state<UploadCandidate[]>([]);
  $inspect(candidates);

  // TODO: expires per-file with default=inherited
  // TODO: secret per-file with default=inherited
  let uploadConfig = $state<UploadConfig>({
    // TODO: don't hardcode, generate new per session
    token: "fdc34670-1a17-41c3-89ba-f0b492e8997a",
    provider: 0,
    expires: null,
    secret: false,
  });

  let provider = $derived<NullPointerProvider>(
    providers[uploadConfig.provider],
  );

  $inspect(uploadConfig);

  async function upload_files() {
    let form = new FormData();

    form.set("config", JSON.stringify(uploadConfig));

    if (candidates.length === 0) {
      // TODO: report an error?
      return;
    }

    // TODO: respect file limit?
    candidates.forEach(({ file }) => form.append("files", file, file.name));
    const manifest: CandidateMeta[] = candidates.map(({ file, overrides }) => ({
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
      overrides: overrides,
    }));

    form.set("manifest", JSON.stringify(manifest));

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
</script>

<section class="main-panel">
  <div>
    <header class="headline">Upload and Share Files</header>
    <p class="subheading">
      Private file uploader with support for multiple services.
    </p>
    <div class="upload">
      <FileUploadWidget bind:candidates></FileUploadWidget>
    </div>
    <div class="panels-container">
      <div class="flex-item">
        <UploadConfigPanel bind:config={uploadConfig}></UploadConfigPanel>
      </div>
      <div class="flex-item">
        <UploadInfoPanel {provider}></UploadInfoPanel>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .upload {
    padding: 5pt;
  }
  .panels-container {
    display: flex;
  }
  .flex-item {
    flex: 1;
    padding: 5pt;
  }
  .headline,
  .subheading {
    text-align: center;
  }
  .headline {
    font-size: 2rem;
    font-weight: 700;
  }

  .subheading {
    font-weight: 300;
    color: darkblue;
    margin-top: 3pt;
  }

  .main-panel {
    background-color: lightblue;
    padding: 5pt;
    border-radius: 1rem;
  }
</style>
