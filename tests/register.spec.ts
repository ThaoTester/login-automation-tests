import { test, expect } from '@playwright/test';
import { RegisterPage } from './pages/register.page';
import {
  generateUniqueEmail,
  invalidRegistration,
  emptyRegistrationFields,
  registrationBoundaryValues
} from './data/test-data';

// ============================================================
// REGISTRATION FUNCTIONALITY TESTS
// Flow: Vào trang → Confirm Country → Click "Sign Up" → Điền form → Register
// ============================================================

test.describe('Registration Form Tests', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  // ==================== ĐĂNG KÝ HỢP LỆ ====================
  test.describe('Valid Registration Tests - Đăng ký hợp lệ', () => {

    test('TC-R01: Đăng ký với thông tin hợp lệ', async ({ page }) => {
      // Tạo email unique để tránh trùng
      const uniqueEmail = generateUniqueEmail();

      await registerPage.register({
        firstName: 'Test',
        lastName: 'User',
        email: uniqueEmail,
        password: 'Test@123!'
      });

      // Kiểm tra: Đăng ký thành công
      const isSuccess = await registerPage.isRegistrationSuccessful();
      expect(isSuccess).toBeTruthy();
    });

    test('TC-R02: Đăng ký bằng phím Enter', async ({ page }) => {
      const uniqueEmail = generateUniqueEmail();

      await registerPage.registerWithEnter({
        firstName: 'Test',
        lastName: 'User',
        email: uniqueEmail,
        password: 'Test@123!'
      });

      // Kiểm tra: Đăng ký thành công
      const isSuccess = await registerPage.isRegistrationSuccessful();
      expect(isSuccess).toBeTruthy();
    });
  });

  // ==================== ĐĂNG KÝ KHÔNG HỢP LỆ ====================
  test.describe('Invalid Registration Tests - Đăng ký không hợp lệ', () => {

    test('TC-R03: Đăng ký với email không hợp lệ', async ({ page }) => {
      await registerPage.register({
        firstName: invalidRegistration.invalidEmail.firstName,
        lastName: invalidRegistration.invalidEmail.lastName,
        email: invalidRegistration.invalidEmail.email,
        password: invalidRegistration.invalidEmail.password
      });

      // Kiểm tra: Thông báo lỗi hiển thị
      const errorMessage = await registerPage.getErrorMessage();
      expect(errorMessage.toLowerCase()).toContain('valid');
    });

    test('TC-R04: Đăng ký với email đã tồn tại', async ({ page }) => {
      await registerPage.register({
        firstName: invalidRegistration.existingEmail.firstName,
        lastName: invalidRegistration.existingEmail.lastName,
        email: invalidRegistration.existingEmail.email,
        password: invalidRegistration.existingEmail.password
      });

      // Kiểm tra: Thông báo email đã tồn tại
      const errorMessage = await registerPage.getErrorMessage();
      const isFormVisible = await registerPage.isRegisterFormVisible();
      expect(errorMessage.toLowerCase().includes('exist') || isFormVisible).toBeTruthy();
    });
  });

  // ==================== TRƯỜNG TRỐNG ====================
  test.describe('Empty Field Tests - Kiểm tra trường trống', () => {

    test('TC-R05: Đăng ký với First Name trống', async ({ page }) => {
      await registerPage.openRegisterForm();

      // Chỉ điền các trường khác, để trống First Name
      await registerPage.fillLastName(emptyRegistrationFields.emptyFirstName.lastName);
      await registerPage.fillEmail(emptyRegistrationFields.emptyFirstName.email);
      await registerPage.fillPassword(emptyRegistrationFields.emptyFirstName.password);
      await registerPage.clickRegisterButton();

      // Kiểm tra: Form vẫn hiển thị hoặc có thông báo lỗi
      const isFormVisible = await registerPage.isRegisterFormVisible();
      expect(isFormVisible).toBeTruthy();
    });

    test('TC-R06: Đăng ký với Last Name trống', async ({ page }) => {
      await registerPage.openRegisterForm();

      await registerPage.fillFirstName(emptyRegistrationFields.emptyLastName.firstName);
      await registerPage.fillEmail(emptyRegistrationFields.emptyLastName.email);
      await registerPage.fillPassword(emptyRegistrationFields.emptyLastName.password);
      await registerPage.clickRegisterButton();

      const isFormVisible = await registerPage.isRegisterFormVisible();
      expect(isFormVisible).toBeTruthy();
    });

    test('TC-R07: Đăng ký với Email trống', async ({ page }) => {
      await registerPage.openRegisterForm();

      await registerPage.fillFirstName(emptyRegistrationFields.emptyEmail.firstName);
      await registerPage.fillLastName(emptyRegistrationFields.emptyEmail.lastName);
      await registerPage.fillPassword(emptyRegistrationFields.emptyEmail.password);
      await registerPage.clickRegisterButton();

      const isFormVisible = await registerPage.isRegisterFormVisible();
      const errorMessage = await registerPage.getErrorMessage();
      expect(isFormVisible || errorMessage.toLowerCase().includes('required')).toBeTruthy();
    });

    test('TC-R08: Đăng ký với Password trống', async ({ page }) => {
      await registerPage.openRegisterForm();

      await registerPage.fillFirstName(emptyRegistrationFields.emptyPassword.firstName);
      await registerPage.fillLastName(emptyRegistrationFields.emptyPassword.lastName);
      await registerPage.fillEmail(emptyRegistrationFields.emptyPassword.email);
      await registerPage.clickRegisterButton();

      const isFormVisible = await registerPage.isRegisterFormVisible();
      const errorMessage = await registerPage.getErrorMessage();
      expect(isFormVisible || errorMessage.toLowerCase().includes('required')).toBeTruthy();
    });

    test('TC-R09: Đăng ký với tất cả trường trống', async ({ page }) => {
      await registerPage.openRegisterForm();

      // Không điền gì, click Register
      await registerPage.clickRegisterButton();

      const isFormVisible = await registerPage.isRegisterFormVisible();
      expect(isFormVisible).toBeTruthy();
    });
  });

  // ==================== UI/UX ====================
  test.describe('UI/UX Tests - Kiểm tra giao diện', () => {

    test('TC-R10: Password được ẩn (hiển thị dấu *)', async ({ page }) => {
      await registerPage.openRegisterForm();

      await registerPage.fillPassword('TestPassword123!');

      const isMasked = await registerPage.isPasswordMasked();
      expect(isMasked).toBeTruthy();
    });

    test('TC-R11: Nút Sign In hiển thị sau khi confirm country', async ({ page }) => {
      await registerPage.confirmCountry();

      // Sau confirm country, nút Sign In hiển thị trên header
      await expect(registerPage.signInButton).toBeVisible();
      await expect(registerPage.signInButton).toBeEnabled();
    });

    test('TC-R12: Form đăng ký hiển thị sau khi click Sign Up', async ({ page }) => {
      await registerPage.openRegisterForm();

      await expect(registerPage.firstNameInput).toBeVisible();
      await expect(registerPage.lastNameInput).toBeVisible();
      await expect(registerPage.emailInput).toBeVisible();
      await expect(registerPage.passwordInput).toBeVisible();
      await expect(registerPage.registerButton).toBeVisible();
    });
  });

  // ==================== GIÁ TRỊ BIÊN ====================
  test.describe('Boundary Value Tests - Kiểm tra giá trị biên', () => {

    test('TC-R13: Đăng ký với độ dài tối thiểu', async ({ page }) => {
      await registerPage.register({
        firstName: registrationBoundaryValues.minLength.firstName,
        lastName: registrationBoundaryValues.minLength.lastName,
        email: registrationBoundaryValues.minLength.email,
        password: registrationBoundaryValues.minLength.password
      });

      // Kiểm tra: Không crash, hiển thị lỗi hoặc thành công
      const isFormVisible = await registerPage.isRegisterFormVisible();
      const isSuccess = await registerPage.isRegistrationSuccessful();
      expect(isFormVisible || isSuccess).toBeTruthy();
    });

    test('TC-R14: Đăng ký với độ dài tối đa', async ({ page }) => {
      await registerPage.register({
        firstName: registrationBoundaryValues.maxLength.firstName,
        lastName: registrationBoundaryValues.maxLength.lastName,
        email: registrationBoundaryValues.maxLength.email,
        password: registrationBoundaryValues.maxLength.password
      });

      // Kiểm tra: Xử lý gracefully
      const isFormVisible = await registerPage.isRegisterFormVisible();
      const isSuccess = await registerPage.isRegistrationSuccessful();
      expect(isFormVisible || isSuccess).toBeTruthy();
    });

    test('TC-R15: Đăng ký với ký tự đặc biệt', async ({ page }) => {
      const uniqueEmail = `test${Date.now()}+special@test.com`;

      await registerPage.register({
        firstName: registrationBoundaryValues.specialChars.firstName,
        lastName: registrationBoundaryValues.specialChars.lastName,
        email: uniqueEmail,
        password: registrationBoundaryValues.specialChars.password
      });

      // Kiểm tra: Xử lý gracefully
      const isFormVisible = await registerPage.isRegisterFormVisible();
      const isSuccess = await registerPage.isRegistrationSuccessful();
      expect(isFormVisible || isSuccess).toBeTruthy();
    });
  });

  // ==================== ĐIỀU HƯỚNG ====================
  test.describe('Navigation Tests - Kiểm tra điều hướng', () => {

    test('TC-R16: Link Sign In hoạt động', async ({ page }) => {
      await registerPage.openRegisterForm();

      const isVisible = await registerPage.signInLink.isVisible().catch(() => false);

      if (isVisible) {
        await registerPage.signInLink.click();
        await page.waitForLoadState('networkidle');
        // Kiểm tra chuyển về trang login
        const currentUrl = registerPage.getCurrentUrl();
        expect(currentUrl).toMatch(/login|sign/i);
      } else {
        test.skip();
      }
    });

    test('TC-R17: Đăng ký thành công chuyển trang', async ({ page }) => {
      const uniqueEmail = generateUniqueEmail();

      await registerPage.register({
        firstName: 'Test',
        lastName: 'User',
        email: uniqueEmail,
        password: 'Test@123!'
      });

      // Kiểm tra: URL thay đổi hoặc đăng ký thành công
      const currentUrl = registerPage.getCurrentUrl();
      const isSuccess = await registerPage.isRegistrationSuccessful();
      expect(isSuccess || !currentUrl.includes('register')).toBeTruthy();
    });
  });
});
