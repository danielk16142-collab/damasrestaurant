# Quality bar: the rules every site must meet

Read this before the plan and again before calling any page done. These are gates, not suggestions: if a site misses one, fix it or tell the user why it's an exception.

## Contents
1. Never
2. Design excellence
3. Design review gates
4. Copy voice
5. Accessibility baseline
6. Performance budgets
7. Handover checklist

## 1. Never

- Invent reviews, stats, awards, credentials, prices, menus, results or client logos on a live site. Samples on a showcase site are marked as samples (footer disclaimer).
- Ship lorem ipsum, `[[PLACEHOLDER]]`, template copy or Vértice leftovers (`grep -rn "Vértice\|VÉRTICE\|Nashville\|lorem\|\[\[" src`).
- Hand over a recoloured Vértice: the plan must show restyled and new sections.
- Use generic stock or obviously AI-generated images in the hero, or mix photo styles (grades, lighting, AI vs real) on one page.
- Use the accent as a large fill, unless the plan chose it deliberately.
- Load tracking before consent, or launch without the legal pages (`legal.md`).
- Let motion hide content: everything must be readable with JS off, with reduced motion, and if motion fails (the failsafe).
- Autoplay sound, scroll-jack more than one section per page, or hide the native cursor on touch.
- Put secrets, API keys or tokens in the repo or in chat.
- Leave dead routes, unused pages, nav links to nowhere, or a form that submits to nothing without saying so.

## 2. Design excellence

These are what separate "nice template" from "they hired a studio".

**Direction before pages**
- **Style tile first.** Before building full pages, build one page (`/style` or a first home section) showing the type scale, colours, buttons, a card, a form field, one image treatment and one section with motion. Get the user's yes on it. Direction problems are cheap here and expensive later.
- Design with the **real copy and real photos** (or final-quality samples). Layout decided around lorem never survives real text.
- Study the references side by side with your screenshots at each review; name what's still missing.

**Typography** (full rules and the screen check: `typography.md`)
- Every font size is a token from `scripts/type_scale.py`; `scripts/check_type.mjs` passes on every page, every size and every language.
- Two families at most (one display, one body), loaded as woff2 with `font-display: swap`; preload the display font used above the fold.
- A fluid type scale with `clamp()` tokens (`--step--1` … `--step-6`); never one-off font sizes.
- Body text 16–20px, line length 60–75 characters (`max-width: 65ch`), line-height 1.5–1.7.
- Display lines must never touch or overlap: check ascenders and descenders on two-line headlines; leading around 1.05–1.2 depending on the family, higher for fonts with tall ascenders.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, no single-word last lines in headlines.
- Tabular numerals (`font-variant-numeric: tabular-nums`) for prices, stats and tables; real quotes and apostrophes (’ “ ”), the right dashes.
- Italic or weight accents on one or two words per headline, not more.

**Layout and spacing**
- One spacing scale (e.g. 4/8-based tokens and a `--section` rhythm); no magic numbers.
- A consistent grid (12 columns on desktop) and consistent page margins; break the grid on purpose, not by accident.
- Asymmetry and scale contrast: vary section compositions down the page so no two consecutive sections share a layout.
- Generous whitespace around headlines; tighter spacing within groups (proximity shows what belongs together).
- Optical alignment: icons, arrows and quote marks nudged so they *look* aligned.

**Colour and imagery**
- Palette from the logo, contrast checked by the script; test text on photos with a measured scrim or gradient, never "it looks fine on my screen".
- One image grade across the site (warmth, contrast, saturation); crop with intent (focal point, calm area for text); fixed aspect ratios per slot so pages don't jump.
- Icons drawn in one style (stroke width, corner, size) or none at all. No emoji as icons.

**Every interactive element has every state**
- Hover, `:focus-visible`, active, disabled, loading, error, success, empty (no results). Design them, don't let the browser default show.
- Forms: inline validation on blur, clear error text next to the field, a designed success state, and a fallback contact (phone/email) if sending fails.

**Mobile is designed, not squeezed**
- Check every section at 375px and redesign where the desktop composition doesn't translate (stacked, reordered, simplified motion).
- Main action reachable by thumb (sticky bar for calls/bookings on service sites), tap targets ≥ 44px.
- Headline sizes on short screens (the hero must show the headline and the action without scrolling on a 375×667 phone).

**Details that make it feel expensive**
- A designed 404, favicon + apple-touch-icon, branded OG images, a consistent button system, hairlines and radii from tokens.
- Loading states that match the brand (no default spinners), images that fade in rather than pop.
- Nothing jumps: reserve space for images, fonts and embeds (CLS).

