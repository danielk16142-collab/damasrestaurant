/**
 * Content layer (premium-site-kit): every business fact the site shows or puts in
 * structured data lives here, so it can later move to a CMS without touching pages.
 * Facts come from the live damas.ca (hours, contact, integrations) and the client's
 * printed menus. Items still owed by Damas are marked TO CONFIRM and gathered in
 * `pending` so they are easy to review.
 */
import type { Lang } from './i18n';
import type { L } from './menus';

export const site = {
  name: 'Restaurant Damas',
  short: 'Damas',
  url: 'https://www.damas.ca',
  since: 2010,
  movedToVanHorne: 2015,
  chef: 'Fuad Alnirabie',
  phone: '(514) 439-5435',
  phoneIntl: '+15144395435',
  email: 'info@damas.ca',
  address: {
    street: { fr: '1201, avenue Van Horne', en: '1201 Van Horne Avenue' } as L,
    city: 'Montréal',
    region: 'QC',
    postalCode: 'H2V 1K4',
    country: 'CA',
    neighbourhood: 'Outremont',
  },
  geo: { lat: 45.5225104, lng: -73.6132522 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurant+Damas+1201+Avenue+Van+Horne+Montr%C3%A9al',
  mapsEmbed: 'https://www.google.com/maps?q=Restaurant+Damas,+1201+Avenue+Van+Horne,+Montr%C3%A9al&output=embed',
  priceRange: '$$$',
  seats: 100,
  terraceSeats: 70,
  largeGroupFrom: 9, // "plus de huit personnes" → email
  social: {
    instagram: 'https://www.instagram.com/damasrestaurant',
    facebook: 'https://www.facebook.com/pages/category/Syrian-Restaurant/Damas-Restaurant-126815284031750/',
  },
  /** Opening hours in Montréal time. Days: 0 = Sunday … 6 = Saturday. */
  hours: {
    dinner: { days: [0, 1, 2, 3, 4, 5, 6], opens: '17:30', closes: '22:00' },
    brunch: { days: [0, 6], opens: '11:00', closes: '15:00' },
    closedDates: ['01-01'], // MM-DD
  },
  awards: [
    { label: { fr: 'Guide MICHELIN · Bib Gourmand', en: 'MICHELIN Guide · Bib Gourmand' } as L, year: '2025' },
    { label: { fr: "Canada's 100 Best Restaurants", en: "Canada's 100 Best Restaurants" } as L, year: '' },
  ],
} as const;

export const integrations = {
  opentableRid: '66991',
  opentableUrl: 'https://www.opentable.ca/r/damas-montreal',
  opentableWidget: (lang: Lang) =>
    `https://www.opentable.ca/widget/reservation/loader?rid=66991&type=standard&theme=wide&color=2&dark=true&iframe=true&domain=ca&lang=${lang === 'fr' ? 'fr-CA' : 'en-CA'}&newtab=false&ot_source=Restaurant+website`,
  giftCardUrl: (lang: Lang) => `https://treater.co/products/damas?view=${lang}`,
  folfol: {
    site: (lang: Lang) => `https://folfol.com/${lang}`,
    instagram: 'https://www.instagram.com/thefolfol/',
    facebook: 'https://www.facebook.com/realfolfol',
  },
};

/** Legal details for the privacy, cookies and terms pages (premium-site-kit references/legal.md). */
export const legal = {
  entity: 'Restaurant Damas', // TO CONFIRM: registered business name
  address: '1201, avenue Van Horne, Montréal (QC) H2V 1K4',
  privacyContact: { fr: 'la direction du Restaurant Damas', en: 'the management of Restaurant Damas' } as L, // TO CONFIRM: named person (Law 25)
  privacyEmail: 'info@damas.ca', // TO CONFIRM: dedicated privacy address if any
  governingLaw: { fr: 'le Québec, Canada', en: 'Québec, Canada' } as L,
  updated: '2026-09-26',
  /** Every third party that processes visitor data. Keep it in sync with what the site loads. */
  processors: [
    { name: 'Vercel Inc.', purpose: { fr: 'Hébergement du site', en: 'Hosting the website' } as L, location: { fr: 'États-Unis', en: 'United States' } as L },
    { name: 'OpenTable', purpose: { fr: 'Réservations en ligne (seulement si vous ouvrez le module)', en: 'Online reservations (only if you open the booking widget)' } as L, location: { fr: 'États-Unis / Canada', en: 'United States / Canada' } as L },
    { name: 'Google Maps', purpose: { fr: 'Carte d’accès (seulement si vous l’affichez)', en: 'Map (only if you choose to show it)' } as L, location: { fr: 'États-Unis', en: 'United States' } as L },
  ],
};

/** No analytics or marketing tools: the cookie banner stays off (premium-site-kit CookieConsent). */
export const consent = { analytics: false, marketing: false };

/** What Damas still owes us; shown nowhere, listed here for review. */
export const pending = [
  'Registered business name and the named person responsible for personal information (Quebec Law 25).',
  'Private events: days available, capacities, minimums, deposit and cancellation policy.',
  'Dietary labels (V / VG / GF) and allergen information for the menus.',
  'Press quotes with sources; year(s) of the Canada’s 100 Best listing to cite.',
  'Events form destination (what powers damas.ca/api/private-events today).',
  'Vector (SVG/AI) logo files; the current wordmark and emblem are traced from a 1080px image.',
];

export const photoCredits = null; // TO CONFIRM: photographer credit, if Damas wants one shown
