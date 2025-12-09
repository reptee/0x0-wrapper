<script lang="ts">
  import { isProviderFull } from "$lib";
  import type { NullPointerProvider } from "$lib/types";

  let { provider }: { provider: NullPointerProvider } = $props();

  let maxFileSize = $derived.by(() => {
    if (!isProviderFull(provider)) return "unknown";

    return `${provider.max_size.toString()} MiB`;
  });

  let age = $derived.by(() => {
    if (!isProviderFull(provider)) return { min: "unknown", max: "unknown" };

    return {
      min: `${provider.min_age} days`,
      max: `${provider.max_age} days`,
    };
  });
</script>

<div class="information-card">
  <header><span class="icon">ℹ️</span> provider information</header>
  <ul>
    <li><span>Maximum file size: {maxFileSize}</span></li>
    <li>
      <span>
        Provider home page:
        <a href={provider.url.toString()}>{provider.url}</a>
      </span>
    </li>
    <li><span>Uploaded file minimum retention: {age.min}</span></li>
    <li><span>Uploaded file maximum retention: {age.max}</span></li>
  </ul>
</div>

<style lang="scss">
  .information-card {
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

  li + li {
    margin-top: 10pt;
  }
</style>
