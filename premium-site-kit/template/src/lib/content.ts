/**
 * Content layer.
 *
 * Every page reads listings and neighbourhoods through these functions only.
 * Today they return local sample data; when the site moves to Wix Headless,
 * swap the bodies for Wix CMS queries and keep the return shapes.
 */
import type { ImageMetadata } from 'astro';

import belleMeadeEstate from '../assets/img/belle-meade-estate.jpg';
import greenHillsModern from '../assets/img/green-hills-modern.jpg';
import twelveSouthModern from '../assets/img/twelve-south-modern.jpg';
import sylvanModern from '../assets/img/sylvan-modern.jpg';
import gulchInterior from '../assets/img/gulch-interior.jpg';
import nashvilleCity from '../assets/img/nashville-city.jpg';
import aerial from '../assets/img/aerial.jpg';
import brentwoodStreet from '../assets/img/brentwood-street.jpg';

import famFront from '../assets/img/family/front.jpg';
import famLiving from '../assets/img/family/living.jpg';
import famKitchen from '../assets/img/family/kitchen.jpg';
import famSecond from '../assets/img/family/second-floor.jpg';
import famBedroom from '../assets/img/family/primary-bedroom.jpg';
import famBath from '../assets/img/family/primary-bath.jpg';
import famBackyard from '../assets/img/family/backyard.jpg';

export type PropertyType = 'Estate' | 'Family Home' | 'Modern' | 'Penthouse';
export type PropertyStatus = 'For Sale' | 'Under Contract' | 'Sold';

export interface GalleryImage {
  src: ImageMetadata;
  alt: string;
  room: string;
}

export interface Property {
  slug: string;
  name: string;
  address: string;
  neighbourhood: string; // Neighbourhood slug
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lotAcres: number;
  yearBuilt: number;
  hero: ImageMetadata;
  heroAlt: string;
  summary: string;
  description: string[];
  features: string[];
  gallery: GalleryImage[];
  featured: boolean;
  /** Only listings with a full photo set get a detail page. */
  hasDetailPage: boolean;
}

export interface Neighbourhood {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  medianPrice: string;
  driveToDowntown: string;
  highlights: string[];
}

const neighbourhoods: Neighbourhood[] = [
  {
    slug: 'belle-meade',
    name: 'Belle Meade',
    tagline: 'Old oaks, deep lots, quiet streets.',
    description:
      "Nashville's most established address. Stately stone homes sit well back from tree-lined boulevards, minutes from the Belle Meade Country Club and Percy Warner Park.",
    image: brentwoodStreet,
    imageAlt: 'Stone Tudor homes along a curving, tree-lined street at sunset',
    medianPrice: '$3.4M',
    driveToDowntown: '15 min',
    highlights: ['Percy Warner Park', 'Belle Meade Country Club', 'Harding Place'],
  },
  {
    slug: 'green-hills',
    name: 'Green Hills',
    tagline: 'Modern living, close to everything.',
    description:
      'Clean-lined new builds share the hills with mid-century classics. The Mall at Green Hills, top-rated schools and some of the city’s best restaurants are all nearby.',
    image: greenHillsModern,
    imageAlt: 'Two-storey modern white home with timber accents at dusk',
    medianPrice: '$1.9M',
    driveToDowntown: '12 min',
    highlights: ['Hillsboro Village', 'Top-rated schools', 'The Mall at Green Hills'],
  },
  {
    slug: 'brentwood',
    name: 'Brentwood',
    tagline: 'Space to grow, room to breathe.',
    description:
      'Rolling acreage, gated enclaves and a strong sense of community. Brentwood suits families who want land and privacy without giving up easy access to the city.',
    image: aerial,
    imageAlt: 'Aerial view of a wooded Brentwood neighbourhood at golden hour',
    medianPrice: '$2.3M',
    driveToDowntown: '20 min',
    highlights: ['Acreage lots', 'Williamson County schools', 'Radnor Lake nearby'],
  },
  {
    slug: '12-south',
    name: '12 South',
    tagline: 'Walkable, lively, full of character.',
    description:
      'Boutiques, coffee and some of Nashville’s most interesting new architecture, all within a few walkable blocks. The best fit for buyers who like to be close to the action.',
    image: twelveSouthModern,
    imageAlt: 'Modern home with stone and cedar façade lit at dusk',
    medianPrice: '$1.6M',
    driveToDowntown: '8 min',
    highlights: ['Sevier Park', 'Walkable retail strip', 'Design-led new builds'],
  },
  {
    slug: 'the-gulch',
    name: 'The Gulch',
    tagline: 'Skyline views, downtown on your doorstep.',
    description:
      'Full-service penthouses above the city’s best restaurants. For lock-and-leave living and people who want to walk to the Ryman on a Saturday night.',
    image: nashvilleCity,
    imageAlt: 'Nashville skyline reflected in the Cumberland River at sunset',
    medianPrice: '$1.2M',
    driveToDowntown: '3 min',
    highlights: ['Concierge buildings', 'Rooftop amenities', 'Walk to Broadway'],
  },
  {
    slug: 'sylvan-park',
    name: 'Sylvan Park',
    tagline: 'A neighbourhood feel near the city centre.',
    description:
      'Leafy streets, local favourites and a mix of restored bungalows and crisp new builds, a short drive west of downtown.',
    image: sylvanModern,
    imageAlt: 'Modern white home with vertical slat details and a lit entry',
    medianPrice: '$1.1M',
    driveToDowntown: '10 min',
    highlights: ['Richland Park', 'Local dining', 'McCabe Park Golf'],
  },
];