**Avoid the generic-AI look**
- Centred hero + gradient blob + three identical icon cards.
- Purple/blue gradients, glassmorphism everywhere, drop shadows on everything.
- Inter or a single system font for everything without a reason.
- "Our Services / Why Choose Us / Testimonials" in the same order and layout as every template.
- Emoji, clip-art icons, handshake stock photos.

## 3. Design review gates

Run these at three moments: after the style tile, after the home page's first three sections, and before launch.

1. Run `scripts/check_type.mjs` (it screenshots every page at ten sizes) and fix its errors in every language, then review the 375 and 1440 screenshots.
2. **Squint test:** blur your eyes on the screenshot. One clear focal point per screen, a visible hierarchy, the action easy to spot.
3. **Five-second test:** from the hero alone, can you tell who it is, what they do, where, and what to do next?
4. **Reference test:** put a screenshot next to each reference site. Is it at that level? Name the gap and fix it.
5. **Template test:** would someone who saw Vértice (or the last client's site) recognise this as the same template? If yes, change more.
6. Run `design:design-critique` (or `frontend-design` / `emil-design-eng` review) on the screenshots and `web-design-guidelines` on the code; act on the findings or say why not.
7. Motion: `review-animations` on the built effects; check the picks match the plan (`effects.md`).

## 4. Copy voice

- Headlines ≤ 8 words, ledes ≤ 25 words, one idea per section.
- Specific over impressive: facts, places, numbers, names ("Garden design across the West Island since 2011", not "Elevating outdoor spaces").
- Sentence case for headings unless the brand uses caps as a style.
- Buttons say the outcome with a verb: "Book a table", "Get my free quote", "Check availability", never "Submit" or "Learn more" alone.
- Avoid: elevate, unlock, seamless, cutting-edge, world-class, state-of-the-art, journey, curated (unless literal), nestled, boasts, testament, delve, tapestry, synergy, "in today's fast-paced world", "look no further", "we pride ourselves".
- Few em dashes; no rhetorical question headlines unless the brand voice asks for it.
- Run `humanizer` on every page and every language before launch.

## 5. Accessibility baseline (WCAG 2.2 AA)

- Contrast 4.5:1 for text, 3:1 for large text and UI parts, including text on photos and the accent on dark.
- Visible `:focus-visible` ring on everything interactive; keyboard works through nav, menu (focus trapped, Esc closes), filters, form steps, lightbox, cookie banner.
- Skip link, landmarks (`header`, `nav`, `main`, `footer`), headings in order, `lang` set per page.
- Every image has real alt text (decorative ones `alt=""`); icon buttons have labels.
- Form fields have labels (not placeholder-only), errors are announced (`aria-live`) and linked (`aria-describedby`).
- `prefers-reduced-motion` respected everywhere; nothing flashes more than 3 times per second; carousels and marquees can pause.
- Run `design:accessibility-review` or `web-design-guidelines` before launch.

## 6. Performance budgets (mobile, Lighthouse on the production build)

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 (home and one detail page) |
| Accessibility, Best Practices, SEO | ≥ 95 |
| LCP | < 2.5s (aim < 2s) |
| CLS | < 0.1 |
| INP | < 200ms |
| Hero image | ≤ 200 KB, WebP/AVIF, `loading="eager"` + `fetchpriority="high"`, correct `sizes` |
| Other images | lazy, responsive `sizes`, ≤ 150 KB typical |
| Fonts | ≤ 2 families, ≤ 4 files, woff2, only the weights used |
| JavaScript | GSAP + Lenis + islands; hydrate islands `client:visible` unless needed on load; no heavy libraries for one effect |
| Video | poster frame, muted, compressed (≤ 3–5 MB for a hero loop), not loaded on mobile if it isn't shown |

Run Lighthouse (or the DataForSEO `on_page_lighthouse` tool on the deployed URL) and paste the scores in the launch summary.

## 7. Handover checklist

- [ ] Client owns every account: domain, hosting (Vercel/Hostinger/Wix), GitHub repo or a transfer, Google Search Console, GA4, Google Business Profile, form/booking tools. The user is added as a collaborator, not the owner.
- [ ] Passwords shared through a password manager or the platform's invite system, never in chat or email.
- [ ] Test submissions of every form and booking reach the client's inbox (and the auto-reply, if any, is translated).
- [ ] Analytics recording (after consent), Search Console verified, sitemap submitted.
- [ ] Redirect map live for redesigns; old URLs spot-checked.
- [ ] "Illustrative" disclaimers removed only where real content has replaced the samples.
- [ ] Short editing guide for the client (what to change where: Wix dashboard or `content.ts`), as a PDF or a short screen recording.
- [ ] Launch summary to the user: URL, Lighthouse scores, what's still a placeholder, open items, and a date for a 30-day check-in.
- [ ] Lesson added to the industry guide (see `verticals.md`).
