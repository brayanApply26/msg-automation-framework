import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CheckoutLoginPage extends BasePage {

    /**
     * Step 11 — Verify the "CHECKOUT AS A GUEST" section is visible.
     */
    async verifyGuestCheckoutVisible(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: /CHECKOUT AS A GUEST/i })).toBeVisible();
    }

    /**
     * Step 12 — Fill the guest email input.
     */
    async fillGuestEmail(email: string): Promise<void> {
        await this.page.getByTestId('checkout-guest-email-input').fill(email);
    }

    /**
     * Step 13 — Click the "CHECKOUT AS A GUEST" submit button.
     */
    async clickGuestCheckout(): Promise<void> {
        await this.page.getByTestId('checkout-guest-submit-button').click();
    }
}
