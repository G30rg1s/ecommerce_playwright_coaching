import { test, expect } from '@playwright/test';
import { FinishPage } from '../../pages/FinishPage';
import { HomePage } from '../../pages/HomePage';  // Ορισμός HomePage, αν βρίσκεται σε ξεχωριστό αρχείο

test.describe('Finish Page Tests', () => {

  let finishPage: FinishPage;
  let homePage: HomePage;

  // Αρχικοποίηση και φόρτωση της FinishPage πριν από κάθε τεστ
  test.beforeEach(async ({ page }) => {
    finishPage = new FinishPage(page);
    homePage = new HomePage(page);  // Ορισμός και της HomePage
    await finishPage.goto();
  });

  // Τεστ για επιβεβαίωση ότι το μήνυμα "Thank You" εμφανίζεται
  test('Verify Thank You Message is displayed', async () => {
    const isThankYouMessageDisplayed = await finishPage.verifyThankYouMessage();
    expect(isThankYouMessageDisplayed).toBeTruthy();  
  });

  // Τεστ για το κλικ στο κουμπί "Back Home" και επιβεβαίωση ανακατεύθυνσης στη Home Page
  test('Click "Back Home" Button and Verify Redirection to Home Page', async () => {
    await finishPage.clickBackHomeButton();

    // Έλεγχος της URL της Home Page
    await expect(homePage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // Προαιρετικός έλεγχος για στοιχείο που ανήκει στην Home Page
    await homePage.page.waitForSelector('#inventory_container');
  });
});
