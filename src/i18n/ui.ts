export type Lang = 'fr' | 'en';
export const langs: Lang[] = ['fr', 'en'];

/** Page keys → localized paths. Keeps slugs natural in each language for SEO. */
export const routes = {
  home: { fr: '/', en: '/en/' },
  story: { fr: '/notre-histoire/', en: '/en/our-story/' },
  menus: { fr: '/menus/', en: '/en/menus/' },
  events: { fr: '/evenements-prives/', en: '/en/private-events/' },
  contact: { fr: '/nous-joindre/', en: '/en/contact/' },
} as const;
export type RouteKey = keyof typeof routes;

export const t = {
  fr: {
    skip: 'Aller au contenu',
    reserve: 'Réserver',
    reserveLong: 'Réserver une table',
    menu: 'Menu',
    close: 'Fermer',
    nav: { home: 'La maison', story: 'Notre histoire', menus: 'Les menus', events: 'Événements privés', contact: 'Nous joindre' },
    langName: 'Français',
    otherLang: 'EN',
    otherLangLabel: 'English version',
    enter: 'Entrer',
    skipIntro: "Passer l'introduction",
    scroll: 'Défiler',
    since: 'Depuis 2010',
    cuisine: 'Cuisine syrienne',
    city: 'Outremont · Montréal',
    hours: 'Heures',
    dinner: 'Dîner',
    brunch: 'Brunch',
    brunchDays: 'Samedi et dimanche',
    dinnerDays: 'Tous les soirs',
    from: 'dès',
    address: 'Adresse',
    phone: 'Téléphone',
    directions: 'Itinéraire',
    downloadPdf: 'Télécharger le PDF',
    viewMenus: 'Voir les menus',
    wineList: 'Carte des vins complète',
    prices: 'Prix en dollars canadiens, taxes et service en sus.',
    allergies: "Mentionnez-nous toute allergie ou restriction alimentaire lors de la réservation.",
    footerTag: 'Une nuit à Damas, au cœur d’Outremont.',
    rights: 'Tous droits réservés.',
    night: 'Nuit',
    sound: 'Son',
  },
  en: {
    skip: 'Skip to content',
    reserve: 'Reserve',
    reserveLong: 'Reserve a table',
    menu: 'Menu',
    close: 'Close',
    nav: { home: 'The house', story: 'Our story', menus: 'Menus', events: 'Private events', contact: 'Contact' },
    langName: 'English',
    otherLang: 'FR',
    otherLangLabel: 'Version française',
    enter: 'Enter',
    skipIntro: 'Skip intro',
    scroll: 'Scroll',
    since: 'Since 2010',
    cuisine: 'Syrian cuisine',
    city: 'Outremont · Montréal',
    hours: 'Hours',
    dinner: 'Dinner',
    brunch: 'Brunch',
    brunchDays: 'Saturday & Sunday',
    dinnerDays: 'Every evening',
    from: 'from',
    address: 'Address',
    phone: 'Phone',
    directions: 'Directions',
    downloadPdf: 'Download PDF',
    viewMenus: 'See the menus',
    wineList: 'Full wine list',
    prices: 'Prices in Canadian dollars; taxes and service not included.',
    allergies: 'Please let us know of any allergies or dietary restrictions when booking.',
    footerTag: 'A night in Damascus, in the heart of Outremont.',
    rights: 'All rights reserved.',
    night: 'Night',
    sound: 'Sound',
  },
} as const;

export const fmtTime = (hhmm: string, lang: Lang) => {
  const [h, m] = hhmm.split(':');
  if (lang === 'fr') return `${Number(h)} h ${m === '00' ? '' : m}`.trim();
  const hr = Number(h);
  const suffix = hr >= 12 ? 'pm' : 'am';
  const h12 = hr % 12 || 12;
  return `${h12}${m === '00' ? '' : ':' + m} ${suffix}`;
};
