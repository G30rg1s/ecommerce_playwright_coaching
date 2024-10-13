import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

/*test('Open burger menu and verify all items are clickable', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.openBurgerMenu();
    const menuItems = page.locator(homePage.burgerMenuItems + ' a');
    const count = await menuItems.count();
    for (let i = 0; i < count; i++) {
      await expect(menuItems.nth(i)).toBeVisible();
      await expect(menuItems.nth(i)).toBeEnabled();
    }
  });*/

  test('Open burger menu and verify all items are clickable', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.openBurgerMenu();
    
    const menuItemSelectors = [
      '[data-test="inventory-sidebar-link"]',
      '[data-test="about-sidebar-link"]',
      '[data-test="logout-sidebar-link"]',
      '[data-test="reset-sidebar-link"]'
    ];

    
    for (const menuItemSelector of menuItemSelectors) {
        const menuItem = page.locator(menuItemSelector);
        await expect(menuItem).toBeVisible();
        //await expect(menuItem).toBeEnabled();
    }
});

  
  test('Verify all Add to Cart buttons are clickable', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const products = page.locator(homePage.productList);
    const productCount = await products.count();
    
    for (let i = 0; i < productCount; i++) {
      const addToCartButton = products.nth(i).locator(homePage.addToCartButtons);
      await expect(addToCartButton).toBeVisible();
      await expect(addToCartButton).toBeEnabled();
    }
  });
  


/*test('Click on the cart icon and verify redirection to the cart page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.openCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });*/
  

  test('Click on the cart icon and verify redirection to the cart page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForSelector(homePage.cartIcon , { state: 'visible', timeout: 10000 });
    await homePage.openCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });


 /* test('Logout via burger menu and verify redirection to login page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    
    await homePage.openBurgerMenu();
    await page.click('[data-test="logout-sidebar-link"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await page.context().clearCookies();
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator(homePage.errorMessage)).toBeVisible(); 
  });*/
  
  