import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders hero with correct headline', async ({ page }) => {
    const hero = page.getByRole('region', { name: 'Hero' });
    await expect(hero).toBeVisible();
    await expect(hero.getByRole('heading', { level: 1 })).toContainText(
      'Our world moves around you',
    );
  });

  test('hero CTAs link to correct destinations', async ({ page }) => {
    const getQuote = page.getByRole('link', { name: 'Get a Free Quote' });
    await expect(getQuote).toHaveAttribute('href', '/get-moving-with-armstrong');

    const estimate = page.getByRole('link', { name: 'Instant Estimate' });
    await expect(estimate).toHaveAttribute('href', '/ballpark-estimate');
  });

  test('service grid shows three service pillars', async ({ page }) => {
    const serviceSection = page.getByRole('region', { name: /services/i });
    await expect(serviceSection).toBeVisible();
    await expect(serviceSection.getByRole('article')).toHaveCount(3);
  });

  test('stats bar displays company stats', async ({ page }) => {
    const statsBar = page.getByRole('region', { name: /statistics/i });
    await expect(statsBar).toBeVisible();
    await expect(statsBar).toContainText('1957');
    await expect(statsBar).toContainText('33+');
  });

  test('header phone number is correct and callable', async ({ page }) => {
    const phoneLink = page.getByRole('link', { name: /800-288-7396/ }).first();
    await expect(phoneLink).toHaveAttribute('href', 'tel:+18002887396');
  });

  test('header "Get Started" CTA is visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const cta = page.getByRole('link', { name: 'Get Started' }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/get-moving-with-armstrong');
  });

  test('mobile nav opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const menuBtn = page.getByRole('button', { name: 'Open navigation menu' });
    await menuBtn.click();
    const panel = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(panel).toBeVisible();

    const closeBtn = page.getByRole('button', { name: 'Close menu' });
    await closeBtn.click();
    await expect(panel).not.toBeVisible();
  });

  test('footer contains legal company name', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    await expect(footer).toContainText('The Armstrong Company');
    await expect(footer).toContainText('Est. 1957');
  });
});
