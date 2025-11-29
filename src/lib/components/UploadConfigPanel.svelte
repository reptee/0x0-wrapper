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

<div id="settings-card">
  <header id="title"><span class="icon">⚙️</span> settings</header>
  <div>
    <p>Expiry date (optional)</p>
    <input
      type="date"
      name="Expiry date"
      id=""
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
      id="Secret"
      bind:checked={config.secret}
    />
  </div>
  <div>
    <p>Select provider</p>
    <select name="0x0 provider" bind:value={config.provider}>
      {#each providers as provider, i}
        <option value={i}>{provider.url.hostname}</option>
      {/each}
    </select>
  </div>
</div>

<style lang="scss">
  #settings-card {
    background: #fff;
    border: 1px solid rgba(15, 23, 42, 0.06);
    border-radius: 1rem;
    transition:
      box-shadow 200ms ease,
      transform 200ms ease;

    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 45px rgba(15, 23, 42, 0.12);
    }

    & label {
      color: rgb(71, 85, 105);
      font-size: 0.9rem;
    }

    & input,
    & select {
      border-radius: 0.5rem;
      border: 1px solid #d6dae3;
      padding: 0.65rem 0.75rem;
      width: auto;
    }
  }

  #title {
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
