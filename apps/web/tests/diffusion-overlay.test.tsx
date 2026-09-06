// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { latestStreamingTextTarget } from '../src/components/DiffusionOverlay';

afterEach(() => {
  document.body.replaceChildren();
});

describe('PARÉ diffusion DOM targeting', () => {
  it('follows the newest active streaming message rather than a stale earlier cursor', () => {
    document.body.innerHTML = `
      <div class="prose-block" data-stream-cursor="true"><p class="md-p">older stream</p></div>
      <div class="prose-block" data-stream-cursor="true"><p class="md-p">newest stream</p></div>
    `;
    expect(latestStreamingTextTarget()?.textContent).toBe('newest stream');
  });

  it('targets the latest prose-shaped markdown node inside the active stream', () => {
    document.body.innerHTML = `
      <div class="prose-block" data-stream-cursor="true">
        <p class="md-p">first paragraph</p>
        <h2 class="md-h">current heading</h2>
      </div>
    `;
    const target = latestStreamingTextTarget();
    expect(target?.classList.contains('md-h')).toBe(true);
    expect(target?.textContent).toBe('current heading');
  });

  it('does not select code blocks as the diffusion presentation target', () => {
    document.body.innerHTML = `
      <div class="prose-block" data-stream-cursor="true">
        <p class="md-p">semantic prose</p>
        <pre class="md-code"><code>const secret = 'leave code exact';</code></pre>
      </div>
    `;
    expect(latestStreamingTextTarget()?.textContent).toBe('semantic prose');
  });

  it('returns null when no assistant stream is active', () => {
    document.body.innerHTML = '<div class="prose-block"><p class="md-p">settled answer</p></div>';
    expect(latestStreamingTextTarget()).toBeNull();
  });
});
