/**
 * Structured data (JSON-LD) and titles. Restaurant on every page; Menu, DefinedTermSet,
 * FAQPage and BreadcrumbList where they apply (premium-site-kit references/seo.md).
 */
import { site, integrations } from './content';
import { routes, type Lang, type RouteKey } from './i18n';
import type { Menu } from './menus';
import { glossary } from './glossary';

export const abs = (path: string) => new URL(path, site.url).href;

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function restaurantLd(lang: Lang) {
  const { dinner, brunch } = site.hours;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${site.url}/#restaurant`,
    name: site.name,
    alternateName: site.short,
    url: abs(routes.home[lang]),
    image: [abs('/og/damas-home.jpg')],
    logo: abs('/brand/wordmark-night.svg'),
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    servesCuisine: lang === 'fr' ? ['Syrienne', 'Moyen-orientale', 'Méditerranéenne'] : ['Syrian', 'Middle Eastern', 'Mediterranean'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street.fr,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: dinner.days.map((d) => dayNames[d]), opens: dinner.opens, closes: dinner.closes },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: brunch.days.map((d) => dayNames[d]), opens: brunch.opens, closes: brunch.closes },
    ],
    acceptsReservations: true,
    potentialAction: {
      '@type': 'ReserveAction',
      target: { '@type': 'EntryPoint', urlTemplate: integrations.opentableUrl, inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA' },
      result: { '@type': 'FoodEstablishmentReservation', name: lang === 'fr' ? 'Réserver une table' : 'Reserve a table' },
    },
    hasMenu: abs(routes.menus[lang]),
    foundingDate: String(site.since),
    founder: { '@type': 'Person', name: site.chef, jobTitle: lang === 'fr' ? 'Chef et copropriétaire' : 'Chef and co-owner' },
    award: site.awards.map((a) => `${a.label[lang]}${a.year ? ' ' + a.year : ''}`),
    sameAs: [site.social.instagram, site.social.facebook],
  };
}

export function breadcrumbLd(lang: Lang, trail: { key: RouteKey; name: string }[]) {
  const home = { key: 'home' as RouteKey, name: lang === 'fr' ? 'Accueil' : 'Home' };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [home, ...trail].map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(routes[t.key][lang]) })),
  };
}

export function menuLd(menu: Menu, lang: Lang, key: RouteKey) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${abs(routes[key][lang])}#menu`,
    name: `${menu.title[lang]} — ${site.name}`,
    url: abs(routes[key][lang]),
    inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
    hasMenuSection: menu.sections.map((s) => ({
      '@type': 'MenuSection',
      name: s.title[lang],
      hasMenuItem: s.items.map((i) => ({
        '@type': 'MenuItem',
        name: i.name[lang],
        ...(i.desc?.[lang] ? { description: i.desc[lang] } : {}),
        ...(i.price && /^\d+$/.test(i.price) ? { offers: { '@type': 'Offer', price: i.price, priceCurrency: 'CAD' } } : {}),
      })),
    })),
  };
}

export function glossaryLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: lang === 'fr' ? 'Petit lexique de la table syrienne' : 'A small lexicon of the Syrian table',
    inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
    hasDefinedTerm: glossary.map((g) => ({
      '@type': 'DefinedTerm',
      name: lang === 'en' && g.termEn ? g.termEn : g.term,
      alternateName: g.ar,
      description: g.def[lang],
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}
