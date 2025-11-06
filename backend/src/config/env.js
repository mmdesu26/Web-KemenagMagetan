import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

// Mendapatkan __dirname untuk ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paksa Node.js membaca .env dari folder backend
dotenv.config({ path: path.resolve(__dirname, "../../.env") })

// Pastikan folder uploads selalu absolute path
const uploadsDir = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.resolve(__dirname, "../../uploads")

// Export konfigurasi environment
export const env = {
  port: Number.parseInt(process.env.BACKEND_PORT || "5000", 10),
  host: process.env.BACKEND_HOST || "0.0.0.0",
  nodeEnv: process.env.NODE_ENV || "development",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  adminOrigin: process.env.ADMIN_ORIGIN || "http://localhost:3000",
  database: {
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "kemenag_magetan",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "kemenag-magetan-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  uploadsDir,
}

// Flag environment production
export const isProduction = env.nodeEnv === "production"

// Debug: pastikan env terbaca
console.log("Database name (env.database.name):", env.database.name)
console.log("Uploads dir (env.uploadsDir):", env.uploadsDir)
