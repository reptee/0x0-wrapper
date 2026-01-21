<script lang="ts">
  import { isProviderFull, providers } from "$lib";
  import FileUploadWidget from "$lib/components/FileUploadWidget.svelte";
  import UploadConfigPanel from "$lib/components/UploadConfigPanel.svelte";
  import UploadInfoPanel from "$lib/components/UploadInfoPanel.svelte";
  import { upload_index } from "$lib/stores/UploadIndex";
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

  let candidates = $state<UploadCandidate[]>([]);
  $inspect(candidates);

  let uploadConfig = $state<UploadConfig>({
    provider: 0,
    expires: null,
    secret: false,
  });

  let provider = $derived<NullPointerProvider>(
    providers[uploadConfig.provider],
  );

  $inspect(uploadConfig);

  async function upload_files(): Promise<Error | void> {
    let form = new FormData();

    form.set("config", JSON.stringify(uploadConfig));

    candidates.forEach(({ file }, i) => {
      // Korekta -1024B była wyznaczona empirycznie. Nie da się np. przesłać
      // dokładnie 512MiB, natomiast da się przesłać plik rozmiaru (512MiB - 1KiB)
      if (isProviderFull(provider) && file.size > provider.max_size - 1024) {
        candidates[i].upload_failure = "Plik jest za duży";
        return;
      }
      form.append("files", file, file.name);
    });
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

    let uploaded: UploadFileRes[] = [];
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
    candidates = candidates.filter((_, idx) => !successful_uploads.has(idx));

    const uploads_good = uploaded
      .filter((it) => it.ok)
      .map((it) => it.uploaded_file);
    upload_index.update((files) => {
      return files.concat(uploads_good);
    });
  }
</script>

<section class="main-panel">
  <div>
    <header class="headline">Przesyłaj i udostępniaj pliki</header>
    <p class="subheading">
      Prywatne narzędzie do przesyłania plików z obsługą wielu serwisów.
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
  @media (pointer: coarse) {
    .panels-container {
      flex-direction: column;
    }
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
    background-color: #dfe3eb;
    padding: 5pt;
    border-radius: 1rem;
  }
</style>
