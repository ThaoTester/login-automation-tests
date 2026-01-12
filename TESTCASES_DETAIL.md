# DANH SÁCH CHI TIẾT TẤT CẢ TEST CASES

## Thông tin tổng quan

| Thông tin | Giá trị |
|-----------|---------|
| **Tổng số test cases** | 41 |
| **File login.spec.ts** | 19 tests |
| **File security.spec.ts** | 22 tests |
| **Website test** | https://training-dev.cams-care.com/ |
| **Framework** | Playwright + TypeScript |

---

## I. LOGIN FUNCTIONALITY TESTS (login.spec.ts)

### 1. Valid Login Tests - Đăng nhập hợp lệ (2 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-01 | Đăng nhập với thông tin hợp lệ | Kiểm tra đăng nhập thành công với username và password đúng | 1. Vào trang chủ<br>2. Confirm Country<br>3. Click Sign In<br>4. Nhập username hợp lệ<br>5. Nhập password hợp lệ<br>6. Click Login | Dashboard hiển thị, đăng nhập thành công |
| TC-02 | Đăng nhập bằng phím Enter | Kiểm tra đăng nhập bằng phím Enter thay vì click nút Login | 1. Vào trang chủ<br>2. Confirm Country<br>3. Click Sign In<br>4. Nhập username<br>5. Nhập password<br>6. Nhấn Enter | Dashboard hiển thị, đăng nhập thành công |

### 2. Invalid Login Tests - Đăng nhập không hợp lệ (3 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-04 | Đăng nhập với username sai | Kiểm tra đăng nhập với username không tồn tại | 1. Mở form login<br>2. Nhập username sai: wronguser@test.com<br>3. Nhập password đúng<br>4. Click Login | Hiển thị thông báo lỗi |
| TC-05 | Đăng nhập với password sai | Kiểm tra đăng nhập với password không đúng | 1. Mở form login<br>2. Nhập username đúng<br>3. Nhập password sai: WrongPassword123!<br>4. Click Login | Hiển thị thông báo lỗi |
| TC-06 | Đăng nhập với cả username và password sai | Kiểm tra đăng nhập khi cả 2 thông tin đều sai | 1. Mở form login<br>2. Nhập username sai<br>3. Nhập password sai<br>4. Click Login | Hiển thị thông báo lỗi |

### 3. Empty Field Tests - Kiểm tra trường trống (3 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-07 | Đăng nhập với username trống | Kiểm tra validation khi không nhập username | 1. Mở form login<br>2. Để trống username<br>3. Nhập password<br>4. Click Login | Form không submit hoặc hiển thị lỗi validation |
| TC-08 | Đăng nhập với password trống | Kiểm tra validation khi không nhập password | 1. Mở form login<br>2. Nhập username<br>3. Để trống password<br>4. Click Login | Form không submit hoặc hiển thị lỗi validation |
| TC-09 | Đăng nhập với cả hai trường trống | Kiểm tra validation khi không nhập gì | 1. Mở form login<br>2. Để trống cả 2 trường<br>3. Click Login | Form không submit, vẫn ở trang login |

### 4. UI/UX Tests - Kiểm tra giao diện (3 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-10 | Password được ẩn (hiển thị dấu *) | Kiểm tra password field có type="password" | 1. Mở form login<br>2. Nhập password<br>3. Kiểm tra attribute type | Password hiển thị dạng dots/asterisks, type="password" |
| TC-11 | Nút Sign In hiển thị sau khi confirm country | Kiểm tra flow hiển thị nút Sign In | 1. Vào trang chủ<br>2. Confirm Country<br>3. Kiểm tra nút Sign In | Nút Sign In visible và enabled |
| TC-12 | Form login hiển thị sau khi click Sign In | Kiểm tra form login popup | 1. Confirm Country<br>2. Click Sign In<br>3. Kiểm tra form | Username input, Password input, Login button hiển thị |

### 5. Navigation Tests - Kiểm tra điều hướng (3 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-13 | Link Forgot Password hoạt động | Kiểm tra chức năng quên mật khẩu | 1. Mở form login<br>2. Click Forgot Password link | Chuyển đến trang forgot/reset password |
| TC-14 | Đăng nhập thành công chuyển trang | Kiểm tra redirect sau khi đăng nhập | 1. Đăng nhập thành công<br>2. Kiểm tra URL | URL thay đổi, Dashboard hiển thị |
| TC-15 | Đăng xuất quay về trang chính | Kiểm tra logout functionality | 1. Đăng nhập<br>2. Click Logout<br>3. Kiểm tra trang | Quay về trang chủ, nút Sign In hiển thị lại |

