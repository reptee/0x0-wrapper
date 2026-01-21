{ null-wrapper }:
{ lib, config, ... }:

{
  options.services.null-wrapper = {
    enable = lib.mkEnableOption "null-wrapper" // {
      description = ''
        Whether to enable 0x0-wrapper.
      '';
    };

    port = lib.mkOption {
      type = lib.types.int;
      description = ''
        Which port to bound the server to.
      '';
    };

    group = lib.mkOption {
      type = lib.types.str;
      default = "null-wrapper";
      description = ''
        Group that will start 0x0-wrapper server process. If left to be
        default, the group will be created automatically.
      '';
    };

    user = lib.mkOption {
      type = lib.types.str;
      default = "null-wrapper";
      description = ''
        User account that will start 0x0-wrapper server process. If left to be
        default, the user will be created automatically.
      '';
    };
  };

  config =
    let cfg = config.services.null-wrapper;
    in lib.mkIf cfg.enable {
      systemd.services.null-wrapper = {
        description = "0x0-wrapper";
        wantedBy = [ "network-online.target" ];
        requires = [ "network-online.target" ];
        after = [ "network-online.target" ];
        environment = {
          PORT = "${builtins.toString cfg.port}";
        };
        serviceConfig = {
          ExecStart = ''
            ${null-wrapper}/bin/0x0-wrapper
          '';
          User = cfg.user;
          Group = cfg.group;
          PrivateDevices = true;
          ProtectControlGroups = true;
          ProtectHome = true;
          ProtectKernelTunables = true;
          ProtectSystem = "full";
          PrivateUsers = true;
          MountAPIVFS = true;
          ProtectKernelLogs = true;
          ProtectProc = "invisible";
        };
      };

      users.users = lib.optionalAttrs (cfg.user == "null-wrapper") {
        "null-wrapper" = {
          inherit (cfg) group;
          uid = 354;
          description = "user running 0x0-wrapper server";
          isSystemUser = true;
        };
      };

      users.groups = lib.optionalAttrs (cfg.group == "null-wrapper") {
        "null-wrapper" = {
          gid = 354;
        };
      };
    };
}