const properties: Property[] = [
  {
    slug: 'the-hawthorne-residence',
    name: 'The Hawthorne Residence',
    address: '1287 Hawthorne Lane, Brentwood, TN',
    neighbourhood: 'brentwood',
    type: 'Family Home',
    status: 'For Sale',
    price: 2_450_000,
    beds: 5,
    baths: 4.5,
    sqft: 5_420,
    lotAcres: 0.9,
    yearBuilt: 2023,
    hero: famFront,
    heroAlt: 'Front of a white brick family home with a timber entry and landscaped walk',
    summary: 'A light-filled family home on nearly an acre, with a resort-style pool and outdoor fireplace.',
    description: [
      'Set behind a stone entry and clipped hydrangeas, The Hawthorne was built in 2023 for how families actually live. Wide-plank white oak runs through an open ground floor, where the kitchen, dining room and great room share one long view to the garden.',
      'Upstairs, a lounge landing links four bedrooms and the primary suite, which has a spa bathroom with a freestanding tub and a walk-in shower. Outside there is a heated saltwater pool, a covered terrace with a stone fireplace, and plenty of lawn.',
    ],
    features: [
      'Heated saltwater pool and spa',
      'Covered terrace with stone fireplace',
      'Sage kitchen with 8-seat island',
      'Primary suite with spa bathroom',
      'Upstairs family lounge',
      'Three-car garage',
      'Smart home lighting and security',
      'Williamson County schools',
    ],
    gallery: [
      { src: famFront, room: 'Arrival', alt: 'Front of a white brick family home with a timber entry and landscaped walk' },
      { src: famLiving, room: 'Great Room', alt: 'Open living room flowing into the kitchen and dining area' },
      { src: famKitchen, room: 'Kitchen', alt: 'Sage-green kitchen with a long island, pendant lights and four stools' },
      { src: famSecond, room: 'Upstairs Lounge', alt: 'Upstairs family lounge with sofas and a black metal stair rail' },
      { src: famBedroom, room: 'Primary Suite', alt: 'Primary bedroom with an upholstered bed and garden views' },
      { src: famBath, room: 'Primary Bath', alt: 'Spa bathroom with a freestanding tub and double timber vanity' },
      { src: famBackyard, room: 'Garden & Pool', alt: 'Rear garden with a lit pool, terrace and stone fireplace at dusk' },
    ],
    featured: true,
    hasDetailPage: true,
  },
  {
    slug: 'belle-meade-manor',
    name: 'Belle Meade Manor',
    address: 'Belle Meade Boulevard, Nashville, TN',
    neighbourhood: 'belle-meade',
    type: 'Estate',
    status: 'For Sale',
    price: 4_950_000,
    beds: 6,
    baths: 6.5,
    sqft: 7_850,
    lotAcres: 1.6,
    yearBuilt: 2021,
    hero: belleMeadeEstate,
    heroAlt: 'Stone estate with tall arched windows and warm lighting at dusk',
    summary: 'A limestone estate with a double-height entry hall on one of the city’s most coveted boulevards.',
    description: [],
    features: [],
    gallery: [],
    featured: true,
    hasDetailPage: false,
  },
  {
    slug: 'the-linea-house',
    name: 'The Linea House',
    address: 'Hobbs Road, Green Hills, TN',
    neighbourhood: 'green-hills',
    type: 'Modern',
    status: 'For Sale',
    price: 2_890_000,
    beds: 4,
    baths: 4.5,
    sqft: 4_600,
    lotAcres: 0.4,
    yearBuilt: 2024,
    hero: greenHillsModern,
    heroAlt: 'Two-storey modern white home with timber accents at dusk',
    summary: 'White render, walnut and glass. A calm, precise new build steps from Hillsboro Village.',
    description: [],
    features: [],
    gallery: [],
    featured: true,
    hasDetailPage: false,
  },
  {
    slug: 'cedar-and-stone',
    name: 'Cedar & Stone',
    address: '728 Elmwood Avenue, 12 South, TN',
    neighbourhood: '12-south',
    type: 'Modern',
    status: 'Under Contract',
    price: 2_150_000,
    beds: 4,
    baths: 3.5,
    sqft: 3_950,
    lotAcres: 0.25,
    yearBuilt: 2024,
    hero: twelveSouthModern,
    heroAlt: 'Modern home with stone and cedar façade lit at dusk',
    summary: 'A stacked stone and cedar modern a short walk from 12 South’s cafés.',
    description: [],
    features: [],
    gallery: [],
    featured: true,
    hasDetailPage: false,
  },
  {
    slug: 'penthouse-21',
    name: 'Penthouse 21',
    address: '12th Avenue South, The Gulch, TN',
    neighbourhood: 'the-gulch',
    type: 'Penthouse',
    status: 'For Sale',
    price: 3_600_000,
    beds: 3,
    baths: 3,
    sqft: 3_100,
    lotAcres: 0,
    yearBuilt: 2022,
    hero: gulchInterior,
    heroAlt: 'Penthouse living room with a curved sofa, fireplace and floor-to-ceiling views',
    summary: 'A full-floor penthouse with a linear fireplace and views from the skyline to the hills.',
    description: [],
    features: [],
    gallery: [],
    featured: false,
    hasDetailPage: false,
  },
  {
    slug: 'harding-place-tudor',
    name: 'Harding Place Tudor',
    address: 'Harding Place, Belle Meade, TN',
    neighbourhood: 'belle-meade',
    type: 'Family Home',
    status: 'For Sale',
    price: 3_250_000,
    beds: 5,
    baths: 5,
    sqft: 5_900,
    lotAcres: 0.8,
    yearBuilt: 2019,
    hero: brentwoodStreet,
    heroAlt: 'Stone Tudor home on a curving street under mature trees',
    summary: 'A stone Tudor with a gabled roofline, arched front door and mature oaks.',
    description: [],
    features: [],
    gallery: [],
    featured: false,
    hasDetailPage: false,
  },
  {
    slug: 'the-atrium-house',
    name: 'The Atrium House',
    address: 'Nevada Avenue, Sylvan Park, TN',
    neighbourhood: 'sylvan-park',
    type: 'Modern',
    status: 'Sold',
    price: 1_690_000,
    beds: 3,
    baths: 3.5,
    sqft: 3_400,
    lotAcres: 0.2,
    yearBuilt: 2023,
    hero: sylvanModern,
    heroAlt: 'Modern white home with vertical slat details and a lit entry',
    summary: 'A two-storey atrium draws light through the centre of this compact modern.',
    description: [],
    features: [],
    gallery: [],
    featured: false,
    hasDetailPage: false,
  },
];

