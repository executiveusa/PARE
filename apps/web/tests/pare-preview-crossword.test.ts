import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('../public/pare-preview/index.html', import.meta.url), 'utf8');
const redirects = readFileSync(new URL('../public/_redirects', import.meta.url), 'utf8');
const clientApp = readFileSync(new URL('../app/[[...slug]]/client-app.tsx', import.meta.url), 'utf8');

describe('PARÉ preview crossword hero', () => {
  it('ships the crossword as static HTML instead of constructing the hero only in JavaScript', () => {
    expect(html).toContain('aria-label="PARÉ crossword reveal"');
    expect(html).toContain('class="crossword" id="crossword"');
    expect(html).toContain('class="cwCell target" data-target="0"');
    expect(html).toContain('>P</span>');
    expect(html).toContain('>A</span>');
    expect(html).toContain('>R</span>');
    expect(html).toContain('>É</span>');
  });

  it('contains intersecting supporting letters below the PARÉ target row', () => {
    expect(html).toContain('style="grid-area:6/5">R</span>');
    expect(html).toContain('style="grid-area:7/5">O</span>');
    expect(html).toContain('style="grid-area:6/6">G</span>');
    expect(html).toContain('style="grid-area:6/7">E</span>');
    expect(html).toContain('style="grid-area:6/8">P</span>');
  });

  it('keeps the runtime hardening hooks required for layout-safe scroll animation', () => {
    expect(html).toContain("addEventListener('resize',invalidate");
    expect(html).toContain("addEventListener('pageshow',invalidate");
    expect(html).toContain("document.addEventListener('visibilitychange'");
    expect(html).toContain('document.fonts?.ready');
    expect(html).toContain('requestAnimationFrame(draw)');
  });

  it('does not depend on the previous dynamically generated random-letter matrix', () => {
    expect(html).not.toContain('for(let i=0;i<63;i++)');
    expect(html).not.toContain("const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-/:;.%#*?|'" );
  });

  it('makes the PARÉ effect the mandatory public doorway into Studio', () => {
    expect(redirects).toContain('/  /pare-preview/  302!');
    expect(html).toContain('id="studio-entry"');
    expect(html).toContain('data-enter-studio');
    expect(html).toContain("sessionStorage.setItem('pare:effect-passed','1')");
    expect(clientApp).toContain("const ENTRY_GATE_KEY = 'pare:effect-passed'");
    expect(clientApp).toContain("window.location.replace(`${LANDING_PATH}#studio-entry`)");
  });

  it('consumes the landing grant so every hard Studio entry must pass through the effect again', () => {
    expect(clientApp).toContain('sessionStorage.removeItem(ENTRY_GATE_KEY)');
    expect(clientApp).toContain('cleanOneShotEntryQuery()');
    expect(clientApp).toContain("url.searchParams.delete('pare-entry')");
  });

  it('keeps diffusion mounted inside the real Studio after the entry gate', () => {
    expect(clientApp).toContain("import { DiffusionOverlay } from '../../src/components/DiffusionOverlay'");
    expect(clientApp).toContain('<DiffusionOverlay />');
  });
});
