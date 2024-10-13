import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';


const validPassword = 'secret_sauce';
  
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(); 
  });

test.describe('Login Page - Username-Specific Tests', () => {
  
    const validPassword = 'secret_sauce';
  
    
    test('Login standard_user', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login('standard_user', validPassword);
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  
    
    test('Login locked_out_user', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login('locked_out_user', validPassword);
      const isErrorShown = await loginPage.verifyErrorMessage('Sorry, this user has been locked out.');
      expect(isErrorShown).toBeTruthy();  
    });
  
   
    test('Login problem_user', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login('problem_user', validPassword);
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

  
    
    test('Login performance_glitch_user', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login('performance_glitch_user', validPassword);
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html', { timeout: 0 });
    });
  
   /* // Test for error_user
    test('Login error_user', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login('error_user', validPassword);
      const isErrorShown = await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match');
      expect(isErrorShown).toBeTruthy();  // Verify the error message
    });
  
    // Test for visual_user
    test('Login visual_user', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login('visual_user', validPassword);
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }); */
  
  });


  
    
  
