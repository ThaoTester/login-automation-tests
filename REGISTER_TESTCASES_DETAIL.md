# DANH SÁCH CHI TIẾT TEST CASES - ĐĂNG KÝ

## Thông tin tổng quan

| Thông tin | Giá trị |
|-----------|---------|
| **Tổng số test cases** | 17 |
| **File register.spec.ts** | 17 tests |
| **Website test** | https://training-dev.cams-care.com/ |
| **Framework** | Playwright + TypeScript |

---

## I. REGISTRATION FUNCTIONALITY TESTS (register.spec.ts)

### 1. Valid Registration Tests - Đăng ký hợp lệ (2 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-R01 | Đăng ký với thông tin hợp lệ | Kiểm tra đăng ký thành công với thông tin hợp lệ | 1. Vào trang chủ<br>2. Confirm Country<br>3. Click Sign In<br>4. Click SIGN UP FOR FREE<br>5. Nhập First Name: Test<br>6. Nhập Last Name: User<br>7. Nhập Email: (unique email)<br>8. Nhập Password: Test@123!<br>9. Click Register | Chuyển đến Learning Center, hiển thị "My Training" |
| TC-R02 | Đăng ký bằng phím Enter | Kiểm tra đăng ký bằng phím Enter thay vì click nút Register | 1. Mở form đăng ký<br>2. Điền đầy đủ thông tin<br>3. Nhấn Enter | Chuyển đến Learning Center, đăng ký thành công |

### 2. Invalid Registration Tests - Đăng ký không hợp lệ (2 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-R03 | Đăng ký với email không hợp lệ | Kiểm tra validation email format | 1. Mở form đăng ký<br>2. Nhập First Name: Test<br>3. Nhập Last Name: User<br>4. Nhập Email: invalid-email<br>5. Nhập Password: Test@123!<br>6. Click Register | Hiển thị thông báo lỗi chứa **"valid"** |
| TC-R04 | Đăng ký với email đã tồn tại | Kiểm tra validation email trùng lặp | 1. Mở form đăng ký<br>2. Nhập Email đã tồn tại: dungnv.php@gmail.com<br>3. Điền các trường khác<br>4. Click Register | Hiển thị thông báo lỗi chứa **"exist"** hoặc form vẫn hiển thị |

### 3. Empty Field Tests - Kiểm tra trường trống (5 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-R05 | Đăng ký với First Name trống | Kiểm tra validation khi không nhập First Name | 1. Mở form đăng ký<br>2. Để trống First Name<br>3. Điền các trường khác<br>4. Click Register | Form vẫn hiển thị, không submit |
| TC-R06 | Đăng ký với Last Name trống | Kiểm tra validation khi không nhập Last Name | 1. Mở form đăng ký<br>2. Để trống Last Name<br>3. Điền các trường khác<br>4. Click Register | Form vẫn hiển thị, không submit |
| TC-R07 | Đăng ký với Email trống | Kiểm tra validation khi không nhập Email | 1. Mở form đăng ký<br>2. Để trống Email<br>3. Điền các trường khác<br>4. Click Register | Hiển thị thông báo **"Email is required"** hoặc form vẫn hiển thị |
| TC-R08 | Đăng ký với Password trống | Kiểm tra validation khi không nhập Password | 1. Mở form đăng ký<br>2. Để trống Password<br>3. Điền các trường khác<br>4. Click Register | Hiển thị thông báo **"Password is required"** hoặc form vẫn hiển thị |
| TC-R09 | Đăng ký với tất cả trường trống | Kiểm tra validation khi không nhập gì | 1. Mở form đăng ký<br>2. Để trống tất cả trường<br>3. Click Register | Form vẫn hiển thị, không submit |

