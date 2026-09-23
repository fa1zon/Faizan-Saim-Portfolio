/**
 * Single source of truth for every piece of copy and media on the site.
 * Swap the photographs in /public/work and /public/media, edit the entries
 * below, and the whole portfolio updates.
 */

export const site = {
  /** Shown in the header wordmark. */
  wordmark: "FAIZ ARCHIVES",
  name: "Faizan Saim",
  role: "Photographer & Filmmaker",
  avatar: "/media/avatar.jpg",
  email: "hello@faizan.studio",
  socials: [{ label: "Instagram", href: "https://www.instagram.com/faizarchives/", icon: "instagram" }],
  tagline: "Catch me in the archives. Let's connect.",
  hero: {
    heading: ["Moments", "In Motion"],
    lead:
      "Hi, I’m Faizan. Faiz Archives is my personal repository, a place to document my process and share selected work over time. Here, you’ll find a curated look at the projects and ideas I’m currently building and exploring.",
  },
  journalTeaser: {
    heading: ["Stories", "Behind The Lens"],
    cta: "Enter journal",
  },
  connect: {
    heading: "Let's Connect",
  },
} as const;

/** Newest trip first — that's the order the archive lists them in. */
export const categories = ["ALL", "ARUBA", "TURKEY"] as const;

export type Category = (typeof categories)[number];

export type Work = {
  slug: string;
  title: string;
  category: Exclude<Category, "ALL">;
  cover: string;
};

export const works: Work[] = [
  { slug: "aruba-dusk", title: "Dusk", category: "ARUBA", cover: "/work/aruba.jpg" },
  { slug: "aruba-shore", title: "Shore", category: "ARUBA", cover: "/work/aruba-1.jpg" },
  { slug: "aruba-water", title: "Water", category: "ARUBA", cover: "/work/aruba-2.jpg" },
  { slug: "aruba-sand", title: "Sand", category: "ARUBA", cover: "/work/aruba-3.jpg" },

  { slug: "balloons", title: "Balloons", category: "TURKEY", cover: "/hero/balloons.jpg" },
  { slug: "balloons-dawn", title: "Dawn", category: "TURKEY", cover: "/archive/balloons-dawn.jpg" },
  { slug: "balloon-valley", title: "Valley", category: "TURKEY", cover: "/archive/balloon-valley.jpg" },
  { slug: "doorway", title: "Doorway", category: "TURKEY", cover: "/archive/doorway.jpg" },
  { slug: "mosque", title: "Mosque", category: "TURKEY", cover: "/hero/mosque.jpg" },
  { slug: "wing", title: "Wing", category: "TURKEY", cover: "/hero/wing.jpg" },
  { slug: "cat", title: "Cat", category: "TURKEY", cover: "/archive/cat.jpg" },
];

/** Archive landing page: one tile per album, cover borrowed from its first photo. */
export const collections = (categories.filter((c) => c !== "ALL") as Exclude<Category, "ALL">[]).map((category) => {
  const items = works.filter((w) => w.category === category);
  return { category, count: items.length, cover: items[0].cover };
});

export const worksByCategory = (category: Exclude<Category, "ALL">) => works.filter((w) => w.category === category);

/** Stock frames still standing in for the publication and journal artwork. */
const wide = (n: number) => `/media/wide-${n}.jpg`;

export type Publication = {
  slug: string;
  outlet: string;
  title: string;
  cover: string;
  excerpt: string;
  body: string[];
};

