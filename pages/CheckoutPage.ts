import { Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    
    readonly cartItems: string;
    readonly itemPrice: string;
    readonly totalPrice: string;
    readonly finishButton: string;  

    constructor(page: Page) {
        this.page = page;
        
        
        this.cartItems = '.cart_item';  
        this.itemPrice = '.inventory_item_price';  
        this.totalPrice = '.summary_subtotal_label';  
        this.finishButton = '#finish';  
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-two.html');
    }

   
    async getAllProductPrices(): Promise<number[]> {
        const prices = await this.page.$$eval(this.itemPrice, elements => 
            elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
        );
        return prices;
    }

    
    async getTotalPrice(): Promise<number> {
        const totalText = await this.page.locator(this.totalPrice).textContent();
        return parseFloat(totalText?.replace('Item total: $', '') || '0');
    }

    
    async verifyPricesMatch(): Promise<boolean> {
        const productPrices = await this.getAllProductPrices();
        const sumOfPrices = productPrices.reduce((total, price) => total + price, 0);
        const totalPriceDisplayed = await this.getTotalPrice();
        return sumOfPrices === totalPriceDisplayed;
    }

    
    async clickFinishButton() {
        await this.page.click(this.finishButton);
    }
}
