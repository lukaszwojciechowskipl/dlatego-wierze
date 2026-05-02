# Co dalej? — instrukcje dla Łukasza

Witaj z powrotem. Strona jest **gotowa lokalnie i na GitHubie**. Zostało tylko opublikowanie jej w internecie. To wymaga założenia darmowego konta na Vercelu i ~15 minut Twoich kliknięć w przeglądarce.

---

## ✅ Co masz teraz

- 23 wygenerowane strony działają lokalnie pod `http://localhost:4321/`
- Cały kod na GitHubie: https://github.com/lukaszwojciechowskipl/dlatego-wierze
- Panel redakcyjny działa pod `http://localhost:4321/admin`
- Wszystkie zmiany w bazie Sanity będą się pojawiać natychmiast po odświeżeniu strony

---

## 🚀 Jak opublikować stronę w internecie (Vercel) — 5 kroków

### Krok 1 — Załóż konto Vercel (3 min)

1. Otwórz: **https://vercel.com/signup**
2. Kliknij **„Continue with GitHub"** (zaloguj się jako `lukaszwojciechowskipl`)
3. Vercel poprosi o autoryzację → kliknij **Authorize Vercel**
4. Wybierz darmowy plan **„Hobby"**

### Krok 2 — Zaimportuj repo (2 min)

1. Po zalogowaniu kliknij **„Add New… → Project"** (prawy górny róg)
2. Znajdź na liście **`dlatego-wierze`** → kliknij **„Import"**
3. Vercel automatycznie wykryje, że to projekt Astro

### Krok 3 — Ustaw zmienne środowiskowe (3 min)

W formularzu importu rozwiń sekcję **„Environment Variables"** i wpisz po kolei (pole **NAME** → wartość → **Add**):

| NAME | VALUE |
|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | `072fg35b` |
| `PUBLIC_SANITY_DATASET` | `production` |
| `PUBLIC_SANITY_API_VERSION` | `2025-01-28` |
| `SANITY_API_READ_TOKEN` | *(skopiuj z lokalnego pliku `.env.local` linijka `SANITY_API_READ_TOKEN=...`)* |
| `SANITY_REVALIDATE_SECRET` | *(wygeneruj nowy: w terminalu wklej `openssl rand -hex 32` i skopiuj wynik)* |

> **Wskazówkę „skopiuj z `.env.local`"** możesz wykonać tak: w Finderze przejdź do `~/Desktop/strona Dlatego Wierzę`, naciśnij **Cmd+Shift+.** żeby pokazać ukryte pliki, otwórz `.env.local` w TextEdit i skopiuj wartość po `SANITY_API_READ_TOKEN=`.

Pole `VERCEL_DEPLOY_HOOK` zostawiasz pusty na razie — uzupełnimy w Kroku 5.

### Krok 4 — Wciśnij „Deploy" (1 min czekania)

Vercel zacznie budować stronę. Po ~2 minutach dostaniesz publiczny adres typu:

```
https://dlatego-wierze-abc123.vercel.app
```

(albo skrócony `dlatego-wierze.vercel.app` jeśli wolny).

**Zapamiętaj ten adres** — nazwiemy go dalej `<PROD_URL>`.

### Krok 5 — Połącz Sanity z Vercelem (5 min)

To sprawi, że gdy dodasz świadectwo w panelu, strona przebuduje się automatycznie.

#### 5a. Vercel: stwórz Deploy Hook
1. W Vercelu otwórz Twój projekt → **Settings** (ikonka koła zębatego u góry)
2. **Git** w lewym menu
3. Sekcja **Deploy Hooks** → kliknij **„Create Hook"**
4. Hook Name: `sanity-content` · Branch: `main` → **Create Hook**
5. Skopiuj URL hooka (zaczyna się od `https://api.vercel.com/v1/integrations/deploy/...`)

#### 5b. Vercel: dodaj URL hooka jako env var
1. **Settings → Environment Variables**
2. Dodaj zmienną `VERCEL_DEPLOY_HOOK` z tą skopiowaną URL
3. Zapisz → kliknij **„Redeploy"** w zakładce Deployments (żeby zmienna się załapała)

#### 5c. Sanity: dodaj `<PROD_URL>` do CORS
1. https://www.sanity.io/manage → projekt `dlatego-wierze` → **API**
2. **CORS Origins** → Add → wpisz `<PROD_URL>` (bez `/admin` na końcu)
3. **Allow credentials** ✅ → Save

#### 5d. Sanity: skonfiguruj webhook
1. Tym razem w sekcji **Webhooks** (też w API) → **Create webhook**
2. **Name:** `vercel-rebuild`
3. **URL:** `<PROD_URL>/api/revalidate`
4. **Trigger on:** Create + Update + Delete
5. **Filter:** zostaw puste (rebuild dla każdej zmiany)
6. **Secret:** wklej tę samą wartość, którą wpisałeś jako `SANITY_REVALIDATE_SECRET` w Vercelu
7. **HTTP Headers** → Add → key: `x-sanity-revalidate-secret`, value: jak wyżej (te same)
8. Save

---

## 🎉 Gotowe!

Spróbuj teraz:
1. Wejdź na `<PROD_URL>` — zobaczysz stronę online
2. Wejdź na `<PROD_URL>/admin` → zaloguj się → dodaj testowe świadectwo
3. Po ~60 sekundach odśwież `<PROD_URL>` — nowe świadectwo się pojawi

---

## 🆘 Co robić, gdy coś nie działa

| Problem | Rozwiązanie |
|---|---|
| Vercel pokazuje błąd „missing env var SANITY_..." | Sprawdź czy wszystkie 5 zmiennych są w **Production** environment |
| `/admin` pokazuje białą stronę | Brakuje CORS — wróć do kroku 5c |
| Zmiany w Sanity nie wywołują rebuilda | Sprawdź **Webhooks → Logs** w Sanity. Jeśli widzisz 401: zła wartość secret. Jeśli 502: zły URL deploy hook |
| Nie widzisz galaktyki 3D na pierwszej stronie | Może być wyłączona dla Twoich preferencji systemu — sprawdź System Settings → Accessibility → Display → „Reduce motion" |

W razie wątpliwości — uruchom Claude Code w folderze projektu (`cd "~/Desktop/strona Dlatego Wierzę"` w terminalu) i zapytaj. Wszystkie ważne decyzje o stosie technologicznym, dziwactwa i gotchasy są spisane w `CLAUDE.md`.

---

## 📚 Dalej w pracy z treścią

- **Dodawanie nowego argumentu (jednego z 15)** — edytuj plik w `src/content/arguments/` (np. `01-filozofia.mdx`), zapisz, `git add` + `git commit -m "content: rozwiniecie argumentu kalam"` + `git push`. Vercel sam przebuduje.
- **Dodawanie świadectw, świętych, cudów** — zawsze przez panel `/admin`. Bez kodu.
- **Zmiana kolorów / czcionek / nazwy** — `src/styles/globals.css` (kolory) lub `src/components/layout/Header.astro` (logo). Lub poproś Claude Code.
- **Własna domena** — Vercel → Settings → Domains → Add. Vercel sam załatwia HTTPS.

Powodzenia! 🚀
