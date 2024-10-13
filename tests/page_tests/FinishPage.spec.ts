import { test, expect } from '@playwright/test';
import { FinishPage } from '../../pages/FinishPage';


test.describe('Finish Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const finishPage = new FinishPage(page);
    await finishPage.goto();
  });

  
  test('Verify Thank You Message is displayed', async ({ page }) => {
    const finishPage = new FinishPage(page);
    const isThankYouMessageDisplayed = await finishPage.verifyThankYouMessage();
    expect(isThankYouMessageDisplayed).toBeTruthy();  
  });

  
  test('Click "Back Home" Button and Verify Redirection to Home Page', async ({ page }) => {
    const finishPage = new FinishPage(page);
    await finishPage.clickBackHomeButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});