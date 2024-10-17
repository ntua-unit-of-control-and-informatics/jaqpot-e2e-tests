import { Page } from '@playwright/test';

export async function acceptCookies(page: Page) {
  await page.getByRole('button', { name: 'Accept' }).click();
}
