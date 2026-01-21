<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import logo from "$lib/assets/0x0-logo.svg";
  import { page } from "$app/stores";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar">
  <ul class="nav-links">
    <li>
      <a
        href="/"
        class="brand-button"
        class:active={$page.url.pathname === "/"}
      >
        <img src={logo} alt="Logo 0x0" />
        <span>Wyślij</span>
      </a>
    </li>
    <li>
      <a href="/browse" class:active={$page.url.pathname === "/browse"}
        >Przegląd</a
      >
    </li>
    <li>
      <a href="/FAQ" class:active={$page.url.pathname === "/FAQ"}>FAQ</a>
    </li>
    <li>
      <a href="/credits" class:active={$page.url.pathname === "/credits"}
        >Podziękowania</a
      >
    </li>
    <li>
      <a
        href="/privacy-policy"
        class:active={$page.url.pathname === "/privacy-policy"}
        >Polityka prywatności</a
      >
    </li>
  </ul>
</nav>

{@render children()}

<style>
  .navbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.9rem;
    background: linear-gradient(135deg, #e5e7eb 0%, #dfe3eb 100%);
    border-radius: 999px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    margin: 0.5rem auto;
    width: fit-content;
  }

  @media (pointer: coarse) {
    .navbar {
      border-radius: 1rem;
    }
  }

  .nav-links {
    list-style-type: none;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0;

    & > li > a {
      display: block;
      padding: 0.45rem 0.75rem;
      color: #475569;
      text-decoration: none;
      font-weight: 600;
      border-radius: 0.75rem;
      transition:
        background 150ms ease,
        color 150ms ease,
        box-shadow 150ms ease;
      &:hover {
        background: rgba(59, 130, 246, 0.12);
        color: #1f2937;
      }
      &.active {
        background: #3b82f6;
        color: #fff;
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.25);
      }
    }
  }

  .brand-button {
    display: inline-flex;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 999px;
    letter-spacing: 0.01em;

    & img {
      width: 1rem;
      height: 1rem;
    }
  }
</style>
