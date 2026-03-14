---
title: crosspointer
lang: pl
---

Dana aplikacja służy do udostępnienia plików publicznie z dowolnego komputera z
dostępem do internetu. Aplikacja pozwala na wysyłanie i zarządzanie wysłanymi
plikami, przy czym sama aplikacja nie przechowuje żadnych informacji, a służy
jedyni pośrednikiem ze względu na zabezpieczenia CORS we współczesnych
przeglądarkach.

Demo: <https://null.crii.xyz/>

Szczegółowy opis funkcjonalności można znaleźć w pliku dokumentacji
[dokumentacja.md](/dokumentacja-projektu/dokumentacja.md).

### Hostowanie własnej instancji

Projekt można uruchomić w sposób klasyczny: pobierają i uruchamiając serwer za
pomocą `npm run build`, jednak jeśli używasz NixOS, można uruchomić serwer dodając
kilka linijek konfiguracji nix. Także można uruchomić aplikację za pomocą QEMU
bez zmian konfiguracji systemu.

#### Uruchomienie w maszynie wirtualnej

To podejście również wymaga Nix, jak i ustawienie systemu do obsługi maszyn
wirtualnych QEMU (zobacz <https://wiki.nixos.org/wiki/QEMU>).

W celu uruchomienia maszyny wirtualnej z aplikacją, należy użyć

```bash
nix run github:reptee/0x0-wrapper#run-vm
```

Co od ręki pobierze i uruchomi aplikację, dając dostęp do portu SSH 2221 oraz
samej aplikacji na porcie 9999. Żeby zamknąć maszynę, należy kliknąć `Ctrl-A X`.

#### Moduł nix

Przykładowa konfiguracja uruchomiająca aplikację, nginx wraz z automatyczną
obsługą certyfikatów SSL:

```nix
{
  services.null-wrapper = {
    enable = true;
    port = 3081; # Uruchamiamy serwer na porcie 3081, ale tylko lokalnie
    host = "127.0.0.1";
    origin = null;
    group = "null-wrapper";
    user = "null-wrapper";
  };

  ## Udostępnienie serwera innym:

  # Obsługa TLS
  security.acme = {
    acceptTerms = true;
    defaults.email = "your.email@example.com";
  };

  # Korzystamy z nginx jako proxy dla naszej aplikacji.
  services.nginx = {
    enable = true;
    recommendedProxySettings = true;
    recommendedTlsSettings = true;
    virtualHosts."your.host.example.com" = {
      # Zwiększamy maksymalny rozmiar, ponieważ klient może łącznie wysłać kilka
      # plików które ważą więcej niż ograniczenie jednostkowe (tzn. 256MiB lub
      # 512MiB)
      extraConfig = ''
        client_max_body_size 2G;
      '';
      # Obsługa TLS
      enableACME = true;
      addSSL = true;
      locations."/" = {
        proxyPass = "http://127.0.0.1:3081";
      };
    };
  };
  networking.firewall.allowedTCPPorts = [ 80 443 ];
}
```

### TODO

- Opcja wyświetlenia kodu QR w przeglądzie plików
