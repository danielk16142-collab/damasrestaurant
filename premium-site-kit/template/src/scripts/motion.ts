/**
 * Site-wide motion. Declarative: add data attributes in markup and this wires them up.
 *
 *  data-reveal            fade + rise when scrolled into view
 *  data-split[="load"]    reveal text line by line (on scroll, or on load)
 *  data-delay="0.2"       extra delay in seconds for load animations
 *  data-clip              image wipes open from the bottom, image settles from a zoom
 *  data-parallax          child <img> drifts against the scroll
 *  data-words             words brighten one by one as you scroll through
 *  data-count="2450"      counts up (data-prefix, data-suffix, data-decimals)
 *  data-magnetic          element leans toward the pointer
 *  data-cursor="View"     custom cursor shows a label over this element
 *  data-hscroll           pinned horizontal scroll (child: [data-hscroll-track])
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const introDelay = () => parseFloat(document.documentElement.dataset.intro || '0');

function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.085, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
}

function initScrollState() {
  const root = document.documentElement;
  let last = window.scrollY;
  const update = () => {
    const y = window.scrollY;
    root.toggleAttribute('data-scrolled', y > 40);
    if (Math.abs(y - last) > 6) {
      root.dataset.scrollDir = y > last && y > 200 ? 'down' : 'up';
      last = y;
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initReveals() {
  gsap.set('[data-reveal]', { opacity: 0, y: 40 });
  // No `once`: with once, triggers already in view kill themselves mid-creation and
  // throw inside ScrollTrigger.refresh. Re-running the tween on re-entry is a no-op.
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09, overwrite: true }),
  });
}

function initSplits() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const onLoad = el.dataset.split === 'load';
    const delay = parseFloat(el.dataset.delay || '0') + (onLoad ? introDelay() : 0);
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        return gsap.from(self.lines, {
          yPercent: 115,
          duration: 1.3,
          ease: 'expo.out',
          stagger: 0.09,
          delay,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
  });
}

function initClips() {
  document.querySelectorAll<HTMLElement>('[data-clip]').forEach((el) => {
    const img = el.querySelector('img');
    const onLoad = el.dataset.clip === 'load';
    const delay = parseFloat(el.dataset.delay || '0') + (onLoad ? introDelay() : 0);
    const tl = gsap.timeline({
      delay,
      scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 85%', once: true },
    });
    tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' });
    if (img) tl.from(img, { scale: 1.3, duration: 2, ease: 'expo.out' }, 0.1);
  });
}

function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const img = el.querySelector('img');
    if (!img) return;
    const amount = parseFloat(el.dataset.parallax || '10');
    gsap.set(img, { scale: 1 + amount / 50 });
    gsap.fromTo(
      img,
      { yPercent: -amount },
      { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

function initWords() {
  document.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words' });
    gsap.fromTo(
      split.words,
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
      },
    );
  });
}

export function initCounters(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const format = (v: number) =>
      `${prefix}${v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
    if (reduceMotion) {
      el.textContent = format(target);
      return;
    }
    const state = { v: 0 };
    el.textContent = format(0);
    gsap.to(state, {
      v: target,
      duration: 2.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = format(state.v)),
    });
  });
}

function initMagnetic() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'expo.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'expo.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

function initCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<div class="cursor__dot"></div><div class="cursor__ring"></div>';
  document.body.appendChild(cursor);
  const ring = cursor.querySelector<HTMLElement>('.cursor__ring')!;
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'expo.out' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'expo.out' });
  gsap.set(cursor, { opacity: 0 });

  window.addEventListener('pointermove', (e) => {
    gsap.to(cursor, { opacity: 1, duration: 0.3, overwrite: 'auto' });
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerleave', () => gsap.to(cursor, { opacity: 0, duration: 0.3 }));
  document.addEventListener('pointerover', (e) => {
    const target = (e.target as Element).closest<HTMLElement>('[data-cursor]');
    cursor.classList.toggle('is-label', !!target);
    if (target) ring.textContent = target.dataset.cursor || '';
  });
}

function initHorizontal() {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
      if (!track) return;
      const distance = () => track.scrollWidth - track.clientWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
  });
}

function revealAllStatic() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => (el.style.visibility = 'visible'));
  initCounters();
}

export function initMotion() {
  initScrollState();
  if (reduceMotion) {
    revealAllStatic();
    return;
  }
  initSmoothScroll();
  document.fonts.ready.then(() => {
    initSplits();
    initClips();
    initReveals();
    initParallax();
    initWords();
    initCounters();
    initHorizontal();
    if (finePointer) {
      initMagnetic();
      initCursor();
    }
    ScrollTrigger.refresh();
  });
  // Islands (filters, forms) change page height; they fire this so pinned sections re-measure.
  window.addEventListener('vertice:layout', () => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };
