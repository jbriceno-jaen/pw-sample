import { type Locator, type Page, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // CORRECCIÓN: En SauceDemo, "Products" es un span con clase title, no un heading.
        // Usamos locator con hasText para ser específicos pero flexibles.
        this.pageTitle = page.locator('.title', { hasText: 'Products' });
        
        this.cartLink = page.locator('.shopping_cart_link');
    }

    // BEST PRACTICE: Explicit return types for async methods
    async addItemToCart(productName: string): Promise<void> {
        await this.page.locator('.inventory_item')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async getProductPrice(productName: string): Promise<string | null> {
        return await this.page.locator('.inventory_item')
            .filter({ hasText: productName })
            .locator('.inventory_item_price')
            .textContent();
    }

    async isProductVisible(descriptionText: string): Promise<boolean> {
        return await this.page.getByText(descriptionText).isVisible();
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }
}