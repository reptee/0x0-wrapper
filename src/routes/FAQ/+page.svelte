<div class="content">
  <h1>Często zadawane pytania</h1>

  <section class="faq-general">
    <dl>
      <dt>Co ma na celu dana strona?</dt>
      <dd>
        Strona ma na celu umożliwić osobom mówiącym w języku polskim wygodne i
        szybkie wysłanie plików i zarządzanie wysłanymi plikami.
      </dd>
      <dt>Gdzie są chronione przesłane pliki?</dt>
      <dd>
        W przypadku udanego wysłania pliki mieszczą się tylko i wyłącznie na
        serwerze docelowym, tzn. jeśli wybraliście dostawcę <a
          href="https://0x0.st/">0x0</a
        >, to pliki są przechowywane na serwerach stojących za danym serwisem.
        Mimo tego, że pliki przechodzą przez serwer pośredni, nie są one
        zapisywane.
      </dd>
      <dt>Czy serwis jest darmowy?</dt>
      <dd>Tak</dd>
      <dt>Jakie technologie stoją za tę stroną?</dt>
      <dd>
        Svelte + SvelteKit (zarówno na frontendzie jak i backendzie),
        TypeScript, SCSS
      </dd>
      <dt>
        Dlaczego wysłanie plików o niektórych rozszerzenia nie jest możliwe (np. <code
          >.rar</code
        >
        oraz <code>.exe</code>)
      </dt>
      <dd>
        To nie jest ograniczenie narzucone przez daną stronę, tylko przez strony
        docelowe. Cele takich ograniczeń się różnią w zależności od dostawcy,
        aby dowiedzieć się więcej należy przeczytać politykę użytkowania
        konkretnych serwisów:
        <ul>
          <li><a href="https://0x0.st/">0x0.st</a></li>
          <li><a href="https://boop.icu/">boop.icu</a></li>
          <li><a href="https://0.vern.cc/">0.vern.cc</a></li>
        </ul>
      </dd>
      <dt>
        Czy dostawcy wiedzą o tym, że pliki były wysłane za pomocą danej strony?
      </dt>
      <dd>
        Tak, ponieważ przy wysłaniu jest ustawiony nagłówek
        <code>User-Agent</code>, który identyfikuje daną stronę. Ten nagłówek
        nie jest unikalny dla każdego użytkownika, lecz ogólny dla wszystkich.
      </dd>
    </dl>
  </section>
  <section class="faq-misc">
    <dl>
      <dt>Czy księżyc jest zrobiony z sera?</dt>
      <dd>Autorzy danej strony nie są w stanie obalić danej hipotezy.</dd>
      <dt>Ile studentów musi uczęstniczyć w grupie projektowej?</dt>
      <dd>Co najmniej trzech: jeden robi, dwóch patrzy.</dd>
    </dl>
  </section>
</div>

<style lang="scss">
  .content {
    max-width: 64ch;
    margin: 0 auto;
    padding: 0 1rem;
  }

  dt {
    /* border-bottom: 1pt solid #3b82f6; */
    /* border-left: 1pt solid #3b82f6; */
    font-weight: bold;
    padding: 3pt;
    background: linear-gradient(135deg, #ebf3fe 0%, #ffffff 100%);
    border-radius: 0.75rem;
  }

  dd + dt {
    margin-top: 0.5rem;
  }

  section + section {
    margin-bottom: 10pt;
  }

  section {
    padding: 5pt;
    border-radius: 0.75rem;
  }

  section + section {
    margin-top: 1rem;
  }
</style>
