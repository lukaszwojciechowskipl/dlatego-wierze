/**
 * The 15 planets — single source of truth for the galaxy hero, the bento
 * grid, the knowledge graph and the longform argument pages.
 *
 * Each planet is one "knockout punch" — a single line of evidence strong
 * enough that a sincere seeker, opening just one source, has a reason to
 * stop and think. The split is deliberate: 7 reason-based planets answer
 * "is it true?" and 8 experiential planets answer "is it alive?".
 */

export type ConstellationCategory = 'rozum' | 'doswiadczenie';

export interface Constellation {
  id: number;
  slug: string;
  /** Long form title used on the article page */
  name: string;
  /** Short form used as a 3D label in the galaxy and in the bento card */
  shortName: string;
  /** 1–2 sentence Polish hook shown on hover and in the bento grid */
  teaser: string;
  category: ConstellationCategory;
  /** Hue 0-360 — kept as a separate scalar so existing callers (mapa-wiedzy
   *  graph, dimming overlays) can still derive related shades cheaply. */
  hue: number;
  /** Full HSL string — the precise designed colour for this planet. */
  colorHsl: string;
  /** Number of sparkles around the core */
  starCount: number;
  /** Position on the unit sphere — multiplied by radius in the renderer */
  position: [number, number, number];
}

const CATEGORY_LABEL: Record<ConstellationCategory, string> = {
  rozum: 'rozum',
  doswiadczenie: 'doświadczenie',
};

export function categoryLabel(c: ConstellationCategory): string {
  return CATEGORY_LABEL[c];
}

/** Drop the alpha into a `hsl(...)` string — works for both
 *  `hsl(220, 80%, 55%)` and `hsl(220 80% 55%)` syntaxes. */
export function hslWithAlpha(hsl: string, alpha: number): string {
  const trimmed = hsl.trim();
  if (trimmed.startsWith('hsla')) return trimmed;
  return trimmed.replace(/^hsl\(/, 'hsla(').replace(/\)$/, `, ${alpha})`);
}

/** Generate evenly distributed points on a unit sphere using the Fibonacci
 *  spiral. Stable, deterministic, no clustering. */
function fibonacciSphere(n: number): Array<[number, number, number]> {
  const phi = Math.PI * (Math.sqrt(5) - 1);
  const points: Array<[number, number, number]> = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    points.push([x, y, z]);
  }
  return points;
}

const positions = fibonacciSphere(15);

