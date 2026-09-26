/**
 * Business facts in one place. Everything visible on the site and in the
 * structured data (JSON-LD) reads from here, so NAP stays consistent with
 * the Google Business Profile.
 *
 * ⚠️ Items marked CONFIRM come from public listings, not from Damas directly.
 */
export const site = {
  name: 'Damas',
  legalName: 'Restaurant Damas',
  url: 'https://www.damas.ca',
  since: 2010,
  movedToVanHorne: 2015,
  chef: 'Fuad Alnirabie',
  phone: '+1-514-439-5435',
  phoneDisplay: '514 439-5435',
  email: null as string | null, // CONFIRM: add a public email for private events if there is one
  address: {
    street: '1201, avenue Van Horne',
    streetEn: '1201 Van Horne Avenue',
    locality: 'Outremont, Montréal',
    region: 'QC',
    postalCode: 'H2V 1K4',
    country: 'CA',
  },
  geo: { lat: 45.5225104, lng: -73.6132522 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Damas+1201+Avenue+Van+Horne+Montr%C3%A9al',
  mapsEmbed: 'https://www.google.com/maps?q=Damas,+1201+Avenue+Van+Horne,+Montr%C3%A9al&output=embed',
  reservationUrl: 'https://www.opentable.com/r/damas-montreal',
  instagram: null as string | null, // CONFIRM: e.g. 'https://www.instagram.com/…'
  seats: 100,
  terraceSeats: 70,
  priceRange: '$$$$',
  // CONFIRM: from public listings (dinner from 17:30; weekend brunch 10:00–14:00)
  hours: {
    dinner: { days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], opens: '17:30', closes: '22:00' },
    brunch: { days: ['Sa', 'Su'], opens: '10:00', closes: '14:00' },
  },
  awards: [
    { fr: 'Guide MICHELIN — Bib Gourmand', en: 'MICHELIN Guide — Bib Gourmand', year: '2025' },
    { fr: "Canada's 100 Best Restaurants", en: "Canada's 100 Best Restaurants", year: '' },
  ],
} as const;
