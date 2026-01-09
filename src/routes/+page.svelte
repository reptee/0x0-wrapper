<script lang="ts">
  import { providers } from "$lib";
  import FileUploadWidget from "$lib/components/FileUploadWidget.svelte";
  import UploadConfigPanel from "$lib/components/UploadConfigPanel.svelte";
  import UploadInfoPanel from "$lib/components/UploadInfoPanel.svelte";
  import type {
    NullPointerProvider,
    UploadCandidate,
    UploadConfig,
    UploadedFile,
    UploadFileRes,
    UploadManifest,
    UploadOverrides,
  } from "$lib/types";
  import { onMount } from "svelte";

  let uploaded = $state<UploadFileRes[] | null>(null);
  let error = $state<string | null>(null);

  let candidates = $state<UploadCandidate[]>([]);
  $inspect(candidates);
  $inspect(uploaded);

  function init_upload_index() {
    const upload_index = localStorage.getItem("upload-index");
    if (!upload_index) {
      localStorage.setItem("upload-index", JSON.stringify([]));
    }
  }

  // onMount to prevent code from being executed on the server side, which does
  // not have localStorage API
  onMount(() => {
    init_upload_index();
  });

  let uploadConfig = $state<UploadConfig>({
    provider: 0,
    expires: null,
    secret: false,
  });

  let provider = $derived<NullPointerProvider>(
    providers[uploadConfig.provider],
  );

  $inspect(uploadConfig);

  function update_upload_index(uploads: UploadFileRes[]) {
    const successful_uploads = uploads.filter((it) => it.ok);

    const upload_index_raw = localStorage.getItem("upload-index") || "[]";
    const old_upload_index: UploadedFile[] = JSON.parse(upload_index_raw) || [];
    const new_upload_index: UploadedFile[] = successful_uploads
      .map((el) => el.uploaded_file)
      .concat(old_upload_index);

    const new_upload_index_raw = JSON.stringify(new_upload_index);

    localStorage.setItem("upload-index", new_upload_index_raw);
  }

  async function upload_files(): Promise<Error | void> {
    let form = new FormData();

    form.set("config", JSON.stringify(uploadConfig));

    if (candidates.length === 0) {
      // TODO: report an error?
      return new Error("No candidates for upload");
    }

    // TODO: respect file limit?
    candidates.forEach(({ file }) => form.append("files", file, file.name));
    const manifest: UploadManifest = candidates.map(({ overrides }) => ({
      overrides,
    }));

    form.set("manifest", JSON.stringify(manifest));

    let resp = await fetch("/", {
      method: "POST",
      body: form,
    });
    console.log(manifest);
    console.log(uploadConfig);

    if (!resp.ok) {
      try {
        error = await resp.text();
      } catch (err) {
        return err as Error;
      }
      return new Error(error);
    }

    try {
      uploaded = await resp.json();
    } catch (err) {
      console.log(err);
      return err as Error;
    }

    if (uploaded === null) {
      return new Error("Failed to get response");
    }

    // Endpoint returns a list that mirrors sent files. So if i-th status is OK,
    // we remove it from candidate list.

    let successful_uploads = new Set<number>();
    uploaded.forEach((upload, idx) => {
      if (!upload.ok) {
        candidates[idx].upload_failure = upload.error;
      } else {
        successful_uploads.add(idx);
      }
    });
    console.log(successful_uploads);
    candidates
      .filter((_, idx) => successful_uploads.has(idx))
      .forEach((file) => {
        localStorage.setItem;
      });
    candidates = candidates.filter((_, idx) => !successful_uploads.has(idx));

    update_upload_index(uploaded);

    // TODO: notification about successful upload and upload failureg
  }
</script>

<section class="main-panel">
  <div>
    <header class="headline">Upload and Share Files</header>
    <p class="subheading">
      Private file uploader with support for multiple services.
    </p>
    <div class="upload">
      <FileUploadWidget bind:candidates {upload_files} {provider}
      ></FileUploadWidget>
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
