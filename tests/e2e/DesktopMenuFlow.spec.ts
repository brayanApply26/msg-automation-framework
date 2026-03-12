import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { PopupHandler } from '../../utils/PopupHandler';
import { ENV } from '../../utils/env.config';

test.describe('White Stuff Desktop Menu E2E Flow', () => {
    test.setTimeout(120000);

    test('Should complete guest checkout via desktop navigation menu', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);

        // --- Step 1: Navigate and close all popups once ---
        await homePage.navigate();
        await PopupHandler.waitAndClose(page, 4000);

        // --- Step 1: Hover MEN → All Clothing ---
        await homePage.hoverMenAndClickAllClothing();

        // --- Step 2: Click MEN'S SALE ---
        await homePage.clickMensSaleLink();

        // --- Steps 4-5: Click product image ---
        await page.getByTestId('close-button').click();
        await page.mouse.wheel(0, 400);
        await productPage.clickProductByName('Oban Ombre Half Zip');

        // --- Steps 6-8: Select size L and Add to Bag ---
        await page.getByRole('button', { name: 'L', exact: true }).click();
        await page.getByTestId('pdp-add-to-bag').click();

        // --- Step 9: Verify "ADDED TO BAG" title appears ---
        await productPage.verifyAddedToBag();

        // --- Step 10: Click CHECKOUT ---
        await page.getByTestId('addedtobag-checkout').click();

        // --- Steps 11-13: Guest checkout email ---
        await page.getByTestId('checkout-guest-email-input').click();
        await page.getByTestId('checkout-guest-email-input').fill(ENV.guestEmail);
        await page.getByTestId('checkout-guest-submit-button').click();

        // --- Steps 15-20: Collection / Click & Collect ---
        await page.getByTestId('co-selection-panel-collection').click();
        await page.getByRole('textbox', { name: 'Postcode or town / city' }).click();
        await page.getByRole('textbox', { name: 'Postcode or town / city' }).click();
        await page.getByRole('textbox', { name: 'Postcode or town / city' }).fill(ENV.postcode);
        await page.getByRole('button', { name: 'Buckingham Palace London SW1A 1AA', exact: true }).click();
        await page.getByRole('button', { name: 'Search' }).click();
        await page.getByText('£3.50Post Office BroadwayPost').click();
        await page.getByRole('button', { name: 'Collect Here' }).click();

        // --- Steps 21-24: Contact info ---
        await page.getByTestId('ccFirstName-text').click();
        await page.getByTestId('ccFirstName-text').fill(ENV.firstName);
        await page.getByTestId('ccFirstName-text').press('Tab');
        await page.getByTestId('ccLastName-text').fill(ENV.lastName);
        await page.getByTestId('ccTel-text').click();
        await page.getByTestId('ccTel-text').fill(ENV.phone);
        await page.locator('form').filter({ hasText: 'TitlePlease selectMsMissMrsMrDrFirst Name*Last Name*Phone Number*Continue' }).getByRole('button').click();

        // --- Steps 25-27: Billing name ---
        await page.locator('[data-test="firstNameInput-text"]').click();
        await page.locator('[data-test="firstNameInput-text"]').fill(ENV.firstName);
        await page.locator('[data-test="firstNameInput-text"]').press('Tab');
        await page.locator('[data-test="lastNameInput-text"]').fill(ENV.lastName);
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.locator('[data-test="addressLine1Input-text"]').click();
        await page.locator('[data-test="addressLine1Input-text"]').fill(ENV.addressLine1);
        await page.locator('[data-test="cityInput-text"]').click();
        await page.locator('[data-test="cityInput-text"]').fill(ENV.city);
        await page.getByRole('button', { name: 'Continue' }).click();

        // --- Steps 28-31: Billing address ---
        await page.locator('[data-test="postCodeInput-text"]').click();
        await page.locator('[data-test="postCodeInput-text"]').fill(ENV.postcode);
        await page.getByRole('button', { name: 'Continue' }).click();

        // --- Steps 32-35: Payment details ---
        await page.locator('iframe[title="Iframe for card number"]').contentFrame().getByRole('textbox', { name: 'Card number' }).click();
        await page.locator('iframe[title="Iframe for card number"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill(ENV.cardNumber);
        await page.locator('iframe[title="Iframe for expiry date"]').contentFrame().getByRole('textbox', { name: 'Expiry date' }).click();
        await page.locator('iframe[title="Iframe for expiry date"]').contentFrame().getByRole('textbox', { name: 'Expiry date' }).fill(ENV.cardExpiry);
        await page.locator('iframe[title="Iframe for security code"]').contentFrame().getByRole('textbox', { name: 'Security code' }).click();
        await page.locator('iframe[title="Iframe for security code"]').contentFrame().getByRole('textbox', { name: 'Security code' }).fill(ENV.cardCvv);
        await page.getByRole('button', { name: 'Pay £' }).click();

        // --- Step 36: Validate payment error ---
        await expect(page.getByText('Error: There was an error')).toBeVisible();
    });
});


