# Effects menu: pick what the site uses

Every project picks its effects from this list, with the user choosing. Don't apply everything the kit can do. Great sites use a few effects consistently, not every effect once.

## How to use it

1. After the motion level is agreed (calm / signature / expressive), pre-select the effects marked for that level and the industry, and add one **signature moment** tied to the concept.
2. Show the user the list as a checklist: every group, each effect with its ID and a one-line description. Mark the pre-selected ones, and let them add, remove or ask to see one in action. With the question tool, ask one multi-select question per group (max 4 options each, so offer the 4 most relevant and say the rest are in the list). Otherwise show the table in chat or in the plan and let them reply with IDs ("add T3, drop P2").
3. Write the final picks into the plan under **Effects**, with the page and section where each one lives.
4. Anything built but not picked stays off. Remove unused code paths rather than leaving dormant attributes.

Budget: **calm** ≈ 4–6 effects, **signature** ≈ 7–10, **expressive** ≈ 10–14. At most **one pinned/scroll-jacked section per page**, and one signature moment per site.

Column **Kit** says how it's built: an attribute from `scripts/motion.ts` (ready), a component already in the template, or **build** (use the `animate` skill; add it to `motion.ts` as a new attribute if it could be reused).

Every effect must: animate only `transform`, `opacity`, `clip-path` or `filter` (no layout shift); respect `prefers-reduced-motion` (show the final state); leave content readable if JS fails (the `js-motion` failsafe); and be off or simplified on touch where noted.

## 1. Load and intro (L)

| ID | Effect | Kit | Levels | Notes |
|---|---|---|---|---|
| L1 | Preloader with brand mark, once per session | `Intro.astro` | signature, expressive | skip for utilitarian brands, clinics, trades |
| L2 | Hero image zoom-settle (1.25 → 1) on load | hero pattern | all | the calmest "premium" cue |
| L3 | Headline line reveal on load | `data-split="load"` | all | one per page |
| L4 | Staggered hero content rise (eyebrow, lede, buttons) | `data-reveal-load` | all | |
| L5 | Curtain / panel wipe that uncovers the page | build | expressive | alternative to L1, faster |
| L6 | Wordmark or logo draws itself (SVG stroke) | build | signature, expressive | good signature moment |

## 2. Text (T)

| ID | Effect | Kit | Levels | Notes |
|---|---|---|---|---|
| T1 | Line reveal from a mask on scroll | `data-split` | signature, expressive | section headings only, not body text |
| T2 | Fade + short rise | `data-reveal` | all | the default for paragraphs, cards |
| T3 | Words brighten as you scroll (scrubbed) | `data-words` | signature, expressive | one statement paragraph per page max |
| T4 | Character-by-character reveal | build (SplitText chars) | expressive | short words only; hard to read if overused |
| T5 | Count-up numbers | `data-count` | all | only for real figures |
| T6 | Infinite marquee (values, clients, services) | build | signature, expressive | pause on hover, stop under reduced motion |
| T7 | Italic accent word swaps / rotates | build | expressive | e.g. "homes / estates / views" |
| T8 | Text scramble / typewriter | build | expressive | tech/agency brands only |

## 3. Images and media (I)

| ID | Effect | Kit | Levels | Notes |
|---|---|---|---|---|
| I1 | Clip wipe open + inner image settle | `data-clip` | signature, expressive | |
| I2 | Parallax drift inside the frame | `data-parallax` | signature, expressive | keep ±8–15% |
| I3 | Image scales from framed to full-bleed while scrolling | build | signature, expressive | great hero → section transition |
| I4 | Hover zoom on cards (1 → 1.05, slow) | CSS | all | |
| I5 | Black-and-white (or duotone) to colour on hover | CSS | signature | fine pointers only |
| I6 | Crossfading slideshow with index counter (01/04) | build | all | slow (5–7s), pausable |
| I7 | Video hero or video on hover | build | signature, expressive | muted, poster frame, reduced-motion shows poster |
| I8 | Lightbox gallery (keys, swipe, thumbs) | detail page | all | |
| I9 | Before/after slider | build | all | home services, clinics, aesthetics |
| I10 | Mask / shape reveal (circle, arch) | build | expressive | arches suit hospitality, heritage |

