# Restaurants, bars, cafés, private dining

People visit to answer four questions fast: *What's the food like? Can I get a table? Where and when are you open? Is it the right vibe?* Everything should serve those, on a phone, in seconds.

## Pages
- **Home:** atmosphere hero (photo or short muted video loop), a one-line concept, a "Reserve" button always visible, menu highlights, the story, hours and location, events/private dining teaser.
- **Menu:** real HTML text, not a PDF. Tabs for Lunch / Dinner / Drinks / Dessert, with prices, dietary labels (V, VG, GF) and an allergen note. Keep it easy to update (it lives in `content.ts`, later a CMS).
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
- The events enquiry form uses the multi-step form: date → guests → occasion → budget → contact details.

## Design and motion
- Motion: **signature** for fine dining (slow reveals, atmospheric imagery), **calm** for casual or quick-service. An intro is optional; keep it under 2s if used.
- The mood comes from the photos: food close-ups, the room, people. A video loop needs a poster image and a reduced-motion fallback.
- Typography carries the concept: a French bistro, an izakaya and a steakhouse should look nothing alike. Use `design-variations.md`.

## Content rules
- Menu prices and dishes come from the client. Never invent dishes or prices for a live site.
- Allergen and dietary information must be accurate and approved by the client; add "please inform staff of allergies".
- Real reviews and press quotes only, with sources.

## Integrations
- Reservations: OpenTable, Resy, SevenRooms, Tock, or Wix Reservations. Embed their widget or link to it; ask which they use.
- Ordering/delivery: link to their provider (Toast, Square, ChowNow, DoorDash, Uber Eats).
- Gift cards: link to their provider.
- Instagram: a curated static grid linked to their profile, rather than a heavy live embed.

## SEO
- Restaurant structured data (servesCuisine, priceRange, openingHoursSpecification, menu URL, acceptsReservations).
- Menu as crawlable text, plus a Google Business Profile with the same hours.

## Hosting
Hostinger or Cloudflare Pages for simple sites; Wix Headless if they want to edit menus themselves or use Wix Restaurants/Reservations.

## Lessons from real projects
- (none yet)
