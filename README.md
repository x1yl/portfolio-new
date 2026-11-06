# Kevin Zheng — Portfolio

A small, typography-led portfolio for Kevin Zheng: mechatronics and robotics
student at Brooklyn Technical High School, FTC programmer, developer, and vice
president of BTHS Action.

The design is intended to read like a printed page — Fraunces, Inter, and
JetBrains Mono, a paper texture, and a hand-drawn signature. The content is
built for recruiters: project case studies, an HTML résumé, and a direct
contact route.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Nodemailer for the contact form
- Cloudflare Turnstile for spam protection

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev    # start the development server
npm run build  # production build
npm run start  # run the production build
npm run lint   # eslint
```

## Environment variables

Create `.env.local` with the values used by the contact form:

```bash
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_TO=
CONTACT_FROM=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

The contact form will show a verification error if Turnstile is not
configured. The local `.env.local` uses Cloudflare's always-pass test key, which
displays a test warning on the widget — replace both Turnstile values with
production keys before deploying.

## Structure

```
app/
  about/                 bio, experience, education, skills
  api/contact/           contact form handler (SMTP + Turnstile)
  components/            SiteShell, theme toggle, music player, signature
  contact/               contact page and client form
  lib/                   site config, project data, résumé data
  projects/              project index and case studies
  resume/                HTML résumé with print styles
  globals.css            design tokens, motion, print styles
  layout.tsx             fonts, metadata, JSON-LD
  manifest.ts            web app manifest
  not-found.tsx          404 page
  opengraph-image.tsx    social sharing image
  robots.ts              robots.txt
  sitemap.ts             sitemap.xml
public/
  projects/              project screenshots (WebP)
  music/                 playlist and audio clips
assets/
  background-original.png  original 80 MB background (not served)
```

## Notes

- `public/background.webp` is the optimized, served background. The original
  source image lives in `assets/` so it is not included in the deployment.
- Project case studies are driven by `app/lib/projects.ts`. Add a project there
  and it will appear on the index, generate a case-study route, and be included
  in the sitemap.
- The résumé page uses `app/lib/resume.ts`; the downloadable PDF remains at
  `public/Kevin Zheng Resume.pdf`.
- Screenshots in `public/projects/` were captured from the live sites (and
  from a local production build for this portfolio) and compressed to WebP.

## Credits

- Signature SVG generated with [SVG Artista](https://svgartista.net/).
- Music player inspired by [3kh0's simple music player](https://github.com/3kh0/simple-music-player).
- Music by [25mxfu](https://25mxfu.bandcamp.com/).
