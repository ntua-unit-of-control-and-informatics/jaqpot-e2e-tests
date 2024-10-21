import { Page } from '@playwright/test';

export interface ModelFormData {
  selector: string;
  type: 'input' | 'select';
  value: string;
}

export async function predict(page: Page, formData: ModelFormData[]) {
  const firstSelector = page.locator(formData[0]!.selector);
  await firstSelector.waitFor({ state: 'visible' });

  for (const { selector, type, value } of formData) {
    if (type === 'input') {
      await page.locator(selector).fill(value);
    } else if (type === 'select') {
      await page.locator(selector).click();
      await page.getByText(value).click();
    }
  }

  await page.getByRole('button', { name: 'Submit' }).click();
}
