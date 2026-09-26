# Agencies and studios: web design, eCommerce, marketing, AI, branding

The visitor is a business owner or marketing lead deciding whether this studio can make them look like the leader in their market, and whether it is safe to trust with money. They need proof first (work they can click), then a clear offer, then a price range and an easy next step. For a studio that sells motion and design, "premium" means the site itself is the demo: every effect is a sample of the product.

## Pages
- Home: hero with a real H1 and an interactive or motion signature, a showreel or case-study-first section, selected work, services, process, why us, starting prices, FAQ.
- Service pages (one per service, keep the client's existing URLs for SEO): hero, what's included + starting price, deliverables, related work, service FAQ.
- Portfolio: filter by service, case studies first, then other work; tag concept builds and in-progress refreshes honestly.
- Case study / project detail: giant name, expanding cover, facts, challenge / approach, gallery, "what moves" feature list, live site + code links, next project.
- Start a project: multi-step form + "book a free call" panel + email.

## Mapping from the template
| Template | Becomes |
|---|---|
| Properties + filters | Projects + service filter (vanilla GSAP Flip over Astro-rendered cards works well) |
| Property detail | Case study page |
| Neighbourhoods | Services |
| Buyers / Sellers | Service pages |
| Mortgage estimator | Starting prices section |
| Form intents | Website · Online store · Marketing · AI · Not sure |

## Conversion
- Two actions everywhere: "Book a free call" (primary, nav + hero + footer + sticker) and "Start a project" (form). Service pages deep-link the form with `?service=`.

## Design and motion
- Expressive by default: the client is buying motion. One interactive background (e.g. a cursor-reactive canvas field built from the logo), one scroll-scrubbed showreel of their best case study, stacking case-study cards, pinned horizontal process with a progress line.
- Keep body text large and high-contrast on dark sites (a common complaint about agency templates).

## Content rules
- Never invent testimonials, client logos, results or team size. Concept builds must be labelled as such, with "brand and people are fictional" on the detail page.
- Prices shown as "from" and marked indicative until the owner confirms them.
- In Quebec, offer French (Charter of the French Language); publish both with hreflang.

## Integrations
- Booking (Wix Bookings, Cal.com, Calendly), CRM/form (Wix Forms + Contacts), analytics. Ask which they already use.

## SEO
- `ProfessionalService` structured data, one page per service with city in the title, keep existing URLs when migrating, hreflang EN/FR.

## Hosting
- Vercel for the front end; Wix Headless as backend when the owner wants to demonstrate the same CMS setup they sell to clients.

## Lessons from real projects
- 2026-09-25, Dany Designs (Montréal, own agency site, dark + orange #FF4E1B, Originals display font + Geist): owner wanted the site to show off the scroll effects they sell, case studies first, EN/FR. References: myweblab.it (ghost outline words, pinned numbered panels with progress line, serif+sans), six2eight.com (book-a-call everywhere, filter pills), researchdesignagency.com (bar-wipe text reveal, row flood on hover, rotating sticker). What worked: reusing the Velaire film frames as a framed showreel that opens to full-bleed; a canvas ray field from the logo's spark strokes; the redaction reveal on the statement. Fix next time: GSAP tweening `filter` from "none" starts at brightness(0) (use fromTo); rounded geometric display faces like Originals need line-height ≥ 1.1 on wrapped headlines; stacking-card grids need `minmax(0, 1fr)` columns or long titles overflow on mobile; the in-app browser pane stops painting when hidden, so use headless Chrome (playwright-core + local Chrome) for scrolled screenshots.
