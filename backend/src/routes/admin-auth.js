import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { query } from "../config/database.js"
import { env } from "../config/env.js"
import { success, error } from "../utils/responses.js"
import { authenticateAdmin } from "../middleware/auth.js"

const router = Router()

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return error(res, 400, "Username dan password wajib diisi")
  }

  try {
    const [rows] = await query(`SELECT * FROM admins WHERE username = :username AND is_active = 1`, { username })
    if (rows.length === 0) {
      return error(res, 401, "Kombinasi username atau password salah")
    }
    const admin = rows[0]
    const passwordValid = await bcrypt.compare(password, admin.password)
    if (!passwordValid) {
      return error(res, 401, "Kombinasi username atau password salah")
    }

    await query(`UPDATE admins SET last_login = NOW() WHERE id = :id`, { id: admin.id })

    const token = jwt.sign({
      id: admin.id,
      username: admin.username,
      role: admin.role,
    }, env.jwt.secret, { expiresIn: env.jwt.expiresIn })

    return success(res, {
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        fullName: admin.full_name,
        role: admin.role,
      },
    }, "Login berhasil")
  } catch (err) {
    return error(res, 500, "Gagal melakukan login")
  }
})

router.get("/profile", authenticateAdmin, async (req, res) => {
  try {
    const [rows] = await query(`SELECT id, username, email, full_name as fullName, role, is_active as isActive, last_login as lastLogin FROM admins WHERE id = :id`, {
      id: req.admin.id,
    })
    if (rows.length === 0) {
      return error(res, 404, "Admin tidak ditemukan")
    }
    return success(res, rows[0])
  } catch (err) {
    return error(res, 500, "Gagal mengambil profil admin")
  }
})

export default router
