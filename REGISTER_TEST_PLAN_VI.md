# Kế Hoạch Kiểm Thử Đăng Ký - Tự Động Hóa Playwright

## Tổng Quan

Tài liệu này mô tả quy trình hoàn chỉnh để tạo các test case tự động cho chức năng đăng ký sử dụng Playwright.

---

## Mục Lục

1. [Các Bước Chuẩn Bị](#các-bước-chuẩn-bị)
2. [Tại Sao Cần Mỗi Bước](#tại-sao-cần-mỗi-bước)
3. [Quy Trình Hoàn Thành Test Case](#quy-trình-hoàn-thành-test-case)
4. [Danh Sách Kiểm Tra Test Case](#danh-sách-kiểm-tra-test-case)

---

## Các Bước Chuẩn Bị

### Bước 1: Phân Tích Trang Đăng Ký

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 1.1 | Truy cập URL trang đăng ký | [x] |
| 1.2 | Xác định tất cả các thành phần form | [x] |
| 1.3 | Thu thập selector của các phần tử (ID, class, name) | [x] |
| 1.4 | Ghi chú các quy tắc validation | [x] |
| 1.5 | Liệt kê tất cả thông báo lỗi | [x] |

### Bước 2: Thu Thập Dữ Liệu Test

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 2.1 | Định nghĩa thông tin đăng ký hợp lệ | [x] |
| 2.2 | Định nghĩa các trường hợp đăng ký không hợp lệ | [x] |
| 2.3 | Xác định giá trị biên | [x] |
| 2.4 | Chuẩn bị dữ liệu test bảo mật | [x] |

### Bước 3: Thiết Lập Dự Án

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 3.1 | Sử dụng dự án Node.js hiện có | [x] |
| 3.2 | Playwright đã được cài đặt | [x] |
| 3.3 | Cấu hình playwright.config.ts | [x] |
| 3.4 | Cấu trúc thư mục đã sẵn sàng | [x] |

### Bước 4: Viết Code Test

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 4.1 | Tạo Page Object Model (register.page.ts) | [x] |
| 4.2 | Cập nhật file dữ liệu test (test-data.ts) | [x] |
| 4.3 | Viết các test specification (register.spec.ts) | [x] |
| 4.4 | Thêm các assertion | [x] |

### Bước 5: Thực Thi & Báo Cáo

| Nhiệm vụ | Mô tả | Trạng thái |
|----------|-------|------------|
| 5.1 | Chạy test trên máy local | [x] |
| 5.2 | Debug các test thất bại | [x] |
| 5.3 | Tạo báo cáo test | [x] |
| 5.4 | Sửa selector nếu cần | [x] |

---

## Tại Sao Cần Mỗi Bước

### Tại sao Bước 1: Phân Tích Trang Đăng Ký?

| Lý do | Giải thích |
|-------|------------|
| **Selector Chính Xác** | Không có selector đúng, test không thể tìm thấy phần tử và sẽ thất bại |
| **Hiểu Hành Vi** | Biết cách form validate, submit và phản hồi |
| **Phát Hiện Edge Case** | Khám phá các validation ẩn, giới hạn ký tự, xử lý đặc biệt |
| **Vẽ Hành Trình Người Dùng** | Hiểu luồng redirect sau khi đăng ký thành công/thất bại |

### Tại sao Bước 2: Thu Thập Dữ Liệu Test?

| Lý do | Giải thích |
|-------|------------|
| **Test Thực Tế** | Thông tin đăng ký hợp lệ đảm bảo test case positive hoạt động |
| **Độ Phủ** | Các loại dữ liệu khác nhau bao phủ nhiều kịch bản |
| **Dễ Bảo Trì** | Dữ liệu tập trung dễ cập nhật |
| **Test Bảo Mật** | Dữ liệu chuẩn bị sẵn để test các lỗ hổng |

---

## Quy Trình Hoàn Thành Test Case

```
┌─────────────────────────────────────────────────────────────────┐
│                    QUY TRÌNH ĐĂNG KÝ                            │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   BẮT ĐẦU    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│  BƯỚC 1: VÀO TRANG CHỦ               │
│  https://training-dev.cams-care.com/ │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  BƯỚC 2: CONFIRM MY COUNTRY          │
│  Click nút "Confirm My Country"      │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  BƯỚC 3: CLICK SIGN IN               │
│  Click nút "Sign In" trên header     │
│  → Popup "Member Login" hiển thị     │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  BƯỚC 4: CLICK SIGN UP FOR FREE      │
│  Click nút "SIGN UP FOR FREE"        │
│  → Form đăng ký hiển thị             │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  BƯỚC 5: ĐIỀN FORM ĐĂNG KÝ           │
│  - First Name                        │
│  - Last Name                         │
│  - Email                             │
│  - Password                          │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  BƯỚC 6: CLICK REGISTER              │
│  Submit form đăng ký                 │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  KẾT QUẢ:                            │
│  - Thành công: Chuyển đến Learning   │
│    Center với "My Training"          │
│  - Thất bại: Hiển thị thông báo lỗi  │
└──────────────────────────────────────┘
```

---

## Chi Tiết Các Selectors

### Selectors Form Đăng Ký

| Phần tử | Selector | Loại |
|---------|----------|------|
| Confirm Country Button | `button:has-text("Confirm My Country")` | button |
| Sign In Button (Header) | `button.signin-link:has-text("Sign In")` | button |
| Sign Up For Free Button | `button.btn-blue-dark:has-text("SIGN UP FOR FREE")` | button |
| First Name Input | `input[name="firstName"][placeholder="First name"]` | input |
| Last Name Input | `input[name="lastName"][placeholder="Last name"]` | input |
| Email Input | `input[name="email"][placeholder="Email"]` | input |
| Password Input | `input#password[name="password"]` | input |
| Register Button | `button.btn-blue-highlight[type="submit"]:has-text("Register")` | button |

### HTML Elements Thực Tế

```html
<!-- Confirm Country Button -->
<button class="btn btn-primary text-uppercase btn-blue-highlight btn-round-9 btn-h-50" type="submit">
  Confirm My Country
</button>

<!-- Sign In Button -->
<button class="btn btn-link btn-link signin-link" type="button">Sign In</button>

<!-- Sign Up For Free Button -->
<button class="btn btn-primary btn btn-blue-dark" type="button">SIGN UP FOR FREE</button>

<!-- First Name Input -->
<input class="form-control form-control input-custom" type="text" placeholder="First name"
       name="firstName" autocomplete="off" value="">

<!-- Last Name Input -->
<input class="form-control form-control input-custom" type="text" placeholder="Last name"
       name="lastName" autocomplete="off" value="">

<!-- Email Input -->
<input class="form-control form-control input-custom" type="email" placeholder="Email"
       name="email" autocomplete="off" value="">

<!-- Password Input -->
<input class="form-control form-control input-custom" id="password" type="password"
       name="password" placeholder="Password" autocomplete="off" value="">

<!-- Register Button -->
<button class="btn btn-blue-highlight" type="submit">Register</button>
```

---

## Danh Sách Kiểm Tra Test Case

### Test Chức Năng - Đăng Ký Hợp Lệ

- [x] TC-R01: Đăng ký với thông tin hợp lệ
- [x] TC-R02: Đăng ký bằng phím Enter

### Test Chức Năng - Đăng Ký Không Hợp Lệ

- [x] TC-R03: Đăng ký với email không hợp lệ
- [x] TC-R04: Đăng ký với email đã tồn tại

### Test Trường Trống

- [x] TC-R05: Đăng ký với First Name trống
- [x] TC-R06: Đăng ký với Last Name trống
- [x] TC-R07: Đăng ký với Email trống
- [x] TC-R08: Đăng ký với Password trống
- [x] TC-R09: Đăng ký với tất cả trường trống

### Test UI/UX

- [x] TC-R10: Password được ẩn (hiển thị dấu *)
- [x] TC-R11: Nút Sign In hiển thị sau khi confirm country
- [x] TC-R12: Form đăng ký hiển thị sau khi click Sign Up

### Test Giá Trị Biên

- [x] TC-R13: Đăng ký với độ dài tối thiểu
- [x] TC-R14: Đăng ký với độ dài tối đa
- [x] TC-R15: Đăng ký với ký tự đặc biệt

### Test Điều Hướng

- [ ] TC-R16: Link Sign In hoạt động (skipped)
- [x] TC-R17: Đăng ký thành công chuyển trang

---

## Các Bước Tiếp Theo

1. **Chạy test** để xác nhận tất cả pass
2. **Thêm test bảo mật** cho form đăng ký (SQL injection, XSS)
3. **Cập nhật selectors** nếu trang web thay đổi
4. **Tích hợp CI/CD** để chạy test tự động

---

## Tham Khảo Nhanh Các Lệnh

```bash
# Chạy tất cả test đăng ký
npx playwright test register.spec.ts --headed

# Chạy một test cụ thể
npx playwright test -g "TC-R01" --headed

# Chạy với debug mode
npx playwright test register.spec.ts --debug

# Xem báo cáo
npx playwright show-report
```

---

*Tài liệu được tạo cho Dự Án Tự Động Hóa Kiểm Thử Đăng Ký*
