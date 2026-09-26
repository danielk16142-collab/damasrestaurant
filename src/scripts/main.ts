import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;

/* ───────────── Smooth scroll ───────────── */
export let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  (window as unknown as { __lenis: Lenis }).__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  // in-page anchors go through Lenis
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!;
      const el = id.length > 1 ? document.querySelector(id) : null;
      if (el) { e.preventDefault(); lenis!.scrollTo(el as HTMLElement, { offset: -80, duration: 1.6 }); }
    });
  });
}

/* ───────────── Header: hide on scroll down, show on scroll up ───────────── */
{
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    root.classList.toggle('is-scrolled', y > 40);
    const navOpen = root.classList.contains('nav-open');
    root.classList.toggle('is-hidden-hdr', !navOpen && y > 400 && y > last + 2);
    if (y < last - 2) root.classList.remove('is-hidden-hdr');
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ───────────── Full-screen navigation ───────────── */
{
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (toggle && nav) {
    const label = toggle.querySelector<HTMLElement>('.hdr__toggle-label')!;
    const bg = nav.querySelector('.nav__bg');
    const links = nav.querySelectorAll('.nav__list li');
    const visual = nav.querySelector('.nav__visual');
    const foot = nav.querySelector('.nav__foot');
    const imgs = nav.querySelectorAll<HTMLElement>('[data-nav-img]');
    let open = false;
    let tl: gsap.core.Timeline | null = null;

    const setOpen = (v: boolean) => {
      open = v;
      toggle.setAttribute('aria-expanded', String(v));
      label.textContent = v ? label.dataset.closeLabel! : label.dataset.openLabel!;
      root.classList.toggle('nav-open', v);
      tl?.kill();
      if (v) {
        nav.hidden = false;
        lenis?.stop();
        tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
          .fromTo(bg, { clipPath: 'inset(0% 0% 100% 0% round 0 0 50% 50%)' }, { clipPath: 'inset(0% 0% 0% 0% round 0 0 0% 0%)', duration: reduced ? 0 : 1.1, ease: 'expo.inOut' })
          .fromTo(links, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.07, duration: 1 }, reduced ? 0 : 0.45)
          .fromTo(visual, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4 }, reduced ? 0 : 0.5)
          .fromTo(foot, { opacity: 0 }, { opacity: 1, duration: 0.8 }, reduced ? 0 : 0.8);
        (nav.querySelector('a') as HTMLElement)?.focus({ preventScroll: true });
      } else {
        tl = gsap.timeline({
          onComplete: () => { nav.hidden = true; lenis?.start(); },
        })
          .to([links, foot, visual], { opacity: 0, duration: reduced ? 0 : 0.3 })
          .to(bg, { clipPath: 'inset(0% 0% 100% 0% round 0 0 50% 50%)', duration: reduced ? 0 : 0.8, ease: 'expo.inOut' }, 0.1);
      }
    };
    toggle.addEventListener('click', () => setOpen(!open));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) { setOpen(false); toggle.focus(); } });
    nav.querySelectorAll<HTMLElement>('[data-nav-link]').forEach((a) => {
      a.addEventListener('mouseenter', () => {
        imgs.forEach((im) => im.classList.toggle('is-on', im.dataset.navImg === a.dataset.idx));
      });
    });
  }
}

/* ───────────── Lantern cursor ───────────── */
if (finePointer && !reduced) {
  const lantern = document.querySelector<HTMLElement>('[data-lantern]');
  const dot = document.querySelector<HTMLElement>('[data-cursor-dot]');
  if (lantern && dot) {
    const lx = gsap.quickTo(lantern, 'x', { duration: 1.1, ease: 'power3.out' });
    const ly = gsap.quickTo(lantern, 'y', { duration: 1.1, ease: 'power3.out' });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power3.out' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power3.out' });
    window.addEventListener('pointermove', (e) => {
      root.classList.add('has-pointer');
      lx(e.clientX); ly(e.clientY); dx(e.clientX); dy(e.clientY);
    }, { passive: true });
    document.addEventListener('pointerleave', () => root.classList.remove('has-pointer'));
    const hoverSel = 'a, button, summary, [data-cursor]';
    document.addEventListener('pointerover', (e) => {
      if ((e.target as Element).closest?.(hoverSel)) dot.classList.add('is-hover');
    });
    document.addEventListener('pointerout', (e) => {
      if ((e.target as Element).closest?.(hoverSel)) dot.classList.remove('is-hover');
    });
  }
}

/* ───────────── Text splitting (words, preserving <em>/<br>) ───────────── */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.splitDone) return Array.from(el.querySelectorAll<HTMLElement>('.w > span'));
  const out: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent || '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.textContent = p;
          w.appendChild(inner);
          frag.appendChild(w);
          out.push(inner);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child);
      }
    });
  };
  // keep accessible text intact for screen readers
  el.setAttribute('aria-label', el.textContent?.replace(/\s+/g, ' ').trim() || '');
  walk(el);
  Array.from(el.children).forEach((c) => c.setAttribute('aria-hidden', 'true'));
  el.dataset.splitDone = '1';
  return out;
}

/* ───────────── Scroll reveals ───────────── */
function initReveals(scope: ParentNode = document) {
  if (reduced) return;
  scope.querySelectorAll<HTMLElement>('[data-reveal="line"]').forEach((el) => {
    const words = splitWords(el);
    gsap.set(words, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.035, delay: Number(el.dataset.delay || 0) }),
    });
  });
  scope.querySelectorAll<HTMLElement>('[data-reveal="scrub"]').forEach((el) => {
    const words = splitWords(el);
    gsap.set(el, { opacity: 1 });
    gsap.fromTo(words, { opacity: 0.14 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
  });
  scope.querySelectorAll<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', delay: Number(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
  scope.querySelectorAll<HTMLElement>('[data-reveal="arch"]').forEach((el) => {
    const img = el.querySelector('img');
    gsap.fromTo(el, { opacity: 1, clipPath: 'inset(100% 0% 0% 0% round 50% 50% 0 0)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0 0)', duration: 1.8, ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
    if (img) gsap.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
  scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 12);
    gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  scope.querySelectorAll<SVGElement>('[data-draw] path, [data-draw] line, [data-draw] circle, [data-draw] polygon').forEach((p) => {
    const g = p as unknown as SVGGeometryElement;
    const len = g.getTotalLength?.() || 400;
    gsap.fromTo(g, { strokeDasharray: len, strokeDashoffset: len }, {
      strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut',
      scrollTrigger: { trigger: g.closest('[data-draw]') as Element, start: 'top 90%', once: true },
    });
  });
}

/* ───────────── Boot ───────────── */
const page = root.dataset.page;
const boot = async () => {
  if (page === 'home') await (await import('./home')).initHome();
  if (page === 'menus') (await import('./menus')).initMenus();
  initReveals();
  ScrollTrigger.refresh();
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
window.addEventListener('load', () => ScrollTrigger.refresh());

export { gsap, ScrollTrigger };
