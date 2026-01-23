---
title: "Dokumentacja strony do przesyłania i udostępniania plików --- crosspointer"
date: 2025-12-12
lang: pl
titlepage: true
titlepage-logo: ./assets/wmit_logo.pdf
logo-width: 10cm
toc: true
toc-own-page: true
author:
  - Aleksey Myshko
  - Andrii Yanishevskyi
abstract: |
  Przygotowane przez studentów III roku kierunku Inżynieria i Analiza Danych

  Link do strony: <https://null.crii.xyz>
---

<!-- nie usuwać starego sprawozdania, dodać nowe -->

<!--
- [x] powinna być strona tytulowa
- [x] tytul powinien brzmieć «dokumentacja strony ...»
- [x] celem projektu jest stworzenie strony ... z wykorzystaniem technologii
  html/css/javascript
- [x] grupa docelowa: skierowana do mniej technicznych polaków
- [x] responsywność: dodać jakie rozdzielczości obsługujemy

- [x] mapa strona:
  nie zaczynać od listy
  «strona internetowa będzie się składała z następujących podstron»

- [ ] obejrzenie strony dopiero po zrobieniu dokumentacji
-->

<!-- ZAWARTOŚĆ DOKUMENTACJI PROJEKTU (cz. I) -->

<!-- Strona tytułowa (tytuł projektu, autorzy, rok) -->

# Cel projektu

<!-- (Krótko określić, jaki jest główny cel strony internetowej. Przykłady:
promocja firmy, informowanie o usługach, sprzedaż produktów, edukacja, rozrywka)
-->

Celem projektu jest stworzenie strony internetowej, która umożliwia użytkownikom
przesyłanie dowolnych plików (które stają się dostępne globalnie), co pozwala na
udostępnienie dużej grupie osób dowolnych treści w łatwy i szybki sposób.

# Założenia projektowe

## Kategoria strony

<!--
(Jaką rolę strona będzie pełnić? Jakie funkcje i typ treści będą dominować w
serwisie? Np. wizytówkowa, portal, serwis informacyjny itp.)
-->

Strona ma na celu umożliwić użytkownikom przesyłanie dowolnych plików i
uzyskanie linku do wysłanych treści

<!-- [^dowolnych] -->

Przewidziane treści:

