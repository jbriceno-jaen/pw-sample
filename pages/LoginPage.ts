import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // BEST PRACTICE: Use getByPlaceholder instead of ID selectors (#user-name)
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        // BEST PRACTICE: Use getByRole for buttons
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        // BEST PRACTICE: Use relative path since baseURL is defined in config
        await this.page.goto('/');
    }

    async login(username: string, pass: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }
}