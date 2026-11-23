# Implementation Plan: Birthday Website (Single Page, Native Web)

> This document is an instruction set for an AI web development agent. Follow the phases in order, respect the constraints, and make sure all acceptance criteria are met before declaring the work complete.

---

## 1. Project Overview

| Item | Detail |
|---|---|
| Goal | A birthday greeting website for the author's older sister |
| Type | Single page, static |
| Tech stack | **Native**: HTML5, CSS3, JavaScript (vanilla). **No frameworks, no build tools, no npm dependencies** |
| Photo content | **Only 1 photo** |
| Top priority | Highly responsive (320px to 1920px+), lightweight, fast loading |
| Site content language | Indonesian (visible text on the website stays in Bahasa Indonesia) |

---

## 2. Customizable Data

The agent MUST place the following data as easy-to-replace placeholders in a single location (a `CONFIG` object in `script.js`, or clearly marked text/attributes in `index.html`), and document how to change them in `README.md`.

| Variable | Placeholder example |
|---|---|
| `name` | `Kak [Nama]` |
| `age` | `25` (optional, may be left empty) |
| `birthdayDate` | `YYYY-MM-DD` (for the optional countdown feature) |
| `headline` | `Selamat Ulang Tahun!` |
| `message` | 2 to 4 short paragraphs of personal greeting (clearly marked lorem placeholder: `[GANTI PESAN]`) |
| `senderName` | `[Nama Adik]` |
| `photo` | `assets/foto.jpg` |

---

## 3. File Structure

```
birthday-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── foto.jpg          # sister's photo (single file), to be replaced by the owner
│   └── foto.webp         # optional WebP version
├── README.md             # customization & deployment guide
└── implementasiplan.md   # this document
```

Rule: **do not** add files or folders outside the structure above unless truly necessary.

---

## 4. Design Specification

### 4.1 Look and Feel
- Warm, cheerful, elegant, not over the top.
- Color palette (define as CSS custom properties in `:root`):
  - `--color-bg`: soft cream (e.g. `#FFF8F0`)
  - `--color-primary`: pink/coral (e.g. `#F26B8A`)
  - `--color-accent`: soft gold (e.g. `#F4B942`)
  - `--color-text`: dark gray (e.g. `#2D2A32`)
  - `--color-surface`: white/light cream for cards
- Typography:
  - Headings: an expressive display font (e.g. *Playfair Display* or *Pacifico* from Google Fonts), with `serif`/`cursive` fallback.
  - Body: a clean sans font (e.g. *Poppins* or *Nunito*), with `system-ui, sans-serif` fallback.
  - Use `font-display: swap` and load at most 2 font families.
- Use `clamp()` for fluid font sizes (e.g. `font-size: clamp(2rem, 6vw, 4.5rem)`).

### 4.2 Page Sections (top to bottom)

1. **Hero**
   - Large headline: "Selamat Ulang Tahun, {name}!"
   - Short subtitle (e.g. age or a sweet tagline).
   - Smooth-scroll button/indicator to the next section.
   - Light decoration (balloons/confetti) via CSS or a small canvas, with no libraries.
2. **Photo**
   - A single photo in a frame (rounded/arch/polaroid) with a soft shadow.
   - Descriptive `alt` text; `width` and `height` set to prevent layout shift.
   - `object-fit: cover`, fixed `aspect-ratio` (e.g. 4/5), `loading="eager"` if above the fold, `lazy` if below.
3. **Message**
   - A card containing the personal message, text width capped at about 65 characters per line (`max-width: 65ch`).
   - Ends with the sender's name.
4. **Closing (Footer)**
   - One closing line plus an emoji, and the year.

### 4.3 Interactions (all optional and lightweight, must not hurt performance)
- Entrance animations (fade/slide-up) using `IntersectionObserver`.
- A short confetti effect on page load or when a "Kejutan 🎉" button is pressed (vanilla JS on a `<canvas>`, duration ≤ 4 seconds, stops automatically).
- Respect `prefers-reduced-motion: reduce`: disable confetti and large animations.
- *Optional*: countdown to `birthdayDate`; if the date has passed or it is the birthday itself, show "Hari ini hari spesialmu!".

---

## 5. Responsive Requirements (High Priority)

- **Mobile-first** approach: write base CSS for small screens, then extend with `@media (min-width: ...)`.
- `<meta name="viewport" content="width=device-width, initial-scale=1">` is mandatory.
- Reference breakpoints:

| Name | Width | Layout notes |
|---|---|---|
| Small mobile | 320 – 479px | 1 column, 16px padding, photo full width (max 90vw) |
| Mobile | 480 – 767px | 1 column, more generous spacing |
| Tablet | 768 – 1023px | Photo and message may sit side by side if space allows |
| Desktop | 1024 – 1439px | Centered container, max about 1100px |
| Wide screen | ≥ 1440px | Container stays centered, typography does not over-expand |

