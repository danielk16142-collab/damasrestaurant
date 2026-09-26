# Industries: index

Each industry has its own guide in `industries/`. Read the one that matches the brief **before writing the plan**; it tells you which pages, conversion path, content rules and integrations that industry needs. The design system, motion engine, nav/footer, heroes, Process, FAQ, CTA band, multi-step form, booking widget and data layer carry over to every industry. What changes is the data model in `content.ts`, the pages, the default motion level and the copy.

| Industry | Guide | Main action | Default motion |
|---|---|---|---|
| Real estate (agencies, agents, developers) | `industries/real-estate.md` | valuation, viewing, buyer brief | signature |
| Healthcare (doctors, dentists, clinics, aesthetics) | `industries/healthcare.md` | book appointment | calm |
| Home services (landscaping, maintenance, cleaning, trades) | `industries/home-services.md` | call, free quote | calm to signature |
| Restaurants, bars, cafés | `industries/restaurants.md` | reserve | calm to signature |
| Hospitality (hotels, villas, rentals) | `industries/hospitality.md` | check availability, book direct | signature to expressive |
| Agencies and studios (web, marketing, AI, branding) | `industries/agency.md` | book a call, start a project | expressive |
| Architects, interiors, other | no guide yet; use the table below, then create one | enquiry | varies |

Quick mapping for industries without a guide yet:

| Industry | "Properties" becomes | "Neighbourhoods" becomes | Buyers / Sellers become | Form intents |
|---|---|---|---|---|
| Architect / interiors | Projects (type, year, location) + case study | Services / Studio | Process / Collaborate | new build, renovation, interiors, press |
| Yacht / jet charter | Fleet (guests, length) + vessel page | Destinations | Charter / Ownership | charter, purchase, management |
| Law / finance / consulting | Practice areas + detail page | Team / Offices | Individuals / Businesses | consultation, case enquiry, general |
| Boutique agency | Case studies | Capabilities | Work with us / Careers | project, partnership, careers |

General adaptation notes:
- The detail-page pattern (hero, facts bar, sticky action panel, gallery + lightbox, FAQ) works for anything with photos and specs: a treatment, room, service, project or vessel. Rename the facts and the panel's call to action.
- Swap the mortgage estimator for something useful to the industry, or remove it.
- Booking and ordering: say plainly that the demo is a placeholder until the client's real tool is connected. Ask which tool they already use.
- Delete unused pages, nav links and imports; don't leave dead routes.
- Never invent reviews, credentials, prices, menus or outcomes for a live site. Demo placeholders must be marked as samples.

## Adding a new industry

When the brief is an industry with no guide:
1. Before planning, research how the best sites in that industry work (`deep-research`, plus the client's reference sites): the visitor's key questions, the main action, the tools the industry uses, legal/content rules, and the structured data type.
2. Copy `industries/_TEMPLATE.md` to `industries/<industry>.md` and fill it in. Show the user the key points as part of the plan.
3. Add a row to the table above.

After every project, whatever the industry, add a dated line to that guide's "Lessons from real projects" section: what the client wanted, the references they liked, what worked, and what to change next time. This is how the kit improves as the portfolio grows. Tell the user you've done it.
