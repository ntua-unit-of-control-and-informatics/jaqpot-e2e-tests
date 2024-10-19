import { test as setup } from '@playwright/test';

setup('mock google analytics', async ({ page }) => {
  await page.route('https://www.google-analytics.com/g/collect*', (route) => {
    route.fulfill({
      status: 204,
      body: '',
    });
  });
});
