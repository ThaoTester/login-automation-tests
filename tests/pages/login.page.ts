import { Page, Locator, expect } from '@playwright/test';
import { ErrorType, ERROR_MESSAGES } from '../data/test-data';

export class LoginPage {
  readonly page: Page;

  // ============== SELECTORS ==============

  // Bước 1: Nút "Confirm My Country" trong popup country
  readonly confirmCountryButton: Locator;

  // Bước 2: Nút "Sign In" để mở form login
  readonly signInButton: Locator;

  // Bước 3: Form elements trong popup login
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // Các elements khác
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly logoutButton: Locator;
  readonly dashboardLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // ============== SELECTORS THẬT TỪ TRANG WEB ==============

    // Bước 1: Nút "Confirm My Country"
    // <button class="btn btn-primary text-uppercase btn-blue-highlight btn-round-9 btn-h-50" type="submit">Confirm My Country</button>
    this.confirmCountryButton = page.locator('button:has-text("Confirm My Country")');

    // Bước 2: Nút "Sign In" để mở form login
    // <button class="btn btn-link btn-link signin-link" type="button">Sign In</button>
    this.signInButton = page.locator('button.signin-link, button:has-text("Sign In")').first();

    // Bước 3: Form login
    // Email/Username: <input name="email" placeholder="Email or username" class="input-authen">
    // Dùng placeholder để phân biệt với input email ở footer
    this.usernameInput = page.locator('input[placeholder="Email or username"]');

    // Password: <input id="password" name="password" type="password">
    this.passwordInput = page.locator('#password');

    // Login button: <button class="btn btn-blue-highlight" type="submit">Login</button>
    this.loginButton = page.locator('button:has-text("Login")');

    // Error message - multiple possible selectors for error display
    // Bao gồm cả inline validation errors và toast notifications
    this.errorMessage = page.locator('.error, .error-message, .alert-danger, .alert-error, [role="alert"], .text-danger, .invalid-feedback, .toast-error, .notification-error, .modal-login .text-danger, .modal-login .error, .form-error, .login-error, .auth-error, .validation-error, .field-error, .input-error, [class*="error"], [class*="validation"], .toast, .toast-message, .Toastify__toast, .swal2-popup, .notiflix-notify, .notyf, .vue-notification').first();

    // Forgot password link
    this.forgotPasswordLink = page.locator('a:has-text("Forgot"), a:has-text("forgot")').first();

    // Logout button (sau khi đăng nhập thành công)
    this.logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign out"), a:has-text("Sign out")').first();

