import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://app.jaqpot.org/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Jaqpot/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://jaqpot.org/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Getting started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Getting started' })).toBeVisible();
});
