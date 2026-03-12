import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class ProductPage extends BasePage {

    /**
     * Step 4-5 — Find a product by name and click its image link.
     */
    async clickProductByName(productName: string): Promise<void> {
        const card = this.page
            .locator('[data-testid="product-card"]')
            .filter({ hasText: productName })
            .first();
        await card.scrollIntoViewIfNeeded();
        await card.getByTestId('product-card-image-link').click();
    }

    /**
     * Step 6-7 — Scroll down on PDP and select size L.
     */
    async selectSizeL(): Promise<void> {
        await this.page.mouse.wheel(0, 500);
        await this.page.getByRole('button', { name: 'L', exact: true }).click();
    }

    /**
     * Step 8 — Click Add to Bag.
     */
    async addToBag(): Promise<void> {
        await this.page.getByTestId('pdp-add-to-bag').click();
    }

    /**
     * Step 9 — Verify the "ADDED TO BAG" confirmation panel is visible.
     */
    async verifyAddedToBag(): Promise<void> {
        await expect(this.page.getByText('ADDED TO BAG', { exact: false })).toBeVisible();
    }

    /**
     * Step 10 — Click the CHECKOUT button inside the "Added to Bag" panel.
     */
    async goToCheckout(): Promise<void> {
        await this.page.getByTestId('addedtobag-checkout').click();
    }
}