    // Dashboard link - xuất hiện sau khi đăng nhập thành công
    // <a class="nav-link active" href="/admin/">Dashboard</a>
    this.dashboardLink = page.locator('a:has-text("Dashboard"), a[href="/admin/"]').first();
  }

  // ============== NAVIGATION ==============

  async goto(path: string = '/') {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ============== BƯỚC 1: XÁC NHẬN COUNTRY ==============

  async confirmCountry() {
    try {
      // Đợi và click nút "Confirm My Country" nếu xuất hiện
      await this.confirmCountryButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.confirmCountryButton.click();
      await this.page.waitForTimeout(1000);
    } catch {
      // Popup country không xuất hiện, bỏ qua
    }
  }

  // ============== BƯỚC 2: MỞ FORM LOGIN ==============

  async clickSignIn() {
    await this.signInButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.signInButton.click();
    await this.page.waitForTimeout(1000);
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  // ============== BƯỚC 3: ĐIỀN FORM LOGIN ==============

  async fillUsername(username: string) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginButton.click();
  }

  // ============== LOGIN HOÀN CHỈNH ==============

  // Flow: Confirm Country → Click Sign In → Điền form → Click Login
  async login(username: string, password: string) {
    await this.confirmCountry();
    await this.clickSignIn();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
    await this.page.waitForLoadState('networkidle');
  }

  // Login bằng phím Enter
  async loginWithEnter(username: string, password: string) {
    await this.confirmCountry();
    await this.clickSignIn();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.passwordInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  // Mở form login (không điền form)
  async openLoginForm() {
    await this.confirmCountry();
    await this.clickSignIn();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async logout() {
    if (await this.logoutButton.isVisible()) {
      await this.logoutButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  // ============== GETTERS ==============

  async getErrorMessage(): Promise<string> {
    // Đợi một chút để toast/error có thể xuất hiện
    await this.page.waitForTimeout(1000);

    try {
      // Thử selector chính trước
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.errorMessage.textContent() || '';
    } catch {
      // Fallback: Tìm text validation error phổ biến
      try {
        const validationPatterns = [
          'User email does not exist',
          'Email or password is incorrect',
          'Email is required',
          'Password is required',
          'Not a valid email',
          'does not exist',
          'incorrect',
          'required',
          'invalid'
        ];

        for (const pattern of validationPatterns) {
          const errorElement = this.page.getByText(pattern, { exact: false }).first();
          if (await errorElement.isVisible({ timeout: 2000 }).catch(() => false)) {
            return await errorElement.textContent() || '';
          }
        }

        // Tìm trong modal dialog các element có text error
        const modalErrorSelectors = [
          '.modal-login .error',
          '.dialog .error',
          '[role="dialog"] .error',
          '[role="alert"]'
        ];

        for (const selector of modalErrorSelectors) {
          const element = this.page.locator(selector).first();
          if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
            const text = await element.textContent();
            if (text && text.trim() && text.length < 200) return text.trim();
          }
        }
      } catch {
        // Ignore fallback errors
      }
      return '';
    }
  }

  async isErrorVisible(): Promise<boolean> {
    try {
      // First check for specific error message elements
      await this.errorMessage.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      // If no error element, check if login form is still visible (indicating login failed)
      // Also check for any text containing "invalid", "error", "incorrect", "wrong"
      try {
        const errorText = this.page.locator('text=/invalid|error|incorrect|wrong|fail/i').first();
        await errorText.waitFor({ state: 'visible', timeout: 2000 });
        return true;
      } catch {
        // Check if we're still on login form (meaning login didn't succeed)
        const stillOnLogin = await this.usernameInput.isVisible().catch(() => false);
        const notLoggedIn = !(await this.isLoggedIn().catch(() => false));
        return stillOnLogin && notLoggedIn;
      }
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      // Kiểm tra Dashboard link xuất hiện = đăng nhập thành công
      await this.dashboardLink.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async isLoginFormVisible(): Promise<boolean> {
    try {
      await this.usernameInput.waitFor({ state: 'visible', timeout: 3000 });
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

  async expectLoginSuccess() {
    await expect(this.dashboardLink).toBeVisible({ timeout: 10000 });
  }

  async expectLoginFailure() {
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
  }

  async expectLoginFormVisible() {
    await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
  }

  // ============== PHÂN BIỆT LOẠI LỖI ==============

  /**
   * Xác định loại lỗi từ thông báo hiển thị trên màn hình
   * @returns ErrorType - Loại lỗi (EMPTY_USERNAME, INVALID_PASSWORD, ...)
   */
  async getErrorType(): Promise<ErrorType> {
    // Bước 1: Lấy text thông báo lỗi
    const errorText = await this.getErrorMessage();

    // Bước 2: Nếu không có text → Không có lỗi
    if (!errorText) {
      return ErrorType.NONE;
    }

    // Bước 3: Chuyển về chữ thường để so sánh
    const lowerText = errorText.toLowerCase().trim();

    // Bước 4: Tìm trong bảng mapping
    for (const [message, type] of Object.entries(ERROR_MESSAGES)) {
      if (lowerText.includes(message)) {
        return type;  // Trả về loại lỗi tương ứng
      }
    }

    // Bước 5: Không tìm thấy → Lỗi không xác định
    return ErrorType.UNKNOWN;
  }

  /**
   * Kiểm tra có phải lỗi username trống không
   */
  async isEmptyUsernameError(): Promise<boolean> {
    const errorType = await this.getErrorType();
    return errorType === ErrorType.EMPTY_USERNAME;
  }

  /**
   * Kiểm tra có phải lỗi password trống không
   */
  async isEmptyPasswordError(): Promise<boolean> {
    const errorType = await this.getErrorType();
    return errorType === ErrorType.EMPTY_PASSWORD;
  }

  /**
   * Kiểm tra có phải lỗi username sai không
   */
  async isInvalidUsernameError(): Promise<boolean> {
    const errorType = await this.getErrorType();
    return errorType === ErrorType.INVALID_USERNAME;
  }

  /**
   * Kiểm tra có phải lỗi password sai không
   */
  async isInvalidPasswordError(): Promise<boolean> {
    const errorType = await this.getErrorType();
    return errorType === ErrorType.INVALID_PASSWORD;
  }

  /**
   * Kiểm tra có phải lỗi đăng nhập chung (không phân biệt username/password)
   */
  async isInvalidCredentialsError(): Promise<boolean> {
    const errorType = await this.getErrorType();
    return errorType === ErrorType.INVALID_CREDENTIALS;
  }

  /**
   * Kiểm tra có phải lỗi tài khoản bị khóa không
   */
  async isAccountLockedError(): Promise<boolean> {
    const errorType = await this.getErrorType();
    return errorType === ErrorType.ACCOUNT_LOCKED;
  }
}
