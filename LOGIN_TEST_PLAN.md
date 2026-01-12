# Login Test Plan - Playwright Automation

## Overview

This document outlines the complete workflow for creating automated login test cases using Playwright.

---

## Table of Contents

1. [Preparation Steps](#preparation-steps)
2. [Why Create Each Step](#why-create-each-step)
3. [Workflow to Complete Test Cases](#workflow-to-complete-test-cases)
4. [Test Case Checklist](#test-case-checklist)

---

## Preparation Steps

### Step 1: Analyze Login Page

| Task | Description | Status |
|------|-------------|--------|
| 1.1 | Access login page URL | [x] |
| 1.2 | Identify all form elements | [x] |
| 1.3 | Capture element selectors (ID, class, name) | [x] |
| 1.4 | Document validation rules | [x] |
| 1.5 | List all error messages | [x] |

### Step 2: Gather Test Data

| Task | Description | Status |
|------|-------------|--------|
| 2.1 | Get valid test credentials | [x] |
| 2.2 | Define invalid credential scenarios | [x] |
| 2.3 | Identify boundary values | [x] |
| 2.4 | Prepare security test payloads | [x] |

### Step 3: Setup Project

| Task | Description | Status |
|------|-------------|--------|
| 3.1 | Initialize Node.js project | [x] |
| 3.2 | Install Playwright | [x] |
| 3.3 | Configure playwright.config.ts | [x] |
| 3.4 | Create folder structure | [x] |

### Step 4: Write Test Code

| Task | Description | Status |
|------|-------------|--------|
| 4.1 | Create Page Object Model | [x] |
| 4.2 | Create test data file | [x] |
| 4.3 | Write test specifications | [x] |
| 4.4 | Add assertions | [x] |

### Step 5: Execute & Report

| Task | Description | Status |
|------|-------------|--------|
| 5.1 | Run tests locally | [x] |
| 5.2 | Debug failed tests | [x] |
| 5.3 | Generate test report | [x] |
| 5.4 | Fix selectors if needed | [x] |

---

## Why Create Each Step

### Why Step 1: Analyze Login Page?

| Reason | Explanation |
|--------|-------------|
| **Accurate Selectors** | Without correct selectors, tests cannot find elements and will fail |
| **Understand Behavior** | Know how the form validates, submits, and responds |
| **Identify Edge Cases** | Discover hidden validations, character limits, special handling |
| **Map User Journey** | Understand redirect flow after login success/failure |

### Why Step 2: Gather Test Data?

| Reason | Explanation |
|--------|-------------|
| **Realistic Testing** | Valid credentials ensure positive test cases work |
| **Coverage** | Different data types cover various scenarios |
| **Maintainability** | Centralized data is easy to update |
| **Security Testing** | Prepared payloads test for vulnerabilities |

### Why Step 3: Setup Project?

| Reason | Explanation |
|--------|-------------|
| **Consistency** | Same environment for all team members |
| **Dependencies** | Playwright and browsers installed correctly |
| **Configuration** | Base URL, timeouts, retries defined once |
| **Organization** | Clear folder structure improves maintenance |

### Why Step 4: Write Test Code?

| Reason | Explanation |
|--------|-------------|
| **Page Object Model** | Reusable methods, single place to update selectors |
| **Separate Test Data** | Easy to modify without changing test logic |
| **Grouped Tests** | Organized by functionality for easy navigation |
| **Clear Assertions** | Verify expected vs actual results |

### Why Step 5: Execute & Report?

| Reason | Explanation |
|--------|-------------|
| **Validation** | Confirm tests work as expected |
| **Debugging** | Identify and fix issues early |
| **Documentation** | Reports provide evidence of testing |
| **Continuous Improvement** | Refine tests based on results |

---

## Workflow to Complete Test Cases

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPLETE WORKFLOW                            │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   START      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│  PHASE 1: DISCOVERY                  │
│  ┌────────────────────────────────┐  │
│  │ 1. Open login page in browser  │  │
│  │ 2. Right-click > Inspect       │  │
│  │ 3. Find input elements         │  │
│  │ 4. Copy selectors              │  │
│  │ 5. Test selectors in console   │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 2: DOCUMENTATION              │
│  ┌────────────────────────────────┐  │
│  │ 1. Document all selectors      │  │
│  │ 2. List validation rules       │  │
│  │ 3. Capture error messages      │  │
│  │ 4. Define test scenarios       │  │
│  │ 5. Prepare test data           │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 3: SETUP                      │
│  ┌────────────────────────────────┐  │
│  │ 1. npm init                    │  │
│  │ 2. npm install playwright      │  │
│  │ 3. npx playwright install      │  │
│  │ 4. Create folder structure     │  │
│  │ 5. Configure playwright.config │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 4: CODE                       │
│  ┌────────────────────────────────┐  │
│  │ 1. Create login.page.ts (POM)  │  │
│  │ 2. Create test-data.ts         │  │
│  │ 3. Create login.spec.ts        │  │
│  │ 4. Write test cases            │  │
│  │ 5. Add assertions              │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 5: EXECUTE                    │
│  ┌────────────────────────────────┐  │
│  │ 1. Run: npx playwright test    │  │
│  │ 2. Check results               │  │
│  │ 3. Debug failures              │  │
│  │ 4. Update selectors if needed  │  │
│  │ 5. Re-run until pass           │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 6: REPORT                     │
│  ┌────────────────────────────────┐  │
│  │ 1. Generate HTML report        │  │
│  │ 2. Review screenshots/videos   │  │
│  │ 3. Document test coverage      │  │
│  │ 4. Share results               │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
       ┌───────────────┐
       │     END       │
       └───────────────┘
```

---

## Detailed Workflow Steps

### Phase 1: Discovery (Crawl Login Page)

**Goal:** Understand the login page structure

```
Browser DevTools Steps:
─────────────────────────────────────────
1. Navigate to: https://training-dev.cams-care.com/products/
2. Press F12 (Open DevTools)
3. Click "Elements" tab
4. Use selector tool (Ctrl+Shift+C)
5. Click on each element to find selectors
```

**Elements to Find:**

| Element | How to Find | Example Selector |
|---------|-------------|------------------|
| Username Input | Click on email/username field | `#email` or `input[name="email"]` |
| Password Input | Click on password field | `#password` or `input[type="password"]` |
| Login Button | Click on submit button | `button[type="submit"]` |
| Error Message | Submit invalid data, inspect error | `.error-message` |
| Remember Me | Click on checkbox | `#remember-me` |
| Forgot Password | Click on link | `a:has-text("Forgot")` |

**Verify Selector in Console:**
```javascript
// In browser console (F12 > Console)
document.querySelector('#email')
document.querySelector('input[name="password"]')
document.querySelector('button[type="submit"]')
```

---

### Phase 2: Documentation

**Create Selector Map:**

```markdown
## Login Page Selectors

| Element | Selector | Type |
|---------|----------|------|
| Username | _________ | input |
| Password | _________ | input |
| Login Button | _________ | button |
| Error Message | _________ | div |
| Remember Me | _________ | checkbox |
| Forgot Password | _________ | link |
```

**Define Test Scenarios:**

```markdown
## Test Scenarios

| ID | Scenario | Input | Expected Result |
|----|----------|-------|-----------------|
| TC-01 | Valid login | valid user/pass | Redirect to dashboard |
| TC-02 | Invalid password | valid user, wrong pass | Error message |
| TC-03 | Invalid username | wrong user, any pass | Error message |
| TC-04 | Empty username | empty, valid pass | Validation error |
| TC-05 | Empty password | valid user, empty | Validation error |
| TC-06 | Both empty | empty, empty | Validation error |
```

---

### Phase 3: Project Setup

```bash
# 1. Create project folder
mkdir login-tests
cd login-tests

# 2. Initialize project
npm init -y

# 3. Install Playwright
npm install -D @playwright/test

# 4. Install browsers
npx playwright install chromium

# 5. Create folder structure
mkdir -p tests/pages tests/data
```

**Folder Structure:**
```
login-tests/
├── package.json
├── playwright.config.ts
└── tests/
    ├── pages/
    │   └── login.page.ts      # Page Object Model
    ├── data/
    │   └── test-data.ts       # Test credentials
    └── login.spec.ts          # Test cases
```

---

### Phase 4: Code Implementation

**4.1 - playwright.config.ts**
```typescript
// Single browser, headed mode for debugging
export default {
  testDir: './tests',
  use: {
    baseURL: 'https://your-login-url.com',
    headless: false,  // Show browser
  },
  projects: [
    { name: 'chromium' }  // Only Chrome
  ]
}
```

**4.2 - login.page.ts (Page Object Model)**
```typescript
// Centralize all selectors and actions
class LoginPage {
  // Selectors - UPDATE THESE
  usernameInput = '#email';
  passwordInput = '#password';
  loginButton = 'button[type="submit"]';

  // Methods
  async login(username, password) { }
  async getErrorMessage() { }
}
```

**4.3 - test-data.ts**
```typescript
// All test data in one place
export const validUser = {
  username: 'test@example.com',
  password: 'Password123!'
};

export const invalidUser = {
  username: 'wrong@example.com',
  password: 'wrongpass'
};
```

**4.4 - login.spec.ts**
```typescript
// Test cases
test('TC-01: Valid login', async ({ page }) => {
  // Arrange
  await loginPage.goto();

  // Act
  await loginPage.login(validUser.username, validUser.password);

  // Assert
  await expect(page).toHaveURL('/dashboard');
});
```

---

### Phase 5: Execute Tests

```bash
# Run all tests (headed)
npx playwright test --headed --project=chromium

# Run single test
npx playwright test -g "TC-01" --headed

# Debug mode
npx playwright test --debug

# Generate report
npx playwright show-report
```

---

## Test Case Checklist

### Functional Tests

- [x] TC-01: Login with valid credentials
- [x] TC-02: Login using Enter key
- [x] TC-04: Login with invalid username (email does not exist)
- [x] TC-05: Login with invalid password
- [x] TC-06: Login with both wrong credentials
- [x] TC-06b: Login with invalid email format
- [x] TC-07: Login with empty username
- [x] TC-08: Login with empty password
- [x] TC-09: Login with both fields empty

### UI/UX Tests

- [x] TC-10: Password is masked
- [x] TC-11: Sign In button visible after confirm country
- [x] TC-12: Login form visible after click Sign In

### Navigation Tests

- [x] TC-13: Forgot password link
- [x] TC-14: Redirect after successful login
- [x] TC-15: Logout returns to main page

### Boundary Value Tests

- [x] TC-16: Login with minimum length values
- [x] TC-17: Login with maximum length values
- [x] TC-18: Login with special characters

### Session Tests

- [x] TC-19: Session persists after refresh
- [x] TC-20: Cannot access after logout

### Security Tests (security.spec.ts)

- [x] SQL injection prevention
- [x] XSS prevention

---

## Next Steps

1. **Fill in the selectors** from your actual login page
2. **Update test data** with real test credentials
3. **Run tests** and fix any failing cases
4. **Add more tests** as needed

---

## Quick Reference Commands

```bash
# Install
npm install
npx playwright install chromium

# Run tests
npx playwright test --headed --project=chromium

# Debug
npx playwright test --debug

# Report
npx playwright show-report
```

---

*Document created for Login Test Automation Project*
