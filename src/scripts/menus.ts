import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenis, reduced } from './main';

/** Menus page: top switcher (tabs) + one animated dropdown per section. */
export function initMenus() {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-panel]'));
  const ink = document.querySelector<HTMLElement>('[data-switch-ink]');
  const bar = document.querySelector<HTMLElement>('[data-switch]');
  if (!tabs.length) return;

  const moveInk = (btn: HTMLElement) => {
    if (!ink) return;
    ink.style.width = `${btn.offsetWidth}px`;
    ink.style.transform = `translateX(${btn.offsetLeft}px)`;
  };

  const show = (id: string, opts: { scroll?: boolean; focus?: boolean } = {}) => {
    const btn = tabs.find((t) => t.dataset.tab === id) || tabs[0];
    const target = btn.dataset.tab!;
    tabs.forEach((t) => {
      const on = t === btn;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    moveInk(btn);
    const strip = btn.parentElement!;
    strip.scrollTo({ left: btn.offsetLeft - strip.clientWidth / 2 + btn.offsetWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
    panels.forEach((p) => { p.hidden = p.dataset.panel !== target; });
    const panel = panels.find((p) => p.dataset.panel === target);
    if (panel && !reduced) {
      gsap.fromTo(panel.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.06 });
    }
    if (opts.focus) btn.focus();
    if (opts.scroll && bar) {
      const panelsEl = document.querySelector<HTMLElement>('[data-panels]')!;
      const y = panelsEl.getBoundingClientRect().top + window.scrollY - bar.offsetHeight;
      if (window.scrollY > y) lenis ? lenis.scrollTo(y, { duration: 1 }) : window.scrollTo({ top: y });
    }
    history.replaceState(null, '', `#${target}`);
    ScrollTrigger.refresh();
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t.dataset.tab!, { scroll: true }));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      let n = -1;
      if (k === 'ArrowRight') n = (i + 1) % tabs.length;
      if (k === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (k === 'Home') n = 0;
      if (k === 'End') n = tabs.length - 1;
      if (n >= 0) { e.preventDefault(); show(tabs[n].dataset.tab!, { focus: true }); }
    });
  });

  const fromHash = () => {
    const h = location.hash.slice(1);
    show(tabs.some((t) => t.dataset.tab === h) ? h : tabs[0].dataset.tab!);
  };
  fromHash();
  window.addEventListener('hashchange', fromHash);
  window.addEventListener('resize', () => {
    const sel = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    if (sel) moveInk(sel);
  });
  document.fonts?.ready.then(() => {
    const sel = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    if (sel) moveInk(sel);
  });

  /* Accordions: animate <details> open/close heights */
  document.querySelectorAll<HTMLDetailsElement>('[data-acc]').forEach((d) => {
    const sum = d.querySelector('summary')!;
    const body = d.querySelector<HTMLElement>('[data-acc-body]')!;
    sum.addEventListener('click', (e) => {
      if (reduced) return;
      e.preventDefault();
      if (d.open) {
        gsap.fromTo(body, { height: body.offsetHeight }, {
          height: 0, duration: 0.7, ease: 'expo.inOut',
          onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'height' }); ScrollTrigger.refresh(); },
        });
      } else {
        d.open = true;
        const items = body.querySelectorAll('.item');
        gsap.fromTo(body, { height: 0 }, {
          height: body.scrollHeight, duration: 0.9, ease: 'expo.inOut',
          onComplete: () => { gsap.set(body, { clearProps: 'height' }); ScrollTrigger.refresh(); },
        });
        gsap.fromTo(items, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.03, delay: 0.25 });
      }
    });
  });
}
