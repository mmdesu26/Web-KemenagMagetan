import { Router } from "express"
import { body, param, validationResult } from "express-validator"
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
    const [rows] = await query(`SELECT id, title, description, location, event_date as eventDate, created_at as createdAt, updated_at as updatedAt FROM agendas ORDER BY event_date DESC`)
    return success(res, rows)
  } catch (err) {
    return error(res, 500, "Gagal mengambil agenda")
  }
})

router.post(
  "/",
  validate([
    body("title").notEmpty().withMessage("Judul agenda wajib diisi"),
    body("eventDate").notEmpty().isISO8601().withMessage("Tanggal agenda tidak valid"),
    body("description").optional({ nullable: true }).isString(),
    body("location").optional({ nullable: true }).isString(),
  ]),
  async (req, res) => {
    const { title, eventDate, description = null, location = null } = req.body
    try {
      const [result] = await query(
        `INSERT INTO agendas (title, description, location, event_date)
         VALUES (:title, :description, :location, :event_date)`,
        { title, description, location, event_date: eventDate },
      )
      const [rows] = await query(
        `SELECT id, title, description, location, event_date as eventDate, created_at as createdAt, updated_at as updatedAt
         FROM agendas WHERE id = :id`,
        { id: result.insertId },
      )
      return success(res, rows[0], "Agenda berhasil ditambahkan")
    } catch (err) {
      return error(res, 500, "Gagal menambahkan agenda")
    }
  },
)

router.put(
  "/:id",
  validate([
    param("id").isInt({ min: 1 }),
    body("title").notEmpty().withMessage("Judul agenda wajib diisi"),
    body("eventDate").notEmpty().isISO8601().withMessage("Tanggal agenda tidak valid"),
    body("description").optional({ nullable: true }).isString(),
    body("location").optional({ nullable: true }).isString(),
  ]),
  async (req, res) => {
    const { id } = req.params
    const { title, eventDate, description = null, location = null } = req.body
    try {
      await query(
        `UPDATE agendas SET title = :title, description = :description, location = :location, event_date = :event_date WHERE id = :id`,
        { id, title, description, location, event_date: eventDate },
      )
      const [rows] = await query(
        `SELECT id, title, description, location, event_date as eventDate, created_at as createdAt, updated_at as updatedAt
         FROM agendas WHERE id = :id`,
        { id },
      )
      return success(res, rows[0], "Agenda berhasil diperbarui")
    } catch (err) {
      return error(res, 500, "Gagal memperbarui agenda")
    }
  },
)

router.delete(
  "/:id",
  validate([param("id").isInt({ min: 1 })]),
  async (req, res) => {
    const { id } = req.params
    try {
      await query(`DELETE FROM agendas WHERE id = :id`, { id })
      return success(res, null, "Agenda berhasil dihapus")
    } catch (err) {
      return error(res, 500, "Gagal menghapus agenda")
    }
  },
)

export default router