export const publications: Publication[] = [
  {
    slug: "wander-magazine-frames-of-stillness",
    outlet: "Wander Magazine",
    title: "Frames of Stillness",
    cover: wide(1),
    excerpt:
      "This shot came from waiting for the light, not chasing it. Seeing it run across two pages in Wander felt like the patience finally paying off.",
    body: [
      "This shot came from waiting for the light, not chasing it. I'd returned to the same corner three mornings in a row before the shadow finally fell where I wanted it. Seeing it run across two pages in Wander felt like the patience finally paying off.",
      "It represents something I keep coming back to: that a still frame can hold more movement than a moving one, if you're willing to let it sit.",
    ],
  },
  {
    slug: "grain-and-light-the-quiet-frame",
    outlet: "Grain & Light",
    title: "The Quiet Frame",
    cover: wide(2),
    excerpt:
      "A cover feature built around restraint — one subject, one light source, and enough negative space to let the frame breathe.",
    body: [
      "A cover feature built around restraint — one subject, one light source, and enough negative space to let the frame breathe. Grain & Light chose this image to open their issue on minimalism in portraiture, which is exactly the territory I keep returning to.",
      "Less has always told me more. This was one of the clearest examples of that idea landing on someone else's page instead of just my own.",
    ],
  },
  {
    slug: "aperture-journal-portraits-in-natural-light",
    outlet: "Aperture Journal",
    title: "Portraits In Natural Light",
    cover: wide(3),
    excerpt:
      "No strobes, no reflectors — just a window and a willing subject. Aperture Journal ran this as the lead image in a feature on available light.",
    body: [
      "No strobes, no reflectors — just a window and a willing subject. Aperture Journal ran this as the lead image in a feature on available light, and it's close to the way I actually shoot most days.",
      "I keep a minimal kit for exactly this reason: fewer decisions on set means more attention on the person in front of the lens.",
    ],
  },
  {
    slug: "lens-collective-stories-without-words",
    outlet: "Lens Collective",
    title: "Stories Without Words",
    cover: wide(4),
    excerpt:
      "A narrative series that leans entirely on gesture and light instead of caption. Lens Collective picked this frame to close the piece.",
    body: [
      "A narrative series that leans entirely on gesture and light instead of caption. Lens Collective picked this frame to close the piece, which felt right — it's the quietest image in the set, and the one that says the most.",
      "I build a lot of my personal work this way: sequences that read like a short film, minus the dialogue.",
    ],
  },
];

export type JournalPost = {
  slug: string;
  title: string;
  cover: string;
  excerpt: string;
  body: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "notes-on-natural-light",
    title: "Notes On Natural Light",
    cover: wide(5),
    excerpt:
      "Why I stopped carrying strobes on most shoots, and what changed when the only light source was the one already in the room.",
    body: [
      "Why I stopped carrying strobes on most shoots, and what changed when the only light source was the one already in the room.",
      "A strobe gives you control, but control isn't always the point. Natural light forces a kind of honesty into a frame — it moves with the day, it's never quite the same twice, and it makes you work around it instead of the other way around. Most of what I shoot now is built entirely around finding the right window, the right hour, the right wall to bounce off of.",
      "It's slower. It also looks more like the way I actually remember a place feeling.",
    ],
  },
  {
    slug: "why-i-shoot-with-one-lens",
    title: "Why I Shoot With One Lens",
    cover: wide(6),
    excerpt: "A case for constraint: what a single focal length teaches you that a bag full of glass never will.",
    body: [
      "A case for constraint: what a single focal length teaches you that a bag full of glass never will.",
      "When you can't zoom, you move. When you can't switch lenses, you learn exactly how close is too close and how far is too far for the story you're telling. I spent a year shooting almost everything on one prime, and it changed how I compose before I even lift the camera.",
      "The gear stopped being a decision. The frame became the only one that mattered.",
    ],
  },
  {
    slug: "behind-a-quiet-portrait-series",
    title: "Behind A Quiet Portrait Series",
    cover: wide(7),
    excerpt: "The making of a portrait project shot entirely without direction — just conversation and a camera left running.",
    body: [
      "The making of a portrait project shot entirely without direction — just conversation and a camera left running.",
      "I didn't pose a single frame in this series. Instead I'd sit with someone, talk for twenty minutes, and only pick up the camera once they'd forgotten it was there. Most of the usable frames came in the last five minutes of every session, after the self-consciousness wore off.",
    ],
  },
  {
    slug: "the-case-for-slowing-down",
    title: "The Case For Slowing Down",
    cover: wide(8),
    excerpt: "On choosing fewer frames, fewer shoots, and fewer clients — and why the work got better because of it.",
    body: [
      "On choosing fewer frames, fewer shoots, and fewer clients — and why the work got better because of it.",
      "For a while I measured a good month by how many shoots filled the calendar. Now I measure it by how many of those frames I'd still want to look at in five years. That number goes up when I take on less, not more.",
    ],
  },
  {
    slug: "from-behind-the-lens-a-filmmaking-detour",
    title: "From Behind The Lens: A Filmmaking Detour",
    cover: wide(1),
    excerpt: "What a short film taught a photographer about pacing, sound, and the frames that don't need to move at all.",
    body: [
      "What a short film taught a photographer about pacing, sound, and the frames that don't need to move at all.",
      "Cutting a short film forced me to sit with a single image far longer than a still ever demands. It made me a more patient photographer — more willing to wait a beat before pressing the shutter, because I'd just spent a month learning what a held beat can do.",
    ],
  },
  {
    slug: "sneak-peek-a-new-series-in-the-works",
    title: "Sneak Peek: A New Series In The Works",
    cover: wide(2),
    excerpt: "A first look at a long-form personal project, two years and counting, still without a title.",
    body: [
      "A first look at a long-form personal project, two years and counting, still without a title.",
      "Some work isn't ready to be named yet. This one started as a handful of frames shot on a single trip and has quietly grown into something bigger. More soon — for now, a few unreleased stills from where it currently stands.",
    ],
  },
];

