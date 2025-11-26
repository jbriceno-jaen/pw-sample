# pw-sample — Playwright example

This repository is a small Playwright example using the Sauce Demo demo app and demonstrates common best practices: Page Objects (POM), global setup to create storage state, reporting with Allure, and CI automation.

Quick highlights
- Playwright + TypeScript tests in `tests/`
- Page objects under `pages/`
- Global setup will create `storage/auth.json` (CI will generate this using secrets)
- Allure reporting configured

Local setup
1. Install dependencies:

```powershell
npm ci
npx playwright install
```

2. Running tests locally
- If you have credentials in environment variables SAUCE_USER and SAUCE_PASS (or your own), you can run the full E2E tests:

```powershell
$Env:SAUCE_USER='standard_user'; $Env:SAUCE_PASS='secret_sauce'; npm test
```

- Alternatively, add a storage state file at `storage/auth.json` (generated from CI or by running the global setup) and tests will reuse it.

CI
- This project includes a GitHub Actions workflow `.github/workflows/playwright.yml` that:
  - runs tests
  - expects `SAUCE_USER` and `SAUCE_PASS` to be set in repository Secrets
  - uploads `allure-results` and the generated `allure-report` as artifacts

Secrets (GitHub Actions)
- Add two repository secrets to your repo's Settings → Secrets:
  - `SAUCE_USER` — set to `standard_user` (or your username)
  - `SAUCE_PASS` — set to `secret_sauce` (or your password)


Recommended next steps
- Add ESLint and Prettier integrations in your editor for fast feedback.
- Add more tests and POMs to improve coverage and resilience.
