<h2>Ludzie</h2>
<ul class="hearts">
  <li>
    <a href="https://git.0x0.st/mia">Mia</a> za stworzenie 0x0 i hostowanie go dla
    wszystkich
  </li>
  <li>
    Operatorzy
    <a href="https://boop.icu">boop.icu</a> oraz
    <a href="https://0.vern.cc">0.vern.cc</a>
  </li>
  <li>Zespół Svelte za framework</li>
</ul>

<h2>Użyte narzędzia</h2>
<ul class="tools">
  <li>
    <a href="https://wiki.nixos.org/wiki/Nix_(package_manager)">nix</a>
    (menedżer pakietów), <a href="https://nixos.org/">NixOS</a> (system
    operacyjny),
    <a href="https://github.com/NixOS/nixpkgs/issues">nixpkgs</a> (kolekcja pakietów)
  </li>
  <li>
    <a href="https://svelte.dev/">Svelte</a> oraz
    <a href="https://svelte.dev/docs/kit/introduction">SvelteKit</a>
  </li>
  <li>hosting plików <a href="https://git.0x0.st/mia/0x0">0x0</a></li>
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
