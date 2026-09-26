import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import '../styles/filters.css';

gsap.registerPlugin(Flip);

export interface ListingCard {
  slug: string;
  name: string;
  url: string;
  area: string;
  areaName: string;
  type: string;
  status: string;
  price: number;
  priceLabel: string;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  featured: boolean;
  hasDetailPage: boolean;
  img: { src: string; srcset: string; alt: string };
}

interface Props {
  listings: ListingCard[];
  areas: { slug: string; name: string }[];
  types: string[];
}

type Sort = 'featured' | 'price-desc' | 'price-asc' | 'newest';
interface Filters {
  area: string;
  type: string;
  price: string;
  beds: string;
  sold: boolean;
  sort: Sort;
}

const PRICE_BANDS: Record<string, { label: string; min: number; max: number }> = {
  '': { label: 'Any price', min: 0, max: Infinity },
  'under-2m': { label: 'Under $2M', min: 0, max: 2_000_000 },
  '2-3m': { label: '$2M – $3M', min: 2_000_000, max: 3_000_000 },
  '3m-plus': { label: '$3M +', min: 3_000_000, max: Infinity },
};
const BEDS = ['', '3', '4', '5'];
const SORTS: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-desc', label: 'Price, high to low' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'newest', label: 'Newest build' },
];

const DEFAULTS: Filters = { area: '', type: '', price: '', beds: '', sold: true, sort: 'featured' };

function readUrl(): Filters {
  if (typeof window === 'undefined') return DEFAULTS;
  const q = new URLSearchParams(window.location.search);
  return {
    area: q.get('area') ?? '',
    type: q.get('type') ?? '',
    price: q.get('price') ?? '',
    beds: q.get('beds') ?? '',
    sold: q.get('sold') !== 'hide',
    sort: (q.get('sort') as Sort) || 'featured',
  };
}

function writeUrl(f: Filters) {
  const q = new URLSearchParams();
  if (f.area) q.set('area', f.area);
  if (f.type) q.set('type', f.type);
  if (f.price) q.set('price', f.price);
  if (f.beds) q.set('beds', f.beds);
  if (!f.sold) q.set('sold', 'hide');
  if (f.sort !== 'featured') q.set('sort', f.sort);
  const qs = q.toString();
  window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
}

function matches(l: ListingCard, f: Filters) {
  const band = PRICE_BANDS[f.price] ?? PRICE_BANDS[''];
  return (
    (!f.area || l.area === f.area) &&
    (!f.type || l.type === f.type) &&
    l.price >= band.min &&
    l.price < band.max &&
    (!f.beds || l.beds >= Number(f.beds)) &&
    (f.sold || l.status !== 'Sold')
  );
}

function sortKey(l: ListingCard, sort: Sort) {
  switch (sort) {
    case 'price-desc': return -l.price;
    case 'price-asc': return l.price;
    case 'newest': return -l.yearBuilt;
    default: return l.featured ? 0 : 1;
  }
}

