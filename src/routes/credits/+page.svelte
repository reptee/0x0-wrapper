<!-- TODO: hearts as list items prefix -->
<h2>People</h2>
<ul class="hearts">
  <li>
    <a href="https://git.0x0.st/mia">Mia</a> for creating 0x0 and hosting it for
    everyone
  </li>
  <li>
    Operators of
    <a href="https://boop.icu">boop.icu</a> and
    <a href="https://0.vern.cc">0.vern.cc</a>
  </li>
  <li>Svelte team for the framework</li>
</ul>

<!-- TODO: hammer as list items prefix -->
<h2>Tools used</h2>
<ul class="tools">
  <li>
    <a href="https://wiki.nixos.org/wiki/Nix_(package_manager)">nix</a> the
    package manager, <a href="https://nixos.org/">NixOS</a> the operating
    system,
    <a href="https://github.com/NixOS/nixpkgs/issues">nixpkgs</a> the package collection
  </li>
  <li>
    <a href="https://svelte.dev/">Svelte</a> and
    <a href="https://svelte.dev/docs/kit/introduction">SvelteKit</a>
  </li>
  <li><a href="https://git.0x0.st/mia/0x0">0x0</a> file hosting service</li>
  <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
  <li><a href="https://sass-lang.com/documentation/syntax/">SCSS</a></li>
</ul>

<style lang="scss">
  ul.hearts {
    list-style: none;
    & li::marker {
      content: "♥ ";
    }
  }

  ul.tools {
    list-style: none;
    & li::marker {
      content: "🔨 ";
    }
  }

  h2 {
    margin-left: 0.3rem;
    padding: 1rem;
    background: #dfe3eb;
    border-radius: 100pt;
    display: inline-block;
  }
</style>
