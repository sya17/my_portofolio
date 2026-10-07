---
name: Sarip Hidayatullah, portfolio
description: A calm, carefully set CV on the web, with one highlighter stroke per page.
colors:
  paper: "oklch(1 0 0)"
  ink: "oklch(0.2 0.012 85)"
  muted: "oklch(0.47 0.012 85)"
  rule: "oklch(0.9 0.006 85)"
  paper-dark: "oklch(0.178 0 0)"
  ink-dark: "oklch(0.94 0.01 91)"
  muted-dark: "oklch(0.74 0.01 85)"
  rule-dark: "oklch(0.3 0.004 85)"
  highlighter: "oklch(0.87 0.165 91)"
  highlighter-dark: "oklch(0.82 0.16 88)"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.75rem + 6vw, 5.75rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.75rem + 3.5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.05rem + 0.8vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  none: "0"
  control: "6px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "32px"
  gutter-desktop: "48px"
  row: "24px"
  section-mobile: "48px"
  section-desktop: "64px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-solid-hover:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.paper}"
  button-line:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  highlight:
    backgroundColor: "{colors.highlighter}"
    textColor: "{colors.ink}"
  portrait:
    rounded: "{rounded.none}"
---

# Design System: Sarip Hidayatullah, portfolio

## 1. Overview: The Marked-Up CV

Dial: ENERGY 2 / RHYTHM 2 / MOTION 2.

The site is a CV that a careful reader has already gone through with a highlighter. Paper, ink, one black-and-white portrait, and a yellow stroke on the few words a recruiter would mark anyway: the role, the years, the email. Everything else stays quiet so those strokes land.

Structure comes from the CV itself: a two-column sheet, short label on the left, facts on the right, separated by hairline rules. Pages repeat that grammar and each breaks it once: the oversized name and portrait on Home, the big year numerals on Portfolio, the full-size email on Contact.

Not this: dark neon developer portfolios, glass cards, typing effects, skill bars, fake stats, bento grids, terminal costumes, editorial serif magazines.

## 2. Colors: Paper, Ink, Highlighter

- **Paper** (pure white / near-black `oklch(0.178 0 0)`): the page. No cream, no tint. The warmth comes from the highlighter, not the background.
- **Ink** (warm near-black / warm off-white): all primary text, the solid button, focus rings. 18:1 on paper in light, 16:1 in dark.
- **Muted** (6.9:1 light, 8.2:1 dark): labels, dates, client names, secondary lines. Never lighter than this.
- **Rule**: hairlines between sheet sections and list rows only. Decorative, never a control boundary.
- **Highlighter** (`oklch(0.87 0.165 91)`): the only accent. Used only through `<mark>`, at most one per page, plus text selection. Text on it is always dark ink (12:1), in both themes.

Theme follows the system through CSS `light-dark()` and `color-scheme`; the header toggle sets `data-theme` on `<html>` and saves it in `localStorage`.

## 3. Typography: One Family, Hard Contrast

Atkinson Hyperlegible Next, weights 400 / 600 / 800 only. Chosen because it was drawn so that easily confused characters (l, I, 1, O, 0) never look alike: the type itself is careful. Hierarchy comes from the jump between 800-weight display sizes and plain 400 body, not from extra families.

- Display (name on Home) and headline (page titles): 800, tight leading, slight negative tracking.
- Lede: the one-paragraph intro on each page, 400, up to 1.5rem.
- Body: 1.0625rem / 1.6, measure capped around 46 to 62ch.
- Labels: sentence case, 600, muted. No uppercase tracked eyebrows, no numbered section markers.
- Ranges use an en dash (2021–2023). No em dashes anywhere.

## 4. Elevation

Flat. No shadows. Depth comes from the portrait, the type scale, and the hairline rules. The highlighter is the only thing that sits "on top" of the page.

## 5. Components

- **Sheet** (`.sheet`): grid with a 9rem (sm) / 12rem (lg) label column and a 1fr content column, top hairline, stacks to one column under 640px.
- **Entry** (`.entry`): one dated row inside a sheet, 6.5rem period column then the content.
- **Highlight** (`<mark>`): background-image stroke with an uneven radius so it reads as drawn, `box-decoration-break: clone` for wrapped lines. Draws left to right once on load (750ms, ease-out-quart, 400ms delay). Reduced motion: shown fully, no animation.
- **Buttons**: `.btn-solid` (ink fill) for the main action, `.btn-line` (1px ink border) for the second. 44px tall, 6px radius, no icons, no arrows. Labels say what happens: "Email me", "Copy address", "Download CV (PDF)".
- **Links**: underlined, 1px muted underline that turns 2px ink on hover.
- **Portrait**: the real B&W photo, 4:5 crop, square corners. Above the name under 1024px, beside it from 1024px.
- **Header**: name (home link) left, three text links, theme toggle (44px, half-filled circle, `aria-pressed`). Under 640px the links move to their own row; never a hamburger.
- **Focus**: 2px ink outline, 3px offset, on every interactive element.

## 6. Do's and Don'ts

- Do keep at most one `<mark>` per page, on a phrase a recruiter would highlight. A page with nothing worth marking gets none.
- Do take every fact from `src/lib/constants.ts` or `src/data/projects.ts`; add real data there first.
- Do keep targets at 44px and contrast at AA in both themes.
- Don't add cards, shadows, gradients, glow, icons-for-decoration, or a second accent color.
- Don't add numbers, testimonials, or project details that aren't real.
- Don't animate anything except the highlighter stroke and hover/focus feedback.
