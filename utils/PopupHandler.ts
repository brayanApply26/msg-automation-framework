import { Page } from '@playwright/test';

/**
 * Handles all known overlays/popups on whitestuff.com.
 * Selectors verified via Playwright Codegen.
 */
export class PopupHandler {

    private static async dismissIfVisible(page: Page, locator: ReturnType<Page['locator']>): Promise<boolean> {
        try {
            if (await locator.isVisible({ timeout: 800 })) {
                await locator.click();
                await page.waitForTimeout(300);
                return true;
            }
        } catch { /* popup not present, ignore */ }
        return false;
    }

    /**
     * Quick sweep — call this between steps to close any popup that may have appeared.
     */
    static async closeAllOverlays(page: Page): Promise<void> {
        let closed = true;
        while (closed) {
            closed =
                await PopupHandler.dismissIfVisible(page, page.getByTestId('close-button').first()) ||
                await PopupHandler.dismissIfVisible(page, page.locator('.exponea-close-cross').first()) ||
                await PopupHandler.dismissIfVisible(page, page.getByRole('button', { name: 'Reject all' }).first());
        }
    }

    /**
     * After page load — waits up to `maxWaitMs` for each popup and closes it.
     * Use once per page navigation.
     */
    static async waitAndClose(page: Page, maxWaitMs = 5000): Promise<void> {
        const popups = [
            page.getByTestId('close-button').first(),
            page.locator('.exponea-close-cross').first(),
            page.getByRole('button', { name: 'Reject all' }).first(),
        ];

        for (const locator of popups) {
            try {
                await locator.waitFor({ state: 'visible', timeout: maxWaitMs });
                await locator.click();
                await page.waitForTimeout(300);
            } catch { /* popup didn't appear — continue */ }
        }

        await PopupHandler.closeAllOverlays(page);
    }
}
