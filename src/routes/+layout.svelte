<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<nav>
  <ul>
    <li><a href="/">Upload</a></li>
    <li><a href="/browse">Browse sent files</a></li>
    <li><a href="/FAQ">FAQ</a></li>
    <li><a href="/credits">Credits</a></li>
    <li><a href="/privacy-policy">Privacy policy</a></li>
  </ul>
</nav>

{@render children()}

<style>
  nav {
    display: block;
  }
  nav > ul {
    list-style-type: none;
    display: flex;
  }
  nav > ul > li {
    padding: 4pt;
  }
  nav > ul > li > a {
    display: block;
  }
</style>
