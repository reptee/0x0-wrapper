{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            svelte-language-server
            typescript-language-server
            bun
          ];
        };
        packages."0x0-wrapper" = pkgs.buildNpmPackage {
          pname = "0x0-wrapper";
          version = "0.0.1";
          src = ./.;

          npmDepsHash = "sha256-YGEph+rfJbkKPjvrab/eFDbrbEC3OdjHJEDK+m2IqAc=";
          # npmDepsHash = pkgs.lib.fakeHash;
          makeCacheWritable = true;
          npmFlags = [ "--legacy-peer-deps" "--loglevel=verbose" ];
          npmBuild = "npm run build";
          nativeBuildInputs = [ pkgs.makeWrapper ];
          installPhase = ''
            runHook preInstall

            mkdir -p $out/lib/0x0-wrapper
            cp -r build $out/lib/0x0-wrapper/

            mkdir -p $out/bin
            makeWrapper ${pkgs.nodejs}/bin/node $out/bin/0x0-wrapper \
              --add-flags "$out/lib/0x0-wrapper/build"

            runHook postInstall
          '';
        };
      });
}
