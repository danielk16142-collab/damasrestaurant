/**
 * Languages and URLs (see premium-site-kit references/i18n.md).
 *
 * Damas keeps its existing URL scheme: both languages are prefixed (/fr/…, /en/…)
 * with translated slugs, and / redirects to /fr/. Keeping every live URL means
 * no redirect map and no ranking loss at launch.
 */
export type Lang = 'fr' | 'en';
export const langs: Lang[] = ['fr', 'en'];
export const defaultLang: Lang = 'fr';

/** Page keys → path per language. Every internal link goes through `url()`. */
export const routes = {
  home: { fr: '/fr/', en: '/en/' },
  cuisine: { fr: '/fr/cuisine-syrienne/', en: '/en/syrian-cuisine/' },
  story: { fr: '/fr/notre-histoire/', en: '/en/our-story/' },
  menus: { fr: '/fr/menus/', en: '/en/menus/' },
  'menu-dinner': { fr: '/fr/menus/diner/', en: '/en/menus/dinner/' },
  'menu-brunch': { fr: '/fr/menus/brunch/', en: '/en/menus/brunch/' },
  'menu-brunch-drinks': { fr: '/fr/menus/brunch-boissons/', en: '/en/menus/brunch-drinks/' },
  'menu-desserts': { fr: '/fr/menus/desserts/', en: '/en/menus/desserts/' },
  'menu-wine': { fr: '/fr/menus/vins/', en: '/en/menus/wine-list/' },
  events: { fr: '/fr/evenements-prives/', en: '/en/private-events/' },
  reserve: { fr: '/fr/reserver/', en: '/en/reserve/' },
  gift: { fr: '/fr/carte-cadeau/', en: '/en/gift-card/' },
  delivery: { fr: '/fr/livraison/', en: '/en/delivery/' },
  contact: { fr: '/fr/contact/', en: '/en/contact/' },
  privacy: { fr: '/fr/confidentialite/', en: '/en/privacy/' },
  cookies: { fr: '/fr/temoins/', en: '/en/cookies/' },
  terms: { fr: '/fr/conditions/', en: '/en/terms/' },
  accessibility: { fr: '/fr/accessibilite/', en: '/en/accessibility/' },
  style: { fr: '/fr/style/', en: '/en/style/' },
} as const;
export type RouteKey = keyof typeof routes;

export const url = (key: RouteKey, lang: Lang, hash = '') => routes[key][lang] + (hash ? `#${hash}` : '');
export const other = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');

/** Formats "17:30" as "17 h 30" (fr) or "5:30 pm" (en). */
export function fmtTime(hhmm: string, lang: Lang) {
  const [h, m] = hhmm.split(':').map(Number);
  if (lang === 'fr') return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
  const h12 = h % 12 || 12;
  return `${h12}${m ? ':' + String(m).padStart(2, '0') : ''} ${h >= 12 ? 'pm' : 'am'}`;
}

