<script lang="ts">
  let previewMode = $state<boolean>(false);
  let { files = $bindable() }: { files: FileList } = $props();

  let dragCounter = $state<number>(0);
  let isDragging = $state<boolean>(false);

  function onDragEnter(event: Event) {
    event.stopPropagation();
    dragCounter += 1;
    isDragging = true;
  }
  function onDragOver(event: Event) {
    event.stopPropagation();
  }
  function onDragLeave(event: Event) {
    event.stopPropagation();
    dragCounter -= 1;
    isDragging = false;
  }
  function onDrop(event: Event) {
    event.stopPropagation();
    dragCounter = 0;
    isDragging = false;
  }
  let fileInput = $state<HTMLInputElement | null>();
  function openPicker(event: Event) {
    fileInput?.click();
  }

  let max_size = 512; // STUB

  // adapted from https://stackoverflow.com/a/18650828
  function formatBytes(bytes: number, decimals: number = 2): string {
    const dm = Math.max(0, decimals);
    const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];

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
    class="dropzone"
    ondragenter={onDragEnter}
    ondragover={onDragOver}
    ondragleave={onDragLeave}
    ondrop={onDrop}
    onclick={openPicker}
  >
    <p></p>
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
        {#each files as file, idx}
          <li class="file">
            <div class="file-meta">
              <strong>{file.name}</strong>
              <span class="file-size">{formatBytes(file.size)}</span>
            </div>
            <button class="file-remove">remove</button>
          </li>
        {/each}
      </ul>
    {/if}
    <input class="sr-only" type="file" multiple bind:this={fileInput} />
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
