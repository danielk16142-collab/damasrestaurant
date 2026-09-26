# Damas — project plan (premium-site-kit)

Status: **v2, draft for approval**. Now based on the live damas.ca and the four reference sites. No kit code is written until this is approved.

- **Client:** Restaurant Damas, 1201, avenue Van Horne, Montréal (QC) H2V 1K4 · (514) 439-5435 · info@damas.ca
- **Kind of site:** **redesign** of damas.ca. Full multi-page site, real client (real content, launch).

**Brief**
- Industry: restaurant.
- Languages: **French (default) + English**.
- Hosting: **Vercel**.
- Legal regions: **Quebec + United States**.
- SEO brief: researched by me.
- Motion: **expressive**.
- Reservations: **OpenTable (rid 66991)**.
- Tracking: **none**.
- Private-events form: **placeholder** (see §11: the current site already has an endpoint).

---

## 1. Concept

**"Une nuit à Damas / A night in Damascus."** The home page unfolds as one evening in the tale of a thousand and one nights. Seven "nights" follow the evening from the door to the last sweet. A chapter index runs down the side, and the site knows what time it is in Outremont.

The copy builds on Damas's own words ("Un voyage vers la Syrie *le temps d'un soir*", "c'est vous, le héros du conte, l'ingrédient manquant"), so the voice stays theirs.

**Signature moment: the door opens.**
1. On the first visit, the red tulip-and-carnation emblem blooms around the wordmark.
2. The curtain lifts in the shape of a Damascene arch.
3. The hero is an arched window on the lantern-lit salon. It widens on scroll until you stand inside the room.

## 2. What we took from the references

Studied in a real browser with screenshots, and the fonts and colours read from the pages.

