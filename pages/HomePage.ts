import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // --- Desktop Navigation Flow ---

    /**
     * Step 1: Hover over the "MEN" nav item to open the dropdown,
     * then click "All Clothing" inside it.
     */
    async hoverMenAndClickAllClothing() {
        const menNavItem = this.page.getByTestId('desktop-nav').getByRole('link', { name: 'MEN', exact: true });
        await menNavItem.hover();
        const allClothingLink = this.page.getByRole('link', { name: /All Clothing/i }).first();
        await allClothingLink.waitFor({ state: 'visible' });
        await allClothingLink.click();
    }

    /**
     * Step 2: Navigate directly to MEN'S SALE page.
     */
    async goToMensSale() {
        await this.page.goto('/browse/collection/mens-sale');
    }

    /** Alias — same as goToMensSale() */
    async clickMensSaleLink() {
        await this.goToMensSale();
    }
}
