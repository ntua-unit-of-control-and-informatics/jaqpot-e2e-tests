import { test, expect } from '@playwright/test';
import { login } from '../util/login';
import { ModelFormData, predict } from '../util/predict';

const formData: ModelFormData[] = [
  { selector: '[name="SMILES"]', value: 'CCO', type: 'input' },
  { selector: '[name="X1"]', value: '1', type: 'input' },
  { selector: '[name="X2"]', value: '1', type: 'input' },
  { selector: '[name="Cat_col"]', value: 'CAT_1', type: 'select' },
];

test.beforeEach(async ({ page }) => {
  await page.goto('https://app.jaqpot.org/dashboard/models/1853/description');
  await page.getByRole('button', { name: 'Accept' }).click();
});

test('should not allow prediction if not logged in', async ({ page }) => {
  await page.getByRole('tab', { name: 'Predict' }).click();

  await predict(page, formData);

  await expect(
    page.getByText(
      'Error creating prediction: You need to be authenticated to access this endpoint',
    ),
  ).toBeVisible();
});

test('should allow prediction if logged in', async ({ page }) => {
  await login(page);
  await page.getByRole('tab', { name: 'Predict' }).click();

  await predict(page, formData);

  await expect(page.getByText('Success')).toBeVisible();
});