- wysyłanie treści do jednego z trzech dostawców (<https://0x0.st/>,
  <https://0.vern.cc/>, <https://boop.icu/>)
- zarządzanie plikami (usuwanie, przegląd)

<!-- [^dowolnych]: za wyjątkiem `.exe`, `.dll` i podobnych *problematycznych* plików -->

## Grupa docelowa

<!--
(Do kogo kierujemy stronę? Jakie są potrzeby i oczekiwania użytkowników?).
Należy pamiętać, że wygląd oraz funkcjonalności witryny różnią się w zależności
od grupy docelowej, np. wykorzystamy inną kolorystykę w przypadku tworzenia
strony kancelarii adwokackiej, a inną budując stronę zawierającą gry edukacyjne
dla dzieci. Niezmiernie ważne jest więc klarowne określenie grupy docelowej i w
oparciu o to dostosowanie ostatecznego wyglądu strony.
-->

Strona ma przeznaczenie ogólne, ale jest przeważnie skierowana do
użytkowników mniej technicznych którzy rozumieją język polski, oraz dla których
wysłanie plików na serwer docelowy za pośrednictwem konsoli może stanowić
kłopot.

## Treści prezentowane na stronie

<!--
Ściśle powiązane z kategorią strony: np. prowadząc blog treści zamieszczamy
regularnie, a w przypadku strony wizytówkowej firmy umieszczamy podstawowe
informacje o firmie (lokalizacji, oferowanych produktach, historii firmy i
itp.). Czy na stronie będzie zakładka z aktualnościami?
-->

Strona ma prezentować:

- okno wysyłania wraz z informacjami dotyczącymi konkretnych dostawców
- okno zarządzania wysłanymi plikami
- politykę prywatności
- podstronę z najczęstszymi pytaniami (tzw. FAQ)
- podstronę z podziękowaniami

## Funkcjonalności strony

<!--
(Czego odbiorca będzie od strony oczekiwał, jakich informacji będzie na niej
szukał?). Należy rozważyć: umiejscowienie logo na stronie, z jakich modułów ma
być zbudowana strona (co ma się znaleźć na stronie, np. aktualności, galerie,
lokalizacje na mapie, wyszukiwarka treści na stronie, oferta produktów,
formularz kontaktowy, przyciski przekierowujące do mediów społecznościowych i
itp.), wybór kolorystki i rozwiązań graficznych.
-->

Na stronie się znajdą:

- narzędzie do wysyłania: ustawienie czasu ekspiracji, wybór dostawcy, ustawienie
  «secret»[^secret]
- informacje dotyczące konkretnych dostawców (minimalna i maksymalna retencja
  pliku, maksymalny rozmiar pliku)
- manager wysłanych plików: możliwość usunięcia, przejścia pod adres, skopiowania linku

[^secret]: najlepiej zobaczyć to na przykładzie:

    - plik wysłany bez tego ustawienia: <https://0x0.st/KC_u.txt>
    - plik wysłany z ustawionym nagłówkiem `secret`: <https://0x0.st/s/rb0kENYZ97WZI8NkRpfBbw/KC_S.txt>

    Jak widać główną różnicą jest to, że adres drugiego pliku jest o wiele
    trudniej odgadnąć, wówczas gdy domyślnie adres to tak naprawdę kolejny ID który
    używa szerszego alfabetu niż 0-9


## Mapa strony

<!--
(Przedstawienie struktury menu i podstron) – można użyć schematu graficznego lub
listy hierarchicznej.
-->

Strona internetowa będzie się składała z następujących podstron:

- `/` --- korzeń, zawiera okno wysyłania plików, informacje o dostawcy,
  możliwość ustawienia czasu ekspiracji oraz opcji «secret»
- `/browse` --- przegląd wysłanych plików,
- `/FAQ` --- najczęściej zadawane pytania, pozwoliliśmy sobie trochę humoru,
- `/credits` --- podziękowania,
- `/privacy-policy` --- polityka prywatności.

## Zawartość strony głównej

<!--
(wykaz elementów budowy strony głównej) – wypunktować wszystkie elementy strony
głównej, np.: nagłówek z logo i menu, baner lub slider, sekcje z treściami
(aktualności, oferta, galeria), formularz kontaktowy, stopka z danymi firmy i
odnośnikami do mediów społecznościowych. Wskazać tagi, które będą wykorzystane
do oznaczenia poszczególnych treści.
-->

Strona główna będzie zawierała okno wysłania, które swoją drogą zawiera trzy widgety:

- widget zawierające załączone pliki gotowe do wysłanie razem z przyciskami
  dodania kolejnych plików oraz bezpośrednio wysłania. Każdy załączony plik
  także ma możliwość nadpisywania czasu wygaśnięcia (`div`,
  `input type="checkbox`, `input type="file"`, `input type="date"`)
- widget z ustawieniami wysłania: wybór dostawcy, data wygaśnięcia, ustawienie
  «secret» (`div`, `input type="checkbox`, `input type="date"`, `select`)
- widget z informacjami o wybranym dostawcy (`div`, `ul`, `a`)

Także strona zawiera menu z linkami do poszczególnych podstron.

## Responsywność

<!--
(W jakim zakresie strona będzie responsywna, na jakich urządzeniach będzie
wyświetlać się dobrze).
-->

Urządzeniami docelowymi są komputery stacjonarne bądź laptopy o rodzielczości
FullHD, a także urządzenia typu touch (smartfony, tablety, laptopy 2w1). Strona
więc będzie się dostosowywała do rozmiaru ekranu urządzenia na którym jest
wyświetlana.

Na urządzeniu typu komputer nie zmienia wyglądu w zależności od rozdzielczości,
natomiast w przypadku telefonów zmienia układ strony w menu wysłania i
przeglądania wysłanych plików w celu poprawienia UX.


## Wersje językowe

Strona jest dostępna tylko i wyłącznie w języku polskim.

## Logo

<!--
(Czy już istnieje, czy będzie tworzone na potrzeby strony?).
-->

Logo stworzone własnoręcznie na potrzeby projektu.

![Logo](./assets/0x0-logo.png){width=50%}

## Specyfikacja techniczna

<!--
(Jakie technologie zostaną wykorzystane do stworzenia strony? Czy będą
integracje zewnętrzne (API)? Jakie zostaną spełnione wymagania dotyczące SEO i
dostępności?).
-->

Technologie wykorzystane do stworzenia strony:

- [Svelte oraz SvelteKit](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/) --- upraszcza opracowywanie
  poprzez dodanie prawdziwego systemu typów do języku JavaScript
- [SCSS](https://sass-lang.com/documentation/syntax/) --- rozszerzona wersja CSS
- [Node.js](https://nodejs.org) --- to co bezpośrednio uruchamia serwer i pozwala
  kontaktować się z nim.

Technologie wykorzystane w celu opracowania projektu:

- [Język nix](https://nixos.org/) --- do stworzenia środowiska deweloperskiego
  zawierającego wszystkie niezbędne narzędzia, także maszyny wirtualnej do
  testowania strony oraz modułu [systemd](https://systemd.io/) do uruchomienia
  w środowisku docelowym.
- [Podman](https://podman.io/) --- do ustawienia lokalnej instancji 0x0, żeby
  nie spamować dostawców w trakcie opracowania

Zewnętrzne API wykorzystane w projekcie:

- Serwis [0x0 (null pointer)](https://git.0x0.st/mia/0x0) --- projekt open-source pozwalający
  każdemu uruchomić własną kopię. Również ma kilka zewnętrznych instancji
  uruchomionych przez osób trzecich.


# Wykonanie strony internetowej
<!-- Należy wykazać, że spełnione są następujące  kryteria oceny:
         TODO:
    [x] a) Tematyka (zgodność z ustaleniami)
    [x] b) Strona zawiera minimum 5 podstron
    [x] c) Strona zawiera działające menu nawigacyjne
    [x] d) Wskazać jaką grafikę zawiera stroną – czy jest powiązana z jej tematyką, czy jest wykonana samodzielnie czy też
       pobrana z Internetu (na jakiej licencji? Z jakiego źródła?)
    [x] e) Pokazać działający formularz/wykorzystanie JavaScript (maximum przy autorskim skrypcie) – pokazać podstronę
       pokazującą formularz/JavaScript
    [x] f) Pokazać wykorzystanie HTML API.
    [x] g) Responsywność strony – pokazać wygląd strony na różnych urządzeniach
    [x] h) Wykazać troskę o User Experience
    [x] i) Pokazać poprawne wykorzystanie znaczników (np. oznaczanie sekcji, cytatów) – dodać kod jednej z podstron.
    [x] j) Zgodność strony ze standardami W3C – print screen z walidatora
    [x] k) Miejsce opublikowania strony w Internecie
