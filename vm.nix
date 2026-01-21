# vim:tw=0:nowrap:
{ config, lib, pkgs, ... }: {
  users.groups.admin = { };
  users.users = {
    admin = {
      isNormalUser = true;
      extraGroups = [ "wheel" ];
      password = "admin";
      group = "admin";
      openssh.authorizedKeys.keys = [
        "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHNBIehw3zQuMCXIE7e08AEW6ASa3qneXyxsgjZ6lo5g kibi@yoga"
      ];
    };
    root.hashedPassword = "!";
  };

  virtualisation.vmVariant = {
    # following configuration is added only when building VM with build-vm
    virtualisation = {
      memorySize = 1024; # Use 2048MiB memory.
      cores = 2;
      graphics = false;
    };
  };

  services.openssh = {
    enable = true;
    settings.PasswordAuthentication = false;
    settings.PermitRootLogin = "no";
  };

  networking.firewall.allowedTCPPorts = [ 22 9999];
  networking.networkmanager.enable = true;
  # systemd.services.NetworkManager-wait-online = {
  #   wantedBy = ["multi-user.target" "network-online.target"];
  # };
  systemd.targets.network-online = {
    wantedBy = [ "multi-user.target" ];
  };
  # systemd.network.enable = true;
  environment.systemPackages = with pkgs; [ htop lf neovim ];

  system.stateVersion = "25.11";
}
