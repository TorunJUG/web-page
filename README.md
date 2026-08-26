# Toruń JUG – strona internetowa

Statyczna strona Toruń Java User Group.

## Generowanie podstrony spotkania

Generator działa lokalnie w Node.js 20 lub nowszym i nie wymaga instalowania żadnych paczek. Dane spotkania są oddzielone od HTML-a:

- `data/meetings/meeting.example.json` – komplet danych przykładowego spotkania,
- `templates/spotkanie.html` – wspólny szablon podstrony,
- `scripts/generate-meeting.mjs` – generator i walidacja danych.

### Użycie

1. Skopiuj plik `data/meetings/meeting.example.json` pod nową nazwą, np. `data/meetings/91-moje-spotkanie.json`.
2. Uzupełnij numer, slug, tytuł, datę, prelekcje, Meetup i nawigację.
3. Uruchom z katalogu głównego projektu:

```shell
node scripts/generate-meeting.mjs data/meetings/91-moje-spotkanie.json
```

Gotowy plik zostanie zapisany jako `spotkania/<slug>.html`. Istniejący plik o tej samej nazwie zostanie nadpisany, co pozwala ponownie wygenerować stronę po zmianie danych.

Do prób można wskazać inne miejsce docelowe:

```shell
node scripts/generate-meeting.mjs data/meetings/meeting.example.json --output tmp/meeting-preview.html
```

`recordingUrl` ustawione na `null` wyświetla informację o braku nagrania. Po dodaniu adresu YouTube generator utworzy przycisk do nagrania. Pole `status` przyjmuje: `scheduled`, `completed`, `cancelled` albo `postponed` i jest używane w danych Schema.org.

Generator tworzy wyłącznie podstronę szczegółów. Po jej dodaniu trzeba jeszcze ręcznie dodać kafelek do `index.html`, adres do `sitemap.xml` oraz uzupełnić nawigację w danych sąsiedniego spotkania.
