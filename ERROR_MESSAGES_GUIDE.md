# HƯỚNG DẪN PHÂN BIỆT CÁC LOẠI THÔNG BÁO LỖI

## Dành cho người mới bắt đầu

---

## 1. VẤN ĐỀ HIỆN TẠI

### Code hiện tại chỉ kiểm tra "có lỗi hay không":

```typescript
// Code cũ - KHÔNG phân biệt được loại lỗi
async isErrorVisible(): Promise<boolean> {
  // Chỉ trả về true/false
  // Không biết là lỗi gì!
  return true; // hoặc false
}
```

### Các loại lỗi cần phân biệt:

| Tình huống | Thông báo lỗi (ví dụ) |
|------------|----------------------|
| Username trống | "Email is required" hoặc "Please enter email" |
| Password trống | "Password is required" hoặc "Please enter password" |
| Username sai | "User not found" hoặc "Invalid email" |
| Password sai | "Incorrect password" hoặc "Wrong password" |
| Cả hai sai | "Invalid credentials" hoặc "Login failed" |

---

## 2. CÁCH PHÂN BIỆT LỖI

### Bước 1: Xác định thông báo lỗi thật trên website

```
┌─────────────────────────────────────────────────────────────┐
│  CÁCH TÌM THÔNG BÁO LỖI THẬT:                              │
│                                                             │
│  1. Mở website: https://training-dev.cams-care.com/        │
│  2. Mở form đăng nhập                                       │
│  3. Thử từng trường hợp:                                    │
│     - Để trống username, nhấn Login → Ghi lại thông báo   │
│     - Để trống password, nhấn Login → Ghi lại thông báo   │
│     - Nhập username sai, nhấn Login → Ghi lại thông báo   │
│     - Nhập password sai, nhấn Login → Ghi lại thông báo   │
│  4. Click chuột phải → Inspect → Xem HTML của thông báo    │
└─────────────────────────────────────────────────────────────┘
```

### Bước 2: Tạo Enum cho các loại lỗi

```typescript
// ============================================================
// ENUM: Định nghĩa các loại lỗi có thể xảy ra
// ============================================================

export enum ErrorType {
  NONE = 'NONE',                           // Không có lỗi
  EMPTY_USERNAME = 'EMPTY_USERNAME',       // Username trống
  EMPTY_PASSWORD = 'EMPTY_PASSWORD',       // Password trống
  EMPTY_BOTH = 'EMPTY_BOTH',               // Cả hai trống
  INVALID_USERNAME = 'INVALID_USERNAME',   // Username không đúng
  INVALID_PASSWORD = 'INVALID_PASSWORD',   // Password không đúng
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS', // Thông tin không đúng
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',       // Tài khoản bị khóa
  UNKNOWN = 'UNKNOWN'                      // Lỗi không xác định
}
```

**Giải thích Enum:**
```typescript
// Enum = Danh sách các giá trị cố định
// Giống như menu nhà hàng - chỉ có những món trong menu

enum ErrorType {
  EMPTY_USERNAME = 'EMPTY_USERNAME',  // Giá trị = 'EMPTY_USERNAME'
  EMPTY_PASSWORD = 'EMPTY_PASSWORD',  // Giá trị = 'EMPTY_PASSWORD'
  // ...
}

// Cách dùng:
const error = ErrorType.EMPTY_USERNAME;  // error = 'EMPTY_USERNAME'
```

### Bước 3: Tạo mapping thông báo lỗi

