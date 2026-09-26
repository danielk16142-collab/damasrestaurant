# Real estate: agencies, independent agents, developers, property managers

The template is this industry's reference build (Vértice), so most structure carries over as is. The plan still has to give each client its own look (see `../design-variations.md`).

## Pages
Home, Properties (filters) + Property detail, Neighbourhoods/Areas, Buyers, Sellers (with valuation), About, Contact (multi-step form + booking).
- **Independent agent:** make it personal. About becomes the agent's story, add a reviews page, and "Sold" results carry weight.
- **Developer / new build:** a project page per development (floor plans, availability table, amenities, construction progress, register-interest form).
- **Property management / rentals:** Rentals + filters, an owners' page ("Let us manage your property"), tenant info.

## Conversion
Valuation requests (sellers), viewing bookings and a buyer brief (buyers). Show the agent's phone number and a WhatsApp link where that's normal locally.

## Content rules
- Listings, prices and sold figures come from the client or their MLS/IDX. Never invent them for a live site.
- Fair-housing and licence disclosures as required by the market (e.g. the brokerage licence number and an equal housing notice in the US).

## Integrations
MLS/IDX feeds (via their provider), CRM (Follow Up Boss, kvCORE, HubSpot, Wix), booking (Cal.com, Wix Bookings).

## SEO
RealEstateAgent structured data, neighbourhood pages with real local content, listing pages as real URLs.

## Hosting
Vercel/Cloudflare for showcases; Wix Headless when the client wants to self-manage listings and leads.

## Lessons from real projects
- 2026-09 Vértice (Nashville): black + gold logo, editorial serif look. Reference sites the client liked: findrealestate.com, elyse-residence (Webflow), allys.mu, vistaprops.com. Booking left as a demo; Wix Headless planned for CMS/CRM.
- 2026-09 Velaire Miami (portfolio demo): navy + gold line monogram. References: modusprojects.nl (scroll-scrubbed canvas film hero, floating glass nav, rounded inset panels, "+" service rows) and thetandemco.com (full-width fitted caps headlines with letter reveals, serif statements, live clocks, stacking cards with line art). A WebP frame sequence cut from the client's video was tried first for the hero and dropped after client feedback: it stuttered while scrubbing and looked soft on mobile. Replaced by 3–4 full-resolution photos in pinned chapters, each zooming in with scroll and crossfading into the next (one scrubbed GSAP timeline, scrub 0.6); sharper, smoother and 8.5 MB lighter. What worked: Jost caps + Cormorant italics; a scroll-triggered page tone shift to navy for the developments band. Watch for: AI-generated media with corner watermarks (crop the whole sequence), `data-fit` needs `width: max-content` and a `minmax(0,1fr)` grid parent, long service titles overflowing at 375px, stacking cards must not fade (use scale/brightness), Vite "Outdated Optimize Dep" after a concurrent build (restart dev server).
