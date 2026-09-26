# Rebrand checklist

Work top to bottom. Grep for leftovers at the end:
`grep -rn "Vértice\|VÉRTICE\|Nashville\|Belle Meade\|Hawthorne\|Elena Marsh" src`

## Brand
- [ ] `new_site.py` run with the client's name and colours; contrast report reviewed
- [ ] `components/Monogram.astro`: client's mark (crop the viewBox to the mark; `fill="currentColor"`; keep cut-outs as a `<mask>`)
- [ ] `components/Logo.astro`: wordmark text, font and letter-spacing to match the logo
- [ ] `components/Footer.astro`: giant wordmark text, footer headline, disclaimer line
- [ ] `components/Intro.astro`: wordmark under the mark (or remove `<Intro />` from index if the client doesn't want a preloader)
- [ ] `public/favicon.svg`: mark on the base colour
- [ ] `layouts/Base.astro`: Google Fonts link, home `<title>` pattern, `theme-color`
- [ ] `astro.config.mjs`: `site` URL

## Content (`src/lib/content.ts`)
- [ ] `site` object: phone, email, address, hours
- [ ] `neighbourhoods` (or the vertical's equivalent): name, tagline, description, image, stats, highlights
- [ ] `properties`: one entry per listing. `hasDetailPage: true` only for listings with a full photo set; the others link to the enquiry form
- [ ] `propertyTypes` list matches the client's inventory
- [ ] price formatting and currency (`formatPrice`, `formatPriceFull`)

## Copy: every page has client-specific words
- [ ] `pages/index.astro`: hero eyebrow + headline + lede, statement paragraph + 3 stats, services (4), band headline, testimonials (3), split CTA
- [ ] `pages/properties/index.astro`: hero, off-market band
- [ ] `pages/properties/[slug].astro`: agent name in the booking panel
- [ ] `pages/neighbourhoods.astro`: hero, CTA band
- [ ] `pages/buyers.astro` / `sellers.astro`: hero, stats, process steps, FAQs, CTA
- [ ] `pages/about.astro`: story (the brand-name meaning is a strong hook if there is one), values, partners, figures
- [ ] `pages/contact.astro` + `InquiryForm.tsx` (intent labels, budget bands in local currency, placeholders) + `BookingDemo.tsx` (time zone: `ctz` and the "Central Time" text)
- [ ] `Nav.astro` link labels; `Footer.astro` newsletter text
- [ ] meta descriptions on every page

## Legal, consent, SEO
- [ ] `content.ts` `legal` (entity, address, privacy contact, governing law, date, processors) and `consent` filled
- [ ] `pages/privacy.astro`, `cookies.astro`, `terms.astro` completed; sections that don't apply deleted; extra regional/industry pages added (`legal.md`)
- [ ] every tracking script written as `<script type="text/plain" data-consent="…">`
- [ ] footer legal links in every language; form consent line links to the privacy policy
- [ ] titles, descriptions, H1s, JSON-LD, OG images, sitemap and robots from the SEO brief (`seo.md`)
- [ ] `grep -rn "\[\[" src` returns nothing

## Image slots (template file → where it appears)

| Slot file | Used on | Best photo for it |
|---|---|---|
| `belle-meade-estate` | Home hero, About CTA, listing | the single most striking exterior, wide, dusk |
| `nashville-city` | Home parallax band, Neighbourhoods CTA, area | city skyline or landmark |
| `aerial` | Home split CTA (sell), Sellers CTA, Neighbourhoods hero, area | aerial or neighbourhood overview |
| `brentwood-street` | Home services, About hero, area, listing | streetscape |
| `gulch-interior` | Home split CTA (buy), Contact hero, listing | the best interior |
| `twelve-south-modern` | Properties hero, area, listing | a strong modern exterior |
| `green-hills-modern`, `sylvan-modern` | Home services, areas, listings | exteriors |
| `family/*` (7) | Property detail gallery, Buyers/Sellers/About, services | one home's full set: front, living, kitchen, upstairs, bedroom, bath, garden |

When the client has fewer photos, reuse them on different pages rather than using stock images. When they have more, add listings; each needs a `hero` + `heroAlt`. Write real alt text for every image.