- Use Flexbox/CSS Grid and relative units (`rem`, `%`, `vw`, `clamp()`); avoid fixed pixel widths on main elements.
- Use `min-height: 100dvh` (with `100vh` fallback) for the hero to avoid mobile address bar issues.
- Handle iPhone safe areas: `padding: env(safe-area-inset-*)` where needed.
- There must be **no horizontal scroll** at any viewport width.
- Touch targets (buttons) at least 44x44px.
- Images: `max-width: 100%; height: auto;`.
- Support both portrait and landscape orientations.

---

## 6. Accessibility & Basic SEO

- Use semantic elements: `<header>`, `<main>`, `<section>`, `<footer>`, and a single `<h1>`.
- `<html lang="id">`.
- Text-to-background contrast at least WCAG AA (4.5:1).
- Clearly visible keyboard focus (`:focus-visible`).
- `<title>` and `<meta name="description">` filled in with the sister's name.
- Add basic Open Graph tags (`og:title`, `og:description`, `og:image`) so link previews on WhatsApp look good.
- Add an emoji favicon (e.g. 🎂) via an SVG data URI so no extra file is needed.

---

## 7. Performance

- Total page size (excluding fonts) target **< 500 KB**.
- Photo: compressed, longest side max 1200px, file size target **< 200 KB**. Provide WebP with JPG fallback using `<picture>`.
- No external JS libraries. Only Google Fonts (with `preconnect`) is allowed as an external source.
- Load CSS and JS efficiently: CSS in `<head>`, JS at the end of `<body>` with `defer`.
- Lighthouse targets (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.

---

## 8. Implementation Phases

### Phase 1: Scaffolding
- [x] Create the folder and file structure from section 3.
- [ ] Fill `index.html` with the basic skeleton (doctype, meta, CSS/JS links, semantic structure).
- [ ] Set up `:root` variables for colors, spacing, and typography in `style.css`, plus a light CSS reset.

### Phase 2: Content & HTML Structure
- [ ] Build the 4 sections (Hero, Photo, Message, Footer) with the placeholders from section 2.
- [ ] Add `<picture>` for the photo with `alt`, `width`, `height`.
- [ ] Add the confetti `<canvas>` element and the "Kejutan" button (if used).

### Phase 3: Styling & Responsiveness
- [ ] Apply mobile-first styles to all sections.
- [ ] Add tablet, desktop, and wide-screen breakpoints.
- [ ] Apply fluid typography with `clamp()`.
- [ ] Verify there is no horizontal overflow.

### Phase 4: Interactions (JavaScript)
- [ ] Create the `CONFIG` object and render its values into the DOM (name, age, message, sender).
- [ ] Implement `IntersectionObserver` for scroll animations.
- [ ] Implement canvas confetti (handling `resize` and `prefers-reduced-motion`).
- [ ] *Optional*: countdown.
- [ ] Wrap code in an IIFE or module; avoid excessive globals.

### Phase 5: Polish & QA
- [ ] Test at widths: 320, 375, 414, 768, 1024, 1440, 1920 px (DevTools).
- [ ] Test portrait and landscape.
- [ ] Run Lighthouse and fix findings.
- [ ] Check keyboard navigation and color contrast.
- [ ] Validate the HTML and make sure there are no console errors.

### Phase 6: Documentation & Deploy
- [ ] Write `README.md`: how to change the photo, name, message, and date; how to run locally (just open `index.html` or `python -m http.server`).
- [ ] Include a free deployment guide (pick one): GitHub Pages, Netlify Drop, or Cloudflare Pages.

---

## 9. Constraints

1. **Do not** use any framework/library (React, Vue, Tailwind, Bootstrap, jQuery, etc.).
2. **Do not** add more than **1 photo**.
3. **Do not** use `localStorage`, cookies, analytics, or any trackers.
4. **Do not** use a backend or forms; the site is fully static.
5. **Do not** invent personal data; use clearly marked placeholders for anything unknown.
6. Code must be clean, briefly commented at key points, and consistent (2-space indentation).
7. Autoplay music/audio is **not allowed** (it is annoying and often blocked by browsers).

---

## 10. Acceptance Criteria (Definition of Done)

- [ ] The site is a single HTML page and works by opening `index.html` directly in a browser.
- [ ] It displays correctly and comfortably at every width from 320px to 1920px, with no horizontal scroll.
- [ ] Only 1 photo is shown; it is not broken and causes no layout shift.
- [ ] Name, message, and sender can be changed by editing a single place (`CONFIG`/placeholder section).
- [ ] Animations are smooth and disabled under `prefers-reduced-motion`.
- [ ] Lighthouse scores meet the targets in section 7.
- [ ] No errors/warnings in the browser console.
- [ ] `README.md` is complete and beginner-friendly.

---

## 11. Expected Agent Output

1. All project files following the structure in section 3.
2. A short summary covering: what was built, how to change the content, and the responsive testing results.
3. A list of items that are still placeholders and must be filled in by the owner (photo, name, message, date).
