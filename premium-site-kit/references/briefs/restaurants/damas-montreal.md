# Restaurant Damas: Syrian fine dining, Outremont (Montréal)

- **Built:** 26 September 2026 · **Repo:** danielk16142-collab/damasrestaurant · **Live:** https://damasrestaurant.vercel.app/fr/ (damas.ca DNS not moved yet)
- **Kind:** redesign of damas.ca, rebuilt on the kit (an earlier prototype was discarded)
- **Languages:** French (default, `/fr/`), English (`/en/`) · **Hosting:** Vercel · **Legal regions:** Quebec (Law 25) + US
- **Motion level:** expressive
- **Main action:** reserve via OpenTable (widget loads on click)
- **Stack:** Astro 7 static, one React island (events form), GSAP + ScrollTrigger + SplitText, Lenis. 40 pages.

## 1. The brief in the client's words
"One of the best restaurants in Montreal… the place is literally like the tale of a thousand and one nights. It would be amazing to offer an experience in the website as they do in their restaurant. They are already really renowned, so the site is not really meant to bring people but rather to offer an online experience. However, let's have a good SEO."

For a famous restaurant, the site **extends the dining room**. It isn't a lead funnel, so the experience budget can be higher than the industry default.

## 2. References and what we took
| Site | What we took |
|---|---|
| damas.ca (current) | The whole brand system: EB Garamond + Karla, the night/cream/amber/brass/oxblood palette, the voice (*vous*, "le temps d'un soir"), the URL structure, and the photos. |
| restaurantzimmerl.at | Drifting warm light blooms behind sections; giant numerals with small labels (2010 · 100 · 70); a vertical dotted scroll index; an awards row. |
| restaurantgem.com | A floating "reserve a table" pill; an outlined-serif marquee (cocktail names); a signature-dish list with a hover image. |
| florporto.com | The menu as a timeline of the day; the live local time in the hero ("Il est 19 h 42 à Outremont · Ouvert ce soir jusqu'à 22 h"). |
| Nocturne (Wix demo; the client's model for the menus page) | A **top row of buttons to switch menus** and **a dropdown per section**: roman numeral, title, count, round + / × toggle. |

## 3. Concept and signature moment
**"Une nuit à Damas."** The home page is one evening, hour by hour: 17 h 30 la salle → 18 h mezzés → 19 h la braise → 20 h tasting menu → 21 h bar and cellar → weekend brunch → the salons. A side index names the current hour. **Signature:** on the first visit, the emblem blooms and a curtain lifts in the shape of a Damascene arch (under 2 s, once per session). The hero is an arched window on the main salon that widens to full-bleed as you scroll.

## 4. Brand system
- **Palette:** ink `#120A0D`, paper `#EFE6DA`, accent amber `#E8A54B` (buttons with ink labels), brass `#B98B4E` (eyebrows, prices), oxblood `#3E0F1C` (footer, salons), damask red `#D1232A` (**ornament only**, too low-contrast for text), accent-deep `#90590F` (amber text on paper).
- **Tones:** the site is dark by default; `.paper` on `<main>` for menus and legal pages (like the printed menus); `.oxblood` for the footer and salons. Nested dark sections inside paper pages must reset their text colours.
- **Fonts:** EB Garamond (display, one italic accent phrase per headline) + Karla (body/UI), self-hosted via @fontsource. Arabic accents (dish names, night numerals) are a small third font, loaded only where Arabic appears.
- **Logo:** only a 1080px JPG existed, so `tools/trace-logo.mjs` traces it with potrace into a wordmark SVG and an emblem SVG. **The wordmark path must use `fill-rule="evenodd"`**, or the counters of the letters (the holes in the "a"s) fill in. The client caught this.

## 5. Sitemap
Every damas.ca URL was kept (`/fr/…` + `/en/…`, both prefixed, `/` → `/fr/`), which is a deliberate departure from the kit's default of putting the main language at the root. New pages: Our story, menus hub + 5 menu pages, reserve, gift card, delivery, 4 legal pages. `vercel.json` redirects `/`, `/menu` and `/contact`. The PDFs keep their old paths.

## 6. Patterns that worked (reusable)
- **Menus page = switcher + dropdowns** (`MenuSwitcher.astro`, `MenuSection.astro`, `views/MenuPage.astro`):
  - Each switcher button is a **real link to its own URL**, so every menu is its own page for SEO.
  - Each section is a `<details>` with a numeral, a title, a count and a + / × toggle; the first one is open.
  - Dish rows have a dotted leader to the price, and the name in the other language in italics, like the printed menu.
  - The dinner page puts the tasting menu as an arch card between the food and the bar.
  - Section counts are menu-aware: food is "plats", **wine is "références"** (`unit` prop). This was a client correction.
- **Menu data in `lib/menus.ts`**, typed, FR + EN, typographic apostrophes, feeding both the pages and the `Menu` JSON-LD. Never invent dishes or prices.
- **Live evening line** (`LiveEvening.astro`): the Montréal time plus open/closed status, from the hours in `content.ts`, including closed days (1 January).
- **Floating Réserver pill** on desktop, and a **Réserver · Appeler · Itinéraire bar** on mobile (`ReserveBar.astro`). It hides on the reserve page and while the menu is open.
- **Third parties only on click** (OpenTable widget, Google Map). With no tracking at all there is **no cookie banner**, which suits Law 25. OpenTable gets a loading state that keeps the direct link visible, because the widget can hang.
- **Lexicon of the table** (`lib/glossary.ts`): 20 Arabic terms with definitions, marked up as `DefinedTermSet`. It's content that's hard to copy and it helps SEO.
- **Art-directed image:** `<picture>` with a `(max-width: 760px)` source built from `getImage()`, so phones get a vertical photo and desktops the wide one (the home page salons section). This was a client request.
- **Hero legibility:** a radial shade behind the centred title, plus a two-layer text shadow (tight plus wide). The client asked for more shade after launch; start with it.
- **Hero lede:** the client wanted their positioning line under the H1 ("Une soirée syrienne enchantée au cœur chic et gastronomique d'Outremont…"). Ask restaurants for their one-line positioning up front.

## 7. Client corrections after seeing it
- **Hero photo:** use the one on their current site (the full main salon), not our pick. → Ask which photo is "the" photo of the room.
- **Wine counts:** "plats" was wrong on the wine list; it should be "références". → The count label depends on the menu type; drinks probably need their own label too (still open).
- **Logo counters:** the holes in the "a"s were filled. → `evenodd` on traced SVGs, and check the traced logo at large size before using it.
- **"Buttons shouldn't move":** the magnetic hover (`data-magnetic`) was rejected. → Don't pre-select P2 magnetic for restaurants; the fill wipe is enough.
- **Hero text needed more shade** over a busy photo. → See §6.
- **Salons image didn't work on mobile** → a vertical photo on phones only.
- **Full-screen menu couldn't scroll** on short screens, so Réserver was cut off. → See §8.
- **(27 Sep) The big "La salle" statement was too large on phones** (5+ ragged lines at 40px). → The statement goes down to `step-3` at 800px and below, and `step-2` at 480px and below. Check large display paragraphs at 360–390px, not just headlines.
- **(27 Sep) Photos on phones must fill the width and be centred:** 85%-wide, left-aligned arch photos looked unfinished, and the small secondary collage photo (brunch) looked lost. → On phones, main photos are 100% of the column and centred; decorative secondary photos in a collage are hidden.
- **(27 Sep) Duplicate photos and overlapping stacks:** the Story "décor" collage had two near-identical shots of the red room, and the home "La salle" collage overlapped a small arch on the wide photo on phones. → Check every page for near-duplicate shots, not just identical files. On phones, collages become a clean stack (wide photo, then two arches side by side, or the secondary photo hidden), never an overlap. On desktop, keep collages in two tidy rows.

## 8. Pitfalls and fixes
- **Lenis blocks scrolling inside overlays:** while `lenis.stop()` is active, wheel and touch events are cancelled, even inside a scrollable fixed menu. Put **`data-lenis-prevent` on any scrollable overlay** (nav menu, modals, drawers), plus `overscroll-behavior: contain`. It's now a kit-wide lesson.
- **ScrollTriggers below a pinned section** need `refreshPriority: -1`, or they compute positions before the pin exists (the side index showed the wrong chapter).
- **`data-reveal-load` never ran on pages without the hero component:** load reveals are initialised in `motion.ts` (`initLoadReveals()`), not per component.
- **SplitText adds `aria-label` to `<p>`**, which Lighthouse flags. Use `aria: 'none'`; for the word-brighten effect, animate colour (mist → cream), not opacity.
- **`querySelector('[data-intro]')` matched `<body data-intro>`** and removed the body. Scope attributes carefully.
- **No JSX in Astro frontmatter:** keep bilingual titles as `[plain, italic]` string pairs and render them in the markup, with `{' '}` before `<em>`.
- **Vercel built `main` before the site was merged** ("astro: command not found", exit 127). Production builds from the default branch, so merge the first PR early or set the production branch.
- **The wine-list PDF had three-column pages** the parser misread. We published only the proofread sections and linked the full PDF.
- **Deployment protection:** team-scoped Vercel URLs ask for a login; `<project>.vercel.app` is public. Tell the client which link to share.

## 9. Integrations, SEO, legal
- **Integrations:** OpenTable (rid 66991, click-to-load), Treater (gift cards, link), Folfol/DoorDash (delivery, link), mailto placeholder for events (damas.ca posted to `/api/private-events`; the backend is unknown).
- **SEO:** `Restaurant` JSON-LD on every page (hasMenu, award, geo, priceRange, ReserveAction); `Menu` per menu page; `DefinedTermSet`; `FAQPage`; `BreadcrumbList`; hreflang fr-CA / en-CA / x-default → fr; menus as crawlable text (the biggest gain over PDFs). DataForSEO had no quota, so the keyword map is intent-based.
- **Legal:** privacy, cookies, terms and accessibility pages in FR and EN. There is no consent banner because there is no tracking. Law 25 needs a named privacy officer, which is still owed.

## 10. Results
- `check_type.mjs`: 0 errors / 0 warnings, all FR + EN pages at 8 sizes.
- Lighthouse: accessibility, best practices and SEO 100; performance home 93–97, menus 95–96, events 89.

## 11. Open items (owed by Damas unless noted)
- Law 25 privacy officer, and the registered business name.
- Private-events terms (days, capacities, minimums, deposit); the service behind the events form.
- Allergen and dietary labels (client-approved only).
- A vector logo (the traced one is an approximation).
- The Canada's 100 Best year(s).
- Point the damas.ca DNS at Vercel; Search Console; Google Business Profile.
- (Us) events page performance at 89; full wine-list transcription; "boissons" label for drink sections.

## 12. Next time (restaurants)
- **Reuse:** the switcher + dropdown menus, `menus.ts` data shape, the live evening line, the reserve pill/bar, click-to-load third parties, the lexicon, and the paper tone for menus.
- **Ask up front:** the hero photo of the room, the one-line positioning, how each menu counts its items, whether drinks have their own menus, allergen labels, the events form backend, and a vector logo.
- **Default off:** magnetic buttons. **Default on:** strong hero shade, and `data-lenis-prevent` on overlays.
- **Merge the first PR as soon as it's green**, so production isn't red on `main`.
