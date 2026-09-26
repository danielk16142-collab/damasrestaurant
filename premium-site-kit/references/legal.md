# Legal pages, cookies and data treatment

**Every site ships with its legal pages.** Never launch without them, including showcase sites that have a working form. They are part of the plan (item "Legal") and of the launch checklist.

These are drafts built from the client's real details, not legal advice. Say so to the user once, mark each page "Last updated <date>", and recommend a lawyer's review for regulated industries (healthcare, finance, legal) and for e-commerce. Never claim the site is "fully compliant".

## Ask in the brief

1. **Where are the client's customers?** Multi-select: Quebec · Rest of Canada · United States (which states, California especially) · EU / UK · Colombia · Mexico / rest of Latin America · Australia / New Zealand · **Global / not sure**. If the answer is global or unsure, use the **global baseline** below.
2. **Legal entity details:** registered business name, address, contact email for privacy requests, and the **person responsible for personal information** (Quebec requires one; by default it's the owner or CEO).
3. **What the site collects and which tools process it:** forms, newsletter, bookings, payments, analytics (GA4, Meta Pixel…), chat widgets, embedded maps or videos, and the host/backend (Vercel, Hostinger, Wix, Formspree, Cal.com…). Each one is named in the privacy policy.

## Always included

| Page | Route | Covers |
|---|---|---|
| Privacy policy (data treatment) | `/privacy` | what is collected, why, legal basis/consent, who processes it (list the tools), where it's stored and transferred, how long it's kept, security, the visitor's rights and how to use them, the responsible person's contact, how changes are announced |
| Cookie policy | `/cookies` | each cookie/storage item by category (essential, analytics, marketing), its provider and lifetime, how to change consent (link that reopens the banner) |
| Terms and conditions (terms of use) | `/terms` | who runs the site, acceptable use, intellectual property, disclaimers and liability limits, links to third parties, governing law and jurisdiction, contact |

Plus, when they apply:

| When | Add |
|---|---|
| Online payments, e-commerce | returns/refunds, shipping, and the cooling-off/withdrawal rights for the customer's region |
| Bookings, reservations, rentals | booking, deposit and cancellation policy |
| Healthcare, legal, finance | a professional disclaimer (information, not advice); in the US, don't let forms collect health details unless the tool is HIPAA-ready with a signed BAA |
| France (and French businesses) | *Mentions légales* page (publisher, host, registration number) |
| Germany / Austria | *Impressum* |
| Any public-facing business (recommended) | Accessibility statement (WCAG 2.2 AA target, contact for issues) |
| Colombia | the privacy page must be titled *Política de Tratamiento de Datos Personales* and name the data controller, purposes, the holder's rights (know, update, rectify, delete, revoke) and the procedure for requests (Ley 1581 de 2012) |
| Mexico | *Aviso de privacidad* (full version on the page, short version by the form) |

## Rules by region (short version)

- **Global baseline** (use when unsure; it satisfies most places): opt-in consent before any non-essential cookies or tracking; "Reject all" as easy and as visible as "Accept all"; a full privacy policy naming the responsible person; a consent line on every form; a way to withdraw consent at any time (footer "Cookie settings" link).
- **Quebec (Law 25):** privacy policy in clear, simple language, published on the site; the person in charge of personal information named with contact details; tracking technologies that identify, locate or profile people **off by default** until the visitor opts in; consent specific to each purpose. Serve it in French (and English if the site is bilingual).
- **Rest of Canada (PIPEDA):** meaningful consent, a clear privacy policy. **Newsletters (CASL):** express consent (unticked checkbox), sender identity, one-click unsubscribe.
- **EU / UK (GDPR + ePrivacy):** legal basis for each purpose, prior opt-in for non-essential cookies, no pre-ticked boxes, consent records, the right of access, rectification, erasure, portability and complaint to the authority.
- **United States:** California requires a posted privacy policy for any site collecting personal information from California residents (CalOPPA); bigger businesses fall under CCPA/CPRA ("Do Not Sell or Share" link, honour Global Privacy Control). Other states have similar laws with size thresholds. Email marketing follows CAN-SPAM. A cookie banner isn't always required, but the global baseline is still the safe default.
- **Colombia (Ley 1581):** prior, express and informed authorisation (checkbox on forms linking to the *Política de Tratamiento*); some companies must also register their databases with the SIC; flag this to the client.
- **Brazil (LGPD), Australia, New Zealand:** privacy policy with purposes, rights and a contact; the global baseline covers the site side.

## How it's built (template)

- `src/components/CookieConsent.astro`: banner with Accept all / Reject all / Choose, same prominence for accept and reject, choices stored in `localStorage` (`consent`), reopened by any element with `data-cookie-settings` (the footer link). It only renders if `consent.analytics` or `consent.marketing` is true in `content.ts`; a site with no tracking needs no banner, but still has a cookie policy saying so.
- **Gating scripts:** write tracking scripts as `<script type="text/plain" data-consent="analytics" data-src="https://…">` (or inline code in the tag). The component turns them into real scripts only after that category is accepted, and fires `window` event `consent:change` so other code can react. Embeds (YouTube, Maps) that set cookies should use the same idea: show a placeholder with "Load video" until consent.
- `src/components/LegalPage.astro`: shared layout for the legal pages (title, last-updated date, readable prose, table of contents on long pages).
- `src/pages/privacy.astro`, `cookies.astro`, `terms.astro`: skeletons with every required section and `[[PLACEHOLDER]]` markers. Fill them with the client's details and tools; **delete sections that don't apply** rather than leaving generic text.
- **Footer:** links to all legal pages plus "Cookie settings" (when the banner is enabled) on every page, in every language.
- **Forms:** under the submit button, "By sending this form you agree to our [privacy policy]." For newsletters, a separate unticked consent checkbox. For Colombia or explicit-consent regions, make the checkbox required on the enquiry form too.

## Verify before launch

- `grep -rn "\[\[" src` returns nothing (no unfilled placeholders).
- Legal pages exist in every site language and are linked from every footer.
- With the banner on: load the site in a fresh private window, check the Network tab shows **no** analytics/marketing requests before accepting, then accept and confirm they load. Reject, reload, confirm they stay off. "Cookie settings" reopens the banner.
- Each tool listed in the privacy policy matches what the site actually loads (no more, no fewer).
- The privacy contact email works and reaches the client.
