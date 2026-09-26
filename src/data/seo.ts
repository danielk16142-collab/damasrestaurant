import { routes, type Lang, type RouteKey } from '../i18n/ui';
import { site } from './site';
import { dinner, brunch, desserts, drinks, tasting, type Menu } from './menus';
import { glossary } from './glossary';

/** Titles ≈ 50–60 chars, descriptions ≈ 140–160 chars, keywords in the first words. */
export const meta: Record<RouteKey, Record<Lang, { title: string; description: string }>> = {
  home: {
    fr: {
      title: 'Damas — Restaurant syrien à Montréal · Outremont',
      description: 'Damas, restaurant syrien d’Outremont depuis 2010 : mezzés, grillades sur charbon de bois et menu dégustation dans un décor des Mille et Une Nuits. Bib Gourmand MICHELIN.',
    },
    en: {
      title: 'Damas — Syrian Restaurant in Montreal · Outremont',
      description: 'Damas, Syrian restaurant in Outremont since 2010: mezzes, charcoal grills and a tasting menu in a Thousand and One Nights setting. MICHELIN Guide Bib Gourmand.',
    },
  },
  story: {
    fr: {
      title: 'Notre histoire — Damas, restaurant syrien à Montréal',
      description: 'L’histoire de Damas, du chef Fuad Alnirabie et de sa Syrie natale : un décor de palais damascène, l’art de recevoir à la syrienne et le petit lexique de la table.',
    },
    en: {
      title: 'Our Story — Damas, Syrian Restaurant in Montreal',
      description: 'The story of Damas, chef Fuad Alnirabie and his native Syria: a Damascene palace setting, Syrian hospitality and a small lexicon of the Syrian table.',
    },
  },
  menus: {
    fr: {
      title: 'Menus — Mezzés, grillades et brunch syrien | Damas Montréal',
      description: 'Les menus de Damas : mezzés froids et chauds, grillades sur charbon de bois, menu dégustation à 160 $, brunch du week-end, desserts, cocktails et vins du Levant.',
    },
    en: {
      title: 'Menus — Mezzes, Charcoal Grills & Brunch | Damas Montreal',
      description: 'Damas menus: hot and cold mezzes, charcoal grills, a $160 tasting menu, weekend brunch, desserts, cocktails and wines of the Levant. Syrian restaurant in Outremont.',
    },
  },
  events: {
    fr: {
      title: 'Événements privés et groupes — Damas, Montréal',
      description: 'Anniversaires, repas d’affaires, fêtes de famille : organisez votre événement privé chez Damas, restaurant syrien d’Outremont, autour d’un festin de mezzés à partager.',
    },
    en: {
      title: 'Private Events & Groups — Damas, Montreal',
      description: 'Birthdays, business dinners, family celebrations: host your private event at Damas, a Syrian restaurant in Outremont, around a feast of mezzes to share.',
    },
  },
  contact: {
    fr: {
      title: 'Nous joindre — Adresse, heures et réservations | Damas',
      description: 'Damas, 1201 avenue Van Horne, Outremont (Montréal). Heures d’ouverture, téléphone 514 439-5435, itinéraire et réservation en ligne.',
    },
    en: {
      title: 'Contact — Address, Hours & Reservations | Damas',
      description: 'Damas, 1201 Van Horne Avenue, Outremont (Montreal). Opening hours, phone 514 439-5435, directions and online reservations.',
    },
  },
};

const abs = (p: string) => new URL(p, site.url).href;

export function breadcrumb(page: RouteKey, lang: Lang) {
  if (page === 'home') return null;
  const names = { fr: { home: 'Accueil' }, en: { home: 'Home' } };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: names[lang].home, item: abs(routes.home[lang]) },
      { '@type': 'ListItem', position: 2, name: meta[page][lang].title.split(' — ')[0], item: abs(routes[page][lang]) },
    ],
  };
}

const menuToSchema = (m: Menu, lang: Lang) => ({
  '@type': 'Menu',
  name: m.title[lang],
  inLanguage: lang,
  hasMenuSection: m.sections.map((s) => ({
    '@type': 'MenuSection',
    name: s.title[lang],
    hasMenuItem: s.items.map((i) => ({
      '@type': 'MenuItem',
      name: i.name[lang],
      ...(i.desc && i.desc[lang] ? { description: i.desc[lang] } : {}),
      ...(i.price && /^\d+$/.test(i.price) ? { offers: { '@type': 'Offer', price: i.price, priceCurrency: 'CAD' } } : {}),
    })),
  })),
});

export function menuSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${abs(routes.menus[lang])}#menu`,
    name: lang === 'fr' ? 'Menus de Damas' : 'Damas menus',
    url: abs(routes.menus[lang]),
    inLanguage: lang,
    hasMenuSection: [
      ...[dinner, brunch, desserts, drinks].map((m) => ({ ...menuToSchema(m, lang), '@type': 'MenuSection' })),
      {
        '@type': 'MenuSection',
        name: lang === 'fr' ? 'Menu dégustation' : 'Tasting menu',
        description: tasting.text[lang],
        offers: { '@type': 'Offer', price: tasting.price, priceCurrency: 'CAD' },
      },
    ],
  };
}

export function glossarySchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: lang === 'fr' ? 'Petit lexique de la table syrienne' : 'A small lexicon of the Syrian table',
    inLanguage: lang,
    hasDefinedTerm: glossary.map((g) => ({
      '@type': 'DefinedTerm',
      name: lang === 'en' && g.termEn ? g.termEn : g.term,
      alternateName: g.ar,
      description: g.def[lang],
    })),
  };
}
