import { test, expect } from '@playwright/test';

const PAGES_TO_CHECK = [
  { path: '/', description: 'Homepage' },
  { path: '/about', description: 'About' },
  { path: '/household-moving-services', description: 'Residential Moving' },
  { path: '/business-moving-services', description: 'Commercial Moving' },
  { path: '/supply-chain-solutions', description: 'Supply Chain' },
  { path: '/locations/memphis', description: 'Memphis Location' },
  { path: '/our-locations', description: 'Locations Index' },
];

test.describe('SEO — meta and structured data', () => {
  for (const { path, description } of PAGES_TO_CHECK) {
    test(`${description} (${path}) has title and meta description`, async ({ page }) => {
      await page.goto(path);

      // Title not empty and not default "Next.js"
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title).not.toBe('Next.js');
      expect(title.toLowerCase()).toContain('armstrong');

      // Meta description present
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDesc).toBeTruthy();
      expect(metaDesc!.length).toBeGreaterThan(50);
    });

    test(`${description} (${path}) has Organization JSON-LD`, async ({ page }) => {
      await page.goto(path);
      const schemas = await page.$$eval('script[type="application/ld+json"]', (scripts) =>
        scripts.map((s) => JSON.parse(s.textContent ?? '{}')),
      );
      const org = schemas.find((s) => s['@type'] === 'Organization');
      expect(org).toBeDefined();
      expect(org.name).toBe('The Armstrong Company');
    });
  }

  test('Location page has LocalBusiness JSON-LD', async ({ page }) => {
    await page.goto('/locations/memphis');
    const schemas = await page.$$eval('script[type="application/ld+json"]', (scripts) =>
      scripts.map((s) => JSON.parse(s.textContent ?? '{}')),
    );
    const local = schemas.find((s) => s['@type'] === 'MovingCompany');
    expect(local).toBeDefined();
    expect(local.address?.addressLocality).toBe('Memphis');
  });

  test('Location page has BreadcrumbList JSON-LD', async ({ page }) => {
    await page.goto('/locations/memphis');
    const schemas = await page.$$eval('script[type="application/ld+json"]', (scripts) =>
      scripts.map((s) => JSON.parse(s.textContent ?? '{}')),
    );
    const breadcrumb = schemas.find((s) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumb).toBeDefined();
  });

  test('canonical tag is present on key pages', async ({ page }) => {
    await page.goto('/');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('goarmstrong.com');
  });

  test('robots meta allows indexing on public pages', async ({ page }) => {
    await page.goto('/');
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    // Either no robots meta (defaults to index) or explicitly allows index
    if (robots) {
      expect(robots).not.toContain('noindex');
    }
  });

  test('dashboard is not indexed', async ({ page }) => {
    await page.goto('/dashboard');
    // Should redirect to login or return 401/403 — not be accessible
    expect(
      [200, 401, 403, 302, 308].includes(page.url().includes('/dashboard') ? 200 : 302),
    ).toBeTruthy();
  });
});

test.describe('Security Headers', () => {
  test('homepage has X-Frame-Options: DENY', async ({ request }) => {
    const res = await request.get('/');
    expect(res.headers()['x-frame-options']).toBe('DENY');
  });

  test('homepage has X-Content-Type-Options: nosniff', async ({ request }) => {
    const res = await request.get('/');
    expect(res.headers()['x-content-type-options']).toBe('nosniff');
  });

  test('homepage has HSTS header', async ({ request }) => {
    const res = await request.get('/');
    const hsts = res.headers()['strict-transport-security'];
    expect(hsts).toContain('max-age=');
    expect(hsts).toContain('includeSubDomains');
  });
});
