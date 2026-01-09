---
title: "Dokumentacja techniczna strony cross-pointer"
date: 2025-12-12
lang: pl
author:
  - Aleksey Myshko
  - Andrii Yanishevskyi
abstract: |
  Przygotowywane przez studentów III roku kierunku Inżynieria i Analiza Danych
---

<!-- TODO:
powinna być strona tytulowa

tytul powinien brzmieć «dokumentacja strony ...»

celem projektu jest stworzenie strony ... z wykorzystaniem technologii
html/css/javascript

grupa docelowa: skierowana do mniej technicznych polaków

responsywność: dodać jakie rozdzielczości obsługujemy

mapa strona:
nie zaczynać od listy
«strona internetowa będzie się składała z następujących podstron»

obejrzenie strony dopiero po zrobieniu dokumentacji
-->

<!-- ZAWARTOŚĆ DOKUMENTACJI PROJEKTU (cz. I) -->

<!-- Strona tytułowa (tytuł projektu, autorzy, rok) -->

# Cel projektu

<!-- (Krótko określić, jaki jest główny cel strony internetowej. Przykłady:
promocja firmy, informowanie o usługach, sprzedaż produktów, edukacja, rozrywka)
-->

Strona ma na celu umożliwić użytkownikom przesyłanie dowolnych plików (które
później będą dostępne globalnie), co pozwala na udostępnia dużej grupie osób
dowolnych treści w łatwy sposób.

# Założenia projektowe

## Kategoria strony

<!--
(Jaką rolę strona będzie pełnić? Jakie funkcje i typ treści będą dominować w
serwisie? Np. wizytówkowa, portal, serwis informacyjny itp.)
-->

Aplikacja ma na celu umożliwić użytkownikom przesyłanie dowolnych plików i
uzyskanie linku do wysłanych treści.
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

Aplikacja ma przeznaczenie ogólne, ale przeważnie jest skierowana do
użytkowników mniej technicznych, dla których wysłanie plików na serwis docelowy,
stanowi kłopot.

## Treści prezentowane na stronie.

<!--
Ściśle powiązane z kategorią strony: np. prowadząc blog treści zamieszczamy
regularnie, a w przypadku strony wizytówkowej firmy umieszczamy podstawowe
informacje o firmie (lokalizacji, oferowanych produktach, historii firmy i
itp.). Czy na stronie będzie zakładka z aktualnościami?
-->

Strona ma prezentować:

- okno wysyłania wraz z informacjami dotyczącymi konkretnych dostawców
- okno zarządzania wysłanych plików
- polityka prywatności
- strona opisująca serwis
- strona z podziękowaniami

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

- okno wysyłania: ustawienie czasu ekspiracji, wybór dostawcy, ustawienie
  «secret»[^secret]
- informacje dotyczącymi konkretnych dostawców (minimalna i maksymalna retencja
  pliku, maksymalny rozmiar pliku)
- manager wysłanych plików: możliwość usunięcia, przejrzenia, skopiowania linku

[^secret]: najlepiej zobaczyć to na przykładzie:

    - plik wysłany bez tego ustawienia: <https://0x0.st/KC_u.txt>
    - plik wysłany z ustawionym polem `secret`: <https://0x0.st/s/rb0kENYZ97WZI8NkRpfBbw/KC_S.txt>

    Jak widać główną różnicą jest to, że adres drugiego pliku trudno odgadnąć,
    gdyż domyślnie adres to tak naprawdę kolejny ID który używa szerszego alfabetu
    niż 0-9

## Responsywność strony

<!--
(W jakim zakresie strona będzie responsywna, na jakich urządzeniach będzie
wyświetlać się dobrze).
-->

Urządzeniami docelowymi są komputery stacjonarne bądź laptopy, a także
smartfony. Strona więc będzie się dostosowywała do rozmiaru ekranu urządzenia na
którym jest wyświetlana.

## Wersje językowe strony

<!--
(W jakich wersjach językowych będzie dostępna strona).
-->

Przewidywany jest wyłącznie język polski.

## Logo strony

<!--
(Czy już istnieje, czy będzie tworzone na potrzeby strony?).
-->

Będzie stworzone na potrzeby strony, na razie nie istnieje.

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
- [bun](https://bun.com/) --- to co bezpośrednia uruchamia aplikacje i pozwala
  kontaktować się z nią, alternatywa Node.js.

Technologie wykorzystane w celu opracowania projektu:

- [język nix](https://nixos.org/) --- do stworzenia środowiska deweloperskiego
  zawierającego wszystkie niezbędne narzędzia
- [podman](https://podman.io/) --- do  uruchomienia lokalnej wersji 0x0, żeby
  nie spamować dostawców w trakcie opracowania

zewnętrzne API:

- serwis [0x0 (null pointer)](https://git.0x0.st/mia/0x0) --- projekt open-source pozwalający
  każdemu uruchomić własną kopię. Również ma kilka zewnętrznych instancji
  uruchomionych przez osób trzecich.

# Mapa strony

<!--
(Przedstawienie struktury menu i podstron) – można użyć schematu graficznego lub
listy hierarchicznej.
-->

- `/` --- korzeń, zawiera okno wysyłania plików, informacje o dostawcy,
  możliwość ustawienia czasu ekspiracji oraz opcji «secret»
- `/browse` --- przegląd wysłanych plików
- `/tos` --- polityka prywatności / warunki korzystania z serwisu
- `/credits` --- podziękowania
- `/about` --- o stronie

# Zawartość strony głównej

<!--
(wykaz elementów budowy strony głównej) – wypunktować wszystkie elementy strony
głównej, np.: nagłówek z logo i menu, baner lub slider, sekcje z treściami
(aktualności, oferta, galeria), formularz kontaktowy, stopka z danymi firmy i
odnośnikami do mediów społecznościowych. Wskazać tagi, które będą wykorzystane
do oznaczenia poszczególnych treści.
-->

Strona główna zawiera okno wysłanie, które swoją drogą zawiera trzy widgety:

- widget zawierające załączone pliki gotowe do wysłanie razem z przyciskami
  dodania kolejnych plików oraz bezpośrednia wysłania. Każdy załączony plik
  także ma możliwość nadpisywania czasu ekspiracji (`div`,
  `input type="checkbox`, `input type="file"`, `input type="date"`)
- widget z ustawieniami wysłania: wybór dostawcy, data ekspiracji, ustawienie
  «secret» (`div`, `input type="checkbox`, `input type="date"`, `select`)
- widget z informacjami o wybranym dostawcy (`div`, `ul`, `a`)

Także strona zawiera menu z linkami do poszczególnych podstron.

# Inne uwagi dotyczące wykonania strony

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

Przykład funkcji po stronie serwera odpowiedzialnej za wysłanie plików do
dostawcy:

```typescript
export async function uploadFile(
  file: File,
  provider: NullPointerProvider,
  expiration_epoch_s: number | null = null,
  secret: boolean | null = null,
): Promise<Response | Error> {
  const form = new FormData();

  form.append("file", file, file.name);

  if (secret) {
    form.append("secret", "");
  }

  if (expiration_epoch_s) {
    form.append("expires", Math.floor(expiration_epoch_s * 1000).toString());
  }

  try {
    const response = await fetch(provider.url, {
      method: "POST",
      body: form,
      headers: {
        // TODO: change UA
        "User-Agent": "curl/a-unique-UA-hopefully",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Upload failed: status=${response.status} status_text=${response.statusText}`,
      );
    }
    return response;
  } catch (error) {
    return error as Error;
  }
}
```
