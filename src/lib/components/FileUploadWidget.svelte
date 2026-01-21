<script lang="ts">
  import { formatBytes, isProviderFull } from "$lib";
  import type { NullPointerProvider, UploadCandidate } from "$lib/types";
  import UploadCandidateWidget from "./UploadCandidateWidget.svelte";

  let {
    candidates = $bindable(),
    upload_files,
    provider,
  }: {
    candidates: UploadCandidate[];
    upload_files: () => void;
    provider: NullPointerProvider;
  } = $props();

  let dragCounter = $state<number>(0);
  let isDragging = $state<boolean>(false);
  let fileInput = $state<HTMLInputElement | null>();
  let isUploading = $state<boolean>(false);

  const previewMode = $derived<boolean>(candidates.length > 0);

  const defaultOverrides = (): UploadCandidate["overrides"] => ({
    enabled: false,
    expiration: null,
    secret: null,
  });

  const sameFile = (a: File, b: File) =>
    a.name === b.name &&
    a.size === b.size &&
    a.type === b.type &&
    a.lastModified === b.lastModified;

  function addFiles(list: FileList | File[]) {
    const incoming = Array.from(list);
    let next = [...candidates];
    incoming.forEach((file) => {
      if (next.some((candidate) => sameFile(candidate.file, file))) {
        return;
      }
      next = [
        ...next,
        {
          file,
          overrides: defaultOverrides(),
          upload_failure: null,
        },
      ];
    });
    candidates = next;
  }

  function updateCandidate(
    idx: number,
    updater: (candidate: UploadCandidate) => UploadCandidate,
  ) {
    candidates = candidates.map((candidate, i) =>
      i === idx ? updater(candidate) : candidate,
    );
  }

  function setOverride(idx: number, key: string) {
    return (value: any) =>
      updateCandidate(idx, (candidate) => {
        let nextValue = value;

        if (key == "expiration") {
          nextValue = value ? new Date(`${value}T00:00:00`) : null;
        }

        return {
          ...candidate,
          overrides: {
            ...candidate.overrides,
            [key]: nextValue,
          },
        };
      });
  }

  function onDragEnter(event: DragEvent) {
    event.preventDefault();
    dragCounter += 1;
    isDragging = true;
  }

  function onDragLeave(event: DragEvent) {
    event.preventDefault();
    dragCounter = Math.max(0, dragCounter - 1);
    if (dragCounter === 0) {
      isDragging = false;
    }
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    dragCounter = 0;
    isDragging = false;
    if (event.dataTransfer?.files?.length) {
      addFiles(event.dataTransfer.files);
    }
  }

  function openPicker() {
    if (isUploading) {
      return;
    }
    fileInput?.click();
  }

  function onInputChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    if (target.files?.length) {
      addFiles(target.files);
    }
    target.value = "";
  }

  let max_size = $derived.by(() => {
    if (isProviderFull(provider)) {
      return formatBytes(provider.max_size);
    } else {
      return "unknown";
    }
  });
</script>

<div
  role="button"
  aria-pressed={previewMode}
  class={{
    dropzone: true,
    "dropzone-empty": !previewMode,
    dragging: isDragging,
  }}
  tabindex="0"
  ondragenter={onDragEnter}
  ondragover={onDragOver}
  ondragleave={onDragLeave}
  ondrop={onDrop}
  onclick={openPicker}
  onkeydown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  }}
>
  {#if !previewMode}
    <p class="drag-here">Drag files here or click to select</p>
    <p class="max-size">Maximum size: {max_size}</p>
  {:else}
    <ul class="preview-list">
      {#each candidates as candidate, idx}
        <UploadCandidateWidget
          {candidate}
          removeCandidate={() => {
            candidates = candidates.filter((_, i) => i !== idx);
          }}
          onOverrideToggle={setOverride(idx, "enabled")}
          onOverrideDateChange={setOverride(idx, "expiration")}
          onOverrideSecretChange={setOverride(idx, "secret")}
        />
      {/each}
      <li class="card">
        <button
          id="add-button"
          disabled={isUploading}
          onclick={(event) => {
            openPicker();
            event.stopPropagation();
          }}>➕</button
        >
      </li>
      <li class="card">
        <button
          id="upload-button"
          disabled={isUploading}
          onclick={async (event) => {
            event.stopPropagation();
            if (isUploading) {
              return;
            }
            isUploading = true;
            try {
              await upload_files();
            } finally {
              isUploading = false;
            }
          }}>Upload</button
        >
      </li>
    </ul>
  {/if}
  <input
    class="sr-only"
    type="file"
    multiple
    bind:this={fileInput}
    onchange={onInputChange}
  />
</div>

<style lang="scss">
  .dropzone {
    min-width: 5rem;
    min-height: 15rem;
    background-color: white;
    border-radius: 0.5rem;
    padding: 5pt;
  }

  .dropzone-empty {
    cursor: pointer;
    transition:
      box-shadow 200ms ease,
      transform 200ms ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 45px rgba(15, 23, 42, 0.12);
    }
  }

  .drag-here {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .max-size {
    margin-top: 2pt;
    text-align: center;
  }

  .preview-list {
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    gap: 0.75rem;
    padding: 0;
    margin: 1rem 0 0;
    & > :global(li) {
      flex: 1 1 200pt;
    }
  }

  :global(li.card) {
    background: #fff;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 0.75rem;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    cursor: pointer;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;
    box-shadow: 0 4px 12px #bbd3fc;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 1px 4px rgba(185, 28, 28, 0.25);
    }
    & > button {
      width: 100%;
      height: 100%;
      margin: 0;
      border: none;
      background: transparent;
      font-size: 2rem;
    }

    & > button:disabled {
      opacity: 0.45;
      filter: grayscale(1);
      cursor: not-allowed;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
</style>