const fr = {
  skip: 'Aller au contenu',
  reserve: 'Réserver',
  reserveTable: 'Réserver une table',
  seeMenus: 'Voir les menus',
  call: 'Appeler',
  directions: 'Itinéraire',
  menu: 'Menu',
  openMenu: 'Ouvrir le menu',
  closeMenu: 'Fermer le menu',
  mainNav: 'Navigation principale',
  home: 'Damas, accueil',
  nav: {
    home: 'Restaurant',
    cuisine: 'Cuisine',
    story: 'Histoire',
    menus: 'Menus',
    events: 'Événements',
    gift: 'Carte cadeau',
    contact: 'Contact',
  },
  navLong: {
    home: 'Le restaurant',
    cuisine: 'La cuisine syrienne',
    story: 'Notre histoire',
    menus: 'Les menus',
    events: 'Événements privés',
    gift: 'Carte cadeau',
    contact: 'Nous trouver',
  },
  langSwitch: 'English',
  langSwitchShort: 'EN',
  langSwitchLabel: 'Visit the English site',
  address: 'Adresse',
  hours: 'Heures d’ouverture',
  phone: 'Téléphone',
  email: 'Courriel',
  follow: 'Suivre',
  visit: 'Visiter',
  dinner: 'Dîner',
  brunch: 'Brunch',
  everyDay: 'Du lundi au dimanche',
  weekend: 'Samedi et dimanche',
  closedNewYear: 'Fermé le 1er janvier',
  delivery: 'Livraison',
  legal: 'Mentions',
  privacy: 'Confidentialité',
  cookies: 'Témoins',
  terms: 'Conditions',
  accessibility: 'Accessibilité',
  rights: 'Tous droits réservés.',
  backToTop: 'Haut de page ↑',
  credit: 'Concept\u00a0: Dany Designs',
  footerCta: ['Réserver', 'votre nuit'],
  footerEyebrow: 'Un voyage vers la Syrie',
  scroll: 'Défiler',
  skipIntro: 'Passer',
  downloadPdf: 'Télécharger le PDF',
  pricesNote: 'Prix en dollars canadiens, taxes et service en sus.',
  allergyNote: 'Avisez votre serveur de toute allergie ou restriction alimentaire.',
  openSection: 'Afficher',
  items: (n: number) => `${n} ${n > 1 ? 'plats' : 'plat'}`,
  refs: (n: number) => `${n} ${n > 1 ? 'références' : 'référence'}`,
  live: {
    now: (t: string) => `Il est ${t} à Outremont`,
    openUntil: (t: string) => `Ouvert ce soir jusqu’à ${t}`,
    opensAt: (t: string) => `Ce soir dès ${t}`,
    brunchNow: (t: string) => `Brunch en cours, jusqu’à ${t}`,
    closedToday: 'Fermé aujourd’hui',
    tomorrow: (t: string) => `Demain dès ${t}`,
  },
  night: 'Nuit',
  notFound: 'Page introuvable',
} ;

type Dict = typeof fr;

const en: Dict = {
  skip: 'Skip to content',
  reserve: 'Reserve',
  reserveTable: 'Reserve a table',
  seeMenus: 'See the menus',
  call: 'Call',
  directions: 'Directions',
  menu: 'Menu',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  mainNav: 'Main navigation',
  home: 'Damas, home',
  nav: {
    home: 'Restaurant',
    cuisine: 'Cuisine',
    story: 'Story',
    menus: 'Menus',
    events: 'Events',
    gift: 'Gift card',
    contact: 'Contact',
  },
  navLong: {
    home: 'The restaurant',
    cuisine: 'Syrian cuisine',
    story: 'Our story',
    menus: 'The menus',
    events: 'Private events',
    gift: 'Gift card',
    contact: 'Find us',
  },
  langSwitch: 'Français',
  langSwitchShort: 'FR',
  langSwitchLabel: 'Visiter le site en français',
  address: 'Address',
  hours: 'Opening hours',
  phone: 'Phone',
  email: 'Email',
  follow: 'Follow',
  visit: 'Visit',
  dinner: 'Dinner',
  brunch: 'Brunch',
  everyDay: 'Monday to Sunday',
  weekend: 'Saturday and Sunday',
  closedNewYear: 'Closed on January 1',
  delivery: 'Delivery',
  legal: 'Legal',
  privacy: 'Privacy',
  cookies: 'Cookies',
  terms: 'Terms',
  accessibility: 'Accessibility',
  rights: 'All rights reserved.',
  backToTop: 'Back to top ↑',
  credit: 'Concept by Dany Designs',
  footerCta: ['Reserve', 'your night'],
  footerEyebrow: 'A journey to Syria',
  scroll: 'Scroll',
  skipIntro: 'Skip',
  downloadPdf: 'Download the PDF',
  pricesNote: 'Prices in Canadian dollars; taxes and service not included.',
  allergyNote: 'Please tell your server about any allergies or dietary restrictions.',
  openSection: 'Show',
  items: (n: number) => `${n} ${n > 1 ? 'items' : 'item'}`,
  refs: (n: number) => `${n} ${n > 1 ? 'references' : 'reference'}`,
  live: {
    now: (t: string) => `It’s ${t} in Outremont`,
    openUntil: (t: string) => `Open tonight until ${t}`,
    opensAt: (t: string) => `Tonight from ${t}`,
    brunchNow: (t: string) => `Brunch is on, until ${t}`,
    closedToday: 'Closed today',
    tomorrow: (t: string) => `Tomorrow from ${t}`,
  },
  night: 'Night',
  notFound: 'Page not found',
};

export const dict: Record<Lang, Dict> = { fr, en };
export const useT = (lang: Lang) => dict[lang];
