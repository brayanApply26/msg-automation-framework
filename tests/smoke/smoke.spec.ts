import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PopupHandler } from '../../utils/PopupHandler';
import { ENV } from '../../utils/env.config';

/**
 * SMOKE TESTS — Fast critical path validation (~20s)
 * Runs on every PR to dev branch.
 * Validates the site is up and the main navigation works.
 */
test.describe('Smoke — Critical Path', () => {
    test.setTimeout(30000);

    test('Site is reachable and homepage loads', async ({ page }) => {
        const response = await page.goto(ENV.baseURL);
        expect(response?.status()).toBeLessThan(400);
        await expect(page).toHaveTitle(/White Stuff/i);
    });

    test('Desktop nav — MEN menu is visible', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await PopupHandler.waitAndClose(page, 3000);

        const menLink = page.getByTestId('desktop-nav').getByRole('link', { name: 'MEN', exact: true });
        await expect(menLink).toBeVisible();
    });

    test('MEN Sale page loads and shows products', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await PopupHandler.waitAndClose(page, 3000);
        await homePage.clickMensSaleLink();

        const firstProduct = page.getByTestId('product-card-image-link').first();
        await expect(firstProduct).toBeVisible({ timeout: 10000 });
    });
});
