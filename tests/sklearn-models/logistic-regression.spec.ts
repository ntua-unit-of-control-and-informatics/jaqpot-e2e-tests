import { test, expect } from '@playwright/test';
import { login } from '../util/login';
import { ModelFormData, predict } from '../util/predict';
import { acceptCookies } from '../util/cookies';

const formData: ModelFormData[] = [
  { selector: '[name="X1"]', value: '0', type: 'input' },
  { selector: '[name="X2"]', value: '1', type: 'input' },
];

test.beforeEach(async ({ page }) => {
  await page.goto('https://app.jaqpot.org/dashboard/models/1859/description');
  await acceptCookies(page);
});

test('should allow prediction if logged in', async ({ page }) => {
  await login(page);
  await page.getByRole('tab', { name: 'Predict' }).click();

  await predict(page, formData);

  await expect(page.getByText('Success')).toBeVisible();
  await expect(page.getByText('Probabilities')).toBeVisible();
});
