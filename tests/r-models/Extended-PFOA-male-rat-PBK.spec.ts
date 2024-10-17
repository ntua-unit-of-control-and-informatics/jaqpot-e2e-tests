import { test, expect } from '@playwright/test';
import { login } from '../util/login';
import { ModelFormData, predict } from '../util/predict';
import { acceptCookies } from '../util/cookies';

const formData: ModelFormData[] = [
  { selector: '[name="BW"]', value: '1', type: 'input' },
  { selector: '[name="admin.type"]', value: 'IV', type: 'select' },
  { selector: '[name="admin.time"]', value: '1', type: 'input' },
  { selector: '[name="admin.dose"]', value: '1', type: 'input' },
  { selector: '[name="sim.start"]', value: '1', type: 'input' },
  { selector: '[name="sim.end"]', value: '11', type: 'input' },
  { selector: '[name="sim.step"]', value: '1', type: 'input' },
];

test.beforeEach(async ({ page }) => {
  await page.goto('https://app.jaqpot.org/dashboard/models/1730/description');
  await acceptCookies(page);
});

test('should allow prediction if logged in', async ({ page }) => {
  await login(page);
  await page.getByRole('tab', { name: 'Predict' }).click();

  await predict(page, formData);

  await expect(page.getByText('Success')).toBeVisible();
});