export default function PropertyFilters({ listings, areas, types }: Props) {
  const [filters, setFilters] = useState<Filters>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const gridRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setFilters(readUrl());
    setHydrated(true);
  }, []);

  const update = (patch: Partial<Filters>) => {
    if (gridRef.current && !reduceMotion.current) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll('.pgrid__item'));
    }
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      writeUrl(next);
      return next;
    });
  };

  // Every card stays mounted; filtering toggles visibility and sorting sets CSS order,
  // so Flip can animate cards moving, entering and leaving.
  const order = useMemo(() => {
    const sorted = [...listings].sort((a, b) => sortKey(a, filters.sort) - sortKey(b, filters.sort));
    return new Map(sorted.map((l, i) => [l.slug, i]));
  }, [listings, filters.sort]);
  const visible = listings.filter((l) => matches(l, filters));

  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    if (!state) return;
    Flip.from(state, {
      duration: 0.8,
      ease: 'expo.inOut',
      absolute: true,
      stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.4, ease: 'power2.in' }),
      onComplete: () => window.dispatchEvent(new Event('vertice:layout')),
    });
  }, [filters]);

  const activeCount = [filters.area, filters.type, filters.price, filters.beds].filter(Boolean).length + (filters.sold ? 0 : 1);

  return (
    <div className="pf" data-hydrated={hydrated || undefined}>
      <div className="pf__bar">
        <div className="pf__chips" role="group" aria-label="Neighbourhood">
          <button className="chip" aria-pressed={!filters.area} onClick={() => update({ area: '' })}>All areas</button>
          {areas.map((a) => (
            <button key={a.slug} className="chip" aria-pressed={filters.area === a.slug} onClick={() => update({ area: filters.area === a.slug ? '' : a.slug })}>
              {a.name}
            </button>
          ))}
        </div>

        <div className="pf__row">
          <div className="pf__types" role="group" aria-label="Property type">
            <button className="seg" aria-pressed={!filters.type} onClick={() => update({ type: '' })}>All types</button>
            {types.map((t) => (
              <button key={t} className="seg" aria-pressed={filters.type === t} onClick={() => update({ type: filters.type === t ? '' : t })}>{t}</button>
            ))}
          </div>

          <div className="pf__selects">
            <label className="pf__select">
              <span>Price</span>
              <select value={filters.price} onChange={(e) => update({ price: e.target.value })}>
                {Object.entries(PRICE_BANDS).map(([v, b]) => <option key={v} value={v}>{b.label}</option>)}
              </select>
            </label>
            <label className="pf__select">
              <span>Bedrooms</span>
              <select value={filters.beds} onChange={(e) => update({ beds: e.target.value })}>
                {BEDS.map((b) => <option key={b} value={b}>{b ? `${b}+ beds` : 'Any'}</option>)}
              </select>
            </label>
            <label className="pf__select">
              <span>Sort</span>
              <select value={filters.sort} onChange={(e) => update({ sort: e.target.value as Sort })}>
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
          </div>
        </div>

        <div className="pf__summary">
          <p aria-live="polite">
            <span className="num pf__count">{visible.length}</span> {visible.length === 1 ? 'residence' : 'residences'}
          </p>
          <label className="pf__toggle">
            <input type="checkbox" checked={filters.sold} onChange={(e) => update({ sold: e.target.checked })} />
            <span className="pf__switch" aria-hidden="true"></span>
            Show sold
          </label>
          {activeCount > 0 && (
            <button className="pf__clear" onClick={() => update({ ...DEFAULTS, sort: filters.sort })}>Clear filters ({activeCount})</button>
          )}
        </div>
      </div>

      <ul className="pgrid" ref={gridRef} role="list">
        {listings.map((l) => {
          const shown = visible.includes(l);
          return (
            <li key={l.slug} className="pgrid__item" data-flip-id={l.slug} style={{ order: order.get(l.slug), display: shown ? undefined : 'none' }} aria-hidden={!shown}>
              <a href={l.url} className="card" data-cursor={l.hasDetailPage ? 'View' : 'Enquire'} tabIndex={shown ? undefined : -1}>
                <div className="card__media media">
                  <img
                    src={l.img.src}
                    srcSet={l.img.srcset}
                    sizes="(min-width: 1100px) 30vw, (min-width: 700px) 45vw, 92vw"
                    alt={l.img.alt}
                    loading="lazy"
                    decoding="async"
                    style={l.hasDetailPage ? ({ viewTransitionName: `prop-${l.slug}` } as React.CSSProperties) : undefined}
                  />
                  <span className="status-pill card__status" data-status={l.status}>{l.status}</span>
                </div>
                <div className="card__body">
                  <p className="card__meta">{l.areaName} · {l.type}</p>
                  <h3 className="card__name">{l.name}</h3>
                  <div className="card__row">
                    <ul className="card__facts" role="list">
                      <li><span className="num">{l.beds}</span> Beds</li>
                      <li><span className="num">{l.baths}</span> Baths</li>
                      <li><span className="num">{l.sqft.toLocaleString('en-US')}</span> Sq ft</li>
                    </ul>
                    <p className="card__price num">{l.priceLabel}</p>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <div className="pf__empty">
          <h3>Nothing public matches that search, <em>yet.</em></h3>
          <p className="muted">Around a third of our homes sell privately, before they are ever listed. Tell us what you’re looking for and we’ll show you what isn’t online.</p>
          <div className="pf__empty-actions">
            <a href={`/contact?intent=buy${filters.area ? `&area=${filters.area}` : ''}`} className="btn">Tell us your brief <span className="arrow">→</span></a>
            <button className="link" onClick={() => update({ ...DEFAULTS })}>Clear filters</button>
          </div>
        </div>
      )}
    </div>
  );
}
