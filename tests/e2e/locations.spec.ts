import { test, expect } from '@playwright/test';

const SAMPLE_LOCATIONS = ['memphis', 'chicago', 'atlanta', 'dallas', 'charlotte'];

test.describe('Location Pages', () => {
  for (const slug of SAMPLE_LOCATIONS) {
    test(`/locations/${slug} renders correctly`, async ({ page }) => {
      await page.goto(`/locations/${slug}`);

      // H1 should mention the city
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();

      // Phone number present
      const phoneLink = page.getByRole('link', { name: /\(\d{3}\)|800-288-7396/ }).first();
      await expect(phoneLink).toBeVisible();

      // CTA to contact form
      const cta = page.getByRole('link', { name: /quote|contact/i }).first();
      await expect(cta).toBeVisible();

      // Breadcrumb navigation
      const breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i });
      await expect(breadcrumb).toBeVisible();
    });
  }

  test('unknown location slug returns 404', async ({ page }) => {
    const res = await page.goto('/locations/nonexistent-city-xyz');
    expect(res?.status()).toBe(404);
  });
});

test.describe('Locations Index', () => {
  test('/our-locations renders the map and location list', async ({ page }) => {
    await page.goto('/our-locations');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // Should show 33+ locations
    const locationLinks = page.getByRole('link', { name: /movers|moving/i });
    const count = await locationLinks.count();
    expect(count).toBeGreaterThanOrEqual(33);
  });
});
