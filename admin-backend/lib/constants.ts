// Application constants
export const APP_CONSTANTS = {
  // User roles
  USER_ROLES: {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    EDITOR: "editor",
    VIEWER: "viewer",
  } as const,

  // News status
  NEWS_STATUS: {
    DRAFT: "draft",
    PUBLISHED: "published",
    ARCHIVED: "archived",
  } as const,

  // News categories
  NEWS_CATEGORIES: {
    KEAGAMAAN: "Keagamaan",
    SOSIAL: "Sosial",
    PENDIDIKAN: "Pendidikan",
    PENGUMUMAN: "Pengumuman",
    LAYANAN: "Layanan",
  } as const,

  // File types
  FILE_TYPES: {
    IMAGE: "image",
    DOCUMENT: "document",
    VIDEO: "video",
    AUDIO: "audio",
  } as const,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    DEFAULT_PAGE: 1,
  } as const,

  // Cache keys
  CACHE_KEYS: {
    NEWS_LIST: "news:list",
    MENU_LIST: "menu:list",
    USER_LIST: "user:list",
    SITE_SETTINGS: "site:settings",
  } as const,

  // API response codes
  API_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    VALIDATION_ERROR: 422,
    INTERNAL_ERROR: 500,
  } as const,

  // Date formats
  DATE_FORMATS: {
    ISO: "YYYY-MM-DDTHH:mm:ss.SSSZ",
    DATE_ONLY: "YYYY-MM-DD",
    DISPLAY: "DD/MM/YYYY",
    DISPLAY_WITH_TIME: "DD/MM/YYYY HH:mm",
    INDONESIAN: "DD MMMM YYYY",
  } as const,

  // Validation rules
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 8,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 50,
    TITLE_MAX_LENGTH: 200,
    EXCERPT_MAX_LENGTH: 500,
    CONTENT_MAX_LENGTH: 50000,
    EMAIL_MAX_LENGTH: 255,
    PHONE_PATTERN: /^(\+62|62|0)[0-9]{9,13}$/,
    URL_PATTERN: /^https?:\/\/.+/,
  } as const,

  // Menu types
  MENU_TYPES: {
    INTERNAL: "internal",
    EXTERNAL: "external",
    DROPDOWN: "dropdown",
  } as const,

  // Upload limits
  UPLOAD_LIMITS: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_FILES_PER_UPLOAD: 10,
    ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    ALLOWED_DOCUMENT_TYPES: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
  } as const,

  // Error messages
  ERROR_MESSAGES: {
    UNAUTHORIZED: "Akses tidak diizinkan",
    FORBIDDEN: "Anda tidak memiliki izin untuk melakukan aksi ini",
    NOT_FOUND: "Data tidak ditemukan",
    VALIDATION_ERROR: "Data yang dikirim tidak valid",
    INTERNAL_ERROR: "Terjadi kesalahan internal server",
    DUPLICATE_ENTRY: "Data sudah ada",
    INVALID_CREDENTIALS: "Email atau password salah",
    TOKEN_EXPIRED: "Token sudah kadaluarsa",
    FILE_TOO_LARGE: "Ukuran file terlalu besar",
    INVALID_FILE_TYPE: "Tipe file tidak diizinkan",
  } as const,

  // Success messages
  SUCCESS_MESSAGES: {
    CREATED: "Data berhasil dibuat",
    UPDATED: "Data berhasil diperbarui",
    DELETED: "Data berhasil dihapus",
    LOGIN_SUCCESS: "Login berhasil",
    LOGOUT_SUCCESS: "Logout berhasil",
    PASSWORD_CHANGED: "Password berhasil diubah",
    EMAIL_SENT: "Email berhasil dikirim",
    FILE_UPLOADED: "File berhasil diupload",
  } as const,

  // Default values
  DEFAULTS: {
    ADMIN_USERNAME: "admin",
    ADMIN_EMAIL: "admin@kemenag-magetan.go.id",
    SITE_NAME: "Kementerian Agama Kabupaten Magetan",
    SITE_DESCRIPTION: "Website resmi Kementerian Agama Kabupaten Magetan",
    CONTACT_EMAIL: "kemenag@magetan.go.id",
    CONTACT_PHONE: "(0351) 1234567",
    OFFICE_ADDRESS: "Jl. Raya Magetan No. 123, Magetan, Jawa Timur",
  } as const,
} as const

// Type definitions for constants
export type UserRole = (typeof APP_CONSTANTS.USER_ROLES)[keyof typeof APP_CONSTANTS.USER_ROLES]
export type NewsStatus = (typeof APP_CONSTANTS.NEWS_STATUS)[keyof typeof APP_CONSTANTS.NEWS_STATUS]
export type NewsCategory = (typeof APP_CONSTANTS.NEWS_CATEGORIES)[keyof typeof APP_CONSTANTS.NEWS_CATEGORIES]
export type FileType = (typeof APP_CONSTANTS.FILE_TYPES)[keyof typeof APP_CONSTANTS.FILE_TYPES]
export type MenuType = (typeof APP_CONSTANTS.MENU_TYPES)[keyof typeof APP_CONSTANTS.MENU_TYPES]
