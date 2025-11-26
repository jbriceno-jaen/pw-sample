
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { getCreds } from '../utils/credentials';

test('checkout flow should place an order successfully', async ({ page }) => {
	const { user, pass } = getCreds();

	const loginPage = new LoginPage(page);
	const inventoryPage = new InventoryPage(page);
	const checkoutPage = new CheckoutPage(page);

	// Login and add item
	await loginPage.goto();
	await loginPage.login(user, pass);

	const productName = 'Sauce Labs Backpack';
	await inventoryPage.addItemToCart(productName);
	await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

	// Cart -> Checkout
	await checkoutPage.gotoCart();
	await checkoutPage.startCheckout();

	// Fill details and submit
	await checkoutPage.fillInfo('Jane', 'QAsmith', '12345');
	await checkoutPage.continue();
	await checkoutPage.finish();

	// Assert success message
	await expect(page.getByText('Thank you for your order!')).toBeVisible();
});
