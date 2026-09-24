import { useEffect, useMemo, useState } from 'react';
import type { EntryView } from './EntryNavRail';

type TourStep = {
  selector: string;
  eyebrow: string;
  title: string;
  body: string;
  capabilities: string;
  view: EntryView;
  rail: 'open' | 'closed' | 'keep';
};

const steps: TourStep[] = [
  {
    selector: '[data-testid="designs-new-project"], [data-testid="designs-empty-new-project"]',
    eyebrow: '01 · Projects',
    title: 'Start a project.',
    body: 'Create something new or reopen work that already exists. Every job stays attached to its own project.',
    capabilities: 'Create · reopen · continue',
    view: 'projects',
    rail: 'closed',
  },
  {
    selector: '[data-testid="entry-nav-search"]',
    eyebrow: '02 · Find',
    title: 'Everything stays within reach.',
    body: 'Open the rail when you need to find a project, move between work, or reach the system around it.',
    capabilities: 'Search · projects · navigation',
    view: 'projects',
    rail: 'open',
  },
  {
    selector: '[data-testid="home-hero-input"]',
    eyebrow: '03 · Brief',
    title: 'Tell PARÉ what you want to make.',
    body: 'Start with a plain-language brief. Add files or context only when the work needs them.',
    capabilities: 'Brief · files · context',
    view: 'home',
    rail: 'closed',
  },
  {
    selector: '[data-testid="home-hero-design-system-trigger"]',
    eyebrow: '04 · System',
    title: 'Keep the work on-brand.',
    body: 'Attach the right design system when consistency matters. Skip it when it does not.',
    capabilities: 'Brand · design system · reuse',
    view: 'home',
    rail: 'closed',
  },
  {
    selector: '[data-testid="home-hero-input"]',
    eyebrow: '05 · Make',
    title: 'Start with the work.',
    body: 'The tour ends where the work begins. Write the brief and PARÉ takes it from there.',
    capabilities: 'Describe it · send it · keep moving',
    view: 'home',
    rail: 'closed',
  },
];

const STORAGE_KEY = 'pare:studio-tour-seen';

type Props = {
  view: EntryView;
  onViewChange: (view: EntryView) => void;
  onRailOpenChange: (open: boolean) => void;
};

function findTarget(selector: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(selector);
}

function findRect(selector: string): DOMRect | null {
  return findTarget(selector)?.getBoundingClientRect() ?? null;
}

