import { Page } from '@playwright/test';

/**
 * Abstract class representing the base for all White Stuff Page Objects.
 */
export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string = '/'): Promise<void> {
        await this.page.goto(path);
    }
}
