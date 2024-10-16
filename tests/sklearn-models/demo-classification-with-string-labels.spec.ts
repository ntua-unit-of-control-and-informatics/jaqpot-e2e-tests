import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://app.jaqpot.org/dashboard/models/1853/description');
    await page.getByRole('button', {name: 'Accept'}).click();
});


test.describe('Demo classification with string labels', () => {
    test('should not allow prediction if not logged in', async ({page}) => {
        await page.getByRole('tab', { name: 'Predict' }).click();

        await page.locator('[name="SMILES"]').fill('CCO');
        await page.locator('[name="X1"]').fill('1');
        await page.locator('[name="X2"]').fill('1');
        await page.locator('[name="Cat_col"]').click();
        await page.getByText('CAT_1').click();

        await page.getByRole('button', {name: 'Submit'}).click();

        await expect(page.getByText('Error creating prediction: You need to be authenticated to access this endpoint')).toBeVisible();
    });

    test('should allow prediction if logged in', async ({page}) => {
        
        await page.getByRole('tab', { name: 'Predict' }).click();

        await page.locator('[name="SMILES"]').fill('CCO');
        await page.locator('[name="X1"]').fill('1');
        await page.locator('[name="X2"]').fill('1');
        await page.locator('[name="Cat_col"]').click();
        await page.getByText('CAT_1').click();

        await page.getByRole('button', {name: 'Submit'}).click();

        await expect(page.getByText('Error creating prediction: You need to be authenticated to access this endpoint')).toBeVisible();
    });
})
