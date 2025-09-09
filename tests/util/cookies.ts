import { Page } from '@playwright/test';

export async function acceptCookies(page: Page) {
  try {
    const acceptButton = page.getByRole('button', { name: 'Accept' });
    await acceptButton.waitFor({ state: 'visible', timeout: 5000 });
    await acceptButton.click();
  } catch (error) {
    // Cookie banner might not appear or already accepted
    console.log('Cookie acceptance skipped - banner not found or already accepted');
  }
}
