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
  test('[P0] desktop scrambles, resolves to PARÉ, states the promise, and keeps the quote', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const browserErrors = collectBrowserErrors(page);

    await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

    await expect(page.locator('.cwCell.target')).toHaveCount(4);

    const earlyLetters = await page.locator('.cwCell').allTextContents();
    await page.waitForTimeout(700);
    const scrambledLetters = await page.locator('.cwCell').allTextContents();
    expect(scrambledLetters).not.toEqual(earlyLetters);

    await expect.poll(
      async () => page.locator('.cwCell.target').allTextContents(),
      { timeout: 8_000 },
    ).toEqual(['P', 'A', 'R', 'É']);

    await expect(
      page.getByRole('heading', { name: 'Design without a design team.' }),
    ).toBeVisible({ timeout: 8_000 });
    await expect(
      page.getByText('From idea to finished digital work.', { exact: true }),
    ).toBeVisible();

    await expect(page.getByRole('link', { name: /Enter PARÉ/ }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /The idea/ })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.getByRole('link', { name: /The idea/ }).click();
    await expect(page.locator('#manifesto')).toBeInViewport();
    await expect(page.getByText(/Perfection is achieved/)).toBeVisible();
    await expect(page.getByText(/nothing left to take away/)).toBeVisible();
    await expect(page.getByText(/Antoine de Saint-Exupéry/)).toBeVisible();

    await page.screenshot({
      path: 'ui/reports/test-results/pare-landing-desktop.png',
      fullPage: true,
    });
    expect(browserErrors).toEqual([]);
  });

  test('[P0] mobile entrance remains readable and overflow-free at 390x844', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const browserErrors = collectBrowserErrors(page);

    await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

    await expect.poll(
      async () => page.locator('.cwCell.target').allTextContents(),
      { timeout: 8_000 },
    ).toEqual(['P', 'A', 'R', 'É']);
    await expect(
      page.getByRole('heading', { name: 'Design without a design team.' }),
    ).toBeVisible({ timeout: 8_000 });
    await expect(page.getByRole('link', { name: /Enter PARÉ/ }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.locator('#manifesto').scrollIntoViewIfNeeded();
    await expect(page.getByText(/nothing left to take away/)).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.screenshot({
      path: 'ui/reports/test-results/pare-landing-mobile.png',
      fullPage: true,
    });
    expect(browserErrors).toEqual([]);
  });

  test('[P1] reduced-motion visitors receive the resolved doorway immediately', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

    await expect(page.locator('.cwCell.target')).toHaveText(['P', 'A', 'R', 'É']);
    await expect(
      page.getByRole('heading', { name: 'Design without a design team.' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Enter PARÉ/ }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('[P0] Enter PARÉ opens the Studio and starts the walkthrough', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: /Enter PARÉ/ }).first().click();

    await page.waitForURL(/\/projects(?:\?|$)/, { timeout: 15_000 });
    expect(page.url()).toContain('pare-entry=1');

    const diffusion = page.getByTestId('pare-diffusion-toggle');
    await expect(diffusion).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.od-loading-shell')).toHaveCount(0, { timeout: 20_000 });
    await expect(page.getByText('Projects', { exact: true }).first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole('button', { name: /New project/i })).toBeVisible({ timeout: 20_000 });

    await expect(page.getByRole('dialog', { name: 'PARÉ Studio tour' })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole('heading', { name: 'Start with the work.' })).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('heading', { name: 'Everything stays close.' })).toBeVisible();

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
