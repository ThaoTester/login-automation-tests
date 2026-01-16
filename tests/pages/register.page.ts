import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  // ============== SELECTORS ==============

  // Bước 1: Nút "Confirm My Country" trong popup country
  readonly confirmCountryButton: Locator;

  // Bước 2: Nút "Sign In" trên header (click trước để thấy Sign Up)
  readonly signInButton: Locator;

  // Bước 3: Link "Sign Up" (xuất hiện sau khi click Sign In)
  readonly signUpLink: Locator;

  // Bước 3: Nút "SIGN UP FOR FREE" để mở form đăng ký
  readonly signUpButton: Locator;

  // Bước 3: Form elements trong popup đăng ký
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;

  // Các elements khác
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // ============== SELECTORS TỪ TRANG WEB THẬT ==============

    // Bước 1: Nút "Confirm My Country"
    this.confirmCountryButton = page.locator('button:has-text("Confirm My Country")');

    // Bước 2: Nút "Sign In" trên header
    // <button class="btn btn-link btn-link signin-link" type="button">Sign In</button>
    this.signInButton = page.locator('button.signin-link:has-text("Sign In")');

    // Bước 3: Link "Sign Up" (xuất hiện sau khi click Sign In)
    this.signUpLink = page.locator('a:has-text("Sign Up"), button:has-text("Sign Up")').first();

    // Bước 3: Nút "SIGN UP FOR FREE" để mở form đăng ký
    // <button class="btn btn-primary btn btn-blue-dark" type="button">SIGN UP FOR FREE</button>
    this.signUpButton = page.locator('button.btn-blue-dark:has-text("SIGN UP FOR FREE")');

    // Bước 3: Form đăng ký - Selectors chính xác từ HTML
    // <input class="form-control input-custom" type="text" placeholder="First name" name="firstName">
    this.firstNameInput = page.locator('input[name="firstName"][placeholder="First name"]');

    // <input class="form-control input-custom" type="text" placeholder="Last name" name="lastName">
    this.lastNameInput = page.locator('input[name="lastName"][placeholder="Last name"]');

    // <input class="form-control input-custom" type="email" placeholder="Email" name="email">
    this.emailInput = page.locator('input[name="email"][placeholder="Email"]');

    // <input class="form-control input-custom" id="password" type="password" name="password" placeholder="Password">
    this.passwordInput = page.locator('input#password[name="password"]');

    // Nút Register: <button class="btn btn-blue-highlight" type="submit">Register</button>
    this.registerButton = page.locator('button.btn-blue-highlight[type="submit"]:has-text("Register")');

    // Error message
    this.errorMessage = page.locator('.error, .error-message, .alert-danger, .alert-error, [role="alert"], .text-danger, .invalid-feedback, .toast-error, [class*="error"]').first();

    // Success message
    this.successMessage = page.locator('.success, .success-message, .alert-success, [class*="success"]').first();

    // Link về trang Sign In
    this.signInLink = page.locator('a:has-text("Sign In"), a:has-text("Login"), a:has-text("Already have an account")').first();
  }

  // ============== NAVIGATION ==============

  async goto(path: string = '/') {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ============== BƯỚC 1: XÁC NHẬN COUNTRY ==============

  async confirmCountry() {
    try {
      await this.confirmCountryButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.confirmCountryButton.click();
      await this.page.waitForTimeout(1000);
    } catch {
      // Popup country không xuất hiện, bỏ qua
    }
  }

  // ============== BƯỚC 2: CLICK SIGN IN TRÊN HEADER ==============

  async clickSignIn() {
    await this.signInButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.signInButton.click();
    await this.page.waitForTimeout(1000);
    // Đợi popup Member Login hiển thị với nút SIGN UP FOR FREE
    await this.signUpButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  // ============== BƯỚC 3: CLICK NÚT SIGN UP FOR FREE ==============

  async clickSignUpForFree() {
    await this.signUpButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.signUpButton.click();
    await this.page.waitForTimeout(1000);
    // Đợi form đăng ký hiển thị
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  // ============== BƯỚC 3: ĐIỀN FORM ĐĂNG KÝ ==============

  async fillFirstName(firstName: string) {
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.lastNameInput.clear();
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.clear();
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  async clickRegisterButton() {
    await this.registerButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.registerButton.click();
  }

  // ============== ĐĂNG KÝ HOÀN CHỈNH ==============

  // Flow: Confirm Country → Click Sign In → Click SIGN UP FOR FREE → Điền form → Click Register
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.confirmCountry();
    await this.clickSignIn();
    await this.clickSignUpForFree();

    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillEmail(data.email);
    await this.fillPassword(data.password);

    await this.clickRegisterButton();
    await this.page.waitForLoadState('networkidle');
  }

  // Đăng ký bằng phím Enter
  async registerWithEnter(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.confirmCountry();
    await this.clickSignIn();
    await this.clickSignUpForFree();

    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillEmail(data.email);
    await this.fillPassword(data.password);
    await this.passwordInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  // Mở form đăng ký (không điền form)
  async openRegisterForm() {
    await this.confirmCountry();
    await this.clickSignIn();
    await this.clickSignUpForFree();
  }

  // ============== GETTERS ==============

  async getErrorMessage(): Promise<string> {
    await this.page.waitForTimeout(1000);

    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.errorMessage.textContent() || '';
    } catch {
      // Fallback: Tìm text validation error phổ biến
      try {
        const validationPatterns = [
          'Email already exists',
          'Email is required',
          'Password is required',
          'First name is required',
          'Last name is required',
          'Invalid email',
          'Not a valid email',
          'required',
          'invalid',
          'already exists',
          'too short',
          'too long'
        ];

        for (const pattern of validationPatterns) {
          const errorElement = this.page.getByText(pattern, { exact: false }).first();
          if (await errorElement.isVisible({ timeout: 2000 }).catch(() => false)) {
            return await errorElement.textContent() || '';
          }
        }
      } catch {
        // Ignore fallback errors
      }
      return '';
    }
  }

  async getSuccessMessage(): Promise<string> {
    await this.page.waitForTimeout(1000);

    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.successMessage.textContent() || '';
    } catch {
      return '';
    }
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    try {
      // Kiểm tra các dấu hiệu đăng ký thành công
      // 1. Có success message
      const successMsg = await this.getSuccessMessage();
      if (successMsg) return true;

      // 2. Chuyển sang trang Learning Center (có text "My Training" hoặc "Learning Center")
      const learningCenter = this.page.locator('text=/My Training|Learning Center/i').first();
      if (await learningCenter.isVisible({ timeout: 5000 }).catch(() => false)) {
        return true;
      }

      // 3. Chuyển sang trang login hoặc dashboard
      const currentUrl = this.page.url();
      if (currentUrl.includes('login') || currentUrl.includes('dashboard') || currentUrl.includes('verify') || currentUrl.includes('training')) {
        return true;
      }

      // 4. Có text thành công
      const successText = this.page.locator('text=/success|registered|created|verify your email/i').first();
      await successText.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async isRegisterFormVisible(): Promise<boolean> {
    try {
      await this.firstNameInput.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async isPasswordMasked(): Promise<boolean> {
    const type = await this.passwordInput.getAttribute('type');
    return type === 'password';
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  // ============== ASSERTIONS ==============

  async expectRegistrationSuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  }

  async expectRegistrationFailure() {
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
  }

  async expectRegisterFormVisible() {
    await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
  }
}
