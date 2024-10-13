import { Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    
    
    readonly firstNameInput: string;
    readonly lastNameInput: string;
    readonly postalCodeInput: string;
    readonly cancelButton: string;
    readonly continueButton: string;
    readonly errorMessageContainer: string;

    constructor(page: Page) {
        this.page = page;
        
        
        this.firstNameInput = '#first-name';  
        this.lastNameInput = '#last-name'; 
        this.postalCodeInput = '#postal-code';  
        this.cancelButton = '#cancel';  
        this.continueButton = '#continue';  
        this.errorMessageContainer = '.error-message-container';  
    }

    
    async goto() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
    }

    
    async fillFirstName(firstName: string) {
        await this.page.fill(this.firstNameInput, firstName);
    }

    
    async fillLastName(lastName: string) {
        await this.page.fill(this.lastNameInput, lastName);
    }

    
    async fillPostalCode(postalCode: string) {
        await this.page.fill(this.postalCodeInput, postalCode);
    }

    
    async clickCancelButton() {
        await this.page.click(this.cancelButton);
    }

    
    async clickContinueButton() {
        await this.page.click(this.continueButton);
    }

    
    async getErrorMessage() {
        return await this.page.locator(this.errorMessageContainer).textContent();
    }

    
    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
    }

    
    async submitForm(firstName: string, lastName: string, postalCode: string) {
        await this.fillCheckoutForm(firstName, lastName, postalCode);
        await this.clickContinueButton();
    }
}
