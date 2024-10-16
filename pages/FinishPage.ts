import { Page } from '@playwright/test';

export class FinishPage {
    readonly page: Page;
    
    
    readonly thankYouMessage: string;
    readonly backHomeButton: string;

    constructor(page: Page) {
        this.page = page;
        
        this.thankYouMessage = '[data-test="complete-header"]';
        this.backHomeButton = '[data-test="back-to-products"]';
    }


    async goto() {
        await this.page.goto('https://www.saucedemo.com/checkout-complete.html');
    }

    
    async verifyThankYouMessage() {
        const thankYouText = await this.page.locator(this.thankYouMessage).textContent();
        return thankYouText?.includes('Thank you for your order!');
    }

    
    async clickBackHomeButton() {
        
        console.log(await this.page.content());
        await this.page.waitForSelector(this.backHomeButton, { state: 'attached' });
        await this.page.click(this.backHomeButton);
    }
}
