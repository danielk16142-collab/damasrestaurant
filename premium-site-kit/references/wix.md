# Wix Headless with the kit

Wix supplies the backend (dashboard, content, leads, bookings, payments). The kit stays the frontend: design, motion and pages are unchanged. Decide the modules in the brief. Each one replaces a specific part of the kit and needs its Wix app installed on the client's Wix site.

## Setup requirements
- The **Wix connector must be authorised** in the user's claude.ai connector settings (or through `/mcp` in a terminal session). Until then, nothing Wix-side can be created from here; say so and keep the Wix parts as placeholders.
- The client needs a Wix account and site. Plan requirements (e.g. for Bookings, Stores or a custom domain) change, so have the user check Wix's current pricing before quoting.
- **Use the Wix skills for the actual integration; never guess Wix APIs.** `wix-headless` sets up the backend and connects an existing design, `wix-headless-fast` provides ready-made SDK code per business app, `wix-vibe-headless` gives a client-only REST approach, `wix-manage` configures and seeds content, and `wix-docs` confirms exact endpoints.

## Always a new headless project per client

The user's standard: **every Wix project gets a brand-new Wix Headless project**, with only the modules agreed in the plan installed. Don't reuse an existing site from their account, even if one has the client's name; ask first if that seems intended.

- Create it as a **headless** project using the headless setup route (`wix-headless` skill / the connector's headless business guide). **Never** use "create site from template", "Wix Site Builder" or AI site creation: those make a Wix Editor site with Wix's own design, which is not what the kit is for.
- Name it after the client (e.g. "Casa Lumen Realty"), then install the apps for the chosen modules and nothing else.
- Creating a Wix project is an action on the user's account, so confirm the name and module list with them first.

What "headless" means for the client (explain this in the plan):
- The site design is our code. The Wix Editor is not used, and the client can't rearrange layouts. They edit **content** in the Wix dashboard (items, leads, bookings, menus), which keeps the design safe.
- Backend features are what Wix's apps provide; we build every visitor-facing screen ourselves. Checkout/payment pages are typically Wix-hosted.

## Hosting modes (ask in the brief)
| Mode | What it means | Choose when |
|---|---|---|
| **Wix-managed headless** | The Astro site is built and released to Wix hosting; the domain is on Wix | the client wants one platform and one bill |
| **External host + Wix backend** | The site stays on Vercel, Cloudflare or Hostinger and reads from Wix | you want Vercel previews or cheaper hosting; Wix only for data |

The kit is Astro, which matches Wix's own headless setup, so either mode keeps the design as it is.

## Modules: what each replaces

| Wix module | Replaces in the kit | Client manages in the Wix dashboard |
|---|---|---|
| **CMS (Wix Data)** | the sample arrays in `src/lib/content.ts` (listings, areas, treatments, projects, rooms, team) | adding and editing items, photos, "featured", status |
| **Forms + Contacts (CRM)** | `submitEnquiry()` in `InquiryForm.tsx`, and the footer newsletter | leads, contact history, follow-ups, email marketing |
| **Bookings** | `BookingDemo.tsx` (and the "Book a viewing/consultation" panels) | services, staff calendars, availability, Google Calendar sync |
| **Restaurants** | menu data, reservations widget, online ordering | menus, dishes, prices, reservations, orders |
| **Stores / eCommerce** | a shop section (products, cart, hosted checkout) | products, inventory, orders |
| **Events & tickets** | an events page, RSVP or ticketing | events, tickets, guest lists |
| **Pricing plans** | a memberships/packages page with checkout | plans, subscriptions |
| **Blog** | a blog/news section (new pages) | posts, categories |
| **Members** | login and members-only pages | members, permissions |
| **Portfolio** | the projects gallery (architects, home services) | projects and media |

Keep the function signatures in `content.ts` (`getProperties()`, `getProperty(slug)`...) and change only their bodies to Wix queries. The pages then don't change.

## Likely modules per industry (pre-select, then confirm)
| Industry | Usually | Sometimes |
|---|---|---|
| Real estate | CMS (listings, areas), Forms + CRM | Bookings (viewings/calls), Blog |
| Healthcare | Forms + CRM (no medical details), Bookings | CMS (treatments, doctors), Blog. Check the privacy notes in `industries/healthcare.md` before sending anything health-related to Wix. |
| Home services | Forms + CRM (quotes), Portfolio or CMS (projects) | Bookings (estimates/visits), Pricing plans (maintenance plans) |
| Restaurants | Restaurants (menus, reservations, ordering) | Events, Stores (gift cards/merch), Forms (private events) |
| Hospitality | Bookings, or the property's own booking engine | CMS (rooms, experiences), Events (weddings), Forms |

## Build order with Wix
1. Agree the modules and hosting mode in the plan, including the collections and fields for each CMS item type (mirror the TypeScript interfaces in `content.ts`).
2. Build the site with local sample data first, so the design can be approved without waiting on Wix.
3. With the connector authorised, use the Wix skills to install the apps, create the collections, and seed them with the approved content.
4. Swap the data layer and the form/booking components to Wix, one module at a time, checking each in the browser.
5. Deploy in the chosen hosting mode. Hand over with a short note on where in the Wix dashboard the client edits each thing.
