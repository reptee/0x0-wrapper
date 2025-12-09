<script lang="ts">
  import { isProviderFull, providers } from "$lib";
  import type { UploadConfig } from "$lib/types";

  let { config = $bindable() }: { config: UploadConfig } = $props();
  const cur_provider = $derived(providers[config.provider]);
  const max_age_days = $derived(
    isProviderFull(cur_provider) ? cur_provider.max_age : 365,
  );

  function on_date_change(e: Event) {
    const date = (e.target as HTMLInputElement).valueAsNumber;
    if (Number.isNaN(date)) {
      config.expires = null;
    } else {
      config.expires = new Date(date);
    }
  }
</script>

<div class="settings-card">
  <header><span class="icon">⚙️</span> settings</header>
  <div>
    <span>Expiry date (optional): </span>
    <input
      type="date"
      name="Expiry date"
      id="expiry-date-selector"
      onchange={on_date_change}
      min={new Date(Date.now()).toISOString().split("T")[0]}
      max={new Date(Date.now() + max_age_days * 86_400_000)
        .toISOString()
        .split("T")[0]}
    />
  </div>
  <div>
    <span>Make url hard to guess?</span>
    <input
      type="checkbox"
      name="Secret"
      id="is-secret-checkbox"
      bind:checked={config.secret}
    />
  </div>
  <div>
    <span>Provider: </span>
    <select
      id="provider-selector"
      name="0x0 provider"
      bind:value={config.provider}
    >
      {#each providers as provider, i}
        <option value={i}>{provider.url.hostname}</option>
      {/each}
    </select>
  </div>
</div>

<style lang="scss">
  header {
    font-weight: 600;
    align-items: center;
    gap: 0.5rem;
  }

  .settings-card {
    background: #fff;
    border: 1px solid rgba(15, 23, 42, 0.06);
    border-radius: 1rem;
    transition:
      box-shadow 200ms ease,
      transform 200ms ease;

    padding: 1.5rem;
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 45px rgba(15, 23, 42, 0.12);
    }
  }

  #provider-selector,
  #expiry-date-selector,
  #is-secret {
    display: inline;
    border-radius: 0.5rem;
    border: 1px solid #d6dae3;
    padding: 0.65rem 0.75rem;
    width: auto;
  }

  input[type="checkbox"] {
    transform: scale(1.5, 1.5);
  }

  .settings-card > div {
    margin-top: 10pt;
  }
</style>
