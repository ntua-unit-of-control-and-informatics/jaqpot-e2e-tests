import { test, expect } from '@playwright/test';
import { login } from '../util/login';
import { ModelFormData, predict } from '../util/predict';
import { acceptCookies } from '../util/cookies';

const formData: ModelFormData[] = [
  { selector: '[name="BW"]', value: '1', type: 'input' },
  { selector: '[name="admin.type"]', value: 'iv', type: 'select' },
  { selector: '[name="admin.time"]', value: '1', type: 'input' },
  { selector: '[name="admin.dose"]', value: '1', type: 'input' },
  { selector: '[name="sim.start"]', value: '1', type: 'input' },
  { selector: '[name="sim.end"]', value: '11', type: 'input' },
  { selector: '[name="sim.step"]', value: '1', type: 'input' },
];

test.beforeEach(async ({ page }) => {
  const legacyUrl = 'https://app.jaqpot.org/model/gwNU9kWh3miIRwwYWLcn';
  await page.goto(legacyUrl);
  await acceptCookies(page);
  await page.waitForURL('**/models/1730/description');
});

test('should allow prediction if logged in', async ({ page }) => {
  await login(page);
  await page.getByRole('tab', { name: 'Predict' }).click();

  const firstButton = page.getByRole('button', { name: 'Add value' }).first();
  const secondButton = page.getByRole('button', { name: 'Add value' }).nth(1);
  await firstButton.waitFor({ state: 'visible' });
  await secondButton.waitFor({ state: 'visible' });

  await firstButton.click();
  await secondButton.click();

  await predict(page, formData);

  await expect(page.getByText('Success')).toBeVisible();
});
