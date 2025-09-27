import { z } from "zod"

// Environment variables schema
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, "Database URL is required"),
  DB_MAX_CONNECTIONS: z.string().optional().default("10"),
  DB_CONNECTION_TIMEOUT: z.string().optional().default("30000"),

  // Authentication
  JWT_SECRET: z.string().min(32, "JWT Secret must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().optional().default("7d"),
  BCRYPT_ROUNDS: z.string().optional().default("12"),
  SESSION_TIMEOUT: z.string().optional().default("86400000"),

  // Application
  APP_NAME: z.string().optional().default("Kemenag Magetan Admin"),
  APP_VERSION: z.string().optional().default("1.0.0"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().optional().default("3000"),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional().default("http://localhost:3000"),
  ADMIN_PATH: z.string().optional().default("/admin"),

  // File Upload
  MAX_FILE_SIZE: z.string().optional().default("5242880"),
  ALLOWED_FILE_TYPES: z.string().optional(),
  UPLOAD_DIR: z.string().optional().default("./public/uploads"),

  // Email
  EMAIL_ENABLED: z.string().optional().default("false"),
  EMAIL_HOST: z.string().optional().default("smtp.gmail.com"),
  EMAIL_PORT: z.string().optional().default("587"),
  EMAIL_SECURE: z.string().optional().default("false"),
  EMAIL_USER: z.string().optional().default(""),
  EMAIL_PASSWORD: z.string().optional().default(""),
  EMAIL_FROM: z.string().email().optional().default("noreply@kemenag-magetan.go.id"),

  // Security
  CORS_ORIGINS: z.string().optional(),
  RATE_LIMIT_WINDOW: z.string().optional().default("900000"),
  RATE_LIMIT_MAX: z.string().optional().default("100"),
  ENABLE_HTTPS: z.string().optional().default("false"),
  TRUST_PROXY: z.string().optional().default("false"),

  // Cache
  CACHE_ENABLED: z.string().optional().default("true"),
  CACHE_TTL: z.string().optional().default("3600"),
  CACHE_MAX_SIZE: z.string().optional().default("100"),

  // Logging
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).optional().default("info"),
  LOG_CONSOLE: z.string().optional().default("true"),
  LOG_FILE: z.string().optional().default("false"),
  LOG_DIR: z.string().optional().default("./logs"),

  // Feature Flags
  ENABLE_REGISTRATION: z.string().optional().default("true"),
  ENABLE_PASSWORD_RESET: z.string().optional().default("true"),
  ENABLE_FILE_UPLOAD: z.string().optional().default("true"),
  ENABLE_EMAIL_NOTIFICATIONS: z.string().optional().default("false"),
  ENABLE_AUDIT_LOG: z.string().optional().default("true"),

  // API
  API_VERSION: z.string().optional().default("v1"),
  API_PREFIX: z.string().optional().default("/api"),
  API_TIMEOUT: z.string().optional().default("30000"),
  ENABLE_SWAGGER: z.string().optional().default("false"),

  // Frontend
  NEXT_PUBLIC_SITE_NAME: z.string().optional().default("Kementerian Agama Kabupaten Magetan"),
  NEXT_PUBLIC_SITE_DESCRIPTION: z.string().optional(),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().email().optional().default("kemenag@magetan.go.id"),
  NEXT_PUBLIC_CONTACT_PHONE: z.string().optional().default("(0351) 1234567"),

  // Social Media
  NEXT_PUBLIC_FACEBOOK_URL: z.string().url().optional(),
  NEXT_PUBLIC_INSTAGRAM_URL: z.string().url().optional(),
  NEXT_PUBLIC_YOUTUBE_URL: z.string().url().optional(),
  NEXT_PUBLIC_TIKTOK_URL: z.string().url().optional(),
})

export type EnvConfig = z.infer<typeof envSchema>

// Validate environment variables
export function validateEnv(): EnvConfig {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`)
      throw new Error(`Environment validation failed:\n${missingVars.join("\n")}`)
    }
    throw error
  }
}

// Get validated environment variables
export const env = validateEnv()
