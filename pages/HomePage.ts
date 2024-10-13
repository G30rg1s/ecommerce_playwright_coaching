import { Page } from '@playwright/test';


export class HomePage {
    readonly page: Page;
    
    
    readonly burgerMenuButton: string;
    readonly burgerMenuItems: string;
    readonly addToCartButtons: string;
    readonly productList: string;
    readonly cartIcon: string;
    readonly cartIconWithBadge: string;
    readonly cartBadge: string;
    readonly errorMessage: string;

    constructor(page: Page) {
        this.page = page;
       
        this.burgerMenuButton = '#react-burger-menu-btn';  
        this.burgerMenuItems = '.bm-item-list';  
        this.addToCartButtons = '.btn_inventory';  
        this.productList = '#inventory_container .inventory_item';  
        this.cartIcon = '.shopping_cart_link';  
        this.cartIconWithBadge = 'a.shopping_cart_link .shopping_cart_badge';  
        this.cartBadge = '.shopping_cart_badge';
        this.errorMessage = '[data-test="error"]';
    }

    
    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }


    async openBurgerMenu() {
        await this.page.click(this.burgerMenuButton);
       // await this.page.waitForSelector(this.burgerMenuItems);  
    }

    async addProductToCart(productName: string) {
        const productLocator = this.page.locator(`.inventory_item:has-text("${productName}")`);
        await productLocator.locator(this.addToCartButtons).click();  
    }

    
    async verifyProductInCart(expectedCount: number) {
        const cartBadgeText = await this.page.locator(this.cartIconWithBadge).textContent();
        return cartBadgeText === expectedCount.toString();
    }

    
    async isCartEmpty() {
        const cartBadge = await this.page.locator(this.cartIconWithBadge);
        return !(await cartBadge.isVisible());
    }

    async cardHasProducts() {
        const cartBadge = await this.page.locator(this.cartIconWithBadge);
        return await cartBadge.isVisible();
    }

    
    async openCart() {
        await this.page.click(this.cartIcon);
     }

     /*
     async getAllProducts()  :
This method is responsible for fetching and returning the names of all products listed on the page.
2. const productNames = await this.page.$$eval(this.productList, items => ... );:
this.page.$$eval(): This is a Playwright method that evaluates a function in the browser’s context for a list of elements.
$$eval is used to evaluate multiple elements. It selects all elements that match the provided selector and runs a callback function on them.
this.productList: This is the selector ('#inventory_container .inventory_item') that identifies all the product items on the page.
items: This is an array of the product elements found by the selector. These are all the .inventory_item elements.
items.map(item => item.querySelector('.inventory_item_name')?.textContent):
items.map(): This function iterates over all product items.
item.querySelector('.inventory_item_name'): For each product item, it selects the child element with the class .inventory_item_name, which contains the product's name.
?.textContent: This safely retrieves the text content (i.e., the product name) from each selected element. The ?. (optional chaining) ensures that if the element is not found, it won’t throw an error but will return null.
Result: This returns an array of product names or null if the product name is not found.
3. return productNames.filter(Boolean);:
filter(Boolean): This filters the array and removes any null or undefined values. It ensures that only valid product names (non-empty, non-null strings) are returned.
Final Return: The method returns an array containing only the valid product names.
Purpose:
This method retrieves the names of all products displayed on the page and returns them as a list.
If there are products without names, it ensures they are filtered out before returning the list.
*/
    
    async getAllProducts() {
        const productNames = await this.page.$$eval(this.productList, items =>
            items.map(item => item.querySelector('.inventory_item_name')?.textContent)
        );
        return productNames.filter(Boolean); 
    }

    
    async verifyCartBadge(expectedCount: number) {
        const badgeCount = await this.page.locator(this.cartBadge).textContent();
        return badgeCount === expectedCount.toString();
    }
}
