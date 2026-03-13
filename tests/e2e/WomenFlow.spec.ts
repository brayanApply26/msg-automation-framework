import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { WomenProductPage } from '../../pages/WomenProductPage';
import { PopupHandler } from '../../utils/PopupHandler';
import { ENV } from '../../utils/env.config';

test.describe('White Stuff Women E2E Flow', () => {
    test.setTimeout(120000);

    test('Should complete guest checkout — Women Jeans + Sale Footwear', async ({ page }) => {
        const homePage = new HomePage(page);
        const womenPage = new WomenProductPage(page);

        // --- Step 1: Navigate and close all popups ---
        await homePage.navigate();
        await PopupHandler.waitAndClose(page, 4000);

        // --- Step 2-3: Hover WOMEN → click Jeans & Jeggings ---
        await homePage.hoverWomenAndClickJeans();

        // --- Step 4: Click first product ---
        await womenPage.clickFirstProduct();

        // --- Step 5-6: Select size 12 then Regular leg ---
        await page.getByRole('button', { name: '12' }).click();
        await page.getByRole('button', { name: 'Regular' }).click();

        // --- Step 7: Add to bag ---
        await page.getByTestId('pdp-add-to-bag').click();

        // --- Step 8: View bag ---
        await page.getByTestId('addedtobag-viewbag').click();

        // --- Step 9: Continue shopping ---
        await page.getByTestId('bag-continue-shopping-button').click();

        // --- Step 10: Navigate to Sale Footwear ---
        await page.getByRole('link', { name: 'SALE FOOTWEAR' }).click();

        // --- Step 11: Filter by size 5 ---
        await womenPage.filterBySize5();

        // --- Step 12: Click second product ---
        await womenPage.clickSecondProduct();

        // --- Step 13: Select shoe size 5 ---
        await womenPage.selectShoeSize5();

        // --- Step 14: Add to bag ---
        await womenPage.addToBag();

        // --- Step 15: Go to checkout ---
        await womenPage.goToCheckout();

        // --- Steps 16-17: Guest checkout email ---
        await page.getByTestId('checkout-guest-email-input').fill(ENV.guestEmail);
        await page.getByTestId('checkout-guest-submit-button').click();

        // --- Step 18: Select Click & Collect ---
        await page.getByTestId('co-selection-panel-collection').click();

        // --- Steps 19-22: Search for collection point ---
        await page.getByRole('textbox', { name: 'Postcode or town / city' }).click();
        await page.getByRole('textbox', { name: 'Postcode or town / city' }).fill('london');
        await page.getByRole('button', { name: 'Londonderry BT48 - 23' }).click();
        await page.getByRole('button', { name: 'Bank of Ireland Londonderry' }).click();
        await page.getByRole('button', { name: 'Search' }).click();
        await page.getByRole('button', { name: 'Collect Here' }).first().click();

        // --- Steps 23-25: Contact info ---
        await page.getByTestId('ccFirstName-text').fill(ENV.firstName);
        await page.getByTestId('ccFirstName-text').press('Tab');
        await page.getByTestId('ccLastName-text').fill(ENV.lastName);
        await page.getByTestId('ccTel-text').click();
        await page.getByTestId('ccTel-text').fill(ENV.phone);
        await page.locator('form').filter({ hasText: 'TitlePlease selectMsMissMrsMrDrFirst Name*Last Name*Phone Number*Continue' }).getByRole('button').click();

        // --- Steps 26-28: Billing name ---
        await page.locator('[data-test="firstNameInput-text"]').fill(ENV.firstName);
        await page.locator('[data-test="firstNameInput-text"]').press('Tab');
        await page.locator('[data-test="lastNameInput-text"]').fill(ENV.lastName);
        await page.getByRole('button', { name: 'Continue' }).click();

        // --- Steps 29-31: Billing address ---
        await page.locator('[data-test="addressLine1Input-text"]').fill(ENV.addressLine1);
        await page.locator('[data-test="cityInput-text"]').fill(ENV.city);
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.locator('[data-test="postCodeInput-text"]').fill(ENV.postcode);
        await page.getByRole('button', { name: 'Continue' }).click();

        // --- Steps 32-35: Payment details ---
        await page.locator('iframe[title="Iframe for card number"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill(ENV.cardNumber);
        await page.locator('iframe[title="Iframe for expiry date"]').contentFrame().getByRole('textbox', { name: 'Expiry date' }).fill(ENV.cardExpiry);
        await page.locator('iframe[title="Iframe for security code"]').contentFrame().getByRole('textbox', { name: 'Security code' }).fill(ENV.cardCvv);
        await page.getByRole('button', { name: /Pay £/i }).click();

        // --- Step 36: Validate payment error ---
        await expect(page.getByText('Error: There was an error')).toBeVisible();
    });
});
