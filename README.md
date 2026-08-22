# Hadeer Mouwad — Photography Portfolio

A Next.js (App Router) portfolio built around film/darkroom vernacular:
sprocket-hole rails down the page edges, a viewfinder-style hero with an
EXIF/HUD readout, a "contact sheet" photo grid, and a "workprint" BTS section
styled like a video contact sheet with timecodes and a tally light.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. (First build needs internet access once, to
fetch the Google Fonts used — Anton, Inter, and JetBrains Mono.)

## Structure

```
app/
  layout.tsx        Fonts + global chrome (grain overlay, sprocket rails)
  page.tsx           Assembles the sections below
  globals.css        Design tokens (colors, the sprocket-rail pattern, etc.)
components/
  Nav.tsx            Top nav
  Hero.tsx           Viewfinder hero with HUD/EXIF readout
  Gallery.tsx         "Contact sheet" — your PHOTOS section, with a lightbox
  BTS.tsx             "Workprint" — your BEHIND THE SCENES section
  About.tsx           Photographer statement + kit list
  Footer.tsx          Contact / end-of-roll footer
  FilmRail.tsx         Decorative sprocket-hole rails
  PlaceholderFrame.tsx  Stand-in art used everywhere until you drop in photos
  ArchiveFilter.tsx    /archive page's source → type filter, grid, pagination
lib/
  archivePhotos.ts    Every photo lives here — home Gallery and /archive both
                       read from this one file (see below)
  bts.ts             Data for the BTS grid — add/edit entries here
  useReveal.ts        Scroll-reveal hook used by the grids
app/archive/page.tsx  "Full Archive" page: filter by camera/phone, then by
                       type, paginated 8 per page
```

## Adding your own photos

All photos — home page and archive — live in one place: `lib/archivePhotos.ts`.
Each entry looks like:

```ts
{ id: "c1", frame: "101C", source: "camera", type: "Portrait",
  caption: "Studio, single softbox", path: "public/photos/101c.jpg",
  tone: "rust", featured: true, span: "tall" }
```

- `source`: `"camera"` or `"phone"` — powers the first filter step on `/archive`.
- `type`: any string (`"Landscape"`, `"Animals"`, etc.) — powers the second
  filter step, scoped to whichever source is selected.
- `featured`: set this on your best shots. **Only featured photos show up in
  the home page gallery** — everything else still appears in `/archive`.
- `span`: `"tall" | "wide" | "square"`, only used by the home gallery's
  masonry layout (ignored on `/archive`).

To add a shot: drop the file into `public/photos/`, add an entry above with
its real `path`, and set `featured: true` if it belongs on the home page.

1. Drop image files into `public/photos/` (gallery/archive) or `public/bts/`
   (behind-the-scenes photos/video posters).
2. Update the `path` field to point at your file, e.g. `"/photos/002a.jpg"`.
3. Swap `<PlaceholderFrame path={...} .../>` for a real `<Image>` where you've
   added a file — e.g. in `components/Gallery.tsx`:

   ```tsx
   import Image from "next/image";
   // ...
   <Image src="/photos/002a.jpg" alt={photo.caption} fill className="object-cover" />
   ```

4. For real BTS video, swap the placeholder for a `<video>` tag (with
   `controls`, `muted`, `playsInline` as needed) or embed a YouTube/Vimeo
   player.

## The full archive page

`/archive` lists every photo in `lib/archivePhotos.ts` (not just the featured
ones), filterable by **Step 01 — Shot on** (camera/phone) then **Step 02 —
Type** (scoped to whichever source is selected), and paginated 8 photos per
page. Change the page size by editing `PAGE_SIZE` at the top of
`components/ArchiveFilter.tsx`.

## Customizing

- **Name, tagline, statement, contact info**: edit `Hero.tsx`, `About.tsx`,
  and `Footer.tsx` directly.
- **Colors**: all defined as CSS variables at the top of `app/globals.css`
  (`--color-ink`, `--color-safelight`, `--color-signal`, etc.) — change them
  once and the whole site updates.
- **Fonts**: set in `app/layout.tsx` via `next/font/google`. Anton is the
  display face, Inter is body text, JetBrains Mono is used for the
  EXIF/timecode-style labels.

## Deploy

Works out of the box on Vercel:

```bash
npx vercel
```

or any host that supports Next.js (Netlify, Cloudflare, a Node server, etc.).
