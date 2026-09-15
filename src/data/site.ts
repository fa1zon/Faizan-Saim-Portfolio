/**
 * Single source of truth for every piece of copy and media on the site.
 * Swap the photographs in /public/work and /public/media, edit the entries
 * below, and the whole portfolio updates.
 */

export const site = {
  /** Shown in the header pill and used for the rolling-text wordmark. */
  wordmark: "FAIZAN",
  /** Small superscript glyph that trails the wordmark. */
  wordmarkSuffix: "®",
  name: "Faizan Saim",
  role: "Photographer",
  avatar: "/media/avatar.jpg",
  email: "hello@faizan.studio",
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "X", href: "https://x.com", icon: "x" },
    { label: "Behance", href: "https://behance.net", icon: "behance" },
  ],
  about: {
    heading: "Meet Faizan",
    media: "/media/about.jpg",
    lead: "I'm **Faizan Saim**, a photographer and filmmaker exploring the quiet power of light, movement, and emotion.",
    body: [
      "I believe that less tells more. Every frame is an invitation to slow down, to notice what's real, and to connect with the beauty of the ordinary. Using natural light and minimal composition, I aim to create imagery that feels effortless yet deeply intentional.",
      "I collaborate with artists, brands, and individuals who value authenticity and visual storytelling. From portraits to short films, I build stories that move softly but stay with you.",
    ],
  },
  contact: {
    heading: "Get in Touch",
    media: "/media/contact.jpg",
    lead: "I collaborate with brands, artists, and individuals to create refined, cinematic imagery. Reach out to discuss your next project or request a quote.",
  },
} as const;

export const categories = [
  "ALL",
  "PORTRAIT",
  "STREET",
  "STUDIO",
  "NATURE",
  "TRAVEL",
  "EDITORIAL",
  "ARCHITECTURE",
] as const;

export type Category = (typeof categories)[number];

export type Work = {
  slug: string;
  title: string;
  date: string;
  category: Exclude<Category, "ALL">;
  cover: string;
  type: string;
  client: string;
  description: string;
  gallery: string[];
};

const wide = (n: number) => `/media/wide-${n}.jpg`;

type Seed = [slug: string, title: string, date: string, category: Exclude<Category, "ALL">, type: string, client: string, description: string];

