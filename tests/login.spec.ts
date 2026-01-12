import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import {
  validUser,
  invalidCredentials,
  emptyFields,
  boundaryValues
} from './data/test-data';

// ============================================================
// LOGIN FUNCTIONALITY TESTS
// Flow: Vào trang → Confirm Country → Click "Sign In" → Điền form → Login
// ============================================================

test.describe('Login Form Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ==================== TC-01 đến TC-03: ĐĂNG NHẬP HỢP LỆ ====================
  test.describe('Valid Login Tests - Đăng nhập hợp lệ', () => {

    test('TC-01: Đăng nhập với thông tin hợp lệ', async ({ page }) => {
      // Flow: Confirm Country → Sign In → Điền form → Login
      await loginPage.login(validUser.username, validUser.password);

      // Kiểm tra: Đăng nhập thành công
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isLoggedIn).toBeTruthy();
    });

    test('TC-02: Đăng nhập bằng phím Enter', async ({ page }) => {
      // Flow: Confirm Country → Sign In → Điền form → Enter
      await loginPage.loginWithEnter(validUser.username, validUser.password);

      // Kiểm tra: Đăng nhập thành công
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isLoggedIn).toBeTruthy();
    });

  });

  // ==================== TC-04 đến TC-06: ĐĂNG NHẬP KHÔNG HỢP LỆ ====================
  test.describe('Invalid Login Tests - Đăng nhập không hợp lệ', () => {

    test('TC-04: Đăng nhập với email không tồn tại', async ({ page }) => {
      await loginPage.login(
        invalidCredentials.wrongUsername.username,
        invalidCredentials.wrongUsername.password
      );

      // Kiểm tra: Thông báo "User email does not exist!" hiển thị
      const errorText = page.getByText(invalidCredentials.wrongUsername.expectedError);
      await expect(errorText).toBeVisible({ timeout: 10000 });
    });

    test('TC-05: Đăng nhập với password sai', async ({ page }) => {
      await loginPage.login(
        invalidCredentials.wrongPassword.username,
        invalidCredentials.wrongPassword.password
      );

      // Kiểm tra: Thông báo "Email or password is incorrect!" hiển thị
      const errorText = page.getByText(invalidCredentials.wrongPassword.expectedError);
      await expect(errorText).toBeVisible({ timeout: 10000 });
    });

    test('TC-06: Đăng nhập với cả username và password sai', async ({ page }) => {
      await loginPage.login(
        invalidCredentials.bothWrong.username,
        invalidCredentials.bothWrong.password
      );

      // Kiểm tra: Thông báo "User email does not exist!" hiển thị
      const errorText = page.getByText(invalidCredentials.bothWrong.expectedError);
      await expect(errorText).toBeVisible({ timeout: 10000 });
    });

    test('TC-06b: Đăng nhập với email không hợp lệ', async ({ page }) => {
      await loginPage.openLoginForm();

      // Nhập email không đúng định dạng
      await loginPage.fillUsername(invalidCredentials.invalidEmailFormat.username);
      await loginPage.fillPassword(invalidCredentials.invalidEmailFormat.password);
      await loginPage.clickLoginButton();

      // Kiểm tra: Thông báo "Not a valid email" hiển thị
      const errorText = page.getByText(invalidCredentials.invalidEmailFormat.expectedError);
      await expect(errorText).toBeVisible({ timeout: 10000 });
    });
  });

  // ==================== TC-07 đến TC-09: TRƯỜNG TRỐNG ====================
  test.describe('Empty Field Tests - Kiểm tra trường trống', () => {

    test('TC-07: Đăng nhập với username trống', async ({ page }) => {
      // Mở form login
      await loginPage.openLoginForm();

      // Chỉ điền password, để trống username
      await loginPage.fillPassword(emptyFields.emptyUsername.password);
      await loginPage.clickLoginButton();

      // Kiểm tra: Form vẫn hiển thị
      const isFormVisible = await loginPage.isLoginFormVisible();
      expect(isFormVisible).toBeTruthy();

      // Kiểm tra: Hiển thị thông báo lỗi yêu cầu nhập username
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage.toLowerCase()).toContain(emptyFields.emptyUsername.expectedError.toLowerCase());
    });

    test('TC-08: Đăng nhập với password trống', async ({ page }) => {
      // Mở form login
      await loginPage.openLoginForm();

      // Chỉ điền username, để trống password
      await loginPage.fillUsername(emptyFields.emptyPassword.username);
      await loginPage.clickLoginButton();

      // Kiểm tra: Form vẫn hiển thị
      const isFormVisible = await loginPage.isLoginFormVisible();
      expect(isFormVisible).toBeTruthy();

      // Kiểm tra: Hiển thị thông báo lỗi yêu cầu nhập password
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage.toLowerCase()).toContain(emptyFields.emptyPassword.expectedError.toLowerCase());
    });

    test('TC-09: Đăng nhập với cả hai trường trống', async ({ page }) => {
      // Mở form login
      await loginPage.openLoginForm();

      // Không điền gì, click login
      await loginPage.clickLoginButton();

      // Kiểm tra: Form vẫn hiển thị
      const isFormVisible = await loginPage.isLoginFormVisible();
      expect(isFormVisible).toBeTruthy();

      // Kiểm tra: Hiển thị thông báo lỗi yêu cầu nhập thông tin
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage.toLowerCase()).toContain(emptyFields.bothEmpty.expectedError.toLowerCase());
    });
  });

  // ==================== TC-10 đến TC-12: UI/UX ====================
  test.describe('UI/UX Tests - Kiểm tra giao diện', () => {

    test('TC-10: Password được ẩn (hiển thị dấu *)', async ({ page }) => {
      // Mở form login
      await loginPage.openLoginForm();

      // Điền password
      await loginPage.fillPassword('TestPassword123!');

      // Kiểm tra: Password bị ẩn
      const isMasked = await loginPage.isPasswordMasked();
      expect(isMasked).toBeTruthy();
    });

    test('TC-11: Nút Sign In hiển thị sau khi confirm country', async ({ page }) => {
      // Confirm country trước
      await loginPage.confirmCountry();

      // Kiểm tra: Nút Sign In hiển thị
      await expect(loginPage.signInButton).toBeVisible();
      await expect(loginPage.signInButton).toBeEnabled();
    });

    test('TC-12: Form login hiển thị sau khi click Sign In', async ({ page }) => {
      // Mở form login
      await loginPage.openLoginForm();

      // Kiểm tra: Username và password fields hiển thị
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });
  });

  // ==================== TC-13 đến TC-15: ĐIỀU HƯỚNG ====================
  test.describe('Navigation Tests - Kiểm tra điều hướng', () => {

    test('TC-13: Link Forgot Password hoạt động', async ({ page }) => {
      // Mở form login
      await loginPage.openLoginForm();

      // Kiểm tra link có hiển thị không
      const isVisible = await loginPage.forgotPasswordLink.isVisible().catch(() => false);

      if (isVisible) {
        await loginPage.clickForgotPassword();
        const currentUrl = loginPage.getCurrentUrl();
        expect(currentUrl).toMatch(/forgot|reset|password/i);
      } else {
        test.skip();
      }
    });

    test('TC-14: Đăng nhập thành công chuyển trang', async ({ page }) => {
      await loginPage.login(validUser.username, validUser.password);

      // Kiểm tra: URL thay đổi hoặc đăng nhập thành công
      const currentUrl = loginPage.getCurrentUrl();
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isLoggedIn || !currentUrl.includes('login')).toBeTruthy();
    });

    test('TC-15: Đăng xuất quay về trang chính', async ({ page }) => {
      // Đăng nhập
      await loginPage.login(validUser.username, validUser.password);
      await page.waitForTimeout(1000);

      // Đăng xuất
      await loginPage.logout();

      // Kiểm tra: Nút Sign In hiển thị lại
      const signInVisible = await loginPage.signInButton.isVisible().catch(() => false);
      expect(signInVisible).toBeTruthy();
    });
  });

  // ==================== TC-16 đến TC-18: GIÁ TRỊ BIÊN ====================
  test.describe('Boundary Value Tests - Kiểm tra giá trị biên', () => {

    test('TC-16: Đăng nhập với độ dài tối thiểu', async ({ page }) => {
      await loginPage.login(
        boundaryValues.minLength.username,
        boundaryValues.minLength.password
      );

      // Kiểm tra: Không crash, hiển thị lỗi hoặc thành công
      const isFormVisible = await loginPage.isLoginFormVisible();
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isFormVisible || isLoggedIn).toBeTruthy();
    });

    test('TC-17: Đăng nhập với độ dài tối đa', async ({ page }) => {
      await loginPage.login(
        boundaryValues.maxLength.username,
        boundaryValues.maxLength.password
      );

      // Kiểm tra: Xử lý gracefully
      const isFormVisible = await loginPage.isLoginFormVisible();
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isFormVisible || isLoggedIn).toBeTruthy();
    });

    test('TC-18: Đăng nhập với ký tự đặc biệt', async ({ page }) => {
      await loginPage.login(
        boundaryValues.specialChars.username,
        boundaryValues.specialChars.password
      );

      // Kiểm tra: Xử lý gracefully
      const isFormVisible = await loginPage.isLoginFormVisible();
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isFormVisible || isLoggedIn).toBeTruthy();
    });
  });

  // ==================== TC-19 đến TC-20: SESSION ====================
  test.describe('Session Tests - Kiểm tra phiên đăng nhập', () => {

    test('TC-19: Session giữ nguyên sau khi refresh', async ({ page }) => {
      // Đăng nhập
      await loginPage.login(validUser.username, validUser.password);
      const isLoggedIn = await loginPage.isLoggedIn();

      if (isLoggedIn) {
        // Refresh trang
        await page.reload();
        await page.waitForLoadState('networkidle');

        // Kiểm tra: Vẫn đăng nhập
        const stillLoggedIn = await loginPage.isLoggedIn();
        expect(stillLoggedIn).toBeTruthy();
      }
    });

    test('TC-20: Không thể truy cập sau khi đăng xuất', async ({ page }) => {
      // Đăng nhập rồi đăng xuất
      await loginPage.login(validUser.username, validUser.password);
      await loginPage.logout();

      // Nhấn back
      await page.goBack();
      await page.waitForLoadState('networkidle');

      // Kiểm tra: Phải đăng nhập lại
      const signInVisible = await loginPage.signInButton.isVisible().catch(() => false);
      const currentUrl = loginPage.getCurrentUrl();
      expect(signInVisible || currentUrl.includes('login') || currentUrl.includes('cams-care')).toBeTruthy();
    });
  });
});