```typescript
// ============================================================
// MAPPING: Liên kết text lỗi với loại lỗi
// ============================================================

// Mỗi website có thông báo lỗi khác nhau
// Bạn cần thay đổi theo website thật

export const ERROR_MESSAGES = {
  // Key = text xuất hiện trên website (viết thường)
  // Value = loại lỗi tương ứng

  // ----- Lỗi username trống -----
  'email is required': ErrorType.EMPTY_USERNAME,
  'please enter email': ErrorType.EMPTY_USERNAME,
  'username is required': ErrorType.EMPTY_USERNAME,
  'vui lòng nhập email': ErrorType.EMPTY_USERNAME,

  // ----- Lỗi password trống -----
  'password is required': ErrorType.EMPTY_PASSWORD,
  'please enter password': ErrorType.EMPTY_PASSWORD,
  'vui lòng nhập mật khẩu': ErrorType.EMPTY_PASSWORD,

  // ----- Lỗi username sai -----
  'user not found': ErrorType.INVALID_USERNAME,
  'email not found': ErrorType.INVALID_USERNAME,
  'account does not exist': ErrorType.INVALID_USERNAME,

  // ----- Lỗi password sai -----
  'incorrect password': ErrorType.INVALID_PASSWORD,
  'wrong password': ErrorType.INVALID_PASSWORD,
  'password is incorrect': ErrorType.INVALID_PASSWORD,

  // ----- Lỗi chung -----
  'invalid credentials': ErrorType.INVALID_CREDENTIALS,
  'login failed': ErrorType.INVALID_CREDENTIALS,
  'invalid email or password': ErrorType.INVALID_CREDENTIALS,

  // ----- Tài khoản bị khóa -----
  'account locked': ErrorType.ACCOUNT_LOCKED,
  'too many attempts': ErrorType.ACCOUNT_LOCKED,
};
```

**Giải thích Mapping:**
```
MAPPING = Bảng tra cứu

Khi website hiển thị: "Email is required"
                          ↓
Code tìm trong bảng: 'email is required' → ErrorType.EMPTY_USERNAME
                          ↓
Kết quả: Lỗi là EMPTY_USERNAME (username trống)
```

---

## 3. CODE MỚI ĐỂ PHÂN BIỆT LỖI

### 3.1. Hàm getErrorType() - Xác định loại lỗi

```typescript
// ============================================================
// HÀM: Lấy loại lỗi từ thông báo trên màn hình
// ============================================================

async getErrorType(): Promise<ErrorType> {
  // Bước 1: Lấy text thông báo lỗi
  const errorText = await this.getErrorMessage();
  // errorText có thể là: "Email is required", "Invalid password", ...

  // Bước 2: Nếu không có text → Không có lỗi
  if (!errorText) {
    return ErrorType.NONE;
  }

  // Bước 3: Chuyển về chữ thường để so sánh
  const lowerText = errorText.toLowerCase().trim();
  // "Email is Required" → "email is required"

  // Bước 4: Tìm trong bảng mapping
  for (const [message, type] of Object.entries(ERROR_MESSAGES)) {
    // Lặp qua từng cặp [message, type] trong bảng

    if (lowerText.includes(message)) {
      // Nếu text lỗi CHỨA message trong bảng
      return type;  // Trả về loại lỗi tương ứng
    }
  }

  // Bước 5: Không tìm thấy trong bảng → Lỗi không xác định
  return ErrorType.UNKNOWN;
}
```

**Giải thích từng bước:**

```
VÍ DỤ: Website hiển thị "Email is required"

Bước 1: errorText = "Email is required"

Bước 2: errorText có giá trị → tiếp tục

Bước 3: lowerText = "email is required"

Bước 4: Tìm trong bảng:
        - 'email is required' có trong bảng không? → CÓ!
        - Giá trị tương ứng = ErrorType.EMPTY_USERNAME

Bước 5: return ErrorType.EMPTY_USERNAME

KẾT QUẢ: Biết được lỗi là "Username trống"
```

### 3.2. Các hàm kiểm tra cụ thể