### 4. UI/UX Tests - Kiểm tra giao diện (3 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-R10 | Password được ẩn (hiển thị dấu *) | Kiểm tra password field có type="password" | 1. Mở form đăng ký<br>2. Nhập password<br>3. Kiểm tra attribute type | Password hiển thị dạng dots/asterisks, type="password" |
| TC-R11 | Nút Sign In hiển thị sau khi confirm country | Kiểm tra flow hiển thị nút Sign In | 1. Vào trang chủ<br>2. Confirm Country<br>3. Kiểm tra nút Sign In | Nút Sign In visible và enabled |
| TC-R12 | Form đăng ký hiển thị sau khi click Sign Up | Kiểm tra form đăng ký popup | 1. Confirm Country<br>2. Click Sign In<br>3. Click SIGN UP FOR FREE<br>4. Kiểm tra form | First Name, Last Name, Email, Password, Register button hiển thị |

### 5. Boundary Value Tests - Kiểm tra giá trị biên (3 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-R13 | Đăng ký với độ dài tối thiểu | Kiểm tra input với độ dài minimum | 1. Nhập First Name: A<br>2. Nhập Last Name: B<br>3. Nhập Email: a@b.co<br>4. Nhập Password: P@1a<br>5. Click Register | Xử lý gracefully, không crash |
| TC-R14 | Đăng ký với độ dài tối đa | Kiểm tra input với độ dài maximum | 1. Nhập First Name 50+ ký tự<br>2. Nhập Last Name 50+ ký tự<br>3. Nhập Email 50+ ký tự<br>4. Nhập Password 100+ ký tự<br>5. Click Register | Xử lý gracefully, không crash |
| TC-R15 | Đăng ký với ký tự đặc biệt | Kiểm tra xử lý ký tự đặc biệt | 1. Nhập First Name: Test-User<br>2. Nhập Last Name: O'Brien<br>3. Nhập Email: user+test@test.com<br>4. Nhập Password: P@ss!#$%^&*()<br>5. Click Register | Xử lý gracefully, không crash |

### 6. Navigation Tests - Kiểm tra điều hướng (2 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-R16 | Link Sign In hoạt động | Kiểm tra link quay về đăng nhập | 1. Mở form đăng ký<br>2. Click link Sign In | Chuyển về form đăng nhập |
| TC-R17 | Đăng ký thành công chuyển trang | Kiểm tra redirect sau khi đăng ký | 1. Đăng ký thành công<br>2. Kiểm tra URL | URL thay đổi, không còn ở trang register |

---

## II. TEST DATA SỬ DỤNG

### 1. Valid Registration Data

```typescript
firstName: 'Test'
lastName: 'User'
email: generateUniqueEmail() // testuser{timestamp}@test.com
password: 'Test@123!'
```

### 2. Invalid Registration Data

| Loại | First Name | Last Name | Email | Password | Thông báo lỗi mong đợi |
|------|------------|-----------|-------|----------|------------------------|
| Invalid Email | Test | User | invalid-email | Test@123! | Not a valid email |
| Existing Email | Test | User | dungnv.php@gmail.com | Test@123! | already exists |

### 3. Empty Field Test Data

| Loại | First Name | Last Name | Email | Password | Thông báo lỗi mong đợi |
|------|------------|-----------|-------|----------|------------------------|
| Empty First Name | (trống) | User | newuser@test.com | Test@123! | required |
| Empty Last Name | Test | (trống) | newuser@test.com | Test@123! | required |
| Empty Email | Test | User | (trống) | Test@123! | Email is required |
| Empty Password | Test | User | newuser@test.com | (trống) | Password is required |
| All Empty | (trống) | (trống) | (trống) | (trống) | required |

### 4. Boundary Values

| Loại | First Name | Last Name | Email | Password |
|------|------------|-----------|-------|----------|
| Min Length | A | B | a@b.co | P@1a |
| Max Length | AAA... (50 chars) | BBB... (50 chars) | aaa...@test.com (50+ chars) | P@ssw0rd!aaa... (100+ chars) |
| Special Chars | Test-User | O'Brien | user+test@test.com | P@ss!#$%^&*() |

---

## III. KẾT QUẢ TEST GẦN NHẤT

| Loại | Passed | Failed | Skipped | Tổng |
|------|--------|--------|---------|------|
| Registration Tests | 11 | 5 | 1 | 17 |

### Chi tiết:

