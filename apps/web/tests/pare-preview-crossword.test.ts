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

  it('brings product truth and the primary action into the opening experience', () => {
    expect(html).toContain('Owner-controlled AI Studio');
    expect(html).toContain('Turn an idea into finished digital work without managing the models, agents and infrastructure underneath it.');
    expect(html).toContain('>Try PARÉ ↗</a>');
    expect(html).toContain('href="#product-proof">See how it works ↓</a>');
  });

  it('reduces navigation and removes unverified social-platform root links', () => {
    expect(html).toContain('<a class="mark" href="#top">PARÉ</a>');
    expect(html).toContain('class="primaryNav"');
    expect(html).not.toContain('>Journal</a></div></nav>');
    expect(html).not.toContain('https://www.instagram.com/');
    expect(html).not.toContain('https://www.facebook.com/');
    expect(html).not.toContain('https://dribbble.com/');
    expect(html).not.toContain('https://www.behance.net/');
  });

  it('shortens the mandatory doorway and labels the static Studio frame honestly', () => {
    expect(html).toContain('.hero{position:relative;height:154svh}');
    expect(html).toContain('.hero{height:132svh}');
    expect(html).toContain('id="product-proof"');
    expect(html).toContain('PARÉ Studio · interface preview');
    expect(html).not.toContain('<section class="question">');
  });

  it('puts product before philosophy and removes duplicate full-screen brand explanation', () => {
    expect(html).not.toContain('class="statement"');
    expect(html.indexOf('id="product-proof"')).toBeLessThan(html.indexOf('id="manifesto"'));
    expect(html).toContain('PARÉ · pare /per/ · verb · to reduce by removing what is unnecessary.');
    expect(html).toContain('.manifesto{position:relative;min-height:118svh}');
  });

  it('compresses lower-page architecture and conversion sections without deleting access modes', () => {
    expect(html).toContain('.interfaces{min-height:72svh');
    expect(html).toContain('.final{min-height:74svh');
    expect(html).toContain('Studio for people.<br>Interfaces for agents.');
    expect(html).toContain('<b>Studio</b>');
    expect(html).toContain('<b>API</b>');
    expect(html).toContain('<b>MCP</b>');
    expect(html).toContain('<b>CLI</b>');
  });

});
