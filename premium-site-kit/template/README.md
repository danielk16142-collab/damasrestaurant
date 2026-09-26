# Vértice Real Estate

Showcase website for a luxury real estate brand in Nashville. Built with Astro 7, React islands, GSAP and Lenis.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Pages

| Route | What it is |
|---|---|
| `/` | Home: intro animation, hero search, featured homes (pinned horizontal scroll), services, neighbourhoods, testimonials |
| `/properties` | Listings with filters (area, type, price, beds, sold, sort). Filters are kept in the URL. |
| `/properties/the-hawthorne-residence` | Example property page: gallery, lightbox, payment estimator, booking panel |
| `/neighbourhoods` | Six Nashville areas |
| `/buyers`, `/sellers` | Process, FAQ and calls to action. `/sellers#valuation` for valuations. |
| `/about` | Story, values, partners |
| `/contact` | Multi-step enquiry form and a call booking demo (`#book`) |

Deep links pre-fill the form: `/contact?intent=buy|sell|both|viewing|relocate`, `&property=<slug>`, `&area=<slug>`.

## Where things live

- `src/lib/content.ts`: **all listings and neighbourhoods**. Pages only read data through the functions in this file.
- `src/styles/global.css`: design tokens (brand gold `#D9B978`, ink `#080808`), type scale, buttons.
- `src/scripts/motion.ts`: motion driven by data attributes (`data-reveal`, `data-split`, `data-clip`, `data-parallax`, `data-count`, `data-magnetic`, `data-cursor`, `data-hscroll`). Everything is skipped for users who have reduced motion turned on.
- `src/components/InquiryForm.tsx`: the smart form. `submitEnquiry()` is simulated.
- `src/components/BookingDemo.tsx`: **placeholder** booking calendar. Nothing is sent.

## Going live

1. **Listings**: replace the function bodies in `src/lib/content.ts` with Wix CMS queries (Wix Headless). Keep the return shapes and the pages won't need to change.
2. **Enquiries**: point `submitEnquiry()` at Wix Forms so leads land in Wix Contacts (CRM).
3. **Booking**: replace `<BookingDemo />` on `/contact` with a Cal.com embed (Google Calendar + Google Meet) or Wix Bookings.
4. Replace the sample team, figures and testimonials with real ones, and remove the "illustrative" note in the footer.
