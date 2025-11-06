import { Router } from "express"
import { body, param, query as queryValidator, validationResult } from "express-validator"
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

router.get(
  "/",
  validate([
    queryValidator("status").optional().isIn(["draft", "published"]),
    queryValidator("search").optional().isString(),
  ]),
  async (req, res) => {
    const { status, search } = req.query
    try {
      let sql = `SELECT id, title, description, image, published_at as publishedAt, url, status, created_at as createdAt, updated_at as updatedAt FROM articles WHERE 1=1`
      const params = {}
      if (status) {
        sql += " AND status = :status"
        params.status = status
      }
      if (search) {
        sql += " AND title LIKE :search"
        params.search = `%${search}%`
      }
      sql += " ORDER BY published_at DESC, created_at DESC"
      const [rows] = await query(sql, params)
      return success(res, rows)
    } catch (err) {
      return error(res, 500, "Gagal mengambil artikel")
    }
  },
)

router.post(
  "/",
  validate([
    body("title").notEmpty().withMessage("Judul wajib diisi"),
    body("description").optional({ nullable: true }).isString(),
    body("image").optional({ nullable: true }).isString(),
    body("publishedAt").optional({ nullable: true }).isISO8601().toDate(),
    body("url").optional({ nullable: true }).isString(),
    body("status").optional().isIn(["draft", "published"]),
  ]),
  async (req, res) => {
    const { title, description = null, image = null, publishedAt = null, url = null, status = "published" } = req.body
    try {
      const [result] = await query(
        `INSERT INTO articles (title, description, image, published_at, url, status)
         VALUES (:title, :description, :image, :published_at, :url, :status)`,
        { title, description, image, published_at: publishedAt, url, status },
      )
      const [rows] = await query(
        `SELECT id, title, description, image, published_at as publishedAt, url, status, created_at as createdAt, updated_at as updatedAt
         FROM articles WHERE id = :id`,
        { id: result.insertId },
      )
      return success(res, rows[0], "Artikel berhasil ditambahkan")
    } catch (err) {
      return error(res, 500, "Gagal menambahkan artikel")
    }
  },
)

router.put(
  "/:id",
  validate([
    param("id").isInt({ min: 1 }).withMessage("ID tidak valid"),
    body("title").notEmpty().withMessage("Judul wajib diisi"),
    body("description").optional({ nullable: true }).isString(),
    body("image").optional({ nullable: true }).isString(),
    body("publishedAt").optional({ nullable: true }).isISO8601().toDate(),
    body("url").optional({ nullable: true }).isString(),
    body("status").optional().isIn(["draft", "published"]),
  ]),
  async (req, res) => {
    const { id } = req.params
    const { title, description = null, image = null, publishedAt = null, url = null, status = "published" } = req.body
    try {
      await query(
        `UPDATE articles
         SET title = :title,
             description = :description,
             image = :image,
             published_at = :published_at,
             url = :url,
             status = :status
         WHERE id = :id`,
        { id, title, description, image, published_at: publishedAt, url, status },
      )
      const [rows] = await query(
        `SELECT id, title, description, image, published_at as publishedAt, url, status, created_at as createdAt, updated_at as updatedAt
         FROM articles WHERE id = :id`,
        { id },
      )
      return success(res, rows[0], "Artikel berhasil diperbarui")
    } catch (err) {
      return error(res, 500, "Gagal memperbarui artikel")
    }
  },
)

router.delete(
  "/:id",
  validate([param("id").isInt({ min: 1 }).withMessage("ID tidak valid")]),
  async (req, res) => {
    const { id } = req.params
    try {
      await query(`DELETE FROM articles WHERE id = :id`, { id })
      return success(res, null, "Artikel berhasil dihapus")
    } catch (err) {
      return error(res, 500, "Gagal menghapus artikel")
    }
  },
)

export default router
