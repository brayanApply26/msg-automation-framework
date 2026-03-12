import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// Note: We'll create a simple HomePage that extends BasePage for this test
class HomePageImpl extends (require('../pages/BasePage').BasePage) {}

test.describe('White Stuff Smoke Tests', () => {
    test('Should load homepage and close popups', async ({ page }) => {
        const homePage = new HomePageImpl(page);
        
        await homePage.navigate();
        
        // Handle Cookie Banner
        await homePage.acceptCookies();
        
        // Handle "WHERE ON EARTH" Popup
        await homePage.closeLocationPopup();
        
        await expect(page).toHaveTitle(/White Stuff/);
    });
});