const meta: Array<Omit<Constellation, 'position'>> = [
  // ─── ROZUM ───────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: 'dostrojenie-wszechswiata',
    name: 'Wszechświat dostrojony co do joty',
    shortName: 'Dostrojenie',
    teaser:
      'Stałe fizyczne wszechświata są dobrane tak precyzyjnie, że gdyby choć jedna była inna o ułamek procenta, życie byłoby niemożliwe. To argument, który nawrócił współzałożyciela Wikipedii.',
    category: 'rozum',
    hue: 220,
    colorHsl: 'hsl(220, 80%, 55%)',
    starCount: 65,
  },
  {
    id: 2,
    slug: 'historycznosc-zmartwychwstania',
    name: 'Pusty grób, którego nikt nie zaprzeczył',
    shortName: 'Zmartwychwstanie',
    teaser:
      'Pięć faktów minimalnych dotyczących śmierci Jezusa jest dziś uznanych przez ponad 75% historyków — także krytycznych. Pytanie nie brzmi *czy się coś stało*, lecz *jakie wyjaśnienie tych faktów jest najmocniejsze*.',
    category: 'rozum',
    hue: 45,
    colorHsl: 'hsl(45, 90%, 60%)',
    starCount: 80,
  },
  {
    id: 3,
    slug: 'proroctwa-mesjanskie',
    name: 'Iz 53 — rysopis sprzed 200 lat',
    shortName: 'Proroctwa',
    teaser:
      'Wielki Zwój Izajasza z Qumran zawiera cały Izajasza 53 — opis krzyżowanego, milczącego Sługi Pańskiego — co najmniej 150 lat przed Jezusem. Skeptycki argument „chrześcijanie sfałszowali tekst" upadł w 1947.',
    category: 'rozum',
    hue: 280,
    colorHsl: 'hsl(280, 60%, 50%)',
    starCount: 50,
  },
  {
    id: 4,
    slug: 'archeologia-biblii',
    name: '53 imion z Biblii w gruzach i pieczęciach',
    shortName: 'Archeologia',
    teaser:
      'Pomijając teologię — 53 osoby ze Starego i ponad 30 z Nowego Testamentu zostały zidentyfikowane na pozabiblijnych inskrypcjach z czasów ich życia. To historia, nie mit.',
    category: 'rozum',
    hue: 35,
    colorHsl: 'hsl(35, 65%, 45%)',
    starCount: 55,
  },
  {
    id: 5,
    slug: 'nawrocenia-intelektualistow',
    name: 'Założyciel Wikipedii klęka',
    shortName: 'Nawrócenia',
    teaser:
      'Larry Sanger, doktor filozofii analitycznej i 35-letni ateista, w lutym 2025 publikuje wypracowanie wyjaśniające, dlaczego *właśnie metodyczny sceptycyzm* zaprowadził go do Chrystusa.',
    category: 'rozum',
    hue: 195,
    colorHsl: 'hsl(195, 70%, 50%)',
    starCount: 60,
  },
  {
    id: 6,
    slug: 'wielkie-debaty',
    name: 'Trzy godziny, dwa umysły, jedno pytanie',
    shortName: 'Debaty',
    teaser:
      'Kiedy najlepsi ateiści świata stanęli twarzą w twarz z najlepszymi apologetami, kto poradził sobie lepiej? Debaty są na YouTube, w pełnej długości. Nie czytaj recenzji — oceń sam.',
    category: 'rozum',
    hue: 0,
    colorHsl: 'hsl(0, 70%, 45%)',
    starCount: 45,
  },
  {
    id: 7,
    slug: 'argument-cywilizacyjny',
    name: 'Dlaczego nawet ateiści wciąż myślą po chrześcijańsku',
    shortName: 'Cywilizacja',
    teaser:
      'Tom Holland — laicki historyk — pokazuje, że prawa człowieka, równość, sumienie, a nawet *sekularyzm* są wynalazkami chrześcijańskimi. Po napisaniu książki sam zaczął chodzić do kościoła.',
    category: 'rozum',
    hue: 15,
    colorHsl: 'hsl(15, 55%, 40%)',
    starCount: 70,
  },
  // ─── DOŚWIADCZENIE ───────────────────────────────────────────────────────
  {
    id: 8,
    slug: 'cuda-eucharystyczne',
    name: 'Hostia z Sokółki — serce człowieka w agonii',
    shortName: 'Eucharystia',
    teaser:
      '2008, Podlasie. Dwóch profesorów UMB w mikroskopie elektronowym orzeka: tkanka mięśnia sercowego człowieka w agonii, splątana z chlebem w sposób niemożliwy do osiągnięcia ludzkimi środkami.',
    category: 'doswiadczenie',
    hue: 50,
    colorHsl: 'hsl(50, 95%, 55%)',
    starCount: 75,
  },
  {
    id: 9,
    slug: 'cuda-maryjne-lourdes',
    name: 'Lourdes — 72 cuda, których medycyna nie wyjaśnia',
    shortName: 'Lourdes',
    teaser:
      '16 kwietnia 2025: Międzynarodowy Komitet Medyczny ogłasza 72. cud — uzdrowienie z nieuleczalnego stwardnienia bocznego po 16 latach badań i głosowaniu 21 lekarzy.',
    category: 'doswiadczenie',
    hue: 210,
    colorHsl: 'hsl(210, 75%, 65%)',
    starCount: 60,
  },
  {
    id: 10,
    slug: 'mistyka-stygmaty',
    name: 'Stygmaty Padre Pio — 50 lat krwi',
    shortName: 'Stygmaty',
    teaser:
      'Padre Pio nosił otwarte, krwawiące rany przez 50 lat — bez infekcji, bez bliznowacenia, bez naukowego wyjaśnienia. Zniknęły bez śladu kilka godzin przed jego śmiercią w 1968.',
    category: 'doswiadczenie',
    hue: 355,
    colorHsl: 'hsl(355, 75%, 35%)',
    starCount: 45,
  },
  {
    id: 11,
    slug: 'wspolczesne-uzdrowienia',
    name: 'Marcin ze Skierniewic kładzie ręce',
    shortName: 'Uzdrowienia',
    teaser:
      'Polski ewangelizator, dziesiątki tysięcy ludzi, świadectwa weryfikowane medycznie. To samo dzieje się w Mozambiku — przebadane przez Indiana University, opublikowane w *Southern Medical Journal*.',
    category: 'doswiadczenie',
    hue: 140,
    colorHsl: 'hsl(140, 65%, 45%)',
    starCount: 55,
  },
  {
    id: 12,
    slug: 'swiadectwa-znanych',
    name: 'Lewandowski klęka. LaBeouf też',
    shortName: 'Świadectwa znanych',
    teaser:
      'Lewandowski od 2012: „Jestem katolikiem". Shia LaBeouf po roli Padre Pio przyjął bierzmowanie w sylwestra 2024. Misiek Koterski po 21 latach nałogu — 11 lat trzeźwości. Ludzie, którzy mają wszystko, wybierają wiarę.',
    category: 'doswiadczenie',
    hue: 330,
    colorHsl: 'hsl(330, 60%, 55%)',
    starCount: 55,
  },
  {
    id: 13,
    slug: 'nde-i-sny-muzulmanow',
    name: 'Muzułmanie śnią Jezusa',
    shortName: 'Sny i NDE',
    teaser:
      'Iran ma najszybciej rosnący Kościół chrześcijański na świecie — w kraju, gdzie konwersja oznacza karę śmierci. Setki tysięcy Persów twierdzą, że Jezus przyszedł do nich w *śnie*.',
    category: 'doswiadczenie',
    hue: 255,
    colorHsl: 'hsl(255, 50%, 50%)',
    starCount: 50,
  },
  {
    id: 14,
    slug: 'egzorcyzmy-demoniczne',
    name: '70 000 egzorcyzmów — zło istnieje',
    shortName: 'Egzorcyzmy',
    teaser:
      'Ks. Gabriele Amorth, oficjalny egzorcysta Rzymu, w ciągu życia przeprowadził ok. 70 000 egzorcyzmów. Raportowane zjawiska — xenoglossia, ujawnianie ukrytych grzechów — psychiatrii nie da się.',
    category: 'doswiadczenie',
    hue: 20,
    colorHsl: 'hsl(20, 30%, 25%)',
    starCount: 40,
  },
  {
    id: 15,
    slug: 'przebudzenie-2025',
    name: 'Cicha rewolucja — Francja chrzci 10 384 dorosłych',
    shortName: 'Przebudzenie 2025',
    teaser:
      'Wielka Sobota 2025: Francja chrzci ponad 10 000 dorosłych — wzrost 45% rdr, podwojenie w 2 lata, 42% w wieku 18–25. To się dzieje w najbardziej zsekularyzowanym kraju Europy.',
    category: 'doswiadczenie',
    hue: 165,
    colorHsl: 'hsl(165, 55%, 50%)',
    starCount: 65,
  },
];

export const CONSTELLATIONS: Constellation[] = meta.map((m, i) => ({
  ...m,
  position: positions[i],
}));

export function constellationBySlug(slug: string): Constellation | undefined {
  return CONSTELLATIONS.find(c => c.slug === slug);
}
