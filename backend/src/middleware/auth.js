import jwt from "jsonwebtoken"
import { env } from "../config/env.js"
import { error } from "../utils/responses.js"

export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || ""
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

  if (!token) {
    return error(res, 401, "Token tidak ditemukan")
  }

  try {
    const payload = jwt.verify(token, env.jwt.secret)
    req.admin = payload
    next()
  } catch (err) {
    return error(res, 401, "Token tidak valid")
  }
}
