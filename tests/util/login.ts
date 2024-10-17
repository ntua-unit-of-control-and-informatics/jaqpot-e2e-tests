import type { Page } from 'playwright-core';

export const login = async (
  page: Page,
  username: string = process.env.TEST_USER_USERNAME!!,
  password: string = process.env.TEST_USER_PASSWORD!!,
) => {
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForURL(
    'https://login.jaqpot.org/realms/jaqpot/protocol/openid-connect/**',
  );
  await page.locator('[name="username"]').fill(username);
  await page.locator('[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
};