### 6. Boundary Value Tests - Kiểm tra giá trị biên (3 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-16 | Đăng nhập với độ dài tối thiểu | Kiểm tra input với độ dài minimum | 1. Nhập username: a@b.co<br>2. Nhập password: P@1a<br>3. Click Login | Xử lý gracefully, không crash |
| TC-17 | Đăng nhập với độ dài tối đa | Kiểm tra input với độ dài maximum | 1. Nhập username 50+ ký tự<br>2. Nhập password 100+ ký tự<br>3. Click Login | Xử lý gracefully, không crash |
| TC-18 | Đăng nhập với ký tự đặc biệt | Kiểm tra xử lý ký tự đặc biệt | 1. Nhập username: user+test@cams-care.com<br>2. Nhập password: P@ss!#$%^&*()<br>3. Click Login | Xử lý gracefully, không crash |

### 7. Session Tests - Kiểm tra phiên đăng nhập (2 tests)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| TC-19 | Session giữ nguyên sau khi refresh | Kiểm tra session persistence | 1. Đăng nhập thành công<br>2. Refresh trang (F5)<br>3. Kiểm tra trạng thái | Vẫn ở trạng thái đăng nhập |
| TC-20 | Không thể truy cập sau khi đăng xuất | Kiểm tra session destruction | 1. Đăng nhập<br>2. Đăng xuất<br>3. Nhấn Back<br>4. Kiểm tra trạng thái | Không thể truy cập trang admin, phải đăng nhập lại |

---

## II. SECURITY TESTS (security.spec.ts)

### 1. SQL Injection Tests (5 tests)

| ID | Tên Test | Mô tả | Payload | Kết quả mong đợi |
|----|----------|-------|---------|------------------|
| SEC-01 | Basic SQL injection | Kiểm tra SQL injection cơ bản | `' OR '1'='1` | Không bị injection, hiển thị lỗi hoặc vẫn ở form login |
| SEC-02 | Comment injection | Kiểm tra SQL comment injection | `admin'--` | Không bị injection, xử lý an toàn |
| SEC-03 | SQL injection with comment | Kiểm tra SQL injection kết hợp comment | `' OR '1'='1'--` | Không bị injection, xử lý an toàn |
| SEC-04 | Destructive SQL | Kiểm tra DROP TABLE injection | `'; DROP TABLE users;--` | Không bị injection, database không bị ảnh hưởng |
| SEC-05 | Union injection | Kiểm tra UNION SELECT injection | `' UNION SELECT * FROM users--` | Không bị injection, xử lý an toàn |

### 2. XSS Attack Tests (5 tests)

| ID | Tên Test | Mô tả | Payload | Kết quả mong đợi |
|----|----------|-------|---------|------------------|
| SEC-06 | Basic XSS | Kiểm tra script tag injection | `<script>alert('XSS')</script>` | Script không được thực thi, input được escape |
| SEC-07 | Image XSS | Kiểm tra XSS qua img tag | `<img src=x onerror=alert('XSS')>` | Không có alert, input được escape |
| SEC-08 | SVG XSS | Kiểm tra XSS qua SVG | `<svg onload=alert('XSS')>` | Không có alert, xử lý an toàn |
| SEC-09 | JavaScript protocol | Kiểm tra javascript: protocol | `javascript:alert('XSS')` | Không có alert, protocol bị block |
| SEC-10 | Body onload XSS | Kiểm tra XSS qua body tag | `<body onload=alert('XSS')>` | Không có alert, xử lý an toàn |

### 3. SQL Injection on Password Field (5 tests)

| ID | Tên Test | Mô tả | Payload | Kết quả mong đợi |
|----|----------|-------|---------|------------------|
| SEC-11 | Password SQL injection - Basic | Kiểm tra SQL injection trên password field | `' OR '1'='1` | Không bị bypass authentication |
| SEC-12 | Password SQL injection - Comment | Kiểm tra comment injection trên password | `admin'--` | Không bị bypass authentication |
| SEC-13 | Password SQL injection - Combined | Kiểm tra SQL injection kết hợp | `' OR '1'='1'--` | Không bị bypass authentication |
| SEC-14 | Password SQL injection - Destructive | Kiểm tra DROP TABLE trên password | `'; DROP TABLE users;--` | Database không bị ảnh hưởng |
| SEC-15 | Password SQL injection - Union | Kiểm tra UNION injection trên password | `' UNION SELECT * FROM users--` | Không bị bypass authentication |

