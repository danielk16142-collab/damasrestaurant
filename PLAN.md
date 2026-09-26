# Damas — project plan (premium-site-kit)

Status: **draft for approval**. No kit code is written until this is approved.
Client: Restaurant Damas, 1201 avenue Van Horne, Outremont (Montréal) · Syrian fine dining since 2010.
Kind of site: **redesign** of damas.ca, full multi-page site, real client (real content, launch).

**Brief answers so far**
- Industry: restaurant.
- Languages: **French (default, at `/`)** and English (`/en/`).
- Hosting: **Vercel**.
- Legal regions: **Quebec** and the **United States**.
- SEO brief: researched by me (below).
- Motion: **expressive**.
- Reservations: **OpenTable**.
- Tracking: **none for now**.
- Private-events form: **built, clearly marked not connected** until a form service is picked.

---

## 1. Concept

**"Une nuit à Damas / A night in Damascus."** The site is structured like *The Thousand and One Nights*: each section of the home page is a "night" (Nuit I … VII), and each night reveals a room of the house: the salon, the mezze table, the embers, the tasting journey, the bar and cellar, the weekend brunch, the private salons.

**The memorable idea (signature moment):** *the door opens.*
1. On the first visit, the red tulip-and-carnation emblem from the Damas brand blooms, and the wordmark settles into it.
2. The curtain lifts in the shape of a Damascene arch.
3. On scroll, the arched window in the hero widens until you are standing inside the room.

The site's job is **experience, not acquisition**. Damas is already renowned, so the site should feel like a visit. It still needs a "Réserver" button always within reach, and strong SEO.

## 2. What we took from the references

The four sites (damas.ca, restaurantzimmerl.at, restaurantgem.com, florporto.com) and the Nocturne menu reference are **blocked by this session's network policy**, so I couldn't screenshot them. What I used instead:
- **damas.ca:** the client's own assets in the repo (logo, 40 photos, 9 menu PDFs).
- **Nocturne:** your description of the menu page (a switcher of buttons at the top, one dropdown per section).

To finish this section properly, allow those domains in the environment's network settings, or send screenshots. Working takeaways, to be confirmed against the real sites:

| Source | Takeaway we're using |
|---|---|
| Damas printed menus | Arch-shaped frames, the octagonal Damascene rosette, the star-lattice pattern, the red tulip/carnation motif. Soft high-contrast serif headings with a light grotesk for descriptions. Paper-white menu pages. |
| Damas room photos | Oxblood ceilings, brass lanterns, striped palace walls, turquoise banquettes. The site stays mostly dark and lit like the room. |
| Zimmerl (your #1, to confirm) | Slow, cinematic image transitions; the image framed then released to full-bleed; restraint in the UI. |
| Gem (#2, to confirm) | Editorial typography mixing italic words; generous whitespace around dishes. |
| Flor Porto (#3, to confirm) | Menu and atmosphere woven into one scroll; warm photography. |
| Nocturne | Menus page: a sticky top switcher (À la carte / Dégustation / Brunch / Desserts / Bar / Vins) and animated dropdowns per section. |

## 3. Palette

The base colours come from the logo. The script ran the contrast checks: `new_site.py --preview --accent "#C9A063" --base "#120A0D" --paper "#EFE6DA"`.

| Token | Colour | From | Use |
|---|---|---|---|
| `--ink` | `#120A0D` | logo ground | main background (mostly dark) |
| `--paper` | `#EFE6DA` | logo letters | text on dark; light "breath" sections (menus, lexicon, legal) |
| `--accent` | `#C9A063` brass | lanterns | italic accent words, hairlines, eyebrows, prices |
| `--damask` | `#D1232A` | menu florals | ornament only: emblem, Arabic calligraphy, rosettes |
| `--damask-deep` | `#B01D24` | derived | primary "Réserver" button fill; red text on paper |
| `--accent-deep` | `#825F2A` | derived | brass text on paper (eyebrows, links) |

Contrast results:

| Pair | Ratio | Result |
|---|---|---|
| accent on ink | 8.09 | ok |
| paper on ink | 15.82 | ok |
| accent-deep on paper | 4.70 | ok |
| stone on paper | 4.63 | ok |
| mist on ink | 4.60 | ok |
| paper on damask-deep | 5.58 | ok, primary button |
| paper on damask `#D1232A` | 4.27 | fails 4.5:1 for small text, so this red is ornament only |

**Balance:** mostly dark (candle-lit, like the room), with paper sections as breaths: the Menus page reads like the printed menu (paper, red florals), plus the lexicon and the legal pages.

## 4. Typography

| Role | Family | Why |
|---|---|---|
| Display | **Fraunces** (variable, "soft", italic for accent words) | Closest free match to the soft high-contrast serif on the printed menus. Warm, not fashion-cold. |
| Body / UI | **Inter Tight** | Matches the light grotesk used for dish descriptions on the menus. |
| Arabic accents | **Aref Ruqaa**, Arabic subset only | Decorative calligraphy for dish names and night numerals (١–٧), marked `lang="ar"`. It's a deliberate third family, limited to one small Arabic-only file, so the kit's "2 families" budget holds for Latin text. |

- All fonts are self-hosted woff2 (no Google Fonts requests, which is good for Law 25). The display font is preloaded.
- **Type scale:** `type_scale.py --base 16 18 --ratio 1.25 1.4 --display-min 60 --display-max 150` passes with no zoom warnings.

| Width | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| 375px | 16 | 20 | 25 | 31.5 | 39.5 | 49.5 | 61 |
| 1440px | 18 | 25 | 35 | 49 | 69 | 97 | 150 |

- The hero headline is capped at `min(var(--step-6), 18svh)`.
- It is tested against French, the longer language ("Une nuit *à Damas*", "Spécialités syriennes et grillades sur charbon de bois").

## 5. Languages

- **FR default at `/`, EN under `/en/`**, using the kit's view-per-page structure and one typed dictionary (a missing key fails the build).
- **Translated slugs**, because the SEO brief targets French queries:
  - `/menus/`, `/notre-histoire/`, `/evenements-prives/`, `/nous-joindre/`
  - `/en/menus/`, `/en/our-story/`, `/en/private-events/`, `/en/contact/`
- The language switcher lands on the same page in the other language.
- **Copy:** French is written first (Québec register, *vous*), and English is transcreated from it with the `website-translator` skill. A native review of the key headlines by you or Damas is needed before launch.

## 6. Sitemap (each page in FR and EN)

| Page | Status vs template | Notes |
|---|---|---|
| Accueil / Home | restyle + new sections | The seven nights (below). |
| Menus | **new** (replaces Properties + filters) | Switcher + dropdowns, real HTML text; PDFs linked as downloads. |
| Notre histoire / Our story | restyle About | Timeline, the setting, Syrian hospitality, **lexicon of the table** (SEO for dish names). |
| Événements privés / Private events | replaces Buyers/Sellers | Occasions, formats, how it works (Process), FAQ, multi-step enquiry form (placeholder). |
| Nous joindre / Contact | restyle | Address, hours, transit, map (click-to-load), OpenTable, reservation policies. |
| Legal | kit skeletons, filled | Confidentialité / Privacy, Témoins / Cookies, Conditions / Terms, Accessibilité / Accessibility (recommended). |
| 404 | restyle | "This night doesn't exist… yet", with a link home. |

Dropped from the template: Properties, property detail, Neighbourhoods, Buyers, Sellers, BookingDemo, PropertyFilters, estimator.

## 7. Section plan per page

No two consecutive sections share a layout.

**Home**
1. **Intro (L1):** emblem blooms, wordmark settles, arch curtain lifts. Once per session, **≤ 2 s** per the restaurant guide, skippable. *restyle `Intro.astro`*
2. **Hero:** arched window on the lantern salon that opens to full-bleed on scroll. Headline "Une nuit *à Damas*", MICHELIN Bib Gourmand line, Réserver button. *new*
3. **Nuit I · La Maison:** a scrubbed statement paragraph, then an asymmetric photo collage with the chef's note, then the figures 2010 / 2015 / 100 / 70 as count-ups. *new*
4. **Nuit II · La Table:** a pinned horizontal procession of mezzes with Arabic names and captions from the menu. This is the page's one pinned section. *restyle `data-hscroll`*
5. **Nuit III · La Braise:** full-bleed charcoal photo with embers rising, and the charcoal-grill list from the real menu. *new*
6. **Nuit IV · Le Voyage:** the tasting menu shown as an arch card like the printed menu ($160 and the pairings). *new*
7. **Nuit V · Le Bar & la Cave:** cocktail-name marquee, cocktail photos, wines of the Levant (Bargylus, Heya, El Sabban), araks. *new*
8. **Nuit VI · Le Brunch:** Saturday and Sunday, split image and text. *restyle split*
9. **Nuit VII · Les Salons:** the private salon photo opening from an arch, then a link to Private events. *restyle `CtaBand`*
10. **Distinctions:** MICHELIN Bib Gourmand 2025 and Canada's 100 Best. *new*
11. **Footer:** a giant "Réserver *votre nuit*", address, hours, phone, legal links. *restyle `Footer`*

**Menus** (paper page)
1. Short hero: arch photo and a one-line lede. *restyle `PageHero`*
2. Sticky **switcher**: À la carte · Dégustation · Brunch · Desserts · Bar · Vins. *new*
3. Per menu: title, lede, then **one dropdown per section** (Mezzés froids, Mezzés chauds, Spécialités & grillades…). Items show name, dotted leader and price. *restyle `Faq`*
4. Tasting: arch card with the pairings. Wine: Levant highlights plus the full list as a PDF.
5. Allergy note ("Mentionnez-nous toute allergie…") and "prices in CAD, taxes extra", then the CTA.

**Story**
1. Full-bleed room hero.
2. Scheherazade statement (the one scrubbed paragraph on this page).
3. Timeline: 2010 → 2015 → Canada's 100 Best → MICHELIN 2025. *restyle `Process`*
4. The setting (image mosaic).
5. Syrian hospitality: Ahlan wa sahlan / Mezze / Khubz / Sahtein, in 4 columns with Arabic.
6. **Lexicon:** 20 terms, paper section, `DefinedTermSet` schema.
7. CTA to the menus.

**Private events**
1. Arch hero.
2. Occasions strip.
3. Three formats in alternating rows (long table / feast to share with the tasting menu / cocktail reception).
4. How it works (Process, 4 steps).
5. FAQ, with answers from Damas.
6. **Multi-step enquiry**: date → guests → occasion → budget per guest → contact. *restyle `InquiryForm`, placeholder*

**Contact**
1. Split: title and info blocks on one side, sticky arch photo on the other.
2. Reservation policies (large groups, cancellation), answers from Damas.
3. Map as a **click-to-load** placeholder.
4. FAQ: parking, accessibility, terrace season, dietary needs.

## 8. Effects (expressive)

Tick or untick any of these; reply with IDs ("drop T6, add S5").

| ID | Effect | Where | Pre-selected |
|---|---|---|---|
| L1 | Preloader with the brand mark, once per session (≤ 2 s) | Home | ✅ |
| L2 | Hero image zoom-settle | Every hero | ✅ |
| L3 | Headline line reveal on load | Every hero | ✅ |
| L4 | Staggered hero content | Every hero | ✅ |
| L6 | Wordmark or emblem draws/blooms | Intro | ✅ (the bloom) |
| T1 | Line reveal on section headings | All pages | ✅ |
| T2 | Fade + rise | All pages | ✅ |
| T3 | Words brighten on scroll | Home Nuit I, Story intro | ✅ |
| T5 | Count-up numbers | Home Nuit I (2010, 2015, 100, 70) | ✅ |
| T6 | Marquee of cocktail names, pausable, speeds up with scroll | Home Nuit V, Events occasions | ✅ |
| I1 | Clip wipe open | Image frames | ✅ |
| I2 | Parallax inside frames | Collages | ✅ |
| I3 | **Frame → full-bleed on scroll** | Home hero (signature) | ✅ |
| I4 | Slow hover zoom | Mezze cards | ✅ |
| I10 | **Arch mask reveals** | Images across the site | ✅ |
| S1 | Lenis smooth scroll | Everywhere | ✅ |
| S2 | Pinned horizontal track | Home Nuit II (the only pin) | ✅ |
| S6 | Section index "Nuit III — La Braise" with Arabic numerals | Home | ✅ |
| P2 | Magnetic Réserver buttons | Header, footer | ✅ |
| P4 / P5 | Button fill wipe / underline draw | Everywhere | ✅ |
| P7 | **Lantern glow that follows the pointer** (instead of P1's labelled disc) | Everywhere, fine pointers | ✅ |
| N1 | Nav transparent over the hero, hides on scroll down | Everywhere | ✅ |
| N2 | Full-screen menu with staggered links | Everywhere | ✅ |
| N3 | Menu links preview an image on hover | Menu overlay | ✅ |
| N4 | Cross-page View Transitions | Everywhere | ✅ |
| U2 | Multi-step form | Events | ✅ |
| U3 | Animated dropdowns | Menus, FAQs | ✅ |
| U5 | Sticky mobile "Réserver / Appeler" bar | Everywhere on mobile | ✅ |
| A1 | Grain overlay (static, 3–4 %) | Everywhere | ✅ |
| A2 | Hairlines and rosettes draw in | Section dividers | ✅ |
| A3 | Embers rising from the charcoal (canvas, paused off-screen) | Home Nuit III | ✅ (built) |

- **Not picked:** P1 (labelled cursor disc), S5, S7, S8, T4, T7, T8, N5, N6, I5–I9, A4 (WebGL).
- **Ambient sound:** not planned. It can't autoplay, and an opt-in "oud" toggle is possible later if Damas wants one.
- **Budget note:** the expressive extras over the signature set are I3, I10, T6, S6, N3, P7, A2 and A3 (8 extras, over the kit's "two or three"). Each one is tied to the "nights" concept. Cut any you like.
- **Reduced motion:** everything shows its final state, the intro is skipped, the pinned track becomes a native swipe row, and the marquee stops.

## 9. SEO

**Research status:** DataForSEO returned **HTTP 402 (quota exhausted)**, so there are **no search volumes yet**. Top up the quota and I'll add them to `SEO.md`. The map below is built on search intent and the competitor results I read:
- **Listing sites:** RestoMontreal, OpenTable, Yelp, Tastet, Tourisme Montréal.
- **Competitor restaurants:** Le Petit Alep, KazaMaza, Sham Vegan, Alep.

**Keyword → page map (FR primary / EN primary):**

| Page | FR primary | EN primary | Secondaries |
|---|---|---|---|
| Home | restaurant syrien Montréal | Syrian restaurant Montreal | Damas restaurant, restaurant Outremont, cuisine syrienne, Bib Gourmand Montréal |
| Menus | menu restaurant syrien / mezzés Montréal | Syrian menu / mezze Montreal | menu dégustation Montréal, grillades charbon de bois, brunch Outremont |
| Story | cuisine syrienne (+ dish names: kibbeh, mutabbal, mouhammara, shish barak) | Syrian food / Syrian dishes | chef Fuad Alnirabie, Damascus, Aleppo |
| Private events | salle privée restaurant Montréal | private dining Montreal | restaurant pour groupe Outremont, événement privé |
| Contact | Damas avenue Van Horne | Damas Van Horne hours | restaurant Outremont heures, réservation |

- **Titles, descriptions and H1s** are drafted for every page (≤ 60 / ≤ 155 characters, keyword first, brand last). The full list goes in `SEO.md`.
- **Schema:**
  - `Restaurant` on every page: servesCuisine, priceRange, hours, geo, `hasMenu`, `acceptsReservations`, `ReserveAction` → OpenTable, award, founder.
  - `Menu` with sections, items and CAD prices on /menus.
  - `DefinedTermSet` (lexicon) on /story.
  - `FAQPage` on events and contact.
  - `BreadcrumbList` on inner pages.
- **Other build items:** a 1200×630 OG image per key page, sitemap (both languages), robots.txt, hreflang + x-default, canonical per language.
- **Proposed extra page:** a dedicated **/brunch/** page ("brunch Outremont", "Syrian brunch Montreal"). Brunch has its own intent and the competing brunch spots on Van Horne rank on listing sites only. Worth building now?
- **Redirects:** damas.ca has live URLs (`/fr/`, `/menu`, `/contact`…). A full 301 map needs a crawl of the old site, which is **blocked here**. Allow `www.damas.ca` in the network settings, or send the list of old URLs. Without the map, rankings are at risk at launch.
- **Local SEO:** the address, phone and hours on the site must match the Google Business Profile exactly. Hours are **to confirm** (below).

## 10. Legal and consent (Quebec Law 25 + US)

- **Pages, each in FR and EN:**
  - Politique de confidentialité / Privacy policy, in clear language, naming the person in charge of personal information.
  - Politique relative aux témoins / Cookie policy, stating that no analytics or marketing cookies are used.
  - Conditions d'utilisation / Terms.
  - Déclaration d'accessibilité / Accessibility statement (recommended).
  - A reservation/cancellation policy section on Contact, since it takes bookings through OpenTable.
- **Cookie banner: not needed**, because there's no tracking. The kit's `CookieConsent` stays off (`consent.analytics/marketing = false`). If GA4 or Meta Pixel are added later, the banner switches on and the scripts load only after opt-in.
- **Google Maps embed:** it sets cookies, so it shows as a **click-to-load placeholder** ("Afficher la carte").
- **OpenTable:** linked, not embedded, so it drops no cookies on damas.ca.
- **Events form:** placeholder. It says "not connected yet" and offers phone as the fallback. Once connected, it gets the consent line and the privacy policy lists the form service.
- **US:** the CalOPPA-style posted policy is covered by the same privacy page.
- These are drafts built from Damas's details, not legal advice.

## 11. Components and features

| Feature | Plan |
|---|---|
| Menus data | `content.ts`: every dish and price transcribed from the PDFs, FR/EN. It becomes the future CMS seam. |
| Menu switcher + dropdowns | new component, keyboard accessible (tabs with arrows, `<details>`) |
| Enquiry form | kit `InquiryForm` restyled: intents = private event / large group / press / careers / general. `submitEnquiry()` is a **placeholder**. |
| Reservations | OpenTable link everywhere, plus a sticky mobile bar (Réserver · Appeler · Itinéraire) |
| Removed | BookingDemo, PropertyFilters, PropertyCard, estimator, newsletter (no newsletter tool, which also avoids CASL) |
| Brand | vectorized wordmark + emblem (traced from the brand square) replace `Monogram`/`Logo`; favicon and apple-touch-icon from the emblem |

## 12. Hosting: Vercel

- GitHub repo `danielk16142-collab/damasrestaurant` → vercel.com/new import (Astro, `npm run build`, `dist`).
- **Vercel Pro** is needed, because Damas is a commercial site (Hobby is non-commercial only).
- The kit project lives at the **repo root**, with raw originals kept in `Damas Website Example/` and `premium-site-kit/` left untouched.
- After import, set `site` to the live domain and point damas.ca DNS at Vercel. The 301 redirect map goes in `vercel.json`.

## 13. Assumptions and open questions

**Need from Damas**
1. **Hours:** only public listings so far (dinner from 17 h 30; brunch Sat–Sun 10 h–14 h). Which nights are they closed, and until what time?
2. **Legal:** the registered business name, and the **privacy officer**'s name and email (Law 25).
3. **Public email** for events and privacy requests; the **Instagram** handle.
4. **Private events facts:** capacity of each room, minimum spend, deposit, large-group and cancellation policy.
5. **Dietary labels** (V / VG / GF) and allergen info for the menu. The kit requires them to be client-approved, so none are shown until then.
6. Is **Folfol** (the counter-service sibling) mentioned or linked? Gift cards?
7. Press quotes to feature (with sources).

**Need from you**
8. **Screenshots** of Zimmerl / Gem / Flor Porto / Nocturne, or allow those domains, to finish section 2.
9. **The old URL list** of damas.ca, for the redirect map.
10. **/brunch/** as its own page: yes or no?

**Assumptions**
- Photos come from the repo only, with one warm grade across the site.
- Menu prices are as in the PDFs; the wine list stays a PDF (22 k characters, it changes often).

## Companion skills in this session

- **Available:** `website-translator` (EN transcreation), `deep-research`, `code-review`, `security-review`.
- **Not installed here:** `frontend-design`, `emil-design-eng`, `animate`, `review-animations`, `humanizer`, `design:design-critique`, `web-design-guidelines`, `searchfit-seo:*`. For those I'll apply the kit's written rules (quality-bar, effects, typography) and its scripts (`check_type.mjs`, `type_scale.py`, `new_site.py`) directly.

## Build order after approval

1. `new_site.py . --name "Damas" --short "Damas" --accent "#C9A063" --base "#120A0D" --paper "#EFE6DA"` into a clean scaffold. The current prototype is removed or ported.
2. `type_scale.py --write`.
3. **Style tile** (`/style`: type, colours, buttons, the arch image treatment, one menu dropdown, one motion section) → your OK.
4. Home, first three sections → review gate → rest of Home.
5. Menus → Story → Events → Contact → legal → 404, in FR, then EN.
6. `check_type.mjs` on every page in both languages, the design gates, Lighthouse, and the SEO checks → launch summary and handover.