| Site | What it does | What we take |
|---|---|---|
| **damas.ca** (current) | EB Garamond + Karla; night `#120A0D`, cream `#EFE6DA`, amber `#E8A54B` buttons with dark text, brass `#B98B4E` eyebrows, oxblood `#3E0F1C` footer; italic accent line in the H1; menus shown as PDFs; clean `/fr/…` + `/en/…` URLs. | **Keep the brand system** (fonts, colours, voice, URLs). Replace the PDF menus with real text. Add the experience it lacks. |
| **Zimmerl** (#1) | Dark green with **warm light blooms drifting** behind the content; huge wordmark over the hero photo; **giant numerals with a small label** ("23 Gänge", "5 Tische"); a vertical line with dots as a scroll index; awards logos row; black-and-white chef strip; GSAP ScrollSmoother + SplitText. | Drifting lantern-light blooms (A3); giant numerals (2010 · 100 · 70); a vertical dotted index; an awards row. |
| **Gem** (#2) | Near-black with gold; **outlined (stroke-only) serif marquee**; a **floating "reserve a table" pill** always visible bottom right; "Signature dishes" list with hover images; Lenis + Barba page transitions. | The outlined marquee (cocktail names); a floating Réserver pill on desktop too; the signature dish list with a hover image (P3); smooth page transitions. |
| **Flor Porto** (#3) | Warm paper; the menu told as **the day's timeline** (morning → afternoon → evening) with a side indicator; **"local time at Flôr: 7:42 PM"** in the hero. | The **evening timeline**: the home chapters are the hours of a night at Damas (17 h 30 → 22 h). A **live "Il est 19 h 42 à Outremont — ouvert ce soir jusqu'à 22 h"** line. |
| **Nocturne** (menu model) | Chapter labels ("Chapter II · The tasting menu"); a **right-side dot index** naming the current chapter; menu rows with **roman numerals**, a round **+ / ×** toggle, description on the left, pairing on the right; dietary and allergen notes; facts row (seats / courses / hours). | Menus page rows (numeral, name with an italic word, round toggle, description, detail); the dot index with chapter names; dietary notes. Plus **your request: a top row of buttons to switch between menus.** |

## 3. Palette: Damas's own, plus the menus' damask red as ornament

Contrast results from the script (`new_site.py --preview --accent "#E8A54B" --base "#120A0D" --paper "#EFE6DA"`):

| Token | Colour | Source | Use | Contrast |
|---|---|---|---|---|
| `--ink` | `#120A0D` | logo, site | main background | |
| `--paper` | `#EFE6DA` | logo, site | text on dark; paper sections | 15.8 on ink |
| `--accent` | `#E8A54B` amber | site buttons | primary button (ink label), italic accent words | 9.2 on ink / ink on it 9.2 |
| `--brass` | `#B98B4E` | site eyebrows | eyebrows, hairlines, prices | 6.4 on ink |
| `--taupe` | `#A99C8F` | site muted text | muted text on dark | 7.3 on ink |
| `--oxblood` | `#3E0F1C` | site footer | footer and the "salons" chapter | paper on it 13.2 |
| `--damask` | `#D1232A` | printed menus | **ornament only** (emblem, Arabic calligraphy, rosettes) | too low for small text |
| `--accent-deep` | `#90590F` | derived | amber text on paper | 4.7 on paper |

**Balance:**
- Mostly dark, lit like the room: drifting amber and oxblood light blooms.
- Paper "breaths": the menus and the lexicon, like the printed menus.
- Oxblood for the footer and the private salons.

## 4. Typography: Damas's current pairing, kept

| Role | Family | Notes |
|---|---|---|
| Display | **EB Garamond** (400, 400 italic, 500) | The brand's heading face on damas.ca. Italic for one or two accent words per headline ("*le temps d'un soir*"). Display line-height ~1.06, letter-spacing −0.02em. |
| Body / UI | **Karla** (400, 500, 600) | The brand's text face. Spaced capitals for eyebrows (+0.22em). |
| Arabic accents | **Aref Ruqaa**, Arabic subset only | Calligraphic dish names and night numerals (١–٧), `lang="ar"`. It's a deliberate small third file, so the kit's "2 families" budget holds for Latin text. |

- All fonts are self-hosted woff2 (no Google requests, which suits Law 25). EB Garamond is preloaded.
- **Scale:** `type_scale.py --base 16 18 --ratio 1.25 1.4 --display-min 60 --display-max 150` has no zoom warnings.

| Width | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| 375px | 16 | 20 | 25 | 31.5 | 39.5 | 49.5 | 61 |
| 1440px | 18 | 25 | 35 | 49 | 69 | 97 | 150 |

- The hero is capped at `min(var(--step-6), 18svh)`.
- Tested with the French copy, the longer language ("Spécialités syriennes et grillades sur charbon de bois").

## 5. Languages and URLs: keep damas.ca's structure exactly

- **`/fr/…` and `/en/…`, both prefixed, with `/` → `/fr/`**, exactly like today, with hreflang fr-CA / en-CA / x-default → fr.
- **Deliberate departure from the kit's default** (default language at the root): keeping every existing URL means **no redirects and no ranking loss**.
- A typed dictionary (a missing key fails the build) and one view per page, as in the kit.
- **Copy:** French first, in Damas's voice (*vous*), reusing their existing lines where they're good. English is transcreated with `website-translator`. A native review of the key headlines is needed before launch.

## 6. Sitemap (FR / EN). Existing URLs unchanged, new pages marked NEW.

| Page | FR | EN | vs template |
|---|---|---|---|
| Home | `/fr/` | `/en/` | restyle + new sections |
| La table (Syrian cuisine + **lexicon**) | `/fr/cuisine-syrienne/` | `/en/syrian-cuisine/` | restyle About, expanded |
| **Notre histoire / Our story** (NEW) | `/fr/notre-histoire/` | `/en/our-story/` | new: timeline, chef, the setting, hospitality |
| Menus hub | `/fr/menus/` | `/en/menus/` | new |
| Dinner (cocktails, mezze, grills, tasting) | `/fr/menus/diner/` | `/en/menus/dinner/` | new (menu page) |
| Brunch | `/fr/menus/brunch/` | `/en/menus/brunch/` | new |
| Brunch drinks | `/fr/menus/brunch-boissons/` | `/en/menus/brunch-drinks/` | new |
| Desserts | `/fr/menus/desserts/` | `/en/menus/desserts/` | new |
| Wine | `/fr/menus/vins/` | `/en/menus/wine-list/` | new |
| Private events | `/fr/evenements-prives/` | `/en/private-events/` | replaces Buyers/Sellers |
| Reserve (OpenTable) | `/fr/reserver/` | `/en/reserve/` | new |
| Gift card (Treater) | `/fr/carte-cadeau/` | `/en/gift-card/` | new (small) |
| Delivery (Folfol) | `/fr/livraison/` | `/en/delivery/` | new (small) |
| Contact | `/fr/contact/` | `/en/contact/` | restyle |
| **Legal** (NEW) | `/fr/confidentialite/`, `/fr/temoins/`, `/fr/conditions/`, `/fr/accessibilite/` | `/en/privacy/`, `/en/cookies/`, `/en/terms/`, `/en/accessibility/` | kit skeletons, filled |
| 404 | FR/EN | | restyle |

- The PDFs stay at their current paths (`/menus/diner.pdf` …).
- Dropped from the template: Properties, property detail, Neighbourhoods, Buyers, Sellers, BookingDemo, PropertyFilters, estimator, newsletter.

## 7. Section plan per page

No two consecutive sections share a layout.

**Home: the evening, hour by hour**

0. **Intro (L1):** emblem bloom → wordmark → arch curtain lifts. Once per session, **≤ 2 s**, skippable. *restyle `Intro`*
1. **Hero:** arched window on the lantern salon, opening to full-bleed on scroll (I3 + I10).
   - H1: "Un voyage vers la Syrie *le temps d'un soir*" (their line, kept for brand and SEO continuity).
   - The **live evening line** (Flor): "Il est 19 h 42 à Outremont · Ouvert ce soir jusqu'à 22 h", computed in Montréal time with closed states and 1 January handled.
   - Réserver + Menus buttons, and the MICHELIN Bib Gourmand mark.
   - *new*
2. **17 h 30 · La salle:** Damas's "La salle" text as the scrubbed statement, an asymmetric photo collage, then **giant numerals** (Zimmerl): *2010* ouverture · *100* places · *70* en terrasse. *new*
3. **18 h · Les mezzés:** the pinned horizontal procession, dish by dish, with Arabic names. The page's only pinned section. *restyle `data-hscroll`*
4. **19 h · La braise:** full-bleed charcoal photo with rising embers, and a **signature dishes list with hover image** (Gem): rack of lamb, filet mignon kebab, samké harra, mixed grill. *new*
5. **20 h · Le voyage:** the tasting menu as an arch card like the printed menu (160 $, the five pairings). *new*
6. **21 h · Le bar et la cave:** **outlined serif marquee of cocktail names** (Gem), cocktail photos, Levant wines (Bargylus, Heya, El Sabban) and araks. *new*
7. **Le week-end · Le brunch:** Saturday and Sunday 11 h – 15 h, split image and text. *restyle split*
8. **Les salons:** private events on oxblood, the salon photo opening from an arch. *restyle `CtaBand`*
9. **Distinctions row** (Zimmerl): Guide MICHELIN Bib Gourmand 2025 · Canada's 100 Best. *new*
10. **Footer:** a giant "Réserver *votre nuit*", then address, hours, phone, email, links, Instagram, Facebook, legal. *restyle `Footer`*

- **Side index** (Nocturne + Zimmerl): a vertical line of dots on the right, naming the current hour and chapter ("19 h — La braise"), with Arabic numerals.
- **Floating Réserver pill** (Gem): bottom right on desktop; on mobile, a sticky bar (Réserver · Appeler · Itinéraire).

**Menu pages** (paper, like the printed menus)
1. Short hero: menu name, a one-line lede, the "Download PDF" link.
2. **Sticky switcher row** (your request): Dîner · Brunch · Boissons du brunch · Desserts · Vins.
   - Each button is a **real link to its own URL**. That keeps the existing URLs and gives every menu its own page in Google.
   - The switch animates as a pill sliding under the active item, with a cross-fade (view transitions).
3. **One dropdown per section** (Nocturne rows):
   - Section title, count, round + / × toggle; the first section opens by default.
   - Inside: dish name with an italic word, dotted leader, price, description; the **FR name with the EN in italics**, like the printed menu, on both language versions.
   - The dinner page has: Cocktails · Mocktails · Nectars traditionnels · Bières et canettes · Mezzés froids · Mezzés chauds · Spécialités et grillades · **Menu dégustation** (arch card with the pairings).
4. Allergy note and "prices in CAD, taxes and service extra", then a Réserver CTA.

- **Menus hub:** five arch cards with a photo and a one-line description each (their current lines).
- **Wine:** I'd **transcribe the full 7-page wine list** into dropdowns (by the glass / sparkling & champagne / white / orange / rosé / red / arak / beer & cider), with Levant wines highlighted. Worth it, or keep the PDF? See §13.

**La table (Syrian cuisine)**
1. Hero.
2. Their text on Syrian cuisine, as four short chapters: À partager · Safran, rose, coriandre · La cave · Les plats principaux. Each gets a photo.
3. **Lexicon of the table** (20 terms: mezzé, mutabbal, mouhammara, kibbeh, shish barak, maqlouba, Qamar al-Din, jullab, arak, za'atar…) on paper, with a `DefinedTermSet`. This is a strong SEO asset.
4. CTA to the menus.

**Notre histoire** (new)
1. Hero.
2. The Scheherazade statement.
3. Timeline: 2010 opening → 2015 Van Horne → Canada's 100 Best → MICHELIN 2025. *restyle `Process`*
4. The setting (mosaic).
5. Syrian hospitality: Ahlan wa sahlan · Mezzé · Khubz · Sahtein, with Arabic.
6. Folfol, the sister counter, in one line with a link.

**Private events**
1. Their text ("Privatiser la salle… certains jours; entreprise et célébrations personnelles").
2. Formats.
3. How it works (Process).
4. FAQ.
5. The **multi-step form** with their current fields (first name, last name, email, phone, date, guests, requests/allergies) plus occasion → **placeholder**. The fallback is info@damas.ca.

**Reserve**
- The OpenTable widget (rid 66991, FR/EN, dark theme), **loaded on click** ("Voir les disponibilités") for Law 25 and speed, with a direct OpenTable link as backup.
- Their policy line: "groupe de plus de huit personnes → info@damas.ca".
- Hours.

**Gift card:** "Offrir une soirée", Treater link, photo. **Delivery:** Folfol, next door, DoorDash, its Instagram and Facebook.

**Contact**
- Address, hours (with "Fermé le 1er janvier"), phone, email.
- Metro Outremont, a few minutes' walk.
- The map as a **click-to-load** placeholder.
- FAQ: parking, terrace season, dietary needs.

## 8. Effects (expressive)

Tick or untick any of these; reply with IDs.

| ID | Effect | Where | Pre-selected |
|---|---|---|---|
| L1 | Preloader: emblem bloom, once per session, ≤ 2 s | Home | ✅ |
| L2 / L3 / L4 | Hero zoom-settle, headline line reveal, staggered hero content | Every hero | ✅ |
| L6 | The emblem blooms (the draw variant) | Intro | ✅ |
| T1 / T2 | Line reveal on headings / fade + rise | Everywhere | ✅ |
| T3 | Words brighten on scroll | Home "La salle", Story intro | ✅ |
| T5 | Giant count-up numerals (Zimmerl) | Home 2010 · 100 · 70 | ✅ |
| T6 | Outlined-serif marquee, pausable (Gem) | Home bar chapter | ✅ |
| I1 / I2 / I4 | Clip wipe / parallax / slow hover zoom | Collages, cards | ✅ |
| I3 | **Arched frame → full-bleed on scroll** (signature) | Home hero | ✅ |
| I10 | **Arch mask reveals** | Images across the site | ✅ |
| S1 | Lenis smooth scroll | Everywhere | ✅ |
| S2 | Pinned horizontal mezze track (the only pin) | Home | ✅ |
| S6 | **Side dot index with the hour and chapter** (Nocturne/Zimmerl) | Home, Story | ✅ |
| P2 / P4 / P5 | Magnetic Réserver / button fill wipe / underline draw | Everywhere | ✅ |
| P3 | Image follows the cursor over the signature-dish list (Gem) | Home braise chapter | ✅ |
| P7 | **Lantern glow following the pointer** (instead of P1's labelled disc) | Everywhere, fine pointers | ✅ |
| N1 / N2 / N3 | Nav hides on scroll / full-screen menu / link image previews | Everywhere | ✅ |
| N4 | Cross-page View Transitions (Gem uses Barba) | Everywhere, incl. switching menus | ✅ |
| U2 | Multi-step form | Events | ✅ |
| U3 | Animated dropdowns with + / × (Nocturne) | Menus, FAQs | ✅ |
| U5 | Floating Réserver pill (desktop) / sticky action bar (mobile) (Gem) | Everywhere | ✅ |
| A1 | Static grain, 3–4 % | Everywhere | ✅ |
| A2 | Hairlines and rosettes draw in | Dividers | ✅ |
| A3 | **Drifting lantern-light blooms** behind sections (Zimmerl), paused off-screen | Home, Story | ✅ |
| — | **Embers rising** (canvas, paused off-screen) | Home braise chapter | ✅ |
| — | **Live evening line** (local time + open/closed) (Flor) | Home hero, Contact | ✅ |

- **Not picked:** P1, S5, S7, S8, T4, T7, T8, N5, N6, I5–I9, A4 (WebGL).
- **Sound:** none; it can never autoplay.
- **Budget:** well over the kit's expressive range, and each extra is tied to the "evening" concept. The easiest cuts if it feels busy: P3, T3 on Story, A2.
- **Reduced motion:** final states everywhere, no intro, the pinned track becomes a swipe row, the marquee and blooms stop, no embers.

## 9. SEO

**Starting point:** damas.ca already has good titles, descriptions, hreflang and `Restaurant` JSON-LD. The URLs are kept, so **no redirect map is needed**. `/menu` and `/contact` keep redirecting as they do today (added to `vercel.json`).

**Volumes: pending.** DataForSEO returned **HTTP 402 (quota exhausted)**; top it up and I'll add real numbers to `SEO.md`. The map below is based on intent and the current results:
- **Listing sites:** RestoMontreal, OpenTable, Yelp, Tastet, Tourisme Montréal.
- **Competitor restaurants:** Le Petit Alep, KazaMaza, Sham Vegan, Alep.

| Page | FR primary | EN primary | Secondaries |
|---|---|---|---|
| Home | restaurant syrien Montréal | Syrian restaurant Montreal | restaurant Damas, restaurant Outremont, Bib Gourmand Montréal |
| La table | cuisine syrienne | Syrian cuisine | mezzés, kibbeh, mutabbal, mouhammara (lexicon) |
| Dinner menu | menu restaurant syrien | Syrian restaurant menu | mezze Montréal, grillades charbon de bois, menu dégustation Montréal |
| Brunch | brunch Outremont | brunch Outremont / Syrian brunch Montreal | brunch syrien, brunch Van Horne |
| Wine | vin syrien / vins libanais Montréal | Syrian wine Montreal | Bargylus, arak |
| Private events | privatiser restaurant Montréal | private dining Montreal | salle privée Outremont, groupe |
| Reserve / Contact | réserver Damas / Damas Van Horne | Damas reservations | heures, adresse |

**Build items:**
- Menus as crawlable text: the biggest SEO gain over today's PDFs.
- `Restaurant` JSON-LD extended: `hasMenu`, `award`, `founder`, `ReserveAction` → OpenTable, `geo`, `priceRange` `$$$` (as today).
- `Menu` schema per menu page; `DefinedTermSet` (lexicon); `FAQPage` (events, contact); `BreadcrumbList`.
- A 1200×630 OG image per key page; sitemap for both languages; robots.txt.

## 10. Legal and consent (Quebec Law 25 + US)

- **Pages, each in FR and EN:** Politique de confidentialité / Privacy, Témoins / Cookies, Conditions / Terms, Accessibilité / Accessibility.
- **Privacy officer:** Law 25 requires a named person in charge of personal information. **Needed from Damas.**
- **No tracking, so no cookie banner.** The kit's `CookieConsent` stays off, and the cookie policy says so. If GA4 or Meta Pixel are added later, the banner turns on with opt-in only.
- **Third parties that would set cookies load only on a click:**
  - the OpenTable widget ("Voir les disponibilités");
  - Google Maps ("Afficher la carte").
  - Treater, Folfol, DoorDash, Instagram and Facebook are plain links.
- **Events form:** once connected, it gets the consent line and the privacy policy names the service. Until then it says it isn't connected, with info@damas.ca as the fallback.
- These are drafts from Damas's details, not legal advice.

## 11. Components and features

| Feature | Plan |
|---|---|
| Menus data | `content.ts`: all dinner, brunch, brunch drinks and desserts items from the PDFs, FR + EN, prices in CAD. Wine too if §13 says yes. |
| Menu switcher + dropdowns | new; links between menu URLs, `<details>` rows with + / ×, keyboard accessible |
| Enquiry form | kit `InquiryForm` restyled. `submitEnquiry()` is a **placeholder**. Note: the current site posts to **`/api/private-events`** on its present host. Once we know what powers it, it can be recreated as a Vercel function (e.g. Resend email) and connected. |
| OpenTable | click-to-load widget (rid 66991, `lang=fr-CA` / `en-CA`, dark theme) |
| Live evening line | small script: Montréal time zone, dinner and brunch hours, 1 January closed |
| Removed | BookingDemo, PropertyFilters, PropertyCard, estimator, newsletter |
| Brand | the vectorized wordmark and emblem replace `Monogram`/`Logo`; favicon and apple-touch-icon from the emblem |

## 12. Hosting: Vercel

- Import GitHub `danielk16142-collab/damasrestaurant` at vercel.com/new (Astro · `npm run build` · `dist`).
- **Vercel Pro**, because it's a commercial site.
- The kit project lives at the repo root; the raw assets stay in `Damas Website Example/`; `premium-site-kit/` is left untouched.
- `vercel.json` handles: `/` → `/fr/`, `/menu` → `/fr/menus/`, `/contact` → `/fr/contact/`.
- At launch, point damas.ca DNS at Vercel, then set up Search Console and the Google Business Profile link (handover list).

## 13. Open questions

**For you**
1. **Wine list:** transcribe the full 7 pages into dropdowns (better for SEO and the experience, and easy to update), or keep it as a PDF with only the Levant highlights?
2. **Typography:** keep **EB Garamond + Karla** (current brand, recommended), or go with the Fraunces + Inter Tight direction from the prototype?
3. **The events endpoint:** do you know what currently powers `damas.ca/api/private-events` (it's your build or theirs)? If it's reusable, the form can go live instead of being a placeholder.

**For Damas**

4. The **privacy officer**'s name and email (Law 25), and the registered business name.
5. **Private events:** which days privatization is possible, capacities, minimums, deposit and cancellation policy.
6. **Dietary labels** (V / VG / GF) and allergen info to show on the menus (client-approved only).
7. Press quotes to feature (with sources); confirmation of the Canada's 100 Best year(s) to cite.

**Confirmed from damas.ca** (no longer open)
- Hours: dinner Mon–Sun 17 h 30–22 h; brunch Sat–Sun 11 h–15 h; closed 1 January.
- Email info@damas.ca; Instagram @damasrestaurant; Facebook page.
- Gift cards via Treater; delivery via Folfol / DoorDash; OpenTable rid 66991; groups over 8 → email.

## Companion skills in this session

- **Available:** `website-translator` (EN), `deep-research`, `code-review`, `security-review`.
- **Not installed:** `frontend-design`, `emil-design-eng`, `animate`, `review-animations`, `humanizer`, `design:*`, `web-design-guidelines`, `searchfit-seo:*`. For those I apply the kit's written rules and its scripts (`check_type.mjs`, `type_scale.py`, `new_site.py`) directly.

## Build order after approval

1. `new_site.py . --name "Restaurant Damas" --short "Damas" --accent "#E8A54B" --base "#120A0D" --paper "#EFE6DA"` into a clean scaffold. The prototype is ported over, then deleted.
2. `type_scale.py --write`; fonts; brand SVGs.
3. **Style tile** (`/style`: type, colours, buttons, the arch image treatment, one menu dropdown, the switcher, one motion section) → your OK.
4. Home, first three sections → review gate → the rest of Home.
5. Menu pages → La table → Story → Events → Reserve / Gift card / Delivery / Contact → legal → 404, FR then EN.
6. `check_type.mjs` on every page in both languages, design gates, Lighthouse, SEO checks → launch summary and handover.
