// Environment configuration for the admin backend application
export const config = {
  // Database configuration
  database: {
    url: process.env.DATABASE_URL || "sqlite:./database.db",
    maxConnections: Number.parseInt(process.env.DB_MAX_CONNECTIONS || "10"),
    connectionTimeout: Number.parseInt(process.env.DB_CONNECTION_TIMEOUT || "30000"),
  },

  // Authentication configuration
  auth: {
    jwtSecret: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    bcryptRounds: Number.parseInt(process.env.BCRYPT_ROUNDS || "12"),
    sessionTimeout: Number.parseInt(process.env.SESSION_TIMEOUT || "86400000"), // 24 hours in ms
  },

  // Application configuration
  app: {
    name: process.env.APP_NAME || "Kemenag Magetan Admin",
    version: process.env.APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    port: Number.parseInt(process.env.PORT || "3000"),
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    adminPath: process.env.ADMIN_PATH || "/admin",
  },

  // File upload configuration
  upload: {
    maxFileSize: Number.parseInt(process.env.MAX_FILE_SIZE || "5242880"), // 5MB in bytes
    allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(",") || [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    uploadDir: process.env.UPLOAD_DIR || "./public/uploads",
  },

  // Email configuration (for notifications)
  email: {
    enabled: process.env.EMAIL_ENABLED === "true",
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    user: process.env.EMAIL_USER || "",
    password: process.env.EMAIL_PASSWORD || "",
    from: process.env.EMAIL_FROM || "noreply@kemenag-magetan.go.id",
  },

  // Security configuration
  security: {
    corsOrigins: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000"],
    rateLimitWindow: Number.parseInt(process.env.RATE_LIMIT_WINDOW || "900000"), // 15 minutes
    rateLimitMax: Number.parseInt(process.env.RATE_LIMIT_MAX || "100"),
    enableHttps: process.env.ENABLE_HTTPS === "true",
    trustProxy: process.env.TRUST_PROXY === "true",
  },

  // Cache configuration
  cache: {
    enabled: process.env.CACHE_ENABLED !== "false",
    ttl: Number.parseInt(process.env.CACHE_TTL || "3600"), // 1 hour in seconds
    maxSize: Number.parseInt(process.env.CACHE_MAX_SIZE || "100"),
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || "info",
    enableConsole: process.env.LOG_CONSOLE !== "false",
    enableFile: process.env.LOG_FILE === "true",
    logDir: process.env.LOG_DIR || "./logs",
  },

  // Feature flags
  features: {
    enableRegistration: process.env.ENABLE_REGISTRATION !== "false",
    enablePasswordReset: process.env.ENABLE_PASSWORD_RESET !== "false",
    enableFileUpload: process.env.ENABLE_FILE_UPLOAD !== "false",
    enableEmailNotifications: process.env.ENABLE_EMAIL_NOTIFICATIONS === "true",
    enableAuditLog: process.env.ENABLE_AUDIT_LOG !== "false",
  },

  // API configuration
  api: {
    version: process.env.API_VERSION || "v1",
    prefix: process.env.API_PREFIX || "/api",
    timeout: Number.parseInt(process.env.API_TIMEOUT || "30000"),
    enableSwagger: process.env.ENABLE_SWAGGER === "true",
  },

  // Frontend configuration
  frontend: {
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Kementerian Agama Kabupaten Magetan",
    siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Website resmi Kementerian Agama Kabupaten Magetan",
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "kemenag@magetan.go.id",
    contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "(0351) 1234567",
    socialMedia: {
      facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/kemenagmagetan",
      instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/kemenagmagetan",
      youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/kemenagmagetan",
      tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/@kemenagmagetan",
    },
  },
}

// Validation function to check required environment variables
export function validateConfig() {
  const requiredVars = ["DATABASE_URL", "JWT_SECRET"]

  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`)
  }

  // Validate JWT secret strength in production
  if (config.app.environment === "production" && config.auth.jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long in production")
  }

  // Validate database URL format
  if (
    !config.database.url.startsWith("sqlite:") &&
    !config.database.url.startsWith("postgresql:") &&
    !config.database.url.startsWith("mysql:")
  ) {
    throw new Error("DATABASE_URL must be a valid database connection string")
  }

  return true
}

// Helper function to get environment-specific configuration
export function getEnvConfig() {
  return {
    isDevelopment: config.app.environment === "development",
    isProduction: config.app.environment === "production",
    isTest: config.app.environment === "test",
  }
}

// Export individual config sections for easier imports
export const {
  database: dbConfig,
  auth: authConfig,
  app: appConfig,
  upload: uploadConfig,
  email: emailConfig,
  security: securityConfig,
  cache: cacheConfig,
  logging: loggingConfig,
  features: featureConfig,
  api: apiConfig,
  frontend: frontendConfig,
} = config
