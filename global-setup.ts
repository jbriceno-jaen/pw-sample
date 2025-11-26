import { chromium, type FullConfig } from '@playwright/test';
import { getCreds } from './utils/credentials';
import { LoginPage } from './pages/LoginPage';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL });

  const { user, pass } = getCreds();
  await page.goto('/');               // uses baseURL
  const loginPage = new LoginPage(page);
  await loginPage.login(user, pass);  // single login
  await page.context().storageState({ path: 'storage/auth.json' });

  await browser.close();
}

export default globalSetup;

