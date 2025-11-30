<script lang="ts">
  import type { UploadCandidate } from "$lib/types";
  import { slide } from "svelte/transition";

  let { files = $bindable() }: { files: FileList | null } = $props();

  let dragCounter = $state<number>(0);
  let isDragging = $state<boolean>(false);
  let candidates = $state<Array<UploadCandidate>>([]);
  let fileInput = $state<HTMLInputElement | null>();

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

  function syncFilesFromCandidates() {
    if (candidates.length === 0) {
      files = null;
      return;
    }
    const dt = new DataTransfer();
    candidates.forEach(({ file }) => dt.items.add(file));
    files = dt.files;
  }

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
        },
      ];
    });
    candidates = next;
    syncFilesFromCandidates();
  }

  function removeCandidate(idx: number) {
    candidates = candidates.filter((_, i) => i !== idx);
    syncFilesFromCandidates();
  }

  function updateCandidate(
    idx: number,
    updater: (candidate: UploadCandidate) => UploadCandidate,
  ) {
    candidates = candidates.map((candidate, i) =>
      i === idx ? updater(candidate) : candidate,
    );
    syncFilesFromCandidates();
  }

  function onOverrideToggle(idx: number, enabled: boolean) {
    updateCandidate(idx, (candidate) => ({
      ...candidate,
      overrides: {
        ...candidate.overrides,
        enabled,
        expiration: enabled ? candidate.overrides.expiration : null,
        secret: enabled ? (candidate.overrides.secret ?? false) : null,
      },
    }));
  }

  function onOverrideDateChange(idx: number, value: string) {
    const expiration = value ? new Date(`${value}T00:00:00Z`) : null;
    updateCandidate(idx, (candidate) => ({
      ...candidate,
      overrides: {
        ...candidate.overrides,
        expiration,
      },
    }));
  }

  function onOverrideSecretChange(idx: number, value: boolean) {
    updateCandidate(idx, (candidate) => ({
      ...candidate,
      overrides: {
        ...candidate.overrides,
        secret: value,
      },
    }));
  }

  const formatDateInputValue = (date: Date | null) =>
    date ? new Date(date).toISOString().slice(0, 10) : "";

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
    fileInput?.click();
  }

  function onInputChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    if (target.files?.length) {
      addFiles(target.files);
    }
    target.value = "";
  }

  let max_size = 512; // STUB

  // adapted from https://stackoverflow.com/a/18650828
  function formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes <= 0) return "0 B";
    const dm = Math.max(0, decimals);
    const sizes = ["B", "KiB", "MiB", "GiB", "TiB"];

    const i = Math.floor(Math.log2(bytes) / 10);

    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(dm))} ${sizes[i]}`;
  }
</script>

<section class={{ "has-files": previewMode }}>
  <header class="headline">Upload and Share Files</header>
  <p class="subheading">
    Private file uploader with support for multiple services.
  </p>
  <div
    role="button"
    aria-pressed={previewMode}
    class={`dropzone ${isDragging ? "dragging" : ""}`}
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
      <!-- <CloudIcon> </CloudIcon> -->
      <p class="drag-here">Drag files here or click to select</p>
      <p class="max-size">Maximum size: {max_size} MiB</p>
      <!-- Empty dialogue asking for dragging file or clicking to select files -->
    {:else}
      <!-- When some files are already dragged, preview this files and allow to
    override upload options -->
      <!-- Should also present option to add more files -->
      <ul
        class="preview-list"
        onclick={(event) => {
          event.stopPropagation();
        }}
      >
        {#each candidates as candidate, idx}
          <li class="file">
            <div class="file-header">
              <button
                type="button"
                class="file-remove"
                onclick={(event) => {
                  event.stopPropagation();
                  removeCandidate(idx);
                }}
              >
                ✕
              </button>
              <div class="file-meta">
                <strong>{candidate.file.name}</strong>
                <span class="file-size">{formatBytes(candidate.file.size)}</span
                >
              </div>
            </div>
            <label class="override-toggle">
              <input
                type="checkbox"
                checked={candidate.overrides.enabled}
                onchange={(event) =>
                  onOverrideToggle(
                    idx,
                    (event.currentTarget as HTMLInputElement).checked,
                  )}
              />
              Enable per-file overrides
            </label>
            {#if candidate.overrides.enabled}
              <div class="override-fields" transition:slide>
                <label>
                  <span>Expiry date</span>
                  <input
                    type="date"
                    value={formatDateInputValue(candidate.overrides.expiration)}
                    onchange={(event) =>
                      onOverrideDateChange(
                        idx,
                        (event.currentTarget as HTMLInputElement).value,
                      )}
                  />
                </label>
                <label class="secret-toggle">
                  <input
                    type="checkbox"
                    checked={candidate.overrides.secret ?? false}
                    onchange={(event) =>
                      onOverrideSecretChange(
                        idx,
                        (event.currentTarget as HTMLInputElement).checked,
                      )}
                  />
                  <span>Mark as secret</span>
                </label>
              </div>
            {/if}
          </li>
        {/each}
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
</section>

<style lang="scss">
  .dropzone {
    min-width: 5rem;
    min-height: 5rem;
    background-color: blanchedalmond;
    cursor: pointer;
    transition:
      box-shadow 200ms ease,
      transform 200ms ease;
    border-radius: 0.5rem;
    padding: 5pt;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 45px rgba(15, 23, 42, 0.12);
    }
  }

  .drag-here,
  .max-size,
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

  .drag-here {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .max-size {
    margin-top: 2pt;
  }

  section {
    background-color: lightblue;
    padding: 5pt;
    border-radius: 1rem;
  }

  .preview-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0;
    margin: 1rem 0 0;
  }

  .file {
    background: #fff;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 0.75rem;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .file-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .file-meta {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .file-size {
    font-size: 0.85rem;
    color: #475569;
  }

  .file-remove {
    border: none;
    background: #fee2e2;
    color: #b91c1c;
    border-radius: 999px;
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    cursor: pointer;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;
    box-shadow: 0 4px 12px rgba(185, 28, 28, 0.2);

    &:hover {
      transform: translateY(-2px) rotate(-8deg);
    }

    &:active {
      transform: translateY(1px) scale(0.9) rotate(8deg);
      box-shadow: 0 1px 4px rgba(185, 28, 28, 0.25);
    }
  }


  .override-toggle {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
  }

  .override-fields {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.35rem;
  }

  .override-fields label {
    font-size: 0.85rem;
    color: #475569;
  }

  .override-fields label:not(.secret-toggle) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .secret-toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.35rem;
    font-size: 0.9rem;
  }

  .secret-toggle input {
    width: auto;
  }

  .secret-toggle span {
    flex: 1;
    text-align: left;
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