```typescript
// ============================================================
// CÁC HÀM KIỂM TRA CỤ THỂ CHO TỪNG LOẠI LỖI
// ============================================================

// Kiểm tra lỗi username trống
async isEmptyUsernameError(): Promise<boolean> {
  const errorType = await this.getErrorType();
  return errorType === ErrorType.EMPTY_USERNAME;
  // true nếu lỗi là username trống
  // false nếu lỗi khác
}

// Kiểm tra lỗi password trống
async isEmptyPasswordError(): Promise<boolean> {
  const errorType = await this.getErrorType();
  return errorType === ErrorType.EMPTY_PASSWORD;
}

// Kiểm tra lỗi username sai
async isInvalidUsernameError(): Promise<boolean> {
  const errorType = await this.getErrorType();
  return errorType === ErrorType.INVALID_USERNAME;
}

// Kiểm tra lỗi password sai
async isInvalidPasswordError(): Promise<boolean> {
  const errorType = await this.getErrorType();
  return errorType === ErrorType.INVALID_PASSWORD;
}

// Kiểm tra lỗi đăng nhập chung
async isInvalidCredentialsError(): Promise<boolean> {
  const errorType = await this.getErrorType();
  return errorType === ErrorType.INVALID_CREDENTIALS;
}
```

**Cách sử dụng trong test:**

```typescript
// TRƯỚC (code cũ):
test('TC-07: Username trống', async () => {
  await loginPage.openLoginForm();
  await loginPage.fillPassword('somepassword');
  await loginPage.clickLoginButton();

  // Chỉ biết có lỗi, không biết lỗi gì
  const hasError = await loginPage.isErrorVisible();
  expect(hasError).toBeTruthy();
});

// SAU (code mới):
test('TC-07: Username trống', async () => {
  await loginPage.openLoginForm();
  await loginPage.fillPassword('somepassword');
  await loginPage.clickLoginButton();

  // Biết chính xác lỗi là "username trống"
  const isEmptyUsername = await loginPage.isEmptyUsernameError();
  expect(isEmptyUsername).toBeTruthy();

  // Hoặc kiểm tra chi tiết hơn:
  const errorType = await loginPage.getErrorType();
  expect(errorType).toBe(ErrorType.EMPTY_USERNAME);
});
```

---

## 4. VÍ DỤ HOÀN CHỈNH

### 4.1. Flow xử lý lỗi

```
┌─────────────────────────────────────────────────────────────┐
│                    FLOW XỬ LÝ LỖI                           │
└─────────────────────────────────────────────────────────────┘

     Người dùng nhập form
              │
              ▼
     ┌─────────────────┐
     │  Click Login    │
     └────────┬────────┘
              │
              ▼
     ┌─────────────────┐      ┌─────────────────┐
     │  Username trống?│──YES──│ Hiện lỗi:       │
     └────────┬────────┘      │ "Email required"│
              │NO             └─────────────────┘
              ▼
     ┌─────────────────┐      ┌─────────────────┐
     │  Password trống?│──YES──│ Hiện lỗi:       │
     └────────┬────────┘      │ "Pass required" │
              │NO             └─────────────────┘
              ▼
     ┌─────────────────┐      ┌─────────────────┐
     │  Username sai?  │──YES──│ Hiện lỗi:       │
     └────────┬────────┘      │ "User not found"│
              │NO             └─────────────────┘
              ▼
     ┌─────────────────┐      ┌─────────────────┐
     │  Password sai?  │──YES──│ Hiện lỗi:       │
     └────────┬────────┘      │ "Wrong password"│
              │NO             └─────────────────┘
              ▼
     ┌─────────────────┐
     │  Đăng nhập OK   │
     │  → Dashboard    │
     └─────────────────┘
```

### 4.2. Code test hoàn chỉnh với phân biệt lỗi

