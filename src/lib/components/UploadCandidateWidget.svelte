<script lang="ts">
  import { formatBytes } from "$lib";
  import { slide } from "svelte/transition";
  const {
    candidate,
    removeCandidate,
    onOverrideDateChange,
    onOverrideSecretChange,
    onOverrideToggle,
  } = $props();

  function formatDateInputValue(date: Date | null): string {
    return date ? new Date(date).toISOString().slice(0, 10) : "";
  }
</script>

<!-- NOTE: it complains about a11y, but it was the easiest approach to achieve
desired behavior: clicking on dropzone non-interactive children shouldn't open
file picker, but buttons inside the children themselves still work. -->
<li
  class="card"
  onclick={(event) => event.stopPropagation()}
  onkeydown={(event) => event.stopPropagation()}
>
  <div class="file-header">
    <button
      type="button"
      class="file-remove"
      onclick={(event) => {
        event.stopPropagation();
        removeCandidate();
      }}
    >
      ✕
    </button>
    <div class="file-meta">
      <strong>{candidate.file.name}</strong>
      <span class="file-size">{formatBytes(candidate.file.size)}</span>
    </div>
  </div>
  <label class="override-toggle">
    <input
      type="checkbox"
      checked={candidate.overrides.enabled}
      onchange={(event) =>
        onOverrideToggle((event.currentTarget as HTMLInputElement).checked)}
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
              (event.currentTarget as HTMLInputElement).checked,
            )}
        />
        <span>Mark as secret</span>
      </label>
    </div>
  {/if}
  {#if candidate.upload_failure}
    <p class="upload-failure">Error: {candidate.upload_failure}</p>
  {/if}
</li>

<style lang="scss">
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

  .upload-failure {
    color: red;
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
    & label {
      font-size: 0.85rem;
      color: #475569;
    }

    & label:not(.secret-toggle) {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  }

  .secret-toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.35rem;
    font-size: 0.9rem;

    & input {
      width: auto;
    }

    & span {
      flex: 1;
      text-align: left;
    }
  }
</style>
