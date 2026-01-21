<script lang="ts">
  import { formatBytes, isProviderFull } from "$lib";
  import type { NullPointerProvider } from "$lib/types";

  let { provider }: { provider: NullPointerProvider } = $props();

  let maxFileSize = $derived.by(() => {
    if (!isProviderFull(provider)) return "nieznany";

    return formatBytes(provider.max_size);
  });

  let age = $derived.by(() => {
    if (!isProviderFull(provider)) return { min: "nieznany", max: "nieznany" };

    return {
      min: `${provider.min_age} dni`,
      max: `${provider.max_age} dni`,
    };
  });
</script>

<div class="information-card">
  <header><span class="icon">ℹ️</span> informacje o dostawcy</header>
  <ul>
    <li><span>Maksymalny rozmiar pliku: {maxFileSize}</span></li>
    <li>
      <span>
        Strona dostawcy:
        <a href={provider.url.toString()}>{provider.url}</a>
      </span>
    </li>
    <li><span>Minimalny czas przechowywania pliku: {age.min}</span></li>
    <li><span>Maksymalny czas przechowywania pliku: {age.max}</span></li>
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