```typescript
// ============================================================
// TEST CASES VỚI PHÂN BIỆT LỖI CHI TIẾT
// ============================================================

test.describe('Error Message Tests', () => {

  test('TC-07: Để trống username - phải hiện lỗi username', async () => {
    await loginPage.openLoginForm();

    // Chỉ điền password, để trống username
    await loginPage.fillPassword('somepassword');
    await loginPage.clickLoginButton();

    // Kiểm tra loại lỗi
    const errorType = await loginPage.getErrorType();

    // PHẢI là lỗi EMPTY_USERNAME, không phải lỗi khác
    expect(errorType).toBe(ErrorType.EMPTY_USERNAME);

    // Hoặc dùng hàm tiện ích:
    const isEmptyUsernameError = await loginPage.isEmptyUsernameError();
    expect(isEmptyUsernameError).toBeTruthy();
  });

  test('TC-08: Để trống password - phải hiện lỗi password', async () => {
    await loginPage.openLoginForm();

    // Chỉ điền username, để trống password
    await loginPage.fillUsername('test@example.com');
    await loginPage.clickLoginButton();

    // Kiểm tra loại lỗi
    const errorType = await loginPage.getErrorType();

    // PHẢI là lỗi EMPTY_PASSWORD
    expect(errorType).toBe(ErrorType.EMPTY_PASSWORD);
  });

  test('TC-04: Username sai - phải hiện lỗi username không tồn tại', async () => {
    await loginPage.login('wronguser@test.com', 'somepassword');

    // Kiểm tra loại lỗi
    const errorType = await loginPage.getErrorType();

    // Có thể là INVALID_USERNAME hoặc INVALID_CREDENTIALS
    // tùy thuộc vào cách website hiển thị
    expect([
      ErrorType.INVALID_USERNAME,
      ErrorType.INVALID_CREDENTIALS
    ]).toContain(errorType);
  });

  test('TC-05: Password sai - phải hiện lỗi password', async () => {
    await loginPage.login('validuser@test.com', 'wrongpassword');

    // Kiểm tra loại lỗi
    const errorType = await loginPage.getErrorType();

    // Có thể là INVALID_PASSWORD hoặc INVALID_CREDENTIALS
    expect([
      ErrorType.INVALID_PASSWORD,
      ErrorType.INVALID_CREDENTIALS
    ]).toContain(errorType);
  });
});
```

---

## 5. LƯU Ý QUAN TRỌNG

### 5.1. Mỗi website có thông báo lỗi khác nhau

```
Website A:  "Email is required"
Website B:  "Please enter your email"
Website C:  "Vui lòng nhập email"

→ Bạn PHẢI kiểm tra thông báo thật trên website của bạn
→ Sau đó cập nhật bảng ERROR_MESSAGES cho phù hợp
```

### 5.2. Một số website không phân biệt lỗi

```
Một số website chỉ hiện:
"Invalid email or password"

cho TẤT CẢ các trường hợp:
- Username sai
- Password sai
- Cả hai sai

→ Đây là thiết kế bảo mật (không cho hacker biết username có tồn tại không)
→ Trong trường hợp này, chỉ có thể phân biệt INVALID_CREDENTIALS
```

### 5.3. Cách tìm selector cho error message

```
1. Mở DevTools (F12)
2. Tạo lỗi (ví dụ: để trống username, click Login)
3. Click chuột phải vào thông báo lỗi → Inspect
4. Xem HTML:

   <div class="error-message text-danger">
     Email is required
   </div>

5. Tạo selector:
   - Class: .error-message hoặc .text-danger
   - Kết hợp: .error-message.text-danger
```

---

## 6. TÓM TẮT

| Bước | Công việc |
|------|-----------|
| 1 | Kiểm tra website thật, ghi lại các thông báo lỗi |
| 2 | Tạo Enum ErrorType với các loại lỗi |
| 3 | Tạo bảng ERROR_MESSAGES mapping text → loại lỗi |
| 4 | Viết hàm getErrorType() để phân tích lỗi |
| 5 | Viết các hàm tiện ích: isEmptyUsernameError(), ... |
| 6 | Sử dụng trong test case để kiểm tra chính xác loại lỗi |

### So sánh code cũ vs code mới:

```typescript
// ========== CODE CŨ ==========
const hasError = await loginPage.isErrorVisible();
expect(hasError).toBeTruthy();
// Vấn đề: Chỉ biết "có lỗi", không biết lỗi gì

// ========== CODE MỚI ==========
const errorType = await loginPage.getErrorType();
expect(errorType).toBe(ErrorType.EMPTY_USERNAME);
// Lợi ích: Biết CHÍNH XÁC là lỗi "username trống"
```

---

*Tài liệu hướng dẫn phân biệt các loại thông báo lỗi trong automation testing*
