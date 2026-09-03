import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageUrl = new URL('../app/pages/pare-preview/index.astro', import.meta.url);
const cssUrl = new URL('../app/pare-preview.css', import.meta.url);

const [page, css] = await Promise.all([
  readFile(pageUrl, 'utf8'),
  readFile(cssUrl, 'utf8'),
]);

test('PARÉ preview keeps the crossword reveal as the signature opening', () => {
  assert.match(page, /class="pare-crossword"/);
  assert.match(page, /data-target=\{target\.has/);
  assert.match(page, />PARÉ</);
  assert.match(page, /To remove what is unnecessary until only what matters remains\./);
});

test('PARÉ preview tells the subtraction story before the product explanation', () => {
  const definition = page.indexOf('pare-definition');
  const noise = page.indexOf('pare-noise');
  const studio = page.indexOf('pare-studio');
  const engines = page.indexOf('pare-engines');

  assert.ok(definition > 0);
  assert.ok(noise > definition);
  assert.ok(studio > noise);
  assert.ok(engines > studio);
});

test('PARÉ preview exposes a clear Studio action and open-source source path', () => {
  assert.match(page, /Enter studio/);
  assert.match(page, /Enter PARÉ/);
  assert.match(page, /https:\/\/github\.com\/executiveusa\/PARE/);
  assert.match(page, /Apache-2\.0 \/ open source/);
});

test('PARÉ preview includes responsive and motion-accessible behavior', () => {
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(page, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(css, /overflow-x: clip/);
});

test('motion is implemented with transform and opacity instead of a new animation dependency', () => {
  assert.match(css, /transform:/);
  assert.match(css, /opacity:/);
  assert.doesNotMatch(page, /gsap|framer-motion|motion\/react|three\.js/i);
});
