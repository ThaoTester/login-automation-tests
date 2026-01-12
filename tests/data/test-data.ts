// ============================================================
// TEST DATA FOR LOGIN AUTOMATION
// ============================================================
// TODO: Update these values with your actual test credentials
// ============================================================

// ============================================================
// ENUM: Các loại lỗi có thể xảy ra khi đăng nhập
// ============================================================
export enum ErrorType {
  NONE = 'NONE',                           // Không có lỗi
  EMPTY_USERNAME = 'EMPTY_USERNAME',       // Username trống
  EMPTY_PASSWORD = 'EMPTY_PASSWORD',       // Password trống
  EMPTY_BOTH = 'EMPTY_BOTH',               // Cả hai trống
  INVALID_USERNAME = 'INVALID_USERNAME',   // Username không đúng
  INVALID_PASSWORD = 'INVALID_PASSWORD',   // Password không đúng
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS', // Thông tin không đúng (chung)
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',       // Tài khoản bị khóa
  UNKNOWN = 'UNKNOWN'                      // Lỗi không xác định
}

// ============================================================
// MAPPING: Liên kết text lỗi với loại lỗi
// TODO: Cập nhật theo thông báo lỗi thật trên website của bạn
// ============================================================
export const ERROR_MESSAGES: Record<string, ErrorType> = {
  // ----- Lỗi username trống -----
  'email is required': ErrorType.EMPTY_USERNAME,
  'please enter email': ErrorType.EMPTY_USERNAME,
  'username is required': ErrorType.EMPTY_USERNAME,
  'please enter username': ErrorType.EMPTY_USERNAME,
  'email or username is required': ErrorType.EMPTY_USERNAME,

  // ----- Lỗi password trống -----
  'password is required': ErrorType.EMPTY_PASSWORD,
  'please enter password': ErrorType.EMPTY_PASSWORD,
  'please enter your password': ErrorType.EMPTY_PASSWORD,

  // ----- Lỗi username sai -----
  'user not found': ErrorType.INVALID_USERNAME,
  'email not found': ErrorType.INVALID_USERNAME,
  'account does not exist': ErrorType.INVALID_USERNAME,
  'no account found': ErrorType.INVALID_USERNAME,

  // ----- Lỗi password sai -----
  'incorrect password': ErrorType.INVALID_PASSWORD,
  'wrong password': ErrorType.INVALID_PASSWORD,
  'password is incorrect': ErrorType.INVALID_PASSWORD,

  // ----- Lỗi chung (không phân biệt username hay password) -----
  'invalid credentials': ErrorType.INVALID_CREDENTIALS,
  'login failed': ErrorType.INVALID_CREDENTIALS,
  'invalid email or password': ErrorType.INVALID_CREDENTIALS,
  'invalid username or password': ErrorType.INVALID_CREDENTIALS,
  'authentication failed': ErrorType.INVALID_CREDENTIALS,
  'incorrect email or password': ErrorType.INVALID_CREDENTIALS,

  // ----- Tài khoản bị khóa -----
  'account locked': ErrorType.ACCOUNT_LOCKED,
  'account has been locked': ErrorType.ACCOUNT_LOCKED,
  'too many attempts': ErrorType.ACCOUNT_LOCKED,
  'too many failed attempts': ErrorType.ACCOUNT_LOCKED,
};

// Valid user credentials for successful login
export const validUser = {
  username: 'dungnv.php@gmail.com',
  password: 'screen1#',
};

// Alternative valid users (different roles)
export const validUsers = {
  admin: {
    username: 'admin@cams-care.com',
    password: 'Admin@123!',
    role: 'Admin'
  },
  manager: {
    username: 'manager@cams-care.com',
    password: 'Manager@456!',
    role: 'Manager'
  },
  user: {
    username: 'user@cams-care.com',
    password: 'User@789!',
    role: 'User'
  }
};

// Invalid credentials for negative testing
export const invalidCredentials = {
  wrongUsername: {
    username: 'wronguser@test.com',
    password: 'screen1#',
    expectedError: 'User email does not exist!'
  },
  wrongPassword: {
    username: 'dungnv.php@gmail.com',
    password: 'WrongPassword123!',
    expectedError: 'Email or password is incorrect!'
  },
  bothWrong: {
    username: 'wrong@test.com',
    password: 'wrongpassword',
    expectedError: 'User email does not exist!'
  },
  invalidEmailFormat: {
    username: 'invalid-email',
    password: 'somepassword',
    expectedError: 'Not a valid email'
  }
};

// Empty field test data
export const emptyFields = {
  emptyUsername: {
    username: '',
    password: 'Admin@123!',
    expectedError: 'Email is required'
  },
  emptyPassword: {
    username: 'admin@cams-care.com',
    password: '',
    expectedError: 'Password is required'
  },
  bothEmpty: {
    username: '',
    password: '',
    expectedError: 'required'
  }
};

// SQL Injection payloads
export const sqlInjection = [
  { payload: "' OR '1'='1", description: 'Basic SQL injection' },
  { payload: "admin'--", description: 'Comment injection' },
  { payload: "' OR '1'='1'--", description: 'SQL injection with comment' },
  { payload: "'; DROP TABLE users;--", description: 'Destructive SQL' },
  { payload: "' UNION SELECT * FROM users--", description: 'Union injection' }
];

// XSS Attack payloads
export const xssPayloads = [
  { payload: "<script>alert('XSS')</script>", description: 'Basic XSS' },
  { payload: "<img src=x onerror=alert('XSS')>", description: 'Image XSS' },
  { payload: "<svg onload=alert('XSS')>", description: 'SVG XSS' },
  { payload: "javascript:alert('XSS')", description: 'JavaScript protocol' },
  { payload: "<body onload=alert('XSS')>", description: 'Body onload XSS' }
];

// Boundary value test data
export const boundaryValues = {
  minLength: {
    username: 'a@b.co',
    password: 'P@1a'
  },
  maxLength: {
    username: 'a'.repeat(50) + '@test.com',
    password: 'P@ssw0rd!' + 'a'.repeat(100)
  },
  specialChars: {
    username: 'user+test@cams-care.com',
    password: 'P@ss!#$%^&*()'
  }
};

// Brute force test data
export const bruteForce = {
  username: 'brutetest@cams-care.com',
  wrongPasswords: ['wrong1', 'wrong2', 'wrong3', 'wrong4', 'wrong5'],
  correctPassword: 'Correct@123!',
  maxAttempts: 5
};
