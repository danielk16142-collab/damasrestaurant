# Design variations: the planning menu

Use this while writing the plan (SKILL.md step 2). Pick per client from the brand, logo, reference sites and audience. The template's choice is marked **(template)**. Choosing it is fine when the brief points there, but don't let it be the default for everything. Across the plan, aim for a combination that makes this site recognisably its own.

## Contents
1. Art direction archetypes
2. Typography pairings
3. Colour balance
4. Navigation
5. Hero compositions
6. Section alternatives
7. Listing and detail layouts
8. Motion levels and signature moments
9. Details that change the feel

## 1. Art direction archetypes

| Archetype | Feels like | Typical choices |
|---|---|---|
| Editorial classic **(template)** | a luxury magazine | high-contrast serif, italic accents, dark/light alternation, full-bleed photos |
| Quiet minimal | a gallery | lots of white, small type, thin sans or light serif, tiny accents, slow fades |
| Architectural / Swiss | an architect's portfolio | grotesk sans, strict grid, numbers and indices, hairlines, crisp motion |
| Warm organic | a boutique hotel | soft serif, earthy tints, rounded image corners, textured paper, gentle drift |
| Coastal / resort | a beach club | airy blues and sand, wide letter-spacing, horizon lines, tide-like wipes |
| Dark cinematic | a film trailer | mostly dark, big video or imagery, dramatic scale changes, spotlight reveals |
| Heritage / estate | old money | classical serif, small caps, ornaments and rules, cream paper, restrained gold |

## 2. Typography pairings (Google Fonts)

| Display | Body | Mood |
|---|---|---|
| Bodoni Moda **(template)** | Manrope | fashion, high contrast |
| Cormorant Garamond | Jost | classic, airy |
| Playfair Display | Source Sans 3 | editorial, warm |
| Fraunces (soft, low "wonk") | Inter Tight | warm organic, modern |
| Italiana / Marcellus | Karla | heritage, engraved |
| DM Serif Display | DM Sans | bold, friendly luxury |
| Instrument Serif | Geist / Hanken Grotesk | contemporary, understated |
| Syne / Unbounded (sparingly) | Space Grotesk | architectural, avant-garde |
| Neue-style grotesk: Archivo, Schibsted Grotesk | the same family | Swiss, minimal: hierarchy from size and weight alone |

Also decide: headline scale (huge editorial vs modest), case (sentence vs all caps with tracking), italics (accent words vs none), numerals (oldstyle vs lining).

## 3. Colour balance
- **Alternating light/dark (template):** rhythm and drama.
- **Mostly light:** calm and open. Keep dark for the footer and one feature band.
- **Mostly dark:** cinematic. Use paper sections as "breaths" for forms and text.
- **Accent use:** hairlines and italics only (template), accent-coloured section fills, or a coloured light background (e.g. sand) instead of white.
- **Texture:** flat, or a subtle paper/noise overlay (CSS SVG noise at 3–4% opacity).

## 4. Navigation
- Transparent over the hero, then blurred ink on scroll, hiding on scroll down **(template)**
- Floating centred pill (glass) that stays compact
- Minimal: logo + "Menu" only, with a full-screen menu at every width, links with image previews
- Split: links left, logo centred, call to action right
- Side rail: vertical nav on desktop (architectural archetype)

## 5. Hero compositions
- Full-bleed photo, bottom-left giant headline, search bar **(template)**
- **Split screen:** text panel on paper and image on the right that scales down as you scroll
- **Framed image:** image inset with margins inside a paper frame; the frame opens to full-bleed on scroll
- **Video hero:** muted loop with a poster frame and reduced-motion fallback
- **Type-first:** giant wordmark or headline on paper, with the image revealed below by a clip wipe
- **Slideshow:** 3–4 slow crossfading homes with an index counter (01/04) and progress lines
- **Centred monumental:** a single word huge over the image, as on the Elyse reference

## 6. Section alternatives

| Purpose | Template version | Alternatives |
|---|---|---|
| Brand statement | scrubbed word-brighten paragraph + 3 stats | quote with signature; split image + text; marquee of values; timeline |
| Featured homes | pinned horizontal scroll | asymmetric masonry; large alternating rows (image left/right); tabbed by area; one hero listing + 3 small |
| Services | numbered rows + cursor-follow image | 2×2 image tiles with hover reveal; accordion with images; sticky image + scrolling list |
| Location | parallax city band | interactive map with pins; stacked neighbourhood cards; full-screen area slideshow |
| Areas list | hover names swap sticky image | horizontal cards; tabs; map; alphabetical index |
| Social proof | rotating single quote | press logos strip; video testimonial; case study with numbers; sold-homes gallery |
| Final call to action | split Buy / Sell panels | single form inline; "book a call" with calendar; big contact typography |
| Footer | giant wordmark | contact-first footer; image footer; minimal single line |

## 7. Listing and detail layouts
- **Listing grid:** 3-column cards **(template)** / 2-column large / list view with a thumbnail and all specs / map + list split
- **Card style:** image then text below **(template)** / text over image / hover reveals specs / framed with a border
- **Detail hero:** full-bleed **(template)** / split with a specs panel / gallery-first mosaic / video tour
- **Detail gallery:** editorial mosaic **(template)** / pinned horizontal filmstrip / room-by-room chapters with headings / full-screen story scroll
- **Detail extras:** floor plans, 3D or virtual-tour embed, amenities icons (drawn simply, not generic icon sets), schools/area map, estimator (template)

## 8. Motion levels and signature moments

The full pickable list of effects, with IDs and default picks per level, is in `effects.md`. The user chooses from it in the plan.
- **Calm:** fades and short rises only, no cursor, no pinning. Good for heritage, minimal and older audiences.
- **Signature (template):** line reveals, clip wipes, parallax, one pinned section, custom cursor, magnetic buttons.
- **Expressive:** scroll-scrubbed image scaling, horizontal chapters, split-text by character, marquee, WebGL-free distortions via CSS.

One **signature moment** per site, tied to the concept: Vértice's intro was the monogram rising like a building. Other ideas: a horizon line that draws across as the hero opens (coastal), the frame expanding to full-bleed (gallery), an architect's grid overlay that fades as content arrives (Swiss), keys-to-door transition (estate).

The preloader is optional. Skip it for fast, utilitarian brands, and always play it once per session at most.

## 9. Details that change the feel
- Image corners: sharp **(template)** or softly rounded
- Buttons: pill **(template)**, rectangle with an arrow, or underlined text only
- Dividers: hairlines **(template)**, generous whitespace only, or ornamental rules
- Numbering: section indices (01, 02) or none
- Grain/texture overlay, duotone image treatment on hover, or black-and-white to colour on hover
- Cursor: labelled disc **(template)**, a small dot only, or the native cursor