## 4. Scroll (S)

| ID | Effect | Kit | Levels | Notes |
|---|---|---|---|---|
| S1 | Lenis smooth scroll | base | signature, expressive | calm sites can use native scroll |
| S2 | Pinned horizontal scroll track | `data-hscroll` | signature, expressive | counts as the page's pinned section |
| S3 | Sticky heading + numbered steps with progress line | `Process.astro` | all | |
| S4 | Sticky image stack that swaps with the list | neighbourhood list | signature | |
| S5 | Stacking cards (each card pins and the next slides over) | build | signature, expressive | counts as pinned |
| S6 | Scroll progress bar or section index (01 — 05) | build | all | long pages, case studies |
| S7 | Background colour shifts between sections | build | expressive | light ↔ dark as sections enter |
| S8 | Chaptered full-screen story (room by room, course by course) | build | expressive | detail pages |

## 5. Pointer and hover (P) — fine pointers only

| ID | Effect | Kit | Levels | Notes |
|---|---|---|---|---|
| P1 | Custom cursor that grows into a labelled disc | `data-cursor` | signature, expressive | never hide the native cursor on touch |
| P2 | Magnetic buttons | `data-magnetic` | signature, expressive | primary actions only |
| P3 | Image follows the cursor over a list | services list | signature | |
| P4 | Button fill wipes up on hover | `.btn` | all | |
| P5 | Underline draw / retract on links | `.link` | all | |
| P6 | Tilt / depth on cards | build | expressive | subtle (≤6°) |
| P7 | Spotlight / gradient that follows the pointer | build | expressive | dark sites |

## 6. Navigation and page transitions (N)

| ID | Effect | Kit | Levels | Notes |
|---|---|---|---|---|
| N1 | Nav transparent over hero, blurs on scroll, hides on scroll down | `Nav.astro` | all | |
| N2 | Full-screen menu with staggered links | `Nav.astro` | all | |
| N3 | Menu links preview an image on hover | build | signature, expressive | |
| N4 | Cross-page View Transitions (fade/slide) | base | all | |
| N5 | Shared-element morph (card image → detail hero) | `view-transition-name` | signature, expressive | |
| N6 | Page wipe / curtain between pages | build | expressive | keep under 700ms |

## 7. Interface and feedback (U)

| ID | Effect | Kit | Levels | Notes |
|---|---|---|---|---|
| U1 | Filters reorder with Flip animation | `PropertyFilters` | all | |
| U2 | Multi-step form with sliding steps and progress | `InquiryForm` | all | |
| U3 | Animated accordion (FAQ) | `Faq.astro` | all | |
| U4 | Success state animation (check draws, confetti-free) | build | all | after form submit |
| U5 | Sticky mobile action bar (call / book) | detail page | all | strongly recommended for services |
| U6 | Toast / inline status messages | build | all | |

## 8. Texture and ambience (A)

| ID | Effect | Kit | Levels | Notes |
|---|---|---|---|---|
| A1 | Paper grain / noise overlay (3–4%) | CSS | all | static, not animated |
| A2 | Hairlines that draw in as sections enter | build | signature | |
| A3 | Slow gradient / light drift in the background | build | expressive | pause off-screen |
| A4 | WebGL (distortion, 3D, shaders) | build | expressive only | ask first: heavier, needs a fallback; justify it in the plan |

## Signature moment ideas

Tie it to the concept, not to a trend: the logo mark rising like a building (Vértice), a horizon line drawing across the hero (coastal), the frame expanding to full-bleed (gallery), a blueprint grid fading as content arrives (architecture), steam or light moving across a plate (restaurant), a door opening into the hero (hospitality). Build it with the `animate` skill, then review it with `review-animations`.

## Default picks per level

- **Calm:** L2, L4, T2, T5, I4, P4, P5, N1, N4, U2, U3 (+ S3 if there's a process)
- **Signature:** calm set + L3, T1, T3, I1, I2, S1, S2 or S4, P1, P2, N5
- **Expressive:** signature set + two or three of T4, T6, I3, S5, S7, S8, N3, N6, P6 (A4 only if agreed)
