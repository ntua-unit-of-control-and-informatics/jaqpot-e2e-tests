import { test, expect } from '@playwright/test';
import { login } from '../util/login';
import { ModelFormData, predict } from '../util/predict';
import { acceptCookies } from '../util/cookies';

const formData: ModelFormData[] = [
  { selector: '[name="smiles"]', value: 'CC', type: 'input' },
  {
    selector: '[name="qsarGuid"]',
    value: 'Water Solubility (EPISUsssITE)',
    type: 'select',
  },
];

test.beforeEach(async ({ page }) => {
  await page.goto('https://app.jaqpot.org/dashboard/models/1837/description');
  await acceptCookies(page);
});

test('should allow prediction if logged in', async ({ page }) => {
  await login(page);
  await page.getByRole('tab', { name: 'Predict' }).click();

  await predict(page, formData);

  await expect(page.getByText('Success')).toBeVisible();
});
