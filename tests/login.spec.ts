import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {InventoryPage} from "../pages/InventoryPage";
import { getCreds } from '../utils/credentials';


test('should login successfully', { tag: '@smoke' }, async ({ page }) => {
  const { user, pass } = getCreds();
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // BEST PRACTICE: Quick sanity check that page loaded
  await expect(page).toHaveTitle(/Swag Labs/);

  await loginPage.login(user, pass);

  // Verification
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('should add item to cart and verify details', async ({ page }) => {
  const { user, pass } = getCreds();
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // 1. Login using the existing POM
    await loginPage.goto();
    await loginPage.login(user, pass);

    // 2. Verify we are on the correct page using Role locator
    await expect(inventoryPage.pageTitle).toBeVisible();

    // 3. Interaction: Add "Sauce Labs Backpack" using text filtering
    const productName = 'Sauce Labs Backpack';
    await inventoryPage.addItemToCart(productName);

    // 4. Verification: Check if the cart badge updates (using a specific CSS selector)
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 5. Verification: Check a specific price using text filtering context
    const price = await inventoryPage.getProductPrice(productName);
    expect(price).toBe('$29.99');

    // 6. Verification: Ensure a specific description text is visible using getByText
    const isDescriptionVisible = await inventoryPage.isProductVisible('carry.allTheThings()');
    expect(isDescriptionVisible).toBeTruthy();
});