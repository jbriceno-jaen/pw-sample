import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.successMessage = page.getByText('Thank you for your order!');
  }

  async gotoCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async startCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getSuccessText(): Promise<string> {
    return (await this.successMessage.textContent()) ?? '';
  }
}
