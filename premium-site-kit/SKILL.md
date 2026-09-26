---
name: premium-site-kit
description: >-
  Build a premium, motion-rich marketing website for any client from a proven starter kit (Astro +
  React islands + GSAP + Lenis): editorial typography, smooth scroll, reveals, page transitions, a
  multi-step enquiry/quote form and a booking widget, with industry guides for real estate, doctors
  and dentists, clinics, home services (landscaping, maintenance, cleaning, trades), restaurants and
  hospitality (hotels, villas, rentals), plus a process for adding new industries. Covers the whole
  job: a pickable effects menu, multilingual sites, legal pages with cookie consent, an SEO brief
  (the user's or one it researches), design quality gates and client handover. Use this skill
  whenever the user wants to build a new website for a client, business or brand (premium, modern,
  high-end, luxury or "Awwwards-style"), a portfolio or showcase site to sell their web design
  service, a site "like the Vértice one", or wants to reuse this framework/template, even if they
  don't name the kit.
---

# Premium Site Kit

A starter kit extracted from a finished, deployed site (Vértice Real Estate, Nashville). The `template/` folder is a complete working Astro project. You copy it, rebrand it with one script, then reshape it for the client.

**The template is a foundation, not a look.** Keep the engine: data layer, motion system, form, filters, cookie consent, legal pages, accessibility and performance work. The visible design (layouts, section order and compositions, fonts, type scale, image treatments, motion intensity, nav style) should change from client to client. A new site that is only a recoloured Vértice is a failure, even if it builds. That's why every project starts with a written plan the user approves (step 2) before any code is touched.

**Everything fits on every screen and in every language.** Text never overflows, gets cut off, falls under the minimum sizes or has touching headline lines, from a 320px phone to a 1920px screen, sideways and at 200% zoom, in every language the site ships in. Font sizes come from `scripts/type_scale.py`, and `scripts/check_type.mjs` must pass before any page is called done. See `references/typography.md`.

**Every site meets the quality bar** in `references/quality-bar.md`: its "Never" list, design rules, review gates, copy voice, accessibility baseline, performance budgets and handover checklist. Read it before planning and check against it before calling anything done.

## Companion skills by phase

This kit is the foundation; these skills sharpen each phase. Load them when you reach that phase, if they're available in the session.

| Phase | Skill | Use it for |
|---|---|---|
| Plan | `ui-ux-pro-max` | reference library: styles, palettes, font pairings, UX rules; check the palette and fonts against the vertical |
| Plan | `deep-research` | the client's market, competitors and neighbourhoods/locations |
| SEO | the user's own SEO agent, or `searchfit-seo:*` (`keyword-clustering`, `schema-markup`, `technical-seo`, `seo-check`, `ai-visibility`) + the DataForSEO connector | the SEO brief and its checks; see `references/seo.md` |
| Design direction | `frontend-design` (the main one) | distinctive art direction, typography, layout; avoiding generic AI-template looks |
| Design direction | `emil-design-eng`, `apple-design` | the small details that make it feel expensive: restraint, depth, type rhythm, fluid motion |
| Build | `building-components` | accessible, reusable components (cards, gallery, form, new sections) |
| Build | `vercel-react-best-practices` | performance of the React islands and heavy imagery |
| Build | `shadcn-ui` | only if a project deliberately switches to React + Tailwind; the kit itself uses plain CSS tokens |
| Languages | `searchfit-seo:content-translation`, `website-translator` | transcreating copy and keywords per language; see `references/i18n.md` |
| Motion | `animate` | building each picked effect properly: hero reveals, parallax, page transitions, signature moment |
| Motion | `find-animation-opportunities` | what should move and what shouldn't, once pages exist |
| Motion | `review-animations`, `improve-animations` | checking and tuning the motion after it's built |
| Polish | `design:design-critique` | the design review gates (screenshots vs references) |
| Type | `frontend-design` (`reference/typography.md`), `apple-design` §15 | the reasoning behind the type scale, line-height and letter-spacing rules |
| Polish | `web-design-guidelines`, `design:accessibility-review` | accessibility and UX audit before handover |
| Polish | `humanizer` | make the copy sound written by a person, in every language |
| Launch | `seo-audit`, `searchfit-seo:seo-check` | final SEO pass |
| Launch | `vercel-deploy` / `references/deploy.md` | hosting (Vercel, Hostinger, Cloudflare Pages, Wix) |

Image optimisation (PNG/JPG → responsive WebP) is built into the kit through `astro:assets`, so no extra step is needed; just keep originals in `src/assets`.

**Optional external tools** (connectors the user must authorise in their claude.ai connector settings before use): **Figma**, to mock up key pages before coding when the client wants to sign off a visual first; **Canva**, for social and marketing assets that match the site; **Wix**, for CMS/CRM/booking via Wix Headless (see `references/deploy.md`); **DataForSEO**, for keyword volumes and Lighthouse runs. Offer them in the plan when relevant; don't assume they're connected.

**Workflow in order:** brief → SEO brief → plan (`ui-ux-pro-max`, `deep-research`) → style tile (`frontend-design`, `emil-design-eng`) → build components then pages (`building-components`) → picked effects (`animate`) → legal pages and languages → polish and review gates (`design:design-critique`, `web-design-guidelines`, motion review, `humanizer`) → launch (`seo-audit`, deploy) → handover.

Mention in the plan which of these you'll use, so the user knows what each phase includes.

## 1. Brief: ask before building

Ask in rounds, with the question tool if available (multiple-choice, up to 4 questions per round). Skip any question the conversation has already answered.

**Round 1: what are we building?** Start here unless the user has already said so clearly; the answers pick the industry guide, the pages, the main action and the default feel.

- **Industry:** Real estate · Doctor / dentist / clinic · Home services (landscaping, maintenance, cleaning, trades) · Restaurant / bar / café · Hospitality (hotel, villa, rental) · Other (they describe it; follow "Adding a new industry" in `references/verticals.md`)
- **Kind of site:** Full multi-page website · One-page landing site · Portfolio/demo piece (sample content, for selling the service) · Redesign of an existing site (get the current URL and review it first)
- **Who it's for:** a real client (real content, launch) or the user's own portfolio (sample content allowed, clearly marked)
- **Where it will be deployed:** Vercel · Hostinger · Cloudflare Pages · Wix (Headless). This decides how the site is built: Hostinger adds `--add-hostinger`, and **Wix changes the data layer** (content comes from the Wix dashboard instead of `content.ts`) and which tools you'll use. If they're unsure, recommend one from the table in `references/deploy.md` and say why.

**Round 2: always asked, every project.**

- **Languages (multi-select):** English · French · Spanish · Other. Then which one is the default at `/`. Never assume a single language, even when the brief is in English. See `references/i18n.md`.
- **Where are the client's customers? (multi-select, for the legal pages):** Quebec · Rest of Canada · United States · EU / UK · Colombia / Latin America · Global / not sure. Global or unsure means the global baseline. See `references/legal.md`.
- **SEO brief:** "I'll give you one (from my SEO agent)" · "You research and write it" · "Later, basics only for now". See `references/seo.md`.
- **Motion level:** Calm · Signature · Expressive (pre-select the industry default). The specific effects are picked in the plan from `references/effects.md`.

**If the deploy target is Wix,** the standard is a **brand-new Wix Headless project for each client** (never an Editor/template/AI-built site, never reusing an existing site), with only the chosen modules installed; see `references/wix.md`. **Ask which Wix backend modules the client will use** (multi-select), because each one replaces part of the kit and needs the matching Wix app installed on their site. Pre-select the likely ones from the industry guide and let them adjust. The options and what each replaces are in `references/wix.md`: CMS (listings, treatments, projects, menus as collections) · Forms + Contacts/CRM (the enquiry form) · Bookings (the booking widget) · Restaurants (menus, online ordering, reservations) · Stores · Events & tickets · Pricing plans / memberships · Blog · Members (login areas) · Portfolio. Also ask whether it's hosted on Wix (Wix-managed headless) or elsewhere with Wix only as the backend, and whether the Wix connector is authorised in their claude.ai connector settings; nothing Wix-side can be set up until it is.

Then read `references/verticals.md`, the matching `references/industries/<industry>.md` **and every past project brief in `references/briefs/<industry>/`** **before asking the rest**, so the follow-up questions fit the industry (e.g. a restaurant gets asked about its reservation tool, a landscaper about service areas, a clinic about its scheduling system).

**Round 3: the details.** Many answers will already be in the conversation, so ask only for what's missing, in one short message:

1. **Brand:** full name and short name (for the wordmark), plus the logo file (SVG is best). Logo colours drive the whole palette, so treat them as fixed unless the user says otherwise.
2. **Reference websites:** always ask for 2–4 sites the client likes for style and motion. Then study them before designing: open each in the browser, scroll through with screenshots, and note typography, colour mood, layout rhythm, how images enter, and nav behaviour. Borrow principles, not layouts. Write down 4–6 concrete takeaways ("huge serif headlines mixing italic words", "floating glass nav", "numbered service list with hover image") and tell the user what you took from each. If they have no references, offer two or three contrasting directions from `references/design-variations.md` (e.g. editorial classic vs quiet minimal vs coastal) and let them choose.
3. **Market:** city/region and service area.
4. **Pages needed:** start from the industry guide's page list and confirm or adjust (the legal pages are always added).
5. **Photos:** where they are, and which set suits the detail page (a home's rooms, a treatment room, a finished project, a hotel room).
6. **Main goal and existing tools:** the one action the site must drive (call, quote, booking, reservation, valuation) and the tools the business already uses for it (from the industry guide's Integrations list).
7. **Legal details:** registered business name and address, the privacy contact person and email, and every tool that will process visitor data (analytics, forms, booking, chat, pixels). These fill the legal pages.
8. Anything that must stay a placeholder for now (booking, CRM).

## 2. Plan: required, and approved before any code

Write a project plan and wait for the user's go-ahead. Planning is where the site gets its own identity, and changing direction later costs far more. Use `references/design-variations.md` as the menu, and let the brand, the logo, the reference sites and the audience drive the choices, not habit. Deliberately differ from the template wherever the brief points elsewhere, and say so.

The plan covers:

1. **Concept:** one sentence of design direction and the single memorable idea (e.g. "coastal calm: airy white space, horizon lines, slow tide-like reveals"; Vértice's was "the vertex": a gold line rising into the monogram).
2. **What we took from the references**, site by site.
3. **Palette:** accent + base from the logo, light/dark balance (mostly light, mostly dark, or alternating), and the script's contrast results.
4. **Typography:** the display + body pairing and why it fits the logo, the type scale generated with `scripts/type_scale.py` (base and ratio chosen, with its px table), and how big the headlines go (checked against the longest language).
5. **Languages:** which ones, the default, the URL structure, and who reviews each language's copy.
6. **Sitemap:** pages per language, what's dropped or added versus the template, following the industry guide and the SEO brief; legal pages included.
7. **Section plan per page:** an ordered list of sections, each marked **reuse** (as is), **restyle** (same component, new look) or **new** (built for this client). Home and the detail page must include at least a few restyled or new sections, and no two consecutive sections share a layout.
8. **Effects:** the motion level, the checklist from `references/effects.md` with the pre-selected effects ticked for the user to confirm or change, where each picked effect lives, the signature moment, and the intro/preloader decision. The user has the final say on every effect.
9. **SEO:** the keyword → page map (from the user's brief or your research), titles, schema type, and redirects for a redesign.
10. **Legal and consent:** the regions and rules that apply, the pages to publish, whether a cookie banner is needed (any analytics/marketing tool = yes), and which tools the privacy policy will list.
11. **Components and features:** filters, form paths, booking, calculators; which stay placeholders.
12. **Hosting (already decided in the brief):** restate it with its setup steps. For Wix, list each chosen module, what it replaces in the kit, the collections/fields to create, and what the client will manage in their Wix dashboard.
13. **Assumptions and open questions.**

For a long plan, publish it as a page the user can read and comment on, or save `PLAN.md` in the project; otherwise present it in chat. Only move on once the user approves or adjusts it, and if the build later needs to depart from the plan, say so before doing it.

## 3. Scaffold and rebrand

```bash
# Find brand colours in the logo (darkest -> base, brightest/most saturated -> accent)
python <skill>/scripts/new_site.py --logo-colors path/to/logo.svg

# Preview the derived palette and its contrast checks
python <skill>/scripts/new_site.py --preview --accent "#C9A86A" --base "#0B0B0C"

# Create the site (target must be empty apart from photos/logo/docs)
python <skill>/scripts/new_site.py ./site-or-. --name "Casa Lumen Realty" --short "Casa Lumen" --accent "#..." --base "#..."
npm install
```

The script copies the template, derives the full palette from two colours (with a WCAG contrast report), rewrites every token and hard-coded colour, and swaps the template brand name. Read its contrast report. If "accent on ink" is below 4.5, the accent is too dark for dark sections, so tell the user and suggest a fix rather than silently changing their brand colour. `--recolor-only` re-runs the colours on an existing site.

The script does not touch the logo mark, content, images or copy. That's the next step.

**Style tile before pages.** Apply the type, tokens and one section in the new direction (a `/style` page or the home hero plus one section) and show the user before building the rest. See `quality-bar.md` §2.

## 4. Make it theirs

Carry out the approved plan: restyle and build the sections it lists, then work through `references/rebrand-checklist.md`. In short:

- **Logo:** replace the paths in `src/components/Monogram.astro` with the client's mark (keep `fill="currentColor"` and the mask pattern so it recolours per section). Update the wordmark in `Logo.astro` and `Footer.astro` to match the logo's typeface feel. Regenerate `public/favicon.svg`.
- **Type:** apply the pairing chosen in the plan. Fonts load in `src/layouts/Base.astro` and map to `--font-display` / `--font-body` in global.css. Write the scale with `python <skill>/scripts/type_scale.py --write <site>` and use only its tokens for font sizes. Set line-height and letter-spacing per the new family (`references/typography.md` §3), since every family sets differently.
- **Content:** all listings, areas and contact details live in `src/lib/content.ts`, and pages read only through its functions. Keep the function signatures; that file is the future CMS seam (Wix Headless or any other).
- **Images:** copy the user's photos into `src/assets/img/` with web-friendly names, then update the imports. Map them using the slot table in the checklist. Look at each photo (make a contact sheet) before assigning it: the hero needs the single most striking wide shot, with calm areas where text can sit.
- **Copy:** rewrite every headline, lede, testimonial, FAQ and figure for this client and market, following the copy voice in `quality-bar.md` §4. The template's words are Vértice's. Sample stats, team and testimonials are fine for a showcase, but keep the footer's "illustrative" disclaimer until real ones exist.
- **Effects:** build only the effects picked in the plan (`references/effects.md`); remove attributes and code for the ones not picked.
- **Languages:** if more than one, set up the view-per-page structure, dictionary and hreflang from `references/i18n.md` before writing copy, then transcreate each language.
- **Legal:** fill `legal` and `consent` in `content.ts`, complete `privacy`, `cookies` and `terms` (plus any extra pages the regions or industry need), gate every tracking script behind consent, and translate them per language (`references/legal.md`).
- **SEO:** apply the brief: titles, descriptions, H1s, slugs, JSON-LD, OG images, sitemap, robots, redirects (`references/seo.md` §3).
- **`astro.config.mjs` `site`:** set the real URL (or the Vercel URL) so canonical links and social previews are correct.

## 5. Verify like a user

1. `npm run build`: must pass.
2. Compare against the plan: every section built as planned, only the picked effects present, and the site doesn't read as Vértice with new colours. Show the user the home page early (hero plus two sections) before finishing the other pages, so direction problems surface cheaply.
3. Run the dev server (add `.claude/launch.json` with `npm run dev`, port 4321) and check every page in the browser at desktop (~1440) and mobile (375) widths, in every language. Look for: text over bright photo areas, headline sizes on short screens, cut-off or overflowing titles in the longest language, horizontal overflow (`document.documentElement.scrollWidth > innerWidth`), filters actually filtering, the form stepping through each path, the lightbox opening, the language switcher landing on the same page.
4. Open a **fresh** tab and read console errors. Old tabs keep stale logs.
5. Screenshotting scrolled positions: Lenis smooths scrolling, so use `window.__lenis.scrollTo(el, { immediate: true })` and wait around 2s for reveals before capturing.
6. Run the **screen check** (`node <skill>/scripts/check_type.mjs <dev-url>`, see `references/typography.md` §5) and fix every error, in every language; look through its phone and zoom screenshots.
7. Run the **design review gates**, accessibility checks and **performance budgets** in `quality-bar.md` §3, §5 and §6, the consent test in `legal.md`, and the SEO checks in `seo.md` §4. Report the Lighthouse scores.
8. `grep -rn "\[\[\|lorem\|Vértice\|Nashville" src` returns nothing that shouldn't be there.

## 6. Deploy, hand over and record lessons

Use the host agreed in the plan; `references/deploy.md` has step-by-step instructions for each. Summary: **Vercel** via GitHub import (automatic deploys and preview links); **Hostinger** via `new_site.py <site> --add-hostinger`, which adds `.htaccess` plus a GitHub Action that builds and uploads over FTP on every push; **Cloudflare Pages** via GitHub import like Vercel; **Wix** when the client needs its CMS, CRM or bookings; follow `references/wix.md` for the chosen modules. Vercel's old no-login deploy endpoint no longer works. Never ask the user to paste tokens into chat.

After launch, work through the handover checklist in `quality-bar.md` §7 (client owns the accounts, Search Console and analytics, form tests, editing guide, launch summary), then **write the project brief**: copy `references/briefs/_TEMPLATE.md` to `references/briefs/<industry>/<client-slug>.md` and fill it in (references, concept, reusable patterns, every client correction, pitfalls, open items). Add a dated one-line summary linking to it in the industry guide's "Lessons from real projects" section; move any pattern that has now worked for two clients into the guide's main sections; and add industry-agnostic lessons to `quality-bar.md` or `architecture.md`. See `references/briefs/README.md`. Record client corrections as they come in during the build, not from memory at the end.

## How the kit works (read before changing structure)

| Reference | Read it when |
|---|---|
| `references/quality-bar.md` | before planning and before calling anything done: never-list, design rules, review gates, copy voice, accessibility, performance, handover |
| `references/typography.md` + `scripts/type_scale.py`, `scripts/check_type.mjs` | every project: the type scale, minimum sizes, headline rules and the screen check that proves everything fits |
| `references/design-variations.md` | writing the plan: layouts, fonts, heroes, sections, details |
| `references/effects.md` | picking effects with the user, then building them |
| `references/i18n.md` | any site in more than one language (ask every time) |
| `references/legal.md` | every site: privacy, cookies, terms, consent banner, regional rules |
| `references/seo.md` + `assets/seo-brief-template.md` | the SEO brief (the user's or yours), SEO build and checks |
| `references/architecture.md` | before adding sections: the motion attribute API (`data-reveal`, `data-split`, `data-clip`, `data-parallax`, `data-words`, `data-count`, `data-magnetic`, `data-cursor`, `data-hscroll`), components, tokens and known pitfalls |
| `references/verticals.md`, `references/industries/*` | the brief and plan for each industry |
| `references/briefs/<industry>/*` | before planning (past builds in that industry: what worked, what clients corrected) and at handover (write the new one) |
| `references/rebrand-checklist.md` | step 4 |
| `references/deploy.md`, `references/wix.md` | hosting and the Wix backend |

Design principles that made the original feel expensive. Their execution should vary per client, but the principles hold:
- **Restraint in motion:** slow exponential ease-outs, one orchestrated entrance per page, no bounce, only the effects the user picked. Everything respects `prefers-reduced-motion`.
- **Editorial type:** very large display headlines with one or two italic accent words, generous whitespace, left-aligned asymmetric grids.
- **Light and dark sections alternate**, with the accent used sparingly for hairlines, italic words and the primary button, never as large fills.
- **Every page ends with a clear next step** (valuation, viewing, brief, call).
