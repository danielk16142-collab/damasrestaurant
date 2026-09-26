# Kit architecture

## Contents
1. Stack and file map
2. Design tokens
3. Motion attribute API
4. Components
5. Interactive islands (React)
6. Pitfalls already solved (don't reintroduce)

## 1. Stack and file map

Astro 7 (static output) · React 19 islands (`@astrojs/react`) · GSAP 3.13+ (ScrollTrigger, SplitText, Flip, all free) · Lenis smooth scroll · native cross-document View Transitions · `astro:assets` for image optimisation (sharp; source PNG/JPG → responsive WebP).

```
src/
  lib/content.ts          data layer: types, sample data, getProperties/getProperty/
                          getNeighbourhoods/..., formatPrice, propertyUrl, site{} contact info
  styles/global.css       tokens, reset, type, buttons, links, media, motion initial states, cursor
  styles/card.css         property card (shared by Astro + React)
  styles/filters.css      listings filter bar + grid
  styles/form.css         multi-step form + booking widget
  scripts/motion.ts       all scroll/reveal/cursor motion, driven by data attributes
  layouts/Base.astro      <head>, fonts, js-motion flag + failsafe, Nav, Footer, initMotion()
  components/
    Nav.astro             fixed nav: transparent over dark heroes, blurs on scroll, hides on scroll down;
                          full-screen menu under 1080px
    Footer.astro          CTA headline, newsletter (fake submit), link columns, giant wordmark
    Logo.astro / Monogram.astro   brand mark (currentColor + mask)
    Intro.astro           first-visit-per-session preloader (sets data-intro delay)
    PageHero.astro        inner-page hero (image or short dark), slots: title, default
    PropertyCard.astro    listing card (Astro)
    Process.astro         sticky heading + numbered steps + scroll progress line
    Faq.astro             animated <details> accordion
    CtaBand.astro         full-bleed parallax image CTA
    PropertyFilters.tsx   React: chips/segments/selects, URL sync, GSAP Flip reordering, empty state
    InquiryForm.tsx       React: branching multi-step form, validation, localStorage draft
    BookingDemo.tsx       React: calendar + slots demo, Google Calendar "add event" link
  pages/
    index, properties/index, properties/[slug] (getStaticPaths: hasDetailPage),
    neighbourhoods, buyers, sellers, about, contact, 404
```

## 2. Design tokens (global.css `:root`)

- `--accent`, `--accent-soft`, `--accent-deep` (accent darkened to pass 4.5:1 on paper; use it for accent-coloured text on light backgrounds)
- `--ink`, `--ink-2`, `--ink-3` (dark sections), `--paper`, `--bone`, `--sand` (light), `--stone` (muted text on light), `--mist` (muted text on dark)
- `--line-light`, `--line-dark` hairlines
- Fluid type scale `--step--1` … `--step-6` (clamp). Hero headlines also cap by height: `min(var(--step-6), 19svh)`.
- `--gutter`, `--section`, `--max` spacing; `--ease-out`, `--ease-in-out`
- Context classes: `.dark` (ink section; flips eyebrow/em colours), `.bone`, `.on-image` (text over photos: accent italics + text-shadow on small text), `.muted`
- Buttons: `.btn` (ink), `.btn--accent`, `.btn--ghost`, `.btn--light`; the fill wipes up on hover. `.link` has an underline that retracts on hover. `.eyebrow` is a small caps label with a leading rule.

`scripts/new_site.py` owns these values. Edit tokens by re-running it with new colours rather than by hand, so the rgb() literals in overlays stay in sync.

## 3. Motion attribute API (scripts/motion.ts)

| Attribute | Effect |
|---|---|
| `data-reveal` | fade + rise 40px on scroll (batched, staggered) |
| `data-reveal-load` | same, but played by the page script on load (heroes) |
| `data-split` / `data-split="load"` | SplitText line reveal from a mask, on scroll or on load; `data-delay` adds seconds |
| `data-clip` / `="load"` | wrapper wipes open from the bottom; the inner img settles from scale 1.3 |
| `data-parallax="12"` | inner img drifts ±N% while scrolling (img pre-scaled) |
| `data-words` | words brighten one by one, scrubbed to scroll (statement paragraphs) |
| `data-count="480"` + `data-prefix/suffix/decimals` | count-up on enter |
| `data-magnetic` | element leans toward the pointer (fine pointers only) |
| `data-cursor="View"` | custom cursor grows into a labelled accent disc |
| `data-hscroll` + child `data-hscroll-track` | pinned horizontal scroll ≥900px; native scroll-snap below |

Initial hidden states only apply under `html.js-motion`, which is set inline before paint unless reduced motion is on, with a 3.5s failsafe that removes it if motion never boots. `html[data-intro]` holds the intro delay, which load animations add to their own. Islands that change layout fire `window.dispatchEvent(new Event('vertice:layout'))` so ScrollTrigger refreshes.

## 4. Components: patterns worth reusing

- **Hero:** full-bleed image, a two-gradient shade (top for the nav, bottom for text), giant split headline, hairline, then lede + actions/search. Image zooms from 1.25 on load, with parallax on scroll.
- **Featured:** pinned horizontal track of cards plus a "view all" tile.
- **Services list:** numbered rows. Hovering fills the background from the bottom, italicises the title and shows a floating image that follows the cursor.
- **Neighbourhood hover list:** sticky image stack on one side; hovering a name crossfades the image.
- **Property detail:** 100svh hero shared with the card through `view-transition-name: prop-<slug>`; facts bar with counters; sticky booking panel; 12-column editorial gallery mosaic (item classes `--0…--6`); `<dialog>` lightbox (keys, swipe, thumbs); mortgage estimator; neighbourhood card; similar homes; mobile sticky bar.

## 5. Islands

Hydrate with `client:load` (above the fold, or needs the URL at once) or `client:visible`. React components can't use `data-reveal` or `data-split`: those are wired once at page load, so late-mounted nodes would stay hidden. Animate inside the component instead (CSS keyframes or GSAP).

- `PropertyFilters` keeps every card mounted and toggles `display` / CSS `order`, so Flip can animate enter, leave and reorder. Filters are kept in the query string (`area`, `type`, `price`, `beds`, `sold=hide`, `sort`).
- `InquiryForm`: `stepsFor(intent)` defines the branches; `submitEnquiry()` is the single integration point (Wix Forms, a CRM webhook, Formspree…). Deep links: `?intent=buy|sell|both|viewing|relocate&property=<slug>&area=<slug>`.
- `BookingDemo` is an honest placeholder. Replace it with a Cal.com embed (Google Calendar + Meet) or Wix Bookings when going live.

## 6. Pitfalls already solved

- **Astro scoped styles don't reach child components.** A class passed into `<Monogram class="x">` isn't styled by the parent's scoped `.x`. Use `.parent :global(.x)`.
- **`ScrollTrigger.batch` with `once: true` throws** (`reading 'end'` in refresh) when elements are already in view at creation. The kit omits `once` there; re-running the tween is harmless.
- **An element with `[hidden]` plus a `display:` rule stays visible.** global.css has `[hidden]{display:none!important}`, so use `inert` + visibility for animated overlays (see the Nav menu).
- **Full-screen overlays with Lenis:** call `window.__lenis.stop()` on open and `start()` on close.
- **SSR'd islands render defaults first.** URL-driven filters apply after hydration.
- **The featured row on mobile needs `scroll-padding-inline`,** or the snap aligns the cards flush to the screen edge.
- **Card rows need `flex-wrap`** so the facts and price don't overflow on narrow cards.
- **Headlines over photos:** check them on short, wide viewports; the height cap on hero type prevents covering the whole image.
