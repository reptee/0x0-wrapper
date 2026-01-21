{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        null-wrapper = pkgs.buildNpmPackage {
          pname = "0x0-wrapper";
          version = "0.0.1";
          src = ./.;

          npmDepsHash = "sha256-YGEph+rfJbkKPjvrab/eFDbrbEC3OdjHJEDK+m2IqAc=";
          # npmDepsHash = pkgs.lib.fakeHash;
          makeCacheWritable = true;
          # npmFlags = [ "--legacy-peer-deps" "--loglevel=verbose" ];
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
        vm-configuration = nixpkgs.lib.nixosSystem {
          modules = [
            ./vm.nix
            (import ./module.nix { inherit null-wrapper; })
            ({ config, ... }: {
              services.null-wrapper.enable = true;
              services.null-wrapper.port = 9999;
              services.null-wrapper.host = "0.0.0.0";
              services.null-wrapper.origin = "http://localhost:9999";
              nixpkgs.hostPlatform = system;
            })
          ];
        };
        launch = pkgs.writeShellScript
          "run-vm-with-ssh.sh"
          ''
            export QEMU_NET_OPTS="hostfwd=tcp::2221-:22,hostfwd=tcp::9999-:9999"
            printf "QEMU_NET_OPTS=%s\n" $QEMU_NET_OPTS
            ${vm-configuration.config.system.build.vm}/bin/run-nixos-vm
          '';
      in
      rec {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            svelte-language-server
            typescript-language-server
            bun
          ];
        };

        nixosModules.null-wrapper = import ./module.nix {
          null-wrapper = packages.null-wrapper;
        };

        packages.default = packages.null-wrapper;
        packages.null-wrapper = null-wrapper;
        apps.run-vm = {
          type = "app";
          program = "${launch}";
        };

      });
}