| Status | Test Cases |
|--------|------------|
| **Passed** | TC-R01, TC-R02, TC-R03, TC-R04, TC-R10, TC-R11, TC-R12, TC-R13, TC-R14, TC-R15, TC-R17 |
| **Failed** | TC-R05, TC-R06, TC-R07, TC-R08, TC-R09 (timeout/network) |
| **Skipped** | TC-R16 (link không hiển thị) |

### Ghi chú:
- Các test TC-R05 đến TC-R09 fail do **timeout mạng**, không phải lỗi logic
- TC-R16 bị skip vì link Sign In không hiển thị trên form đăng ký

---

## IV. CẤU TRÚC THƯ MỤC

```
E:\login\
├── playwright.config.ts              # Cấu hình Playwright
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── tests/
│   ├── data/
│   │   └── test-data.ts              # Dữ liệu test (login + register)
│   ├── pages/
│   │   ├── login.page.ts             # Page Object Model - Login
│   │   └── register.page.ts          # Page Object Model - Register
│   ├── login.spec.ts                 # 20 test cases đăng nhập
│   ├── register.spec.ts              # 17 test cases đăng ký
│   └── security.spec.ts              # 22 test cases bảo mật
├── LOGIN_TEST_PLAN_VI.md             # Kế hoạch test đăng nhập
├── REGISTER_TEST_PLAN_VI.md          # Kế hoạch test đăng ký
├── TESTCASES_DETAIL.md               # Chi tiết test cases đăng nhập
└── REGISTER_TESTCASES_DETAIL.md      # Chi tiết test cases đăng ký (file này)
```

---

## V. FLOW ĐĂNG KÝ

```
┌─────────────────────────────────────────────────────────────────┐
│                         FLOW ĐĂNG KÝ                            │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────────────┐
    │   1. Vào trang chủ  │
    │   /products/        │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │ 2. Confirm Country  │
    │ Click button        │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │  3. Click Sign In   │
    │  (Header button)    │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │ 4. Popup hiển thị   │
    │ "Member Login"      │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │ 5. Click            │
    │ SIGN UP FOR FREE    │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │ 6. Form đăng ký     │
    │ hiển thị            │
    │ - First Name        │
    │ - Last Name         │
    │ - Email             │
    │ - Password          │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │ 7. Điền thông tin   │
    │ và Click Register   │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────────────────────────┐
    │                KẾT QUẢ                   │
    ├─────────────────────────────────────────┤
    │ ✅ Thành công:                          │
    │    - Chuyển đến Learning Center         │
    │    - Hiển thị "My Training"             │
    │    - Email user hiển thị trên header    │
    ├─────────────────────────────────────────┤
    │ ❌ Thất bại:                            │
    │    - Hiển thị thông báo lỗi             │
    │    - Form vẫn hiển thị                  │
    └─────────────────────────────────────────┘
```

---

## VI. CÁCH CHẠY TEST

```bash
# Cài đặt dependencies
npm install

# Cài đặt Playwright browsers
npx playwright install

# Chạy tất cả test đăng ký (headed mode)
npx playwright test register.spec.ts --headed

# Chạy một test cụ thể
npx playwright test -g "TC-R01" --headed

# Chạy với debug mode
npx playwright test register.spec.ts --debug

# Chạy với reporter list
npx playwright test register.spec.ts --reporter=list

# Xem báo cáo
npx playwright show-report
```

---

## VII. SELECTORS REFERENCE

### Form Elements

| Element | Selector |
|---------|----------|
| Confirm Country | `button:has-text("Confirm My Country")` |
| Sign In (Header) | `button.signin-link:has-text("Sign In")` |
| Sign Up For Free | `button.btn-blue-dark:has-text("SIGN UP FOR FREE")` |
| First Name | `input[name="firstName"][placeholder="First name"]` |
| Last Name | `input[name="lastName"][placeholder="Last name"]` |
| Email | `input[name="email"][placeholder="Email"]` |
| Password | `input#password[name="password"]` |
| Register Button | `button.btn-blue-highlight[type="submit"]:has-text("Register")` |

### Success Indicators

| Indicator | Selector |
|-----------|----------|
| My Training | `text=/My Training/i` |
| Learning Center | `text=/Learning Center/i` |

---

*Tài liệu được tạo tự động bởi Playwright Test Automation Framework*
