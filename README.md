# White Stuff E2E Automation Framework 🧪

High-performance end-to-end automation suite for **White Stuff** built with **Playwright**, **TypeScript**, and **Object-Oriented Programming (OOP)** principles.

## 🏗️ Architecture: Page Object Model (POM)

This project follows the POM pattern to ensure maintainability and scalability:
- **`pages/`**: Contains Page Classes with locators and actions.
- **`tests/`**: Contains the test specifications (assertions).
- **`utils/`**: Shared utilities like `PopupHandler` to manage overlays.
- **`data/`**: Test data files (JSON/Environment variables).

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### 1. Installation
Navigate to the project root and install dependencies:
```bash
npm install
```

### 2. Install Playwright Browsers
Download the required browser binaries:
```bash
npx playwright install --with-deps
```

---

## 🧪 Running Tests

### Execute all tests
```bash
npx playwright test
```

### Run a specific test file
```bash
npx playwright test tests/shopping_flow.spec.ts
```

### Run in UI Mode (Headed)
```bash
npx playwright test --headed
```

### Run in Debug Mode
```bash
npx playwright test --debug
```

---

## 📊 Reporting (Allure)

This framework is integrated with **Allure Reports** for rich visual feedback.

### 1. Generate Report
After running the tests, generate the report:
```bash
npx allure generate allure-results --clean
```

### 2. Open Report
```bash
npx allure open
```

---

## 🛠️ Key Features
- **Smart Popup Handling**: Automatic closing of Cookie Banners, Email Signups, and Location Selectors via `PopupHandler`.
- **Zero-Flakiness Policy**: Heavy use of explicit waits and robust locators (`data-testid`).
- **Scalable Design**: BasePage implementation for shared e-commerce logic.

## 👤 Author
**MsGAgent** (Senior SDET Architect)