export const nextJournalPost = (slug: string) => {
  const i = journalPosts.findIndex((p) => p.slug === slug);
  return journalPosts[(i + 1) % journalPosts.length];
};

export type Workshop = {
  title: string;
  season: string;
};

export const workshops: Workshop[] = [
  { title: "Natural Light Portraiture", season: "Fall 2026" },
  { title: "Minimal Composition Masterclass", season: "Winter 2025" },
  { title: "Editing For Emotion: A Colour Grading Workshop", season: "Summer 2025" },
  { title: "Documentary Storytelling On Location", season: "Spring 2025" },
  { title: "Intro To Cinematic Motion For Photographers", season: "Spring 2024" },
];

export type Interview = {
  slug: string;
  outlet: string;
  title: string;
  quote: string;
  body: string[];
};

export const interviews: Interview[] = [
  {
    slug: "aperture-talks-finding-stillness-in-motion",
    outlet: "Aperture Talks",
    title: "Finding Stillness In Motion",
    quote: "I'm not trying to freeze a moment. I'm trying to find the one frame where it was already still.",
    body: [
      "I'm not trying to freeze a moment. I'm trying to find the one frame where it was already still.",
      "Most of what I shoot is in motion until it isn't — a gesture, a walk, a conversation. The job is watching closely enough to catch the half-second where everything briefly settles.",
    ],
  },
  {
    slug: "the-creative-process-podcast-why-less-tells-more",
    outlet: "The Creative Process Podcast",
    title: "Why Less Tells More",
    quote: "Every prop I remove from a frame is one more thing the light gets to do instead.",
    body: [
      "Every prop I remove from a frame is one more thing the light gets to do instead.",
      "I used to think a good frame needed more in it — more context, more setting. Now most of my favourite work is the opposite: a single subject, a single light, and nothing else competing for attention.",
    ],
  },
  {
    slug: "frame-and-focus-magazine-photographing-real-moments",
    outlet: "Frame & Focus Magazine",
    title: "Photographing Real Moments",
    quote: "If someone's aware of the camera, I haven't gotten the shot yet.",
    body: [
      "If someone's aware of the camera, I haven't gotten the shot yet.",
      "Candour is the whole project. I'd rather wait twenty extra minutes for someone to relax back into themselves than direct a single expression.",
    ],
  },
  {
    slug: "lens-notes-from-stills-to-motion",
    outlet: "Lens Notes",
    title: "From Stills To Motion: A Filmmaker's Eye",
    quote: "A short film is just a few hundred stills that refused to sit still.",
    body: [
      "A short film is just a few hundred stills that refused to sit still.",
      "Moving into filmmaking didn't change what I look for — it just gave the same eye more time to hold a frame before it has to move on.",
    ],
  },
  {
    slug: "studio-sessions-building-trust-behind-the-camera",
    outlet: "Studio Sessions",
    title: "Building Trust Behind The Camera",
    quote: "The best gear I own is twenty minutes of conversation before I ever lift the camera.",
    body: [
      "The best gear I own is twenty minutes of conversation before I ever lift the camera.",
      "People photograph the way they feel in the room. Most of my job happens before the first frame — making the room feel like somewhere they can forget I'm there.",
    ],
  },
];

export const contact = {
  headline: "Every project starts with a conversation, let's bring your vision to life.",
  coffee: "Grab a coffee & let's talk about the craft.",
  faqs: [
    {
      q: "What kind of gear do you usually shoot with?",
      a: "I keep my setup minimal to stay agile — usually a compact mirrorless body and a single fast prime lens. It lets me move quietly and stay ready for the light, whatever the conditions.",
    },
    {
      q: "Do you shoot both photo and video?",
      a: "Yes. Photography is the foundation, but I take on short-form film work too — the same eye for light and unposed moments, just given more time to move.",
    },
    {
      q: "Do you sell prints or license your images?",
      a: "Select images from the archive are available as prints, and specific photographs can be licensed for editorial or commercial use. Reach out through the form with the details.",
    },
  ],
};
