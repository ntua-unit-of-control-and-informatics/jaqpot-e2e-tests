import { Page, Locator } from '@playwright/test';

export interface ModelFormData {
  selector: string;
  type: 'input' | 'select';
  value: string;
}

async function waitForElementStability(locator: Locator, timeout: number = 10000): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.waitFor({ state: 'attached', timeout });
  // Wait a small amount for any ongoing React renders to complete
  await new Promise(resolve => setTimeout(resolve, 100));
}


export async function predict(page: Page, formData: ModelFormData[]) {
  // Wait for the predict form to be ready
  const predictForm = page.locator('form').first();
  await predictForm.waitFor({ state: 'visible', timeout: 15000 });
  await predictForm.waitFor({ state: 'attached', timeout: 15000 });

  for (const { selector, type, value } of formData) {
    if (type === 'input') {
      // Scope the selector to the form to avoid virtual DOM conflicts
      const element = predictForm.locator(selector).first();
      await waitForElementStability(element);
      await element.fill(value);
    } else if (type === 'select') {
      // Scope the selector to the form to avoid virtual DOM conflicts
      const element = predictForm.locator(selector).first();
      await waitForElementStability(element);
      await element.click();
      
      // Wait for dropdown to appear and stabilize
      await page.waitForTimeout(500);
      
      // Try multiple approaches to click the dropdown option
      const option = page.getByText(value, { exact: true });
      
      // First, wait for it to be visible
      await option.waitFor({ state: 'visible', timeout: 10000 });
      
      // Use force click if element is unstable due to React re-renders
      try {
        await option.click({ force: true, timeout: 5000 });
      } catch (error) {
        // Fallback: try with a longer wait
        await page.waitForTimeout(1000);
        await option.click({ force: true });
      }
    }
  }

  // Wait for submit button to be ready and click it (scope to form)
  const submitButton = predictForm.getByRole('button', { name: 'Submit' });
  await waitForElementStability(submitButton);
  await submitButton.click();
}