### 4. XSS on Password Field (5 tests)

| ID | Tên Test | Mô tả | Payload | Kết quả mong đợi |
|----|----------|-------|---------|------------------|
| SEC-16 | Password XSS - Basic | Kiểm tra XSS cơ bản trên password | `<script>alert('XSS')</script>` | Script không được thực thi |
| SEC-17 | Password XSS - Image | Kiểm tra XSS qua img trên password | `<img src=x onerror=alert('XSS')>` | Không có alert popup |
| SEC-18 | Password XSS - SVG | Kiểm tra XSS qua SVG trên password | `<svg onload=alert('XSS')>` | Không có alert popup |
| SEC-19 | Password XSS - Protocol | Kiểm tra javascript protocol trên password | `javascript:alert('XSS')` | Protocol bị block |
| SEC-20 | Password XSS - Body | Kiểm tra body onload trên password | `<body onload=alert('XSS')>` | Không có alert popup |

### 5. Brute Force Protection Test (1 test)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| SEC-21 | Brute force protection | Kiểm tra bảo vệ brute force | 1. Thử đăng nhập sai 5 lần liên tiếp<br>2. Kiểm tra response | Tài khoản bị lock hoặc hiển thị CAPTCHA hoặc delay |

### 6. Session Security Test (1 test)

| ID | Tên Test | Mô tả | Bước thực hiện | Kết quả mong đợi |
|----|----------|-------|----------------|------------------|
| SEC-22 | Session không hợp lệ sau logout | Kiểm tra session destruction | 1. Đăng nhập thành công<br>2. Đăng xuất<br>3. Kiểm tra session/cookie | Session bị xóa, không thể truy cập trang admin |

---

## III. TEST DATA SỬ DỤNG

### 1. Valid User (Đăng nhập thành công)

```typescript
username: 'dungnv.php@gmail.com'
password: 'screen1#'
```

### 2. Invalid Credentials (Đăng nhập thất bại)

| Loại | Username | Password |
|------|----------|----------|
| Wrong Username | wronguser@test.com | screen1# |
| Wrong Password | dungnv.php@gmail.com | WrongPassword123! |
| Both Wrong | wrong@test.com | wrongpassword |

### 3. Boundary Values

| Loại | Username | Password |
|------|----------|----------|
| Min Length | a@b.co | P@1a |
| Max Length | aaa...@test.com (50+ chars) | P@ssw0rd!aaa... (100+ chars) |
| Special Chars | user+test@cams-care.com | P@ss!#$%^&*() |

### 4. SQL Injection Payloads

```
' OR '1'='1
admin'--
' OR '1'='1'--
'; DROP TABLE users;--
' UNION SELECT * FROM users--
```

### 5. XSS Payloads

```html
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
javascript:alert('XSS')
<body onload=alert('XSS')>
```

---

## IV. KẾT QUẢ TEST GẦN NHẤT

| Loại | Passed | Failed | Skipped | Tổng |
|------|--------|--------|---------|------|
| Login Tests | 18 | 0 | 1 | 19 |
| Security Tests | - | - | - | 22 |
| **Tổng cộng** | **18+** | **0** | **1** | **41** |

### Test bị skip:
- TC-13: Link Forgot Password (link không hiển thị trên form)

---

## V. CẤU TRÚC THƯ MỤC

```
E:\login\
├── playwright.config.ts          # Cấu hình Playwright
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── tests/
│   ├── data/
│   │   └── test-data.ts          # Dữ liệu test
│   ├── pages/
│   │   └── login.page.ts         # Page Object Model
│   ├── login.spec.ts             # 20 test cases chức năng
│   └── security.spec.ts          # 22 test cases bảo mật
├── LOGIN_TEST_PLAN.md            # Kế hoạch test (English)
├── LOGIN_TEST_PLAN_VI.md         # Kế hoạch test (Tiếng Việt)
└── TESTCASES_DETAIL.md           # Chi tiết test cases (file này)
```

---

## VI. CÁCH CHẠY TEST

```bash
# Cài đặt dependencies
npm install

# Cài đặt Playwright browsers
npx playwright install

# Chạy tất cả tests (headed mode)
npx playwright test --headed

# Chạy chỉ login tests
npx playwright test login.spec.ts --headed

# Chạy chỉ security tests
npx playwright test security.spec.ts --headed

# Chạy với debug mode
npx playwright test --debug

# Xem báo cáo
npx playwright show-report
```

---

*Tài liệu được tạo tự động bởi Playwright Test Automation Framework*
