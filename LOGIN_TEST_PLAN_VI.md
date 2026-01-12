# Kế Hoạch Kiểm Thử Đăng Nhập - Tự Động Hóa Playwright

## Tổng Quan

Tài liệu này mô tả quy trình hoàn chỉnh để tạo các test case tự động cho chức năng đăng nhập sử dụng Playwright.

---

## Mục Lục

1. [Các Bước Chuẩn Bị](#các-bước-chuẩn-bị)
2. [Tại Sao Cần Mỗi Bước](#tại-sao-cần-mỗi-bước)
3. [Quy Trình Hoàn Thành Test Case](#quy-trình-hoàn-thành-test-case)
4. [Danh Sách Kiểm Tra Test Case](#danh-sách-kiểm-tra-test-case)

---

## Các Bước Chuẩn Bị

### Bước 1: Phân Tích Trang Đăng Nhập

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 1.1 | Truy cập URL trang đăng nhập | [ ] |
| 1.2 | Xác định tất cả các thành phần form | [ ] |
| 1.3 | Thu thập selector của các phần tử (ID, class, name) | [ ] |
| 1.4 | Ghi chú các quy tắc validation | [ ] |
| 1.5 | Liệt kê tất cả thông báo lỗi | [ ] |

### Bước 2: Thu Thập Dữ Liệu Test

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 2.1 | Lấy thông tin đăng nhập hợp lệ | [ ] |
| 2.2 | Định nghĩa các trường hợp đăng nhập không hợp lệ | [ ] |
| 2.3 | Xác định giá trị biên | [ ] |
| 2.4 | Chuẩn bị dữ liệu test bảo mật | [ ] |

### Bước 3: Thiết Lập Dự Án

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 3.1 | Khởi tạo dự án Node.js | [ ] |
| 3.2 | Cài đặt Playwright | [ ] |
| 3.3 | Cấu hình playwright.config.ts | [ ] |
| 3.4 | Tạo cấu trúc thư mục | [ ] |

### Bước 4: Viết Code Test

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 4.1 | Tạo Page Object Model | [ ] |
| 4.2 | Tạo file dữ liệu test | [ ] |
| 4.3 | Viết các test specification | [ ] |
| 4.4 | Thêm các assertion | [ ] |

### Bước 5: Thực Thi & Báo Cáo

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 5.1 | Chạy test trên máy local | [ ] |
| 5.2 | Debug các test thất bại | [ ] |
| 5.3 | Tạo báo cáo test | [ ] |
| 5.4 | Sửa selector nếu cần | [ ] |

---

## Tại Sao Cần Mỗi Bước

### Tại sao Bước 1: Phân Tích Trang Đăng Nhập?

| Lý do | Giải thích |
|-------|------------|
| **Selector Chính Xác** | Không có selector đúng, test không thể tìm thấy phần tử và sẽ thất bại |
| **Hiểu Hành Vi** | Biết cách form validate, submit và phản hồi |
| **Phát Hiện Edge Case** | Khám phá các validation ẩn, giới hạn ký tự, xử lý đặc biệt |
| **Vẽ Hành Trình Người Dùng** | Hiểu luồng redirect sau khi đăng nhập thành công/thất bại |

### Tại sao Bước 2: Thu Thập Dữ Liệu Test?

| Lý do | Giải thích |
|-------|------------|
| **Test Thực Tế** | Thông tin đăng nhập hợp lệ đảm bảo test case positive hoạt động |
| **Độ Phủ** | Các loại dữ liệu khác nhau bao phủ nhiều kịch bản |
| **Dễ Bảo Trì** | Dữ liệu tập trung dễ cập nhật |
| **Test Bảo Mật** | Dữ liệu chuẩn bị sẵn để test các lỗ hổng |

### Tại sao Bước 3: Thiết Lập Dự Án?

| Lý do | Giải thích |
|-------|------------|
| **Nhất Quán** | Môi trường giống nhau cho tất cả thành viên |
| **Dependencies** | Playwright và browser được cài đặt đúng cách |
| **Cấu Hình** | Base URL, timeout, retry được định nghĩa một lần |
| **Tổ Chức** | Cấu trúc thư mục rõ ràng cải thiện việc bảo trì |

### Tại sao Bước 4: Viết Code Test?

| Lý do | Giải thích |
|-------|------------|
| **Page Object Model** | Method tái sử dụng, một nơi duy nhất để cập nhật selector |
| **Tách Dữ Liệu Test** | Dễ sửa đổi mà không thay đổi logic test |
| **Nhóm Test** | Tổ chức theo chức năng để dễ điều hướng |
| **Assertion Rõ Ràng** | Xác minh kết quả mong đợi vs thực tế |

### Tại sao Bước 5: Thực Thi & Báo Cáo?

| Lý do | Giải thích |
|-------|------------|
| **Xác Nhận** | Đảm bảo test hoạt động như mong đợi |
| **Debugging** | Phát hiện và sửa lỗi sớm |
| **Tài Liệu** | Báo cáo cung cấp bằng chứng kiểm thử |
| **Cải Tiến Liên Tục** | Tinh chỉnh test dựa trên kết quả |

---

## Quy Trình Hoàn Thành Test Case

```
┌─────────────────────────────────────────────────────────────────┐
│                    QUY TRÌNH HOÀN CHỈNH                         │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   BẮT ĐẦU    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│  GIAI ĐOẠN 1: KHÁM PHÁ               │
│  ┌────────────────────────────────┐  │
│  │ 1. Mở trang đăng nhập          │  │
│  │ 2. Click chuột phải > Inspect  │  │
│  │ 3. Tìm các phần tử input       │  │
│  │ 4. Sao chép selector           │  │
│  │ 5. Test selector trong console │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  GIAI ĐOẠN 2: TÀI LIỆU               │
│  ┌────────────────────────────────┐  │
│  │ 1. Ghi chép tất cả selector    │  │
│  │ 2. Liệt kê quy tắc validation  │  │
│  │ 3. Ghi lại thông báo lỗi       │  │
│  │ 4. Định nghĩa kịch bản test    │  │
│  │ 5. Chuẩn bị dữ liệu test       │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  GIAI ĐOẠN 3: THIẾT LẬP              │
│  ┌────────────────────────────────┐  │
│  │ 1. npm init                    │  │
│  │ 2. npm install playwright      │  │
│  │ 3. npx playwright install      │  │
│  │ 4. Tạo cấu trúc thư mục        │  │
│  │ 5. Cấu hình playwright.config  │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  GIAI ĐOẠN 4: VIẾT CODE              │
│  ┌────────────────────────────────┐  │
│  │ 1. Tạo login.page.ts (POM)     │  │
│  │ 2. Tạo test-data.ts            │  │
│  │ 3. Tạo login.spec.ts           │  │
│  │ 4. Viết các test case          │  │
│  │ 5. Thêm assertion              │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  GIAI ĐOẠN 5: THỰC THI               │
│  ┌────────────────────────────────┐  │
│  │ 1. Chạy: npx playwright test   │  │
│  │ 2. Kiểm tra kết quả            │  │
│  │ 3. Debug các lỗi               │  │
│  │ 4. Cập nhật selector nếu cần   │  │
│  │ 5. Chạy lại đến khi pass       │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  GIAI ĐOẠN 6: BÁO CÁO                │
│  ┌────────────────────────────────┐  │
│  │ 1. Tạo báo cáo HTML            │  │
│  │ 2. Xem screenshot/video        │  │
│  │ 3. Ghi nhận độ phủ test        │  │
│  │ 4. Chia sẻ kết quả             │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
       ┌───────────────┐
       │   KẾT THÚC    │
       └───────────────┘
```

---

## Chi Tiết Các Bước Quy Trình

### Giai Đoạn 1: Khám Phá (Thu Thập Thông Tin Trang Đăng Nhập)

**Mục tiêu:** Hiểu cấu trúc trang đăng nhập

```
Các bước sử dụng DevTools trình duyệt:
─────────────────────────────────────────
1. Truy cập: https://training-dev.cams-care.com/products/
2. Nhấn F12 (Mở DevTools)
3. Click tab "Elements"
4. Sử dụng công cụ chọn selector (Ctrl+Shift+C)
5. Click vào từng phần tử để tìm selector
```

**Các phần tử cần tìm:**

| Phần tử | Cách tìm | Ví dụ Selector |
|---------|----------|----------------|
| Ô nhập Username | Click vào trường email/username | `#email` hoặc `input[name="email"]` |
| Ô nhập Password | Click vào trường password | `#password` hoặc `input[type="password"]` |
| Nút Đăng nhập | Click vào nút submit | `button[type="submit"]` |
| Thông báo lỗi | Submit dữ liệu sai, inspect lỗi | `.error-message` |
| Ghi nhớ đăng nhập | Click vào checkbox | `#remember-me` |
| Quên mật khẩu | Click vào link | `a:has-text("Forgot")` |

**Kiểm tra Selector trong Console:**
```javascript
// Trong console trình duyệt (F12 > Console)
document.querySelector('#email')
document.querySelector('input[name="password"]')
document.querySelector('button[type="submit"]')
```

---

### Giai Đoạn 2: Tài Liệu

**Tạo Bản Đồ Selector:**

```markdown
## Selector Trang Đăng Nhập

| Phần tử | Selector | Loại |
|---------|----------|------|
| Username | _________ | input |
| Password | _________ | input |
| Nút Đăng nhập | _________ | button |
| Thông báo lỗi | _________ | div |
| Ghi nhớ | _________ | checkbox |
| Quên mật khẩu | _________ | link |
```

**Định Nghĩa Kịch Bản Test:**

```markdown
## Kịch Bản Test

| ID | Kịch bản | Đầu vào | Kết quả mong đợi |
|----|----------|---------|------------------|
| TC-01 | Đăng nhập hợp lệ | user/pass đúng | Chuyển đến dashboard |
| TC-02 | Mật khẩu sai | user đúng, pass sai | Thông báo lỗi |
| TC-03 | Username sai | user sai, pass bất kỳ | Thông báo lỗi |
| TC-04 | Username trống | trống, pass đúng | Lỗi validation |
| TC-05 | Password trống | user đúng, trống | Lỗi validation |
| TC-06 | Cả hai trống | trống, trống | Lỗi validation |
```

---

### Giai Đoạn 3: Thiết Lập Dự Án

```bash
# 1. Tạo thư mục dự án
mkdir login-tests
cd login-tests

# 2. Khởi tạo dự án
npm init -y

# 3. Cài đặt Playwright
npm install -D @playwright/test

# 4. Cài đặt trình duyệt
npx playwright install chromium

# 5. Tạo cấu trúc thư mục
mkdir -p tests/pages tests/data
```

**Cấu Trúc Thư Mục:**
```
login-tests/
├── package.json
├── playwright.config.ts
└── tests/
    ├── pages/
    │   └── login.page.ts      # Page Object Model
    ├── data/
    │   └── test-data.ts       # Dữ liệu đăng nhập test
    └── login.spec.ts          # Các test case
```

---

### Giai Đoạn 4: Triển Khai Code

**4.1 - playwright.config.ts**
```typescript
// Một trình duyệt, chế độ headed để debug
export default {
  testDir: './tests',
  use: {
    baseURL: 'https://your-login-url.com',
    headless: false,  // Hiển thị trình duyệt
  },
  projects: [
    { name: 'chromium' }  // Chỉ Chrome
  ]
}
```

**4.2 - login.page.ts (Page Object Model)**
```typescript
// Tập trung tất cả selector và action
class LoginPage {
  // Selector - CẬP NHẬT CÁC GIÁ TRỊ NÀY
  usernameInput = '#email';
  passwordInput = '#password';
  loginButton = 'button[type="submit"]';

  // Các phương thức
  async login(username, password) { }
  async getErrorMessage() { }
}
```

**4.3 - test-data.ts**
```typescript
// Tất cả dữ liệu test ở một nơi
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
// Các test case
test('TC-01: Đăng nhập hợp lệ', async ({ page }) => {
  // Chuẩn bị
  await loginPage.goto();

  // Thực hiện
  await loginPage.login(validUser.username, validUser.password);

  // Kiểm tra
  await expect(page).toHaveURL('/dashboard');
});
```

---

### Giai Đoạn 5: Thực Thi Test

```bash
# Chạy tất cả test (headed - hiển thị trình duyệt)
npx playwright test --headed --project=chromium

# Chạy một test
npx playwright test -g "TC-01" --headed

# Chế độ debug
npx playwright test --debug

# Tạo báo cáo
npx playwright show-report
```

---

## Danh Sách Kiểm Tra Test Case

### Test Chức Năng

- [ ] TC-01: Đăng nhập với thông tin hợp lệ
- [ ] TC-02: Đăng nhập với mật khẩu sai
- [ ] TC-03: Đăng nhập với username sai
- [ ] TC-04: Đăng nhập với username trống
- [ ] TC-05: Đăng nhập với password trống
- [ ] TC-06: Đăng nhập với cả hai trường trống
- [ ] TC-07: Đăng nhập bằng phím Enter
- [ ] TC-08: Checkbox ghi nhớ đăng nhập
- [ ] TC-09: Link quên mật khẩu
- [ ] TC-10: Chức năng đăng xuất

### Test UI/UX

- [ ] TC-11: Mật khẩu được ẩn (dạng *)
- [ ] TC-12: Thứ tự điều hướng Tab
- [ ] TC-13: Hiển thị thông báo lỗi
- [ ] TC-14: Hiển thị loading
- [ ] TC-15: Thiết kế responsive

### Test Bảo Mật

- [ ] TC-16: Phòng chống SQL injection
- [ ] TC-17: Phòng chống XSS
- [ ] TC-18: Bảo vệ brute force
- [ ] TC-19: Bắt buộc HTTPS
- [ ] TC-20: Bảo mật session

---

## Các Bước Tiếp Theo

1. **Điền các selector** từ trang đăng nhập thực tế của bạn
2. **Cập nhật dữ liệu test** với thông tin đăng nhập test thật
3. **Chạy test** và sửa các case thất bại
4. **Thêm test** khi cần thiết

---

## Tham Khảo Nhanh Các Lệnh

```bash
# Cài đặt
npm install
npx playwright install chromium

# Chạy test
npx playwright test --headed --project=chromium

# Debug
npx playwright test --debug

# Xem báo cáo
npx playwright show-report
```

---

## Bảng Thuật Ngữ Anh - Việt

| Tiếng Anh | Tiếng Việt |
|-----------|------------|
| Test Case | Trường hợp kiểm thử |
| Test Data | Dữ liệu kiểm thử |
| Selector | Bộ chọn phần tử |
| Assertion | Xác nhận kết quả |
| Page Object Model | Mô hình đối tượng trang |
| Validation | Xác thực dữ liệu |
| Error Message | Thông báo lỗi |
| Login | Đăng nhập |
| Logout | Đăng xuất |
| Password | Mật khẩu |
| Username | Tên đăng nhập |
| Remember Me | Ghi nhớ đăng nhập |
| Forgot Password | Quên mật khẩu |
| Submit | Gửi/Xác nhận |
| Redirect | Chuyển hướng |
| Session | Phiên làm việc |
| Security | Bảo mật |
| Brute Force | Tấn công dò mật khẩu |
| SQL Injection | Tấn công chèn SQL |
| XSS | Tấn công chèn script |
| Boundary Value | Giá trị biên |
| Edge Case | Trường hợp biên |
| Debug | Gỡ lỗi |
| Report | Báo cáo |
| Headed | Hiển thị trình duyệt |
| Headless | Không hiển thị trình duyệt |

---

*Tài liệu được tạo cho Dự Án Tự Động Hóa Kiểm Thử Đăng Nhập*
