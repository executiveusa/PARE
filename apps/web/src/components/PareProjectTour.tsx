import { useEffect, useMemo, useState } from 'react';

type ProjectTourStep = {
  selector: string;
  eyebrow: string;
  title: string;
  body: string;
  capabilities: string;
};

const steps: ProjectTourStep[] = [
  {
    selector: '[data-testid="chat-composer"]',
    eyebrow: '01 · Direct',
    title: 'Keep directing the work here.',
    body: 'Use the project chat to ask for the first version, change direction, or request another pass.',
    capabilities: 'Prompt · revise · continue',
  },
  {
    selector: '[data-testid="chat-plus-trigger"]',
    eyebrow: '02 · Context',
    title: 'Add only what the work needs.',
    body: 'Attach files, references, tools, or other context from the plus menu when they materially improve the result.',
    capabilities: 'Files · references · context',
  },
  {
    selector: '[data-testid="design-files-tab"]',
    eyebrow: '03 · Files',
    title: 'The project keeps the working files.',
    body: 'Open Design Files to inspect what PARÉ created and keep the source material tied to this project.',
    capabilities: 'Source · assets · generated files',
  },
  {
    selector: '[data-testid="file-workspace"]',
    eyebrow: '04 · Work',
    title: 'Review the actual deliverable.',
    body: 'The workspace is where files, previews, canvases, and live artifacts open. Review the work itself instead of reading a status report.',
    capabilities: 'Canvas · artifact · preview',
  },
  {
    selector: '[data-testid="chat-composer"]',
    eyebrow: '05 · Revise',
    title: 'Change the work in plain language.',
    body: 'Ask for a revision here. PARÉ keeps the conversation and the project together so the next pass starts from the work you already have.',
    capabilities: 'Feedback · revision · next pass',
  },
  {
    selector: '[data-testid="file-workspace"]',
    eyebrow: '06 · Finish',
    title: 'Preview, share, or take the work with you.',
    body: 'Once a deliverable is open, its own preview and share or download controls appear with that file. Use those controls when the work is ready.',
    capabilities: 'Preview · share · download',
  },
];

const PENDING_KEY = 'pare:project-tour-pending';
const SEEN_KEY = 'pare:project-tour-seen';

function findTarget(selector: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(selector);
}

export function PareProjectTour() {
  const shouldStart = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(PENDING_KEY) === '1' && sessionStorage.getItem(SEEN_KEY) !== '1';
  }, []);
  const [open, setOpen] = useState(shouldStart);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const step = steps[index];

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
    sync();
    const settle = window.setTimeout(sync, 140);
    const timer = window.setInterval(sync, 450);
    window.addEventListener('resize', sync);
    window.addEventListener('scroll', sync, true);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.clearInterval(timer);
      window.removeEventListener('resize', sync);
      window.removeEventListener('scroll', sync, true);
    };
  }, [open, step.selector]);

  function finish(focusComposer = false) {
    sessionStorage.removeItem(PENDING_KEY);
    sessionStorage.setItem(SEEN_KEY, '1');
    setOpen(false);
    if (focusComposer) {
      window.setTimeout(() => {
        findTarget('[data-testid="chat-composer"]')?.querySelector<HTMLElement>('[contenteditable="true"], textarea, input')?.focus();
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

  if (!open) return null;

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
    <div className="pare-project-tour" role="dialog" aria-modal="true" aria-label="PARÉ project tour">
      <style>{`
        .pare-project-tour{position:fixed;inset:0;z-index:10020;pointer-events:none}
        .pare-project-tour__shade{position:absolute;inset:0;background:rgba(7,8,10,.64);backdrop-filter:blur(2px)}
        .pare-project-tour__spot{position:absolute;border:1px solid rgba(255,255,255,.95);border-radius:14px;box-shadow:0 0 0 9999px rgba(7,8,10,.64),0 12px 50px rgba(0,0,0,.35);transition:all .24s ease}
        .pare-project-tour__card{position:fixed;right:24px;bottom:24px;width:min(390px,calc(100vw - 32px));background:#111317;color:#f7f7f2;border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:22px;pointer-events:auto;box-shadow:0 20px 70px rgba(0,0,0,.42)}
        .pare-project-tour__eyebrow{margin:0 0 10px;font:700 10px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:#aab2bc}
        .pare-project-tour__card h2{margin:0;font-size:28px;line-height:1.03;letter-spacing:-.04em}
        .pare-project-tour__card p{margin:14px 0 0;color:#bdc4cb;line-height:1.5;font-size:15px}
        .pare-project-tour__capabilities{display:inline-block!important;padding:8px 10px;border:1px solid rgba(255,255,255,.12);border-radius:10px;color:#f1f3ef!important;font:600 10px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace!important;letter-spacing:.04em}
        .pare-project-tour__actions{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:22px}
        .pare-project-tour__actions button{appearance:none;border:0;background:none;color:inherit;font:600 12px/1 system-ui;cursor:pointer;padding:10px 0}
        .pare-project-tour__next{border-bottom:1px solid currentColor!important}
        .pare-project-tour__dots{display:flex;gap:5px}.pare-project-tour__dot{width:6px;height:6px;border-radius:999px;background:#4b5158}.pare-project-tour__dot.is-active{background:#f7f7f2}
        @media(max-width:640px){.pare-project-tour__card{left:16px;right:16px;bottom:16px;width:auto}.pare-project-tour__card h2{font-size:24px}}
        @media(prefers-reduced-motion:reduce){.pare-project-tour__spot{transition:none!important}}
      `}</style>
      <div className="pare-project-tour__shade" />
      {spotlight ? <div className="pare-project-tour__spot" style={spotlight} /> : null}
      <section className="pare-project-tour__card">
        <p className="pare-project-tour__eyebrow">{step.eyebrow}</p>
        <h2>{step.title}</h2>
        <p>{step.body}</p>
        <p className="pare-project-tour__capabilities">{step.capabilities}</p>
        <div className="pare-project-tour__actions">
          <button type="button" onClick={() => finish(false)}>Skip</button>
          <div className="pare-project-tour__dots" aria-label={`Step ${index + 1} of ${steps.length}`}>
            {steps.map((_, dotIndex) => (
              <span key={dotIndex} className={`pare-project-tour__dot${dotIndex === index ? ' is-active' : ''}`} />
            ))}
          </div>
          <button type="button" className="pare-project-tour__next" onClick={next}>
            {index === steps.length - 1 ? 'Keep working' : 'Next'}
          </button>
        </div>
      </section>
    </div>
  );
}
