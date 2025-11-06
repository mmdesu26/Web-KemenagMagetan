import { Router } from "express"
import { body, param, validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import { authenticateAdmin } from "../middleware/auth.js"
import { query } from "../config/database.js"
import { success, error } from "../utils/responses.js"

const router = Router()

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)))
  const errorsResult = validationResult(req)
  if (!errorsResult.isEmpty()) {
    return error(res, 422, "Data tidak valid", errorsResult.array())
  }
  next()
}

router.use(authenticateAdmin)

router.get("/", async (req, res) => {
  try {
    const [rows] = await query(
      `SELECT id, username, email, full_name as fullName, role, is_active as isActive, last_login as lastLogin, created_at as createdAt, updated_at as updatedAt, created_by as createdBy
       FROM admins
       ORDER BY role DESC, created_at DESC`
    )
    return success(res, rows)
  } catch (err) {
    return error(res, 500, "Gagal mengambil data admin")
  }
})

router.post(
  "/",
  validate([
    body("username").notEmpty().isLength({ min: 3 }).withMessage("Username minimal 3 karakter"),
    body("fullName").notEmpty().withMessage("Nama lengkap wajib diisi"),
    body("email").notEmpty().isEmail().withMessage("Email tidak valid"),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),
    body("role").notEmpty().isIn(["admin", "superadmin"]).withMessage("Role tidak valid"),
  ]),
  async (req, res) => {
    const { username, fullName, email, password, role, isActive = true } = req.body
    try {
      if (role === "superadmin" && req.admin.role !== "superadmin") {
        return error(res, 403, "Hanya superadmin yang dapat membuat superadmin")
      }
      const [existing] = await query(`SELECT id FROM admins WHERE username = :username OR email = :email`, { username, email })
      if (existing.length > 0) {
        return error(res, 400, "Username atau email sudah digunakan")
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const [result] = await query(
        `INSERT INTO admins (username, password, email, full_name, role, is_active, created_by)
         VALUES (:username, :password, :email, :full_name, :role, :is_active, :created_by)`,
        {
          username,
          password: hashedPassword,
          email,
          full_name: fullName,
          role,
          is_active: isActive ? 1 : 0,
          created_by: req.admin.username,
        },
      )
      const [rows] = await query(
        `SELECT id, username, email, full_name as fullName, role, is_active as isActive, last_login as lastLogin, created_at as createdAt, updated_at as updatedAt, created_by as createdBy
         FROM admins WHERE id = :id`,
        { id: result.insertId },
      )
      return success(res, rows[0], "Admin berhasil ditambahkan")
    } catch (err) {
      return error(res, 500, "Gagal menambahkan admin")
    }
  },
)

router.put(
  "/:id",
  validate([
    param("id").isInt({ min: 1 }),
    body("fullName").notEmpty().withMessage("Nama lengkap wajib diisi"),
    body("email").notEmpty().isEmail().withMessage("Email tidak valid"),
    body("role").notEmpty().isIn(["admin", "superadmin"]).withMessage("Role tidak valid"),
    body("isActive").optional().isBoolean(),
  ]),
  async (req, res) => {
    const { id } = req.params
    const { fullName, email, role, isActive = true } = req.body
    try {
      const [duplicate] = await query(
        `SELECT id FROM admins WHERE email = :email AND id <> :id`,
        { email, id },
      )
      if (duplicate.length > 0) {
        return error(res, 400, "Email sudah digunakan admin lain")
      }

      if (Number(id) === req.admin.id) {
        return error(res, 400, "Tidak dapat mengubah data akun sendiri melalui endpoint ini")
      }

      const [targetRows] = await query(`SELECT id, role FROM admins WHERE id = :id`, { id })
      if (targetRows.length === 0) {
        return error(res, 404, "Admin tidak ditemukan")
      }
      const target = targetRows[0]

      if (target.role === "superadmin" && req.admin.role !== "superadmin") {
        return error(res, 403, "Hanya superadmin yang dapat mengubah superadmin")
      }
      if (role === "superadmin" && req.admin.role !== "superadmin") {
        return error(res, 403, "Hanya superadmin yang dapat mengangkat superadmin")
      }
      if (req.admin.role === "admin" && role === "superadmin") {
        return error(res, 403, "Akses ditolak")
      }

      await query(
        `UPDATE admins SET full_name = :full_name, email = :email, role = :role, is_active = :is_active WHERE id = :id`,
        { id, full_name: fullName, email, role, is_active: isActive ? 1 : 0 },
      )
      const [rows] = await query(
        `SELECT id, username, email, full_name as fullName, role, is_active as isActive, last_login as lastLogin, created_at as createdAt, updated_at as updatedAt, created_by as createdBy
         FROM admins WHERE id = :id`,
        { id },
      )
      return success(res, rows[0], "Admin berhasil diperbarui")
    } catch (err) {
      return error(res, 500, "Gagal memperbarui admin")
    }
  },
)

router.patch(
  "/:id/password",
  validate([
    param("id").isInt({ min: 1 }),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),
  ]),
  async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    try {
      const [targetRows] = await query(`SELECT id, role FROM admins WHERE id = :id`, { id })
      if (targetRows.length === 0) {
        return error(res, 404, "Admin tidak ditemukan")
      }
      const target = targetRows[0]
      if (target.role === "superadmin" && req.admin.role !== "superadmin") {
        return error(res, 403, "Hanya superadmin yang dapat mengubah password superadmin")
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      await query(`UPDATE admins SET password = :password WHERE id = :id`, { id, password: hashedPassword })
      return success(res, null, "Password berhasil diperbarui")
    } catch (err) {
      return error(res, 500, "Gagal memperbarui password")
    }
  },
)

router.delete(
  "/:id",
  validate([param("id").isInt({ min: 1 })]),
  async (req, res) => {
    const { id } = req.params
    try {
      const [target] = await query(`SELECT id, username, role FROM admins WHERE id = :id`, { id })
      if (target.length === 0) {
        return error(res, 404, "Admin tidak ditemukan")
      }
      if (target[0].username === req.admin.username) {
        return error(res, 400, "Tidak dapat menghapus akun sendiri")
      }
      if (target[0].role === "superadmin") {
        if (req.admin.role !== "superadmin") {
          return error(res, 403, "Hanya superadmin yang dapat menghapus superadmin")
        }
        const [superAdmins] = await query(`SELECT COUNT(*) as total FROM admins WHERE role = 'superadmin' AND is_active = 1`) 
        if (superAdmins[0].total <= 1) {
          return error(res, 400, "Tidak dapat menghapus superadmin terakhir")
        }
      }
      await query(`DELETE FROM admins WHERE id = :id`, { id })
      return success(res, null, "Admin berhasil dihapus")
    } catch (err) {
      return error(res, 500, "Gagal menghapus admin")
    }
  },
)

export default router
