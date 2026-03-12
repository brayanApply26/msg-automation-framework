import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CheckoutPaymentPage extends BasePage {

    /**
     * Steps 32-34 — Fill Adyen iframe payment fields.
     */
    async fillPaymentDetails(cardNumber: string, expiry: string, cvv: string): Promise<void> {
        await this.page.locator('iframe[title="Iframe for card number"]')
            .contentFrame()
            .getByRole('textbox', { name: 'Card number' })
            .fill(cardNumber);

        await this.page.locator('iframe[title="Iframe for expiry date"]')
            .contentFrame()
            .getByRole('textbox', { name: 'Expiry date' })
            .fill(expiry);

        await this.page.locator('iframe[title="Iframe for security code"]')
            .contentFrame()
            .getByRole('textbox', { name: 'Security code' })
            .fill(cvv);
    }

    /**
     * Step 35 — Click the Pay button.
     */
    async clickPay(): Promise<void> {
        await this.page.getByRole('button', { name: /Pay £/i }).click();
    }

    /**
     * Step 36 — Assert the payment error message is visible.
     */
    async verifyPaymentError(expectedMessage: string): Promise<void> {
        await expect(this.page.getByText(expectedMessage, { exact: false })).toBeVisible();
    }
}
