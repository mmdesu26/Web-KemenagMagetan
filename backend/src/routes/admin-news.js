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
    queryValidator("category").optional().isIn(["kemenag", "umum"]),
    queryValidator("search").optional().isString(),
  ]),
  async (req, res) => {
    const { status, category, search } = req.query
    try {
      let sql = `SELECT id, category, title, image, published_at as publishedAt, url, status, created_at as createdAt, updated_at as updatedAt FROM news WHERE 1=1`
      const params = {}
      if (status) {
        sql += " AND status = :status"
        params.status = status
      }
      if (category) {
        sql += " AND category = :category"
        params.category = category
      }
      if (search) {
        sql += " AND title LIKE :search"
        params.search = `%${search}%`
      }
      sql += " ORDER BY published_at DESC, created_at DESC"
      const [rows] = await query(sql, params)
      return success(res, rows)
    } catch (err) {
      return error(res, 500, "Gagal mengambil berita")
    }
  },
)

router.post(
  "/",
  validate([
    body("category").notEmpty().isIn(["kemenag", "umum"]).withMessage("Kategori wajib diisi"),
    body("title").notEmpty().withMessage("Judul wajib diisi"),
    body("image").optional({ nullable: true }).isString(),
    body("publishedAt").optional({ nullable: true }).isISO8601().toDate(),
    body("url").optional({ nullable: true }).isString(),
    body("status").optional().isIn(["draft", "published"]),
  ]),
  async (req, res) => {
    const { category, title, image = null, publishedAt = null, url = null, status = "published" } = req.body
    try {
      const [result] = await query(
        `INSERT INTO news (category, title, image, published_at, url, status)
         VALUES (:category, :title, :image, :published_at, :url, :status)`,
        { category, title, image, published_at: publishedAt, url, status },
      )
      const [rows] = await query(
        `SELECT id, category, title, image, published_at as publishedAt, url, status, created_at as createdAt, updated_at as updatedAt
         FROM news WHERE id = :id`,
        { id: result.insertId },
      )
      return success(res, rows[0], "Berita berhasil ditambahkan")
    } catch (err) {
      return error(res, 500, "Gagal menambahkan berita")
    }
  },
)

router.put(
  "/:id",
  validate([
    param("id").isInt({ min: 1 }).withMessage("ID tidak valid"),
    body("category").notEmpty().isIn(["kemenag", "umum"]).withMessage("Kategori wajib diisi"),
    body("title").notEmpty().withMessage("Judul wajib diisi"),
    body("image").optional({ nullable: true }).isString(),
    body("publishedAt").optional({ nullable: true }).isISO8601().toDate(),
    body("url").optional({ nullable: true }).isString(),
    body("status").optional().isIn(["draft", "published"]),
  ]),
  async (req, res) => {
    const { id } = req.params
    const { category, title, image = null, publishedAt = null, url = null, status = "published" } = req.body
    try {
      await query(
        `UPDATE news
         SET category = :category,
             title = :title,
             image = :image,
             published_at = :published_at,
             url = :url,
             status = :status
         WHERE id = :id`,
        { id, category, title, image, published_at: publishedAt, url, status },
      )
      const [rows] = await query(
        `SELECT id, category, title, image, published_at as publishedAt, url, status, created_at as createdAt, updated_at as updatedAt
         FROM news WHERE id = :id`,
        { id },
      )
      return success(res, rows[0], "Berita berhasil diperbarui")
    } catch (err) {
      return error(res, 500, "Gagal memperbarui berita")
    }
  },
)

router.delete(
  "/:id",
  validate([param("id").isInt({ min: 1 }).withMessage("ID tidak valid")]),
  async (req, res) => {
    const { id } = req.params
    try {
      await query(`DELETE FROM news WHERE id = :id`, { id })
      return success(res, null, "Berita berhasil dihapus")
    } catch (err) {
      return error(res, 500, "Gagal menghapus berita")
    }
  },
)

export default router