export async function getProperties(): Promise<Property[]> {
  return properties;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return properties.filter((p) => p.featured);
}

export async function getProperty(slug: string): Promise<Property | undefined> {
  return properties.find((p) => p.slug === slug);
}

export async function getNeighbourhoods(): Promise<Neighbourhood[]> {
  return neighbourhoods;
}

export async function getNeighbourhood(slug: string): Promise<Neighbourhood | undefined> {
  return neighbourhoods.find((n) => n.slug === slug);
}

export const propertyTypes: PropertyType[] = ['Estate', 'Family Home', 'Modern', 'Penthouse'];

export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2).replace(/0$/, '')}M`;
  }
  return `$${Math.round(price / 1000)}K`;
}

export function formatPriceFull(price: number): string {
  return `$${price.toLocaleString('en-US')}`;
}

export function propertyUrl(p: Property): string {
  return p.hasDetailPage ? `/properties/${p.slug}` : `/contact?property=${p.slug}`;
}

export const site = {
  name: 'Vértice Real Estate',
  phone: '(615) 555-0142',
  email: 'hello@vertice-realestate.com',
  address: '4000 Hillsboro Pike, Suite 210, Nashville, TN 37215',
  hours: 'Mon–Sat, 9am–6pm',
};

/**
 * Legal details used by the privacy, cookie and terms pages.
 * Fill every [[...]] with the client's real details (see references/legal.md).
 */
export const legal = {
  entity: '[[Registered business name]]',
  address: '[[Registered address]]',
  privacyContact: '[[Person responsible for personal information]]',
  privacyEmail: '[[privacy@client-domain.com]]',
  governingLaw: '[[Province/State, Country]]',
  updated: '[[YYYY-MM-DD]]',
  /** Every third-party tool that processes visitor data. Keep it in sync with what the site loads. */
  processors: [
    { name: '[[Hosting: Vercel / Hostinger / Wix]]', purpose: 'Hosting the website', location: '[[Country]]' },
    { name: '[[Form or CRM tool]]', purpose: 'Receiving enquiries sent through the contact form', location: '[[Country]]' },
  ],
};

/**
 * Cookie consent. The banner only appears when at least one category is true.
 * Gate each tracking script with <script type="text/plain" data-consent="analytics" data-src="...">.
 */
export const consent = {
  analytics: false,
  marketing: false,
};
