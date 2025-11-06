import { env } from "../config/env.js"

export const notFoundHandler = (req, res) => {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" })
}

export const errorHandler = (err, req, res, next) => {
  if (env.nodeEnv !== "production") {
    console.error(err)
  }
  const status = err.status || 500
  res.status(status).json({ success: false, message: err.message || "Terjadi kesalahan pada server" })
}