-->
## Struktura strony

![](./assets/main_page_empty.pdf){width=48%}\ ![](./assets/main_page_files.pdf){width=48%}
\begin{figure}[!h]
\caption{Strona główna}
\end{figure}

![Strona przeglądania plików](./assets/view.pdf)

Tematyka strony jest zgodna z założeniami projektu: została stworzona strona do
wysyłania plików za pośrednictwem trzech dostawców na wybór.

Strona zgodnie z ustaleniami zawiera 5 podstron:

- Wysyłanie plików
- Przegląd wysłanych plików
- Często zadawane pytania
- Podziękowania
- Polityka prywatności

Struktura tych podstron, widgety na nich umieszczone są zgodne z założeniami.

Wszystkie podstrony są dostępne za pomocą menu nawigacyjnego umieszczonego w
pasku górnym strony. Także w pasku tym przy przycisku "Wyślij" umieszczona jest
jedyna grafika użyta na stronie --- logo naszego autorstwa.

## Responsywność

Strona jest dostosowana do urządzeń desktopowych oraz urządzeń typu touch. W
stosunku do wersji komputerowej, w wersji na urządzenia mobilne są wprowadzone
między innymi następujące zmiany:

- Menu nawigacyjne dzieli się na kilka wierszy
- Dwa panele pozwalające na ustawienie opcji wysłania oraz panel informacji o
  stronie mieszczą się jeden pod innym, zamiast pozycjonowania obok siebie
  (schemat poniżej)
