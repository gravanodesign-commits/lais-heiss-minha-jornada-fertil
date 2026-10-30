// Interações e motion de rolagem (inspirado no calendly.com): entradas suaves, janela do curso que "assenta"
// ao rolar, contadores, palavras que acendem, fotos que sobem. Respeita prefers-reduced-motion.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(s) as NodeListOf<T>);

/* Header: fica "pílula" com vidro ao rolar */
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Menu mobile */
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
const setMenu = (open: boolean) => {
  if (!toggle || !menu) return;
  toggle.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
};
toggle?.addEventListener('click', () => setMenu(menu?.hidden ?? true));
menu?.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* Abas do hero */
const tabs = $$<HTMLButtonElement>('[data-tab]');
tabs.forEach((t) => t.addEventListener('click', () => tabs.forEach((o) => o.setAttribute('aria-selected', String(o === t)))));

/* Acordeão de módulos: um aberto por vez */
const acc = document.querySelector('[data-accordion]');
acc?.addEventListener('toggle', (e) => {
  const d = e.target as HTMLDetailsElement;
  if (d.open) $$<HTMLDetailsElement>('details', acc).forEach((o) => { if (o !== d) o.open = false; });
}, true);

/* Contadores */
const counters = $$('[data-count]');
const fmt = (n: number) => n.toLocaleString('pt-BR');
counters.forEach((el) => {
  const target = Number(el.dataset.count);
  if (!target) return;
  const pre = el.dataset.prefix ?? '';
  const suf = el.dataset.suffix ?? '';
  if (reduce) return;
  const obj = { v: 0 };
  el.textContent = `${pre}${fmt(0)}${suf}`;
  gsap.to(obj, {
    v: target, duration: 1.6, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    onUpdate: () => { el.textContent = `${pre}${fmt(Math.round(obj.v))}${suf}`; },
  });
});

if (reduce) {
  $$('[data-reveal]').forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; el.classList.add('is-in'); });
} else {
  /* Hero: entrada em cascata */
  gsap.from('[data-hero-in]', { y: 24, opacity: 0, duration: .9, ease: 'power3.out', stagger: .08, delay: .1 });

  /* Janela do curso: entra inclinada e "assenta" conforme a rolagem */
  const win = document.querySelector('[data-hero-window]');
  if (win) {
    gsap.set(win, { transformPerspective: 1400, transformOrigin: '50% 0%' });
    gsap.fromTo(win, { rotateX: 14, scale: .92, y: 40 }, {
      rotateX: 0, scale: 1, y: 0, ease: 'none',
      scrollTrigger: { trigger: win, start: 'top 95%', end: 'top 35%', scrub: .6 },
    });
  }

  /* Elementos flutuantes */
  $$('[data-float]').forEach((el, i) => {
    gsap.to(el, { y: i % 2 ? 8 : -8, duration: 2.8 + (i % 3) * .4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  });

  /* Revelação ao rolar, em lotes */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.to(els, {
      opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .08, overwrite: true,
      onStart() { els.forEach((e) => (e as HTMLElement).classList.add('is-in')); },
    }),
  });

  /* Parallax leve */
  $$('[data-parallax]').forEach((el) => {
    const k = Number(el.dataset.parallax) || .08;
    gsap.fromTo(el, { y: 60 * k * 10 }, { y: -60 * k * 10, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* Mensagem: palavras acendem com a rolagem */
  $$('[data-words]').forEach((p) => {
    const words = $$('.w', p);
    gsap.fromTo(words, { opacity: .18 }, { opacity: 1, stagger: .05, ease: 'none', scrollTrigger: { trigger: p, start: 'top 85%', end: 'bottom 50%', scrub: true } });
  });

  /* Última chamada: fotos sobem em sequência */
  gsap.from('[data-rise]', {
    yPercent: 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: .12,
    scrollTrigger: { trigger: '.photos', start: 'top 92%', once: true },
  });
}

window.addEventListener('load', () => ScrollTrigger.refresh());
