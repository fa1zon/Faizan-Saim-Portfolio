# Photography portfolio

A dark, image-first portfolio built from scratch after the Aerra template: a full-bleed
work grid, per-project horizontal galleries, and the same set of motion details —
rolling text, converging card captions, staggered grid entrance, glass chrome, a
and a custom cursor.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Motion (Framer Motion) · Lenis

```bash
npm install
npm run dev     # http://localhost:3111
npm run build   # production build
```

## Making it yours

Everything editable lives in one file: [`src/data/site.ts`](src/data/site.ts).

| What | Where |
| --- | --- |
| Wordmark, name, email, socials | `site` |
| About and Contact copy | `site.about`, `site.contact` |
| Filter list | `categories` |
| Projects (title, date, category, client, blurb, gallery) | `seeds` |

### Swapping in real photographs

The images shipped here are placeholders from [picsum.photos](https://picsum.photos).

1. Drop grid covers into `public/work/` — one file per project, named after its slug
   (`public/work/volley.jpg`). Portrait, roughly **3:4**, around 900×1200 is plenty.
2. Drop the wide frames used inside a project into `public/media/` and point each
   project's `gallery` array at them. Landscape, roughly **3:2**.
3. Replace `public/media/about.jpg`, `public/media/contact.jpg`, and
   `public/media/avatar.jpg`.

Each project's `gallery` is just an array of paths — add or remove entries and the
horizontal strip grows or shrinks to match. The first frame is rendered as a narrow
3:4 plate, the rest run 3:2, exactly as in the reference.

### Categories

`categories` in `src/data/site.ts` drives the bottom-centre filter. Every project's
`category` must be one of them (`ALL` is the reset). They are named by genre here;
rename them to anything — colours, years, clients — and the filter follows.

## Layout notes

- The grid is five columns at ≥1280px, dropping to four, three, then two on phones,
  with a 6px gutter that also forms the page margin.
- Fixed chrome — header, identity chip, filter bar — sits above the content and is
  drawn on a 50%-opaque `#0c0e0f` with a 10px backdrop blur; the dropdown and
  details panels use a heavier 70% fill so they stay readable over bright photos.
- `src/components/ProgressiveBlur.tsx` reproduces the reference's ramped blur at
  the foot of the page. It is **not rendered** — the photographs read better
  sharp. Add `<ProgressiveBlur />` back into `src/app/layout.tsx` to enable it.
- Colour and type tokens live in `src/app/globals.css` and `tailwind.config.ts`.
  Display type is Switzer (loaded from Fontshare); body copy is Figtree via `next/font`.

## How the animations are built

Entrances are **CSS animations, not JavaScript ones** — see the `enter-*` classes in
`src/app/globals.css`. This matters: a CSS animation starts on the first paint, so
server-rendered content is never left at `opacity: 0` while the bundle downloads,
hydrates, or waits on `requestAnimationFrame`. Every keyframe set declares only
`from`, and the resting style is the visible one, so an animation that never runs
leaves the element already in place. Turn JavaScript off entirely and the whole site
still renders.

Motion (Framer Motion) is kept only for interactions that a click opens — the menu,
the category dropdown, the project details card. Those cannot strand content on load
because nothing renders them until you ask.

Tiles past the first two rows are revealed on scroll by `useScrollReveal`, which hides
an element only once JavaScript is running and only while it is still below the fold,
so there is nothing to see if that never happens.

## Accessibility

- Every rolling-text label carries a plain, screen-reader-only copy of its text.
- The reduced-motion media query collapses every entrance, and the custom cursor and
  inertial scroll both switch off too.
- The custom cursor is skipped entirely on touch pointers.

## Deploying

Push to a Git host and import on Vercel — no configuration needed. `npm run build`
prerenders every route, including all 35 project pages.
