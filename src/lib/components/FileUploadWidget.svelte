<script lang="ts">
  import type { UploadCandidate } from "$lib/types";

  let { files = $bindable() }: { files: FileList | null } = $props();

  let dragCounter = $state<number>(0);
  let isDragging = $state<boolean>(false);
  let candidates = $state<Array<UploadCandidate>>([]);
  let fileInput = $state<HTMLInputElement | null>();

  const previewMode = $derived<boolean>(candidates.length > 0);

  const defaultOverrides = (): UploadCandidate["overrides"] => ({
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
      <ul class="preview-list">
        {#each candidates as candidate, idx}
          <li class="file">
            <div class="file-meta">
              <strong>{candidate.file.name}</strong>
              <span class="file-size">{formatBytes(candidate.file.size)}</span>
            </div>
            <button
              type="button"
              class="file-remove"
              onclick={(event) => {
                event.stopPropagation();
                removeCandidate(idx);
              }}
            >
              remove
            </button>
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

<style style="scss">
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
