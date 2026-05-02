/**
 * The 15 constellations — single source of truth for the galaxy hero,
 * the bento map, the knowledge graph, and the argument longform pages.
 *
 * `centerPosition` is a Vector3-compatible tuple positioned on a Fibonacci
 * sphere of radius ~10 so the constellations spread evenly in 3D space.
 *
 * Slugs MUST match the file names in `src/content/arguments/*.mdx` and the
 * `slug` value in the Sanity `argument` document so all three sources can be
 * cross-referenced by slug alone.
 */

export type ConstellationCategory =
  | 'filozoficzny'
  | 'naukowy'
  | 'historyczny'
  | 'biblijny'
  | 'cudowny'
  | 'swiadectwa'
  | 'cywilizacyjny'
  | 'zasoby';

export interface Constellation {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  teaser: string;
  category: ConstellationCategory;
  /** HSL hue (0-360) used for the constellation's accent colour */
  hue: number;
  /** Number of stars rendered for this constellation */
  starCount: number;
  /** Position on the unit sphere — multiplied by radius in renderer */
  position: [number, number, number];
}

/**
 * Generate evenly distributed points on a unit sphere using the Fibonacci
 * spiral. Stable, deterministic, no clustering.
 */
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
  { id: 1,  slug: 'filozofia',              name: 'Argumenty filozoficzne za istnieniem Boga',     shortName: 'Filozofia',              teaser: 'Pięć dróg Akwinaty, kosmologiczny argument Kalam, modalny argument Plantingi.', category: 'filozoficzny', hue: 250, starCount: 70 },
  { id: 2,  slug: 'nauka-stworca',          name: 'Nauka wskazująca na Stwórcę',                   shortName: 'Nauka',                  teaser: 'Wielki Wybuch, fine-tuning stałych fizycznych, informacja w DNA.',         category: 'naukowy',     hue: 200, starCount: 65 },
  { id: 3,  slug: 'historycznosc-jezusa',   name: 'Historyczność Jezusa i Zmartwychwstania',       shortName: 'Historyczność Jezusa',   teaser: 'Cztery fakty minimalne Habermasa: śmierć, pusty grób, ukazania, narodziny Kościoła.', category: 'historyczny', hue: 30,  starCount: 80 },
  { id: 4,  slug: 'proroctwa-mesjanskie',   name: 'Proroctwa mesjańskie',                          shortName: 'Proroctwa',              teaser: 'Obliczenie Petera Stonera: prawdopodobieństwo spełnienia 8 proroctw = 10⁻¹⁷.', category: 'biblijny',    hue: 280, starCount: 50 },
  { id: 5,  slug: 'archeologia-biblii',     name: 'Archeologia potwierdzająca Biblię',             shortName: 'Archeologia',            teaser: 'Sadzawka Siloe, dom Piotra w Kafarnaum, Tunel Ezechiasza, ossuarium Kajfasza.', category: 'biblijny',    hue: 25,  starCount: 55 },
  { id: 6,  slug: 'cuda-eucharystyczne',    name: 'Cuda eucharystyczne',                           shortName: 'Cuda eucharystyczne',    teaser: 'Lanciano, Buenos Aires, Sokółka — krew typu AB, mięsień sercowy, brak wyjaśnienia.', category: 'cudowny',     hue: 0,   starCount: 75 },
  { id: 7,  slug: 'swieci-nierozlozone',    name: 'Święci o nierozłożonych ciałach',                shortName: 'Nierozłożone ciała',     teaser: 'Bernadeta Soubirous, Padre Pio, Charbel — ciała oparte prawom przyrody.',  category: 'cudowny',     hue: 320, starCount: 45 },
  { id: 8,  slug: 'uzdrowienia-wspolczesne',name: 'Współczesne uzdrowienia medycznie udokumentowane', shortName: 'Uzdrowienia',         teaser: 'Lourdes — 70 udokumentowanych przez Komitet Medyczny CMIL. Plus inne sanktuaria.', category: 'cudowny',     hue: 160, starCount: 60 },
  { id: 9,  slug: 'slawne-osoby-wierzace',  name: 'Sławne osoby wierzące',                          shortName: 'Sławne osoby',           teaser: 'Naukowcy, artyści, pisarze, którzy oddali życie wierze: Tolkien, Lewis, Lemaître.', category: 'swiadectwa', hue: 50,  starCount: 55 },
  { id: 10, slug: 'nawrocenia-ateistow',    name: 'Nawrócenia ateistów i intelektualistów',         shortName: 'Nawrócenia',             teaser: 'C.S. Lewis, Edith Stein, Jennifer Fulwiler, Leah Libresco — droga rozumu do Boga.', category: 'swiadectwa', hue: 100, starCount: 65 },
  { id: 11, slug: 'debaty-apologetyczne',   name: 'Debaty apologetyczne',                           shortName: 'Debaty',                 teaser: 'Craig vs. Hitchens, Lennox vs. Dawkins, Barron vs. Shapiro — argumenty, nie inwektywy.', category: 'historyczny', hue: 220, starCount: 40 },
  { id: 12, slug: 'nde-wizje',              name: 'NDE i wizje',                                    shortName: 'NDE i wizje',            teaser: 'Doświadczenia z pogranicza śmierci, masowe nawrócenia muzułmanów po wizjach Jezusa.', category: 'cudowny',     hue: 290, starCount: 50 },
  { id: 13, slug: 'argumenty-cywilizacyjne',name: 'Argumenty cywilizacyjne',                        shortName: 'Cywilizacja',            teaser: 'Tom Holland „Dominion": prawa człowieka, godność słabszych — owoce chrześcijaństwa.', category: 'cywilizacyjny', hue: 60, starCount: 70 },
  { id: 14, slug: 'spojnosc-biblii',        name: 'Spójność Biblii',                                shortName: 'Spójność Biblii',         teaser: '66 ksiąg, 40 autorów, 1500 lat — jedna spójna narracja o zbawieniu.',          category: 'biblijny',    hue: 40,  starCount: 55 },
  { id: 15, slug: 'zasoby-apologetyczne',   name: 'Zasoby apologetyczne',                           shortName: 'Zasoby',                 teaser: 'Książki, kanały, podcasty — kanon nowoczesnej apologetyki katolickiej.',    category: 'zasoby',     hue: 180, starCount: 35 },
];

export const CONSTELLATIONS: Constellation[] = meta.map((m, i) => ({
  ...m,
  position: positions[i],
}));

export function constellationBySlug(slug: string): Constellation | undefined {
  return CONSTELLATIONS.find(c => c.slug === slug);
}

export function constellationColor(c: Constellation, light = 60, sat = 70): string {
  return `hsl(${c.hue} ${sat}% ${light}%)`;
}