- Tabela wysłanych plików uzyskuje własność overflow, co pozwala ją przewijać
  nie przewijając całej strony
- Checkboxy stają się większe na urządzeniach mobilnych

![Transformacja strony wysłania](assets/main-page-responsivity.png)

![Transformacja strony przeglądania plików](assets/browse-page-filled.png)

## Troska o User Experience

Responsywność, czyli dostosowanie do różnych typów urządzeń jest częścią
poprawienia User Experience. Także korzystanie ze strony jest przyjemniejsze
dzięki temu, że:

- Przyciski są umieszczone w sposób intuicyjny dla użytkownika
- Funkcjonalność jest logicznie podzielona na podstrony
- Informacje o dostawcach są dostępne od razu na stronie --- użytkownik nie musi
tego oddzielnie szukać
- Tekst i przyciski mają optymalny kontrast

## Miejsce opublikowania

Strona została umieszczona na domenie której jesteśmy właścicielami. Do
utrzymania strony skorzystano z hostinga [HETZNER](https://www.hetzner.com/).

Link do strony: <https://null.crii.xyz>

## Inne uwagi dotyczące wykonania strony

<!--
(np. plan testów funkcjonalności, responsywności, wydajności, SEO, dostępności;
przykłady użycia JavaScript lub innych skryptów; zalecenia dotyczące
aktualizacji treści i konserwacji strony; opcjonalnie harmonogram wdrożenia).
-->

Serwer nie zapisuje wysłanych treści, i na początku chcieliśmy obejść się bez
serwera, ale problem polega na ograniczeniach CORS (Cross-Origin Resource
Sharing), które pozwalają wysyłać POST zapytania (które są jedynym sposobem na
wysyłkę plików do 0x0) tylko autoryzowanym stronom.

Zatem jedyną rolę, którą pełni serwer jest przekazanie plików do dostawcy.

Przykład autorskiej funkcji po stronie serwera odpowiedzialnej za wysłanie
plików do dostawcy:

```typescript
async function uploadFile(
  file: File,
  provider: NullPointerProvider,
  expiration_epoch_ms: number | null = null,
  secret: boolean | null = null,
): Promise<Response | Error> {
  const form = new FormData();

  form.append("file", file, file.name);

  if (secret) {
    form.append("secret", "");
  }

  if (expiration_epoch_ms) {
    form.append("expires", Math.floor(expiration_epoch_ms).toString());
  }

  try {
    const response = await fetch(provider.url, {
      method: "POST",
      body: form,
      headers: {
        "User-Agent": "curl/https://github.com/reptee/0x0-wrapper",
      },
    });

    if (!response.ok) {
      return new Error(
        `Upload failed: status=${response.status} status_text=${response.statusText}`,
      );
    }
    return response;
  } catch (error) {
    return error as Error;
  }
}
```

W funkcji powyżej tworzymy sztuczny formularz, który zostanie wysłany do
dostawcy. Jesteśmy uczciwi, więc identyfikujemy się unikalnie za pomocą nagłówku
User-Agent, który, jak można zauważyć, zaczyna się od "curl/", co wynika z
faktu, że w przypadku wysłania do <https://0x0.st> nagłówek koniecznie musi
zaczynać się od `curl/`, bo inaczej serwer nie przyjmie pliku. To, swoją drogą,
wynika z tego, że przy wykorzystaniu `curl`{.bash} do wysłania plików,
`curl`{.bash} ustawia ten nagłówek na `curl/$WERSJA`.

Dodamy, że strona sama w sobie używa dokładnie jeden formularz (też sztuczny),
który tworzymy ręcznie (nie istnieje w drzewie DOM) podczas wysłania plików na
nasz serwer:
```javascript
// Cała definicja w src/routes/+page.svelte:34

async function upload_files(): Promise<Error | void> {
  let form = new FormData();

  form.set("config", JSON.stringify(uploadConfig));
  // ...
}
```

Ta funkcja to miejsce zebrania się wszystkich plików, konfiguracji ogólnej i
konfiguracji szczególnej (dla oddzielnych plików). Konfiguracja, swoją drogą, jest
stworzona za pomocą znaczników `<input>`{.html} typów `"checkbox"` i `"date"`.
Same pliki dołączane za pomocą ukrytego znaczniku `<input type="file">`{.html}, którego
metodę `.click()`{.javascript} używamy przy kliknięciu na widget dodania plików.

### Poprawność wykorzystanych znaczników

Poprawność wykorzystanych znaczników była sprawdzana na bieżąco za pomocą
serwera językowego svelte (zobacz
[svelte-language-tools](https://github.com/sveltejs/language-tools)), który
pomocnie wskazywał na każdy niepoprawnie użyty wskaźnik, bądź na dolegliwości w
pisanym kodzie TypeScript. Wskutek tego walidacja za pomocą narzędzi W3C została
świadomie pominięta.

### Wykorzystanie HTML API

Przykładem użycia HTML API jest dodanie handlera do elementu checkbox:

```javascript
<!-- plik src/lib/components/UploadCandidateWidget.svelte:64 -->
<input
type="checkbox"
checked={candidate.overrides.secret ?? false}
onchange={(event) =>
  onOverrideSecretChange(
      (event.currentTarget as HTMLInputElement).checked,
      )}
  />
```

Ta funkcja nadpisuje ustawienie `secret` dla konkretnego pliku.

### Kod jednej z podstron

Przedstawiamy kod podstrony `/credits`, która nie zawiera dynamicznych treści.

```html
<div class="content">
  <h2>Ludzie</h2>
  <ul class="hearts">
    <li>
      <a href="https://git.0x0.st/mia">Mia</a> za stworzenie 0x0 i hostowanie go
      dla wszystkich
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
    <li>Hosting plików <a href="https://git.0x0.st/mia/0x0">0x0</a></li>
    <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
    <li><a href="https://sass-lang.com/documentation/syntax/">SCSS</a></li>
  </ul>
</div>

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
    padding: 1rem;
    border-radius: 100pt;
    display: inline-block;
    background: linear-gradient(135deg, #ebf3fe 0%, #ffffff 100%);
  }

  .content {
    max-width: 64ch;
    margin: 0 auto;
    padding: 0 1rem;
  }
</style>
```

### Nix

Nix odgrywa kluczową rolę przy testowaniu, uruchamiania i bezpiecznej publikacji
strony. Plikiem głównym jest `flake.nix`, który zbiera wszystkie *wyjścia* (ang.
outputs) z naszego projektu (`flake.nix` można w pewnym sensie traktować jako
korzeń projektu). Jednym z wyjść jest sam serwer (`packages.null-wrapper`),
który możemy zbudować wykonując polecenie `nix build` w katalogu projektu.
Drugim ważnym wyjściem jest `apps.run-vm`, które przy uruchomieniu uruchamiania
wirtualną maszynę, która zawiera minimalny zestaw wymaganych rzeczy: serwer SSH
(żebyśmy mogli dostać się wewnątrz maszyny wirtualnej), oraz nasz serwer
zawinięty w serwis systemd, całą konfigurację którego można znaleźć w
`module.nix`. Użyto kilka opcji *utwardzających* (ang. hardening) konfigurację
serwisu, mianowicie `User`, `Group` pozwalające uruchomić serwer jako użytkownik
bez uprzywilejowań, `PrivateDevices`, `ProtectHome`, `ProtectKernelTunables`,
`ProtectProc`, który ukrywa pewne pliki i katalogi, takie jak `/dev`, `/home`,
`/proc`, `/sys`.

Ostatecznie dołączono tę konfigurację do systemu na serwerze, zaktualizowano nginx i
certyfikat SSL (można zobaczyć w
[`/nix/sys/hez/default.nix`](https://gitlab.com/repetitivesin/dotfiles/-/blob/2dc40a82f51d19bb96793c763f15abaa80ac1104/nix/sys/hez/default.nix#L94)).


## Wykorzystanie AI do stworzenia strony

W trakcie tworzenia strony autorzy konsultowali się z ChatGPT w celu poprawienia
błędów, poszerzenia wiedzy itd. Pytania zadawane botu SI nie zostały zanotowane,
ponieważ wskazówki zawierające kod nie były wstawiane bez zmian, lecz pisane
przez autorów uwzględniając zaproponowane rozwiązanie.

Czasami jednak używano rozwiązań metodą kopiuj-wklej. Zgodnie z wymaganiami
podajemy prompty do SI, można ich również znaleźć na
[stronie projektu](https://github.com/reptee/0x0-wrapper/commits/svelte/) na
GitHub w historii migawek git szukając `ai-generated` (np. za pomocą
`git log --grep "ai-" HEAD`{.bash} po klonowaniu repozytorium do lokalnego
katalogu).

- (ai-produced) feat: style the table

  > - Can you replicate this table style \[codex-clipboard-sIFiJw.png 800x524\] in src/routes/browse/+page.svelte. Mark delete button as blue, and if button is disabled, mark it red
  > - Put the necessary part in src/lib/components/FileEntry.svelte, because the rows are defined here

- (ai-produced) feat: style the navbar

  > - Style the navbar. Make it rounded on the right and left, put the logo src/lib/assets/0x0-logo.svg before the Upload button and make it a single button.
  > - I changed my mind, make it light theme (colors a bit darker than table's) and make the current tab highlighted
  > - Don't always highlight the `[logo] Upload`

- (ai-generated) disable buttons while uploading

  > - I tried disabling add and upload buttons at src/lib/components/FileUploadWidget.svelte:200, but for some reason it does not work. Your task is to figure out why, and propose a compact solution, ideally not changing outside the component.
  > - Maybe not a spinner, but add graying the buttons out when isUploading

- (ai-generated) dodaj politykę prywatności

  > - Write a privacy policy under routes privacy-policy +page.svelte. It should be in polish, should mention that files sent to buffer server are only sent because direct post requests are not possible, and that files are only stored in memory for the time of transfer. Also say that for file retention periods and TOS users need to consult the respective services' privacy policies
  > - Mention that localStorage is used to store information about uploaded files, and that this information is ONLY stored on the client side

- (ai-generated) polskie tłumaczenie

  > - Przetłumacz wszystkie treści na stronie które nie są obecnie w polskim na polski. Nie tłumacz nazw w kodzie czy komentarzy, tylko treści które widzi użytkownik.


# Wnioski

W przyszłości planujemy ciągle aktualizować stronę. Aktualizacje te będą dotyczyły:

- Polepszenie designu, dostosowanie stylu do ówcześnie aktualnego
- Lepszy handling błędów zwracanych przez serwer
- Dodanie funkcjonalności skrócenia linków --- to też jest usługa świadczona
przez tych samych dostawców do których wysyłamy pliki