export function PareStudioTour({ view, onViewChange, onRailOpenChange }: Props) {
  const shouldStart = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('pare-entry') === '1' && sessionStorage.getItem(STORAGE_KEY) !== '1';
  }, []);
  const [open, setOpen] = useState(shouldStart);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const step = steps[index] ?? steps[0]!;

  useEffect(() => {
    if (!open) return;
    if (view !== step.view) onViewChange(step.view);
    if (step.rail === 'open') onRailOpenChange(true);
    if (step.rail === 'closed') onRailOpenChange(false);
  }, [open, step.view, step.rail, view, onViewChange, onRailOpenChange]);

  useEffect(() => {
    if (!open) return;
    let raf = 0;
    const sync = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const target = findTarget(step.selector);
        target?.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
        setRect(target?.getBoundingClientRect() ?? null);
      });
    };
    const settle = window.setTimeout(sync, 120);
    sync();
    window.addEventListener('resize', sync);
    window.addEventListener('scroll', sync, true);
    const timer = window.setInterval(sync, 450);
    return () => {
      window.clearTimeout(settle);
      window.clearInterval(timer);
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', sync);
      window.removeEventListener('scroll', sync, true);
    };
  }, [open, step.selector, step.view]);

  useEffect(() => {
    const replay = () => {
      setIndex(0);
      setOpen(true);
    };
    window.addEventListener('pare:tour:replay', replay);
    return () => window.removeEventListener('pare:tour:replay', replay);
  }, []);

  function finish(focusWork = false) {
    sessionStorage.setItem(STORAGE_KEY, '1');
    if (focusWork) sessionStorage.setItem('pare:project-tour-pending', '1');
    onRailOpenChange(false);
    setOpen(false);
    if (focusWork) {
      window.setTimeout(() => {
        findTarget('[data-testid="home-hero-input"]')?.focus({ preventScroll: false });
      }, 80);
    }
  }

  function next() {
    if (index >= steps.length - 1) {
      finish(true);
      return;
    }
    setIndex((value) => value + 1);
  }

  if (!open) {
    return (
      <button
        type="button"
        className="pare-tour-replay"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        aria-label="Show PARÉ tour"
        title="Show PARÉ tour"
      >
        ?
      </button>
    );
  }

  const pad = 10;
  const spotlight = rect
    ? {
        left: Math.max(8, rect.left - pad),
        top: Math.max(8, rect.top - pad),
        width: Math.min(window.innerWidth - 16, rect.width + pad * 2),
        height: Math.min(window.innerHeight - 16, rect.height + pad * 2),
      }
    : null;

  return (
    <div className="pare-tour" role="dialog" aria-modal="true" aria-label="PARÉ Studio tour">
      <style>{`
        .pare-tour{position:fixed;inset:0;z-index:9999;pointer-events:none}
        .pare-tour__shade{position:absolute;inset:0;background:rgba(7,8,10,.66);backdrop-filter:blur(2px)}
        .pare-tour__spot{position:absolute;border:1px solid rgba(255,255,255,.95);border-radius:14px;box-shadow:0 0 0 9999px rgba(7,8,10,.66),0 12px 50px rgba(0,0,0,.35);transition:all .24s ease;pointer-events:none}
        .pare-tour__card{position:fixed;right:24px;bottom:24px;width:min(390px,calc(100vw - 32px));background:#111317;color:#f7f7f2;border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:22px;pointer-events:auto;box-shadow:0 20px 70px rgba(0,0,0,.42)}
        .pare-tour__eyebrow{margin:0 0 10px;font:700 10px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:#aab2bc}
        .pare-tour__card h2{margin:0;font-size:28px;line-height:1.03;letter-spacing:-.04em}
        .pare-tour__card p{margin:14px 0 0;color:#bdc4cb;line-height:1.5;font-size:15px}
        .pare-tour__capabilities{display:inline-block;margin-top:16px!important;padding:8px 10px;border:1px solid rgba(255,255,255,.12);border-radius:10px;color:#f1f3ef!important;font:600 10px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace!important;letter-spacing:.04em;transition:border-color .18s ease,background .18s ease}
        .pare-tour__card:hover .pare-tour__capabilities,.pare-tour__capabilities:focus-visible{border-color:rgba(255,255,255,.34);background:rgba(255,255,255,.05)}
        .pare-tour__actions{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:22px}
        .pare-tour__actions button{appearance:none;border:0;background:none;color:inherit;font:600 12px/1 system-ui;cursor:pointer;padding:10px 0}
        .pare-tour__next{border-bottom:1px solid currentColor!important}
        .pare-tour__dots{display:flex;gap:6px}.pare-tour__dot{width:6px;height:6px;border-radius:999px;background:#4b5158}.pare-tour__dot.is-active{background:#f7f7f2}
        .pare-tour-replay{position:fixed;right:18px;bottom:18px;z-index:8000;width:34px;height:34px;border-radius:999px;border:1px solid rgba(127,127,127,.3);background:rgba(18,20,24,.88);color:#fff;cursor:pointer;opacity:.7}
        .pare-tour-replay:hover,.pare-tour-replay:focus-visible{opacity:1;transform:translateY(-1px)}
        @media(max-width:640px){.pare-tour__card{left:16px;right:16px;bottom:16px;width:auto}.pare-tour__card h2{font-size:24px}}
        @media(prefers-reduced-motion:reduce){.pare-tour__spot,.pare-tour-replay{transition:none!important}}
      `}</style>
      <div className="pare-tour__shade" />
      {spotlight ? <div className="pare-tour__spot" style={spotlight} /> : null}
      <section className="pare-tour__card">
        <p className="pare-tour__eyebrow">{step.eyebrow}</p>
        <h2>{step.title}</h2>
        <p>{step.body}</p>
        <p className="pare-tour__capabilities" tabIndex={0}>{step.capabilities}</p>
        <div className="pare-tour__actions">
          <button type="button" onClick={() => finish(false)}>Skip</button>
          <div className="pare-tour__dots" aria-label={`Step ${index + 1} of ${steps.length}`}>
            {steps.map((_, dotIndex) => (
              <span key={dotIndex} className={`pare-tour__dot${dotIndex === index ? ' is-active' : ''}`} />
            ))}
          </div>
          <button type="button" className="pare-tour__next" onClick={next}>
            {index === steps.length - 1 ? 'Start working' : 'Next'}
          </button>
        </div>
      </section>
    </div>
  );
}
