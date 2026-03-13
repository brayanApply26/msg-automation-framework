import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class WomenProductPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    /** Click first product image in the listing */
    async clickFirstProduct() {
        await this.page.getByTestId('product-card-image-link').first().click();
    }

    /** Click second product image in the listing */
    async clickSecondProduct() {
        await this.page.getByTestId('product-card-image-link').nth(1).click();
    }

    /** Select size 12 then Regular leg — exact Codegen selectors */
    async selectSize12Regular() {
        await this.page.getByRole('button', { name: '12' }).click();
        await this.page.getByRole('button', { name: 'Regular' }).click();
    }

    /** Select shoe size 5 from the Size option group */
    async selectShoeSize5() {
        await this.page.getByTestId('product-options-Size').getByRole('button', { name: '5' }).click();
    }

    /** Click Add to Bag */
    async addToBag() {
        await this.page.getByTestId('pdp-add-to-bag').click();
    }

    /** Click View Bag after adding item */
    async viewBag() {
        await this.page.getByTestId('addedtobag-viewbag').waitFor({ state: 'visible', timeout: 15000 });
        await this.page.getByTestId('addedtobag-viewbag').click();
    }

    /** Click Continue Shopping from bag page */
    async continueShopping() {
        await this.page.getByTestId('bag-continue-shopping-button').click();
    }

    /** Navigate to Sale Footwear via nav link */
    async goToSaleFootwear() {
        await this.page.getByRole('link', { name: 'SALE FOOTWEAR' }).click();
    }

    /** Filter listing by size 5 */
    async filterBySize5() {
        await this.page.getByText('5', { exact: true }).click();
    }

    /** Click Checkout from added-to-bag modal */
    async goToCheckout() {
        await this.page.getByTestId('addedtobag-checkout').click();
    }
}
