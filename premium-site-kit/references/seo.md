# SEO: brief, build and launch

SEO is planned before design, because it decides page names, headlines, URLs and which pages exist. It's not a launch-day extra.

## 1. Ask in the brief: who writes the SEO brief?

Ask as a single-choice question:

- **"I'll give you an SEO brief"** (from the user's own SEO agent or a specialist). Ask them to fill `assets/seo-brief-template.md` or send it in any format; map it onto the template's fields and point out anything missing (usually: keywords per language, the Google Business Profile, or the old URLs of a redesign). Their brief wins over your own opinions on keywords; raise concerns, don't silently change it.
- **"You do it"**: run the research below and present the brief in the plan for approval.
- **"Later / basics only"**: build the technical SEO (section 3) and page titles from the industry guide, and list the SEO brief as an open item in the plan.

## 2. Doing the SEO brief yourself

Work per market (city/region) and per language. Output the brief in the format of `assets/seo-brief-template.md`.

1. **Seed keywords** from the industry guide's SEO section and the client's services × locations ("dentist Laval", "landscaping Plateau", "luxury homes Nashville"), in every site language.
2. **Volumes and difficulty:** with the DataForSEO connector if it's connected (Google Ads search volume, keyword ideas/suggestions, keyword difficulty, SERP competitors for the location and language). If a call returns HTTP 402 (quota), stop and say what's missing; don't guess numbers. Without it, use `WebSearch` and the SERP itself to judge intent, and say the volumes are estimates.
3. **Competitors:** the 3–5 sites ranking for the main terms locally; note their page types, titles and what they lack (`deep-research`, or the `searchfit-seo:competitor-analyzer` agent).
4. **Cluster** keywords into pages (`searchfit-seo:keyword-clustering`): one primary keyword per page, 2–5 secondaries, no two pages targeting the same term. Clusters with no matching page become proposed pages (service × location pages, FAQ, guides); say which ones are worth building now.
5. **Per page:** primary keyword, title (≤ 60 characters, keyword first, brand last), meta description (≤ 155 characters, with a reason to click), H1 (natural, contains the keyword or a close variant; can differ from the title), URL slug, schema type, internal links in and out.
6. **Local SEO:** Google Business Profile (exists? category? NAP must match the site exactly), service areas, reviews strategy, local citations to claim.
7. **AI visibility:** clear "who, what, where, price range" statements on the home and about pages, a real FAQ per service, and consistent facts across the site and the Business Profile, so AI assistants can cite them (`searchfit-seo:ai-visibility` for a deeper pass).

## 3. Build (always, whatever the brief)

- Unique `<title>` and meta description on every page and language, from the brief. No duplicates.
- One `<h1>` per page; headings in order (h2 → h3), not chosen for size.
- `astro.config.mjs` `site` set to the real domain; canonical on every page; hreflang when multilingual (see `i18n.md`).
- `@astrojs/sitemap` added (includes every language) and `public/robots.txt` pointing at it. Legal pages can stay indexable; thank-you pages and 404 get `noindex`.
- **Structured data (JSON-LD)** in `Base.astro` or per page, with the industry's type: `RealEstateAgent`, `Dentist` / `Physician` / `MedicalClinic`, `HomeAndConstructionBusiness` / `LandscapingBusiness` / `HousePainter`…, `Restaurant` (with `servesCuisine`, `menu`, `acceptsReservations`), `Hotel` / `LodgingBusiness`, `ProfessionalService`. Always name, address, geo, phone, opening hours, `areaServed`, `sameAs` (socials), logo, image. Add `FAQPage` where there's an FAQ, `BreadcrumbList` on deep pages, `Product`/`Offer` for listings or rooms when prices are real. Use `searchfit-seo:schema-markup`; validate in Google's Rich Results Test.
- **Open Graph:** a 1200×630 image per key page (branded, readable at small size), `og:title`, `og:description`, `twitter:card=summary_large_image`.
- **Images:** descriptive file names, real alt text in each language, sized and in WebP/AVIF via `astro:assets`.
- **Internal links:** every service/listing page reachable in two clicks and linked from at least one other relevant page, with descriptive anchor text (not "click here").
- **Redesigns:** crawl the old site first and build a **301 redirect map** from every old URL that has traffic or backlinks to its new equivalent (`vercel.json` redirects, or `.htaccess` on Hostinger). Losing this loses the client's rankings.
- **Performance** is SEO: meet the budgets in `quality-bar.md`.

## 4. Verify and hand over

- `searchfit-seo:seo-check` on every page type (and `searchfit-seo:technical-seo` on the build).
- View source on a page per language: title, description, canonical, hreflang, JSON-LD, OG tags present and correct.
- After launch: verify the domain in **Google Search Console** and submit the sitemap; connect **GA4** (behind the cookie consent); update the **Google Business Profile** website link. These accounts belong to the client (see the handover list in `quality-bar.md`).
- Put the SEO brief, the keyword → page map and the redirect map in the project as `SEO.md` so the user's SEO agent can pick up from there.
