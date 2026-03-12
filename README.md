# White Stuff E2E Automation Framework 🧪

High-performance end-to-end automation suite for **White Stuff** built with **Playwright**, **TypeScript**, and **Page Object Model (POM)**.

## 🏗️ Architecture

```
├── pages/          # Page Object classes (locators + actions)
├── tests/          # Test specifications
├── utils/          # PopupHandler, env.config
├── .env.dev        # Development environment variables (gitignored)
├── .env.staging    # Staging environment variables (gitignored)
├── .env.prod       # Production environment variables (gitignored)
└── .env.example    # Template — copy and fill in values
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
npx playwright install --with-deps chromium
```

### 2. Setup environment files
```bash
cp .env.example .env.dev
cp .env.example .env.staging
cp .env.example .env.prod
# Fill in the correct values for each environment
```

---

## 🧪 Running Tests

| Command | Description |
|---|---|
| `npm run test:dev` | Run against **Development** |
| `npm run test:staging` | Run against **Staging** |
| `npm run test:prod` | Run against **Production** |
| `npm run test:desktop` | Run headed (uses `.env.prod` by default) |
| `npm run test:debug` | Run in debug mode |
| `npm run report` | Open last HTML report |

### Examples
```bash
# Run against dev
npm run test:dev

# Run against staging
npm run test:staging

# Run against production
npm run test:prod
```

---

## 🌍 Multi-Environment Strategy

The `TEST_ENV` variable controls which `.env.*` file is loaded:

```
TEST_ENV=dev      → loads .env.dev
TEST_ENV=staging  → loads .env.staging
TEST_ENV=prod     → loads .env.prod  (default)
```

Each `.env.*` file contains the `BASE_URL` and test data specific to that environment.

---

## ⚙️ CI/CD — GitHub Actions

The workflow runs automatically:
- **Daily at 04:05 UTC** against Production
- **On every push/PR** to `main`
- **Manual trigger** — choose `dev`, `staging`, or `prod` from the GitHub UI

### Required GitHub Secrets
Set these in `Settings → Secrets → Actions`:

| Secret | Description |
|---|---|
| `BASE_URL` | Target environment URL |
| `GUEST_EMAIL` | Guest checkout email |
| `TEST_FIRST_NAME` | First name for forms |
| `TEST_LAST_NAME` | Last name for forms |
| `TEST_PHONE` | Phone number |
| `TEST_POSTCODE` | UK postcode |
| `TEST_ADDRESS_LINE1` | Address line 1 |
| `TEST_ADDRESS_LINE2` | Address line 2 |
| `TEST_CITY` | City |
| `CARD_NUMBER` | Test card number |
| `CARD_EXPIRY` | Card expiry (MM/YY) |
| `CARD_CVV` | Card security code |

---

## 📊 Reporting

```bash
npm run report              # Open Playwright HTML report
npm run allure:generate     # Generate Allure report
npm run allure:open         # Open Allure report
```

---

## 👤 Author
**MsGAgent** — Senior SDET
