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
    const [rows] = await query(`SELECT id, title, image, url, created_at as createdAt, updated_at as updatedAt FROM videos ORDER BY created_at DESC`)
    return success(res, rows)
  } catch (err) {
    return error(res, 500, "Gagal mengambil video")
  }
})

router.post(
  "/",
  validate([
    body("title").notEmpty().withMessage("Judul video wajib diisi"),
    body("image").optional({ nullable: true }).isString(),
    body("url").optional({ nullable: true }).isString(),
  ]),
  async (req, res) => {
    const { title, image = null, url = null } = req.body
    try {
      const [result] = await query(`INSERT INTO videos (title, image, url) VALUES (:title, :image, :url)`, {
        title,
        image,
        url,
      })
      const [rows] = await query(`SELECT id, title, image, url, created_at as createdAt, updated_at as updatedAt FROM videos WHERE id = :id`, {
        id: result.insertId,
      })
      return success(res, rows[0], "Video berhasil ditambahkan")
    } catch (err) {
      return error(res, 500, "Gagal menambahkan video")
    }
  },
)

router.put(
  "/:id",
  validate([
    param("id").isInt({ min: 1 }),
    body("title").notEmpty().withMessage("Judul video wajib diisi"),
    body("image").optional({ nullable: true }).isString(),
    body("url").optional({ nullable: true }).isString(),
  ]),
  async (req, res) => {
    const { id } = req.params
    const { title, image = null, url = null } = req.body
    try {
      await query(`UPDATE videos SET title = :title, image = :image, url = :url WHERE id = :id`, {
        id,
        title,
        image,
        url,
      })
      const [rows] = await query(`SELECT id, title, image, url, created_at as createdAt, updated_at as updatedAt FROM videos WHERE id = :id`, {
        id,
      })
      return success(res, rows[0], "Video berhasil diperbarui")
    } catch (err) {
      return error(res, 500, "Gagal memperbarui video")
    }
  },
)

router.delete(
  "/:id",
  validate([param("id").isInt({ min: 1 })]),
  async (req, res) => {
    const { id } = req.params
    try {
      await query(`DELETE FROM videos WHERE id = :id`, { id })
      return success(res, null, "Video berhasil dihapus")
    } catch (err) {
      return error(res, 500, "Gagal menghapus video")
    }
  },
)

export default router
