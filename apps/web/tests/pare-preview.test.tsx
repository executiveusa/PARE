import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import ParePreviewPage, { metadata } from '../app/pare-preview/page';

describe('PARÉ preview', () => {
  const html = renderToStaticMarkup(<ParePreviewPage />);

  it('keeps the crossword reveal and PARÉ definition as the opening story', () => {
    expect(html).toContain('data-scroll-scene="hero"');
    expect(html).toContain('data-target="true"');
    expect(html).toContain('To remove what is unnecessary until only what matters remains.');
  });

  it('moves from subtraction into the Studio before runtime-neutral messaging', () => {
    const noise = html.indexOf('What are we making?');
    const studio = html.indexOf('Build the official brand for this company.');
    const engines = html.indexOf('One request.');

    expect(noise).toBeGreaterThan(0);
    expect(studio).toBeGreaterThan(noise);
    expect(engines).toBeGreaterThan(studio);
  });

  it('exposes the Studio and open-source paths', () => {
    expect(html).toContain('Enter studio');
    expect(html).toContain('Enter PARÉ');
    expect(html).toContain('https://github.com/executiveusa/PARE');
    expect(html).toContain('Apache-2.0 / open source');
  });

  it('keeps progressive enhancement and reduced-motion fallbacks in the output', () => {
    expect(html).toContain('prefers-reduced-motion:reduce');
    expect(html).toContain("'IntersectionObserver'in window");
    expect(html).toContain("root.classList.add('pare-motion')");
    expect(html).toContain('[data-reveal]{opacity:1;transform:none}');
  });

  it('has preview-specific metadata', () => {
    expect(metadata.title).toBe('PARÉ — Design operating system');
    expect(metadata.description).toContain('Remove what is unnecessary');
  });
});
