// @ts-check
import { test, expect } from '@playwright/test';

test('prueba', async ({ page }) => {
 await page.goto('http://localhost:5173');

  await page.locator('li')
    .filter({ has: page.locator('a', { hasText: 'plush toys' }) })
    .click();

    await expect(page).toHaveURL(/.*products/);

    const productCard = await page.getByTestId('product-card').first()
    await productCard.getByTestId('viewButton').click()

    await page.getByRole('button', {name: /log in/i}).click()
})
 
