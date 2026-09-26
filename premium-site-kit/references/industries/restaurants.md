# Restaurants, bars, cafés, private dining

People visit to answer four questions fast: *What's the food like? Can I get a table? Where and when are you open? Is it the right vibe?* Everything should serve those, on a phone, in seconds.

## Pages
- **Home:** atmosphere hero (photo or short muted video loop), a one-line concept **plus the restaurant's own positioning sentence under the H1**, a "Reserve" button always visible, menu highlights, the story, hours and location, events/private dining teaser.
- **Menu:** real HTML text, not a PDF. Proven pattern (Damas): a **menus hub**, then **one URL per menu** (dinner, brunch, drinks, desserts, wine), with a sticky **switcher row of real links** at the top and **one dropdown per section** (numeral, title, item count, + / × toggle, first one open). Rows have a dotted leader to the price, and the other language in italics under the dish name. Include dietary labels (V, VG, GF) only if the client supplies them, plus an allergen note. Count labels depend on the menu: dishes for food, *références* for wine, drinks for bars. Keep the PDF as a "download" link at its old path. The data lives in a typed `menus.ts` (later a CMS) and also feeds the `Menu` JSON-LD.
- **Reservations:** the booking embed plus policies (deposits, large groups, cancellation).
- **Private dining & events:** spaces, capacities, sample menus, an enquiry form.
- **About / The chef / Our story.**
- **Gift cards** (link to the provider), **Visit** (map, parking, accessibility, hours including holidays).

## Mapping from the template
| Template | Becomes |
|---|---|
| Properties + filters | Menu with tabs (not filters) |
| Property detail | Private dining room page (capacity, layouts, menus, gallery, sticky "Enquire") |
| Neighbourhoods | Locations (for groups with several venues) |
| Buyers / Sellers | Private events / Catering or Careers |
| Estimator | remove (or an event budget per guest, if requested) |
| Form intents | private event, large group, catering, press, careers, general question |

## Conversion
- A **"Reserve" button everywhere** (sticky on mobile), plus call and directions buttons.
- Put hours and the address in the footer on every page and in the hero area on mobile.
- A **live "open tonight until…" line** in the restaurant's time zone (with closed days) answers "can I go now?" and feels alive (Damas).
- On desktop, a floating Reserve pill; on mobile, a bar with Reserve · Call · Directions. Hide both on the reserve page and while the menu is open.
- The events enquiry form uses the multi-step form: date → guests → occasion → budget → contact details.

## Design and motion
- Motion: **signature** for fine dining (slow reveals, atmospheric imagery), **calm** for casual or quick-service. An intro is optional; keep it under 2s if used.
- The mood comes from the photos: food close-ups, the room, people. A video loop needs a poster image and a reduced-motion fallback.
- **Ask which photo is "the" photo of the room.** Clients have one they identify with (Damas swapped our pick for the one on their old site). Give the hero text a strong shade (a radial behind the title plus a two-layer text shadow) from the start, because dining rooms are busy, bright photos.
- Art-direct wide photos: give phones a vertical crop or a different vertical photo through `<picture>` + `getImage()`.
- **No magnetic buttons by default:** restaurant clients read them as "buttons that move" (Damas rejected P2).
- A famous restaurant that doesn't need leads can take **expressive** motion: the site becomes part of the experience.
- Typography carries the concept: a French bistro, an izakaya and a steakhouse should look nothing alike. Use `design-variations.md`.

## Content rules
- Menu prices and dishes come from the client. Never invent dishes or prices for a live site.
- Allergen and dietary information must be accurate and approved by the client; add "please inform staff of allergies".
- Real reviews and press quotes only, with sources.

## Integrations
- Reservations: OpenTable, Resy, SevenRooms, Tock, or Wix Reservations. Embed their widget or link to it; ask which they use. **Load the widget on click** ("See availability"), with the direct link always visible; this helps privacy (no third-party cookies before consent) and speed, and OpenTable's widget can hang.
- Private-events forms: ask what powers the current one before rebuilding it.
- Ordering/delivery: link to their provider (Toast, Square, ChowNow, DoorDash, Uber Eats).
- Gift cards: link to their provider.
- Instagram: a curated static grid linked to their profile, rather than a heavy live embed.

## SEO
- Restaurant structured data on every page (servesCuisine, priceRange, openingHoursSpecification, hasMenu, acceptsReservations, award, geo, a ReserveAction to the booking tool), plus `Menu` per menu page.
- A **lexicon/glossary** of the cuisine's terms (`DefinedTermSet`) is strong, hard-to-copy content for ethnic and regional cuisines.
- On a redesign, keep every existing URL (even language prefixes on both languages) to avoid redirects.
- Menu as crawlable text, plus a Google Business Profile with the same hours.

## Hosting
Hostinger or Cloudflare Pages for simple sites; Wix Headless if they want to edit menus themselves or use Wix Restaurants/Reservations.

## Lessons from real projects
Full project briefs live in `../briefs/restaurants/`. Read them all before planning a restaurant.

- **2026-09 · Restaurant Damas, Montréal** (Syrian fine dining, FR/EN, Vercel, expressive): the home page as "one evening, hour by hour"; the switcher + dropdown menus were a hit. The client corrected: the hero photo (use theirs), wine counts in *références*, the logo counters (evenodd), no moving buttons, more hero shade, and a vertical photo on mobile. Lenis blocked the scrolling nav menu (fixed with `data-lenis-prevent`, now in the template). → `../briefs/restaurants/damas-montreal.md`
