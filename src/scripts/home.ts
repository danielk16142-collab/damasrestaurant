import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenis, reduced } from './main';

declare global {
  interface Window { __damasNights?: { nights: { roman: string; ar: string }[]; nightLabel: string; chapters: string[] } }
}

/* ───────────── Threshold: the emblem blooms, the curtain lifts ───────────── */
function playIntro(): Promise<void> {
  const el = document.querySelector<HTMLElement>('[data-intro]');
  const body = document.body;
  if (!el || !body.dataset.hasIntro) return Promise.resolve();

  let seen = false;
  try { seen = sessionStorage.getItem('damas-intro') === '1'; } catch { /* storage blocked */ }
  if (reduced || seen) { el.remove(); delete body.dataset.hasIntro; return Promise.resolve(); }
  try { sessionStorage.setItem('damas-intro', '1'); } catch { /* ignore */ }

  lenis?.stop();
  window.scrollTo(0, 0);
  const emblem = el.querySelector('.intro__emblem');
  const word = el.querySelector('.intro__word');
  const line = el.querySelector('.intro__line');
  const skip = el.querySelector<HTMLButtonElement>('[data-intro-skip]');

  return new Promise((resolve) => {
    const finish = () => {
      el.remove();
      delete body.dataset.hasIntro;
      lenis?.start();
      resolve();
    };
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(emblem, { clipPath: 'circle(0% at 50% 50%)', scale: 0.85, rotate: -8, opacity: 0.2 }, { clipPath: 'circle(75% at 50% 50%)', scale: 1, rotate: 0, opacity: 1, duration: 2.4, ease: 'expo.inOut' })
      .fromTo(word, { opacity: 0, y: 24, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' }, 1.2)
      .fromTo(line, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, 1.8)
      .to(emblem, { opacity: 0.25, scale: 1.08, duration: 1.4, ease: 'power2.inOut' }, 3.1)
      .to([word, line], { opacity: 0, y: -20, duration: 0.8, ease: 'power2.in' }, 3.2)
      // the curtain rises, carving an arch as it goes
      .to(el, { clipPath: 'inset(0% 0% 100% 0% round 0 0 50% 50%)', duration: 1.5, ease: 'expo.inOut' }, 3.5)
      .fromTo('.hero__window img', { scale: 1.35 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 3.8);
    gsap.set(el, { clipPath: 'inset(0% 0% 0% 0% round 0 0 0% 0%)' });
    skip?.addEventListener('click', () => tl.progress(0.9));
    el.addEventListener('click', () => tl.progress() < 0.8 && tl.progress(0.8));
  });
}

/* ───────────── Hero: the arch window opens into the room ───────────── */
function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const win = hero?.querySelector<HTMLElement>('[data-hero-window]');
  if (!hero || !win) return;
  const lines = hero.querySelectorAll<HTMLElement>('[data-hero-line]');
  const fades = hero.querySelectorAll<HTMLElement>('[data-hero-fade]');

  // entrance
  gsap.fromTo(lines, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.8, ease: 'expo.out', stagger: 0.12, delay: 0.1 });
  gsap.fromTo(fades, { opacity: 0 }, { opacity: 1, duration: 1.6, delay: 0.6, stagger: 0.1 });
  if (reduced) { gsap.set(win, { clipPath: 'inset(0% 0% 0% 0% round 0 0 0 0)' }); return; }

  const mobile = window.matchMedia('(max-width: 700px)').matches;
  const from = mobile ? 'inset(16% 12% 0% 12% round 40vw 40vw 0vw 0vw)' : 'inset(14% 30% 0% 30% round 40vw 40vw 0vw 0vw)';
  const tl = gsap.timeline({
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 1 },
  });
  tl.fromTo(win, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)', ease: 'none' }, 0)
    .to(lines[0], { xPercent: -18, ease: 'none' }, 0)
    .to(lines[1], { xPercent: 18, ease: 'none' }, 0)
    .to(lines, { opacity: 0, ease: 'power1.in' }, 0.55)
    .to(fades, { opacity: 0, ease: 'none' }, 0.1);
}

/* ───────────── Night II: horizontal mezze procession ───────────── */
function initMezze() {
  const sec = document.querySelector<HTMLElement>('[data-mezze]');
  const pin = sec?.querySelector<HTMLElement>('[data-mezze-pin]');
  const track = sec?.querySelector<HTMLElement>('[data-mezze-track]');
  if (!sec || !pin || !track || reduced) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 801px)', () => {
    const dist = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    // each dish drifts on its own as it crosses the screen
    track.querySelectorAll<HTMLElement>('[data-dish]').forEach((d, i) => {
      const img = d.querySelector('img');
      gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: d, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true } });
      gsap.fromTo(d.querySelector('.dish__ar'), { xPercent: 60, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: d, containerAnimation: tween, start: 'left 90%', end: 'left 40%', scrub: true } });
      gsap.fromTo(d, { y: i % 2 ? 60 : -40 }, { y: 0, ease: 'none', scrollTrigger: { trigger: d, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
    });
  });
}

