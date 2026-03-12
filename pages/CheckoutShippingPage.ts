import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CheckoutShippingPage extends BasePage {

    /** Step 14 — Verify the SHIPPING title is visible. */
    async verifyShippingPage(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: /SHIPPING/i })).toBeVisible();
    }

    /** Step 15 — Click the "Collection" tab. */
    async selectCollection(): Promise<void> {
        await this.page.getByTestId('co-selection-panel-collection').click();
    }

    /** Steps 16-18 — Enter postcode, click the Buckingham Palace suggestion. */
    async searchPostcode(postcode: string): Promise<void> {
        const input = this.page.getByRole('textbox', { name: 'Postcode or town / city' });
        await input.fill(postcode);
        await this.page.getByRole('button', { name: 'Buckingham Palace London SW1A 1AA', exact: true }).click();
    }

    /** Step 19 — Click the SEARCH button. */
    async clickSearch(): Promise<void> {
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    /** Step 20 — Click the first result's "Collect Here" button. */
    async clickCollectHere(): Promise<void> {
        await this.page.getByRole('button', { name: 'Collect Here' }).first().click();
    }

    /** Steps 21-24 — Fill contact info and click Continue. */
    async fillContactInfo(firstName: string, lastName: string, phone: string): Promise<void> {
        await this.page.getByTestId('ccFirstName-text').fill(firstName);
        await this.page.getByTestId('ccLastName-text').fill(lastName);
        await this.page.getByTestId('ccTel-text').fill(phone);
        await this.page.locator('form')
            .filter({ hasText: 'TitlePlease selectMsMissMrsMrDrFirst Name*Last Name*Phone Number*Continue' })
            .getByRole('button')
            .click();
    }

    /** Steps 25-27 — Fill billing name and click Continue. */
    async fillBillingName(firstName: string, lastName: string): Promise<void> {
        await this.page.locator('[data-test="firstNameInput-text"]').fill(firstName);
        await this.page.locator('[data-test="lastNameInput-text"]').fill(lastName);
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    /** Steps 28-31 — Fill billing address (line1 + city), Continue, then postcode + Continue. */
    async fillBillingAddress(addressLine1: string, city: string, postcode: string): Promise<void> {
        await this.page.locator('[data-test="addressLine1Input-text"]').fill(addressLine1);
        await this.page.locator('[data-test="cityInput-text"]').fill(city);
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.locator('[data-test="postCodeInput-text"]').fill(postcode);
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
}