const seeds: Seed[] = [
  ["aruba", "Aruba", "08/2026", "TRAVEL", "Personal", "Self-initiated", "Palm trees framing a beachfront sunset, shot at dusk as the sky fades from amber to indigo over the water."],
  ["citrus", "Citrus", "06/2026", "STUDIO", "Commercial", "Sela", "A study in hard light and saturated colour, built around a single fruit and the shadow it throws."],
  ["drift", "Drift", "04/2026", "STREET", "Editorial", "Noon", "Long-lens frames of a figure moving through a corridor of afternoon light."],
  ["mojito", "Mojito", "03/2026", "STUDIO", "Commercial", "Verde", "Beverage work shot against heavy velvet, leaning on condensation and rim light."],
  ["retreat", "Retreat", "02/2026", "ARCHITECTURE", "Personal", "Self-initiated", "Empty seating in a courtyard garden, photographed across a single afternoon."],
  ["latte", "Latte", "11/2025", "STUDIO", "Commercial", "Roam", "Layered milk and coffee, lit to hold every gradient between cream and amber."],
  ["echo", "Echo", "11/2025", "PORTRAIT", "Editorial", "Aurelia", "Double-exposure portraiture built in-camera, two frames on one length of film."],
  ["cobalt", "Cobalt", "10/2025", "PORTRAIT", "Editorial", "Aurelia", "A cool-toned portrait set against a wall of sunlit yellow."],
  ["perch", "Perch", "09/2025", "NATURE", "Personal", "Self-initiated", "Six mornings on a ridge waiting for one bird to land in the right light."],
  ["bloom", "Bloom", "08/2025", "PORTRAIT", "Editorial", "Fleur", "Florals held close to the face until the two stop reading as separate things."],
  ["slice", "Slice", "07/2025", "STUDIO", "Commercial", "Sela", "Backlit cross-sections, shot on a light table with a macro lens."],
  ["canvas", "Canvas", "06/2025", "ARCHITECTURE", "Personal", "Self-initiated", "Interiors reduced to plane, edge, and the line where one colour meets another."],
  ["gaze", "Gaze", "05/2025", "PORTRAIT", "Editorial", "Noon", "Close portraiture at a fixed distance, one lens, one light, no retouching."],
  ["pour", "Pour", "04/2025", "STUDIO", "Commercial", "Roam", "High-speed capture of liquid mid-fall, frozen at 1/8000."],
  ["ember", "Ember", "03/2025", "TRAVEL", "Personal", "Self-initiated", "The last twenty minutes of light across a desert road, shot over two weeks."],
  ["dune", "Dune", "02/2025", "TRAVEL", "Editorial", "Atlas", "Wind-shaped ridgelines photographed from low angles at first light."],
  ["veil", "Veil", "01/2025", "PORTRAIT", "Editorial", "Fleur", "Fabric and skin under a single diffused source."],
  ["quartz", "Quartz", "12/2024", "STUDIO", "Commercial", "Mineral", "Product work for a stone brand, built around reflection and refraction."],
  ["atlas", "Atlas", "11/2024", "TRAVEL", "Personal", "Self-initiated", "A road series made between cities, mostly from the passenger seat."],
  ["linen", "Linen", "10/2024", "STUDIO", "Commercial", "Household", "Texture-led still life for a textile label, lit to keep every weave legible."],
  ["halo", "Halo", "09/2024", "PORTRAIT", "Editorial", "Aurelia", "Backlit portraits where the subject is defined entirely by its outline."],
  ["prism", "Prism", "08/2024", "STUDIO", "Personal", "Self-initiated", "Refracted light bent through glass onto a paper backdrop."],
  ["nocturne", "Nocturne", "07/2024", "STREET", "Personal", "Self-initiated", "Night walks at long exposure, tripod on the pavement, shutter open."],
  ["cascade", "Cascade", "06/2024", "NATURE", "Editorial", "Atlas", "Moving water at slow shutter, printed large and grainy."],
  ["ridge", "Ridge", "05/2024", "NATURE", "Personal", "Self-initiated", "Ranges photographed at the moment the haze separates one layer from the next."],
  ["saffron", "Saffron", "04/2024", "TRAVEL", "Editorial", "Noon", "A market series carried by one colour repeating through every frame."],
  ["marble", "Marble", "03/2024", "ARCHITECTURE", "Commercial", "Mineral", "Surface and seam, photographed square and straight on."],
  ["aurora", "Aurora", "02/2024", "NATURE", "Personal", "Self-initiated", "Four nights at altitude for eleven usable frames."],
  ["tide", "Tide", "01/2024", "NATURE", "Editorial", "Atlas", "The same stretch of shoreline at six different hours."],
  ["fable", "Fable", "12/2023", "EDITORIAL", "Editorial", "Fleur", "A narrative series built like a short film, shot across one location."],
  ["onyx", "Onyx", "11/2023", "STUDIO", "Commercial", "Mineral", "Low-key product photography where the subject emerges out of black."],
  ["clay", "Clay", "10/2023", "STUDIO", "Commercial", "Household", "Handmade ceramics under raking window light."],
  ["meridian", "Meridian", "09/2023", "ARCHITECTURE", "Editorial", "Atlas", "Facades photographed at noon, when the building casts almost nothing."],
  ["vellum", "Vellum", "08/2023", "EDITORIAL", "Editorial", "Fleur", "Paper, light, and the shadow of a hand — an essay about touch."],
  ["solstice", "Solstice", "07/2023", "TRAVEL", "Personal", "Self-initiated", "The longest day, documented hour by hour from one window."],
];

export const works: Work[] = seeds.map(([slug, title, date, category, type, client, description], i) => ({
  slug,
  title,
  date,
  category,
  type,
  client,
  description,
  cover: `/work/${slug}.jpg`,
  gallery: [
    `/work/${slug}.jpg`,
    wide((i % 8) + 1),
    wide(((i + 3) % 8) + 1),
    wide(((i + 6) % 8) + 1),
  ],
}));

export const getWork = (slug: string) => works.find((w) => w.slug === slug);

export const nextWork = (slug: string) => {
  const i = works.findIndex((w) => w.slug === slug);
  return works[(i + 1) % works.length];
};