/* ───────────── Night III: embers rising from the charcoal ───────────── */
function initEmbers() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-embers]');
  if (!canvas || reduced) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  type P = { x: number; y: number; r: number; vy: number; vx: number; life: number; max: number; hue: number };
  let parts: P[] = [];
  let w = 0, h = 0, raf = 0, running = false;
  const resize = () => {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const spawn = (): P => ({
    x: Math.random() * w, y: h + 10, r: Math.random() * 1.8 + 0.4,
    vy: -(Math.random() * 0.9 + 0.35), vx: (Math.random() - 0.5) * 0.3,
    life: 0, max: Math.random() * 380 + 220, hue: 18 + Math.random() * 22,
  });
  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    if (parts.length < Math.min(140, w / 8)) parts.push(spawn());
    parts = parts.filter((p) => p.life < p.max && p.y > -20);
    for (const p of parts) {
      p.life++; p.y += p.vy; p.x += p.vx + Math.sin((p.life + p.hue * 10) / 40) * 0.25;
      const a = Math.sin((p.life / p.max) * Math.PI);
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 95%, ${55 + a * 15}%, ${a * 0.9})`;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${a})`;
      ctx.shadowBlur = 8;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  };
  resize();
  window.addEventListener('resize', resize);
  ScrollTrigger.create({
    trigger: canvas.parentElement, start: 'top bottom', end: 'bottom top',
    onToggle: (self) => {
      if (self.isActive && !running) { running = true; tick(); }
      else if (!self.isActive && running) { running = false; cancelAnimationFrame(raf); }
    },
  });
}

/* ───────────── Night V: cocktail names drift, faster when you scroll ───────────── */
function initMarquee() {
  const row = document.querySelector<HTMLElement>('[data-marquee]');
  if (!row || reduced) return;
  const loop = gsap.to(row, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    trigger: row, start: 'top bottom', end: 'bottom top',
    onUpdate: (self) => {
      const v = Math.min(Math.abs(self.getVelocity()) / 400, 6);
      gsap.to(loop, { timeScale: (self.direction < 0 ? -1 : 1) * (1 + v), duration: 0.4, overwrite: true });
      gsap.to(loop, { timeScale: self.direction < 0 ? -1 : 1, duration: 1.4, delay: 0.4 });
    },
  });
}

/* ───────────── Night VII: the salon doors open ───────────── */
function initEvents() {
  const media = document.querySelector<HTMLElement>('[data-events-media]');
  if (!media || reduced) return;
  gsap.fromTo(media, { clipPath: 'inset(10% 8% 10% 8% round 45vw 45vw 0vw 0vw)' }, {
    clipPath: 'inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)', ease: 'none',
    scrollTrigger: { trigger: media.parentElement, start: 'top 80%', end: 'center center', scrub: 1 },
  });
}

/* ───────────── "Nuit III" chapter indicator ───────────── */
function initChapterIndicator() {
  const ind = document.querySelector<HTMLElement>('[data-chapter-ind]');
  const data = window.__damasNights;
  if (!ind || !data) return;
  const ar = ind.querySelector<HTMLElement>('[data-ci-ar]')!;
  const label = ind.querySelector<HTMLElement>('[data-ci-label]')!;
  const set = (i: number) => {
    const n = data.nights[i];
    ar.textContent = n.ar;
    label.textContent = `${data.nightLabel} ${n.roman} — ${data.chapters[i]}`;
  };
  document.querySelectorAll<HTMLElement>('[data-chapter]').forEach((sec) => {
    const i = Number(sec.dataset.chapter);
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive) { set(i); ind.classList.add('is-on'); } },
    });
  });
  ScrollTrigger.create({
    trigger: '[data-chapter="0"]', start: 'top 55%',
    onLeaveBack: () => ind.classList.remove('is-on'),
  });
  ScrollTrigger.create({
    trigger: '[data-chapter="6"]', start: 'bottom 55%',
    onEnter: () => ind.classList.remove('is-on'),
    onLeaveBack: () => ind.classList.add('is-on'),
  });
}

export async function initHome() {
  await playIntro();
  initHero();
  initMezze();
  initEmbers();
  initMarquee();
  initEvents();
  initChapterIndicator();
}
