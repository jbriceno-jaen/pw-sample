import { chromium, type FullConfig } from '@playwright/test';
import { getCreds } from './utils/credentials';
import { LoginPage } from './pages/LoginPage';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
  const storagePath = path.resolve(process.cwd(), 'storage', 'auth.json');

  // If a storage state already exists, skip creating it.
  if (fs.existsSync(storagePath)) {
    // If running in CI we still might prefer to regenerate storage, but the
    // current behavior is to reuse an existing storage state when present to
    // make local development easier.
    // eslint-disable-next-line no-console
    console.log('storage/auth.json exists — skipping global setup.');
    return;
  }

  // If we're here, storage doesn't exist. Try to read credentials.
  let creds;
  try {
    creds = getCreds();
  } catch (err) {
    // If running in CI we should fail the job. Locally we will skip setup and
    // let tests run (they can be executed with --storage-state or by logging in).
    if (process.env.CI) {
      // Re-throw so CI fails loudly and the pipeline author can add secrets.
      throw err;
    }
    // eslint-disable-next-line no-console
    console.warn('Skipping global-setup: missing credentials and not running in CI.');
    return;
  }

  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL });

  const { user, pass } = creds;
  await page.goto('/'); // uses baseURL
  const loginPage = new LoginPage(page);
  await loginPage.login(user, pass); // single login

  // Ensure destination folder exists and write storage state
  fs.mkdirSync(path.dirname(storagePath), { recursive: true });
  await page.context().storageState({ path: storagePath });

  await browser.close();
}

export default globalSetup;

