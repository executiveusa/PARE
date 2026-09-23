import { expect, test, type Page } from '@playwright/test';

const landingUrl =
  process.env.PARE_LANDING_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:3000/pare-preview';

function collectBrowserErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  return errors;
}

async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

async function expectCrosswordMoves(page: Page) {
  const target = page.locator('.cwCell.target').first();
  await expect(target).toBeVisible();
  const before = await target.evaluate((el) => getComputedStyle(el).transform);

  await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('#reveal');
    if (!hero) throw new Error('PARÉ hero not found');
    const max = Math.max(1, hero.offsetHeight - window.innerHeight);
    window.scrollTo({ top: max * 0.72, behavior: 'instant' });
  });

  await page.waitForTimeout(250);
  const after = await target.evaluate((el) => getComputedStyle(el).transform);
  expect(after).not.toBe(before);
}

test.describe('PARÉ public doorway', () => {
  test('[P0] desktop explains the product, exposes Try PARÉ, and animates the crossword', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const browserErrors = collectBrowserErrors(page);

    await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { name: 'Design without a design team.' })).toBeVisible();
    await expect(page.getByText('From idea to finished digital work.', { exact: true })).toBeVisible();

    const tryPare = page.getByRole('link', { name: /Try PARÉ/ }).first();
    await expect(tryPare).toBeVisible();
    await expect(page.getByRole('link', { name: /See how it works/ })).toBeVisible();

    await expectNoHorizontalOverflow(page);
    await expectCrosswordMoves(page);

    await page.getByRole('link', { name: /See how it works/ }).click();
    await expect(page.locator('#product-proof')).toBeInViewport();
    await expect(page.getByText('INPUT', { exact: true })).toBeVisible();
    await expect(page.getByText('ACTION', { exact: true })).toBeVisible();
    await expect(page.getByText('RESULT', { exact: true })).toBeVisible();
    await expect(page.getByText('PR #11', { exact: true })).toBeVisible();

    const productPrecedesManifesto = await page.evaluate(() => {
      const product = document.querySelector('#product-proof');
      const manifesto = document.querySelector('#manifesto');
      if (!product || !manifesto) throw new Error('Expected product and manifesto sections');
      return Boolean(product.compareDocumentPosition(manifesto) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(productPrecedesManifesto).toBe(true);

    await page.screenshot({
      path: 'ui/reports/test-results/pare-landing-desktop.png',
      fullPage: true,
    });
    expect(browserErrors).toEqual([]);
  });

  test('[P0] mobile remains readable and overflow-free at 390x844', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const browserErrors = collectBrowserErrors(page);

    await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { name: 'Design without a design team.' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Try PARÉ/ }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.locator('#product-proof').scrollIntoViewIfNeeded();
    await expect(page.locator('#product-proof')).toBeInViewport();
    await expectNoHorizontalOverflow(page);
    await page.screenshot({
      path: 'ui/reports/test-results/pare-landing-mobile.png',
      fullPage: true,
    });

    expect(browserErrors).toEqual([]);
  });

  test('[P1] reduced-motion visitors receive a readable resolved doorway', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { name: 'Design without a design team.' })).toBeVisible();
    await expect(page.locator('#heroCaption')).toHaveCSS('opacity', '1');
    await expect(page.getByRole('link', { name: /Try PARÉ/ }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('[P0] Try PARÉ grants one Studio admission and navigates to the Studio route', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: /Try PARÉ/ }).first().click();

    await page.waitForURL(/\/projects(?:\?|$)/, { timeout: 15_000 });
    expect(page.url()).toContain('pare-entry=1');

    const diffusion = page.getByTestId('pare-diffusion-toggle');
    await expect(diffusion).toBeVisible({ timeout: 15_000 });

    // The real Studio route is the Projects browser. The hidden Home view may
    // remain mounted for SPA state, so do not mistake that for an entry failure.
    await expect(page.locator('.od-loading-shell')).toHaveCount(0, { timeout: 20_000 });
    await expect(page.getByText('Projects', { exact: true }).first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole('button', { name: /New project/i })).toBeVisible({ timeout: 20_000 });

    const gateState = await page.evaluate(() => ({
      effectPassed: sessionStorage.getItem('pare:effect-passed'),
      url: window.location.pathname + window.location.search,
    }));
    expect(gateState.effectPassed).toBeNull();
    expect(gateState.url.startsWith('/projects')).toBe(true);

    await page.screenshot({
      path: 'ui/reports/test-results/pare-studio-after-entry.png',
      fullPage: true,
    });
  });
});
