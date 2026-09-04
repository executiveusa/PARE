import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const overlay = readFileSync(new URL('../src/components/DiffusionOverlay.tsx', import.meta.url), 'utf8');
const assistant = readFileSync(new URL('../src/components/AssistantMessage.tsx', import.meta.url), 'utf8');
const clientApp = readFileSync(new URL('../app/[[...slug]]/client-app.tsx', import.meta.url), 'utf8');

describe('PARÉ Studio diffusion contract', () => {
  it('is mounted in the actual Studio shell', () => {
    expect(clientApp).toContain("import { DiffusionOverlay } from '../../src/components/DiffusionOverlay'");
    expect(clientApp).toContain('<DiffusionOverlay />');
  });

  it('binds to the real AssistantMessage streaming cursor', () => {
    expect(assistant).toContain('className="prose-block"');
    expect(assistant).toContain('data-stream-cursor={showStreamCursor && !live ? "true" : undefined}');
    expect(overlay).toContain("const STREAM_BLOCK_SELECTOR = '.prose-block[data-stream-cursor=\"true\"]'");
    expect(overlay).toContain('querySelectorAll<HTMLElement>(STREAM_BLOCK_SELECTOR)');
  });

  it('supports the prose forms that can be streamed without touching code/tool surfaces', () => {
    for (const selector of ['.md-p', '.md-h', '.md-ul', '.md-ol', '.md-quote']) {
      expect(overlay).toContain(`\"${selector}\"`);
    }
    expect(overlay).not.toContain('".md-code"');
    expect(overlay).not.toContain('".tool-card"');
  });

  it('exposes deterministic visual state for browser verification', () => {
    expect(overlay).toContain('data-testid="pare-diffusion-toggle"');
    expect(overlay).toContain('data-pare-diffusion={reducedMotion ? "reduced" : enabled ? "on" : "off"}');
    expect(overlay).toContain('data-pare-diffusion-active');
  });
});
