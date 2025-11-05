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

router.get("/categories", async (req, res) => {
  try {
    const [rows] = await query(`SELECT id, name, created_at as createdAt, updated_at as updatedAt FROM service_categories ORDER BY id ASC`)
    return success(res, rows)
  } catch (err) {
    return error(res, 500, "Gagal mengambil kategori layanan")
  }
})

router.post(
  "/categories",
  validate([body("name").notEmpty().withMessage("Nama kategori wajib diisi")]),
  async (req, res) => {
    const { name } = req.body
    try {
      const [result] = await query(`INSERT INTO service_categories (name) VALUES (:name)`, { name })
      const [rows] = await query(`SELECT id, name, created_at as createdAt, updated_at as updatedAt FROM service_categories WHERE id = :id`, {
        id: result.insertId,
      })
      return success(res, rows[0], "Kategori berhasil ditambahkan")
    } catch (err) {
      return error(res, 500, "Gagal menambahkan kategori")
    }
  },
)

router.put(
  "/categories/:id",
  validate([param("id").isInt({ min: 1 }), body("name").notEmpty().withMessage("Nama kategori wajib diisi")]),
  async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {
      await query(`UPDATE service_categories SET name = :name WHERE id = :id`, { id, name })
      const [rows] = await query(`SELECT id, name, created_at as createdAt, updated_at as updatedAt FROM service_categories WHERE id = :id`, {
        id,
      })
      return success(res, rows[0], "Kategori berhasil diperbarui")
    } catch (err) {
      return error(res, 500, "Gagal memperbarui kategori")
    }
  },
)

router.delete(
  "/categories/:id",
  validate([param("id").isInt({ min: 1 })]),
  async (req, res) => {
    const { id } = req.params
    try {
      const [serviceCount] = await query(`SELECT COUNT(*) as total FROM services WHERE category_id = :id`, { id })
      if (serviceCount[0].total > 0) {
        return error(res, 400, "Kategori masih memiliki layanan")
      }
      await query(`DELETE FROM service_categories WHERE id = :id`, { id })
      return success(res, null, "Kategori berhasil dihapus")
    } catch (err) {
      return error(res, 500, "Gagal menghapus kategori")
    }
  },
)

router.get("/", async (req, res) => {
  try {
    const [services] = await query(
      `SELECT s.id, s.category_id as categoryId, s.name, s.icon, s.url, s.order_index as orderIndex,
              c.name as categoryName
       FROM services s
       INNER JOIN service_categories c ON c.id = s.category_id
       ORDER BY c.id ASC, s.order_index ASC`
    )
    return success(res, services)
  } catch (err) {
    return error(res, 500, "Gagal mengambil data layanan")
  }
})

router.post(
  "/",
  validate([
    body("categoryId").isInt({ min: 1 }).withMessage("Kategori wajib dipilih"),
    body("name").notEmpty().withMessage("Nama layanan wajib diisi"),
    body("icon").optional({ nullable: true }).isString(),
    body("url").optional({ nullable: true }).isString(),
    body("orderIndex").optional().isInt({ min: 0 }).withMessage("Urutan tidak valid"),
  ]),
  async (req, res) => {
    const { categoryId, name, icon = null, url = null, orderIndex = 0 } = req.body
    try {
      const [categories] = await query(`SELECT id FROM service_categories WHERE id = :id`, { id: categoryId })
      if (categories.length === 0) {
        return error(res, 400, "Kategori tidak ditemukan")
      }
      const [result] = await query(
        `INSERT INTO services (category_id, name, icon, url, order_index)
         VALUES (:category_id, :name, :icon, :url, :order_index)`,
        { category_id: categoryId, name, icon, url, order_index: orderIndex },
      )
      const [rows] = await query(
        `SELECT s.id, s.category_id as categoryId, s.name, s.icon, s.url, s.order_index as orderIndex,
                c.name as categoryName
         FROM services s
         INNER JOIN service_categories c ON c.id = s.category_id
         WHERE s.id = :id`,
        { id: result.insertId },
      )
      return success(res, rows[0], "Layanan berhasil ditambahkan")
    } catch (err) {
      return error(res, 500, "Gagal menambahkan layanan")
    }
  },
)

router.put(
  "/:id",
  validate([
    param("id").isInt({ min: 1 }),
    body("categoryId").isInt({ min: 1 }).withMessage("Kategori wajib dipilih"),
    body("name").notEmpty().withMessage("Nama layanan wajib diisi"),
    body("icon").optional({ nullable: true }).isString(),
    body("url").optional({ nullable: true }).isString(),
    body("orderIndex").optional().isInt({ min: 0 }).withMessage("Urutan tidak valid"),
  ]),
  async (req, res) => {
    const { id } = req.params
    const { categoryId, name, icon = null, url = null, orderIndex = 0 } = req.body
    try {
      const [categories] = await query(`SELECT id FROM service_categories WHERE id = :id`, { id: categoryId })
      if (categories.length === 0) {
        return error(res, 400, "Kategori tidak ditemukan")
      }
      await query(
        `UPDATE services SET category_id = :category_id, name = :name, icon = :icon, url = :url, order_index = :order_index WHERE id = :id`,
        { id, category_id: categoryId, name, icon, url, order_index: orderIndex },
      )
      const [rows] = await query(
        `SELECT s.id, s.category_id as categoryId, s.name, s.icon, s.url, s.order_index as orderIndex,
                c.name as categoryName
         FROM services s
         INNER JOIN service_categories c ON c.id = s.category_id
         WHERE s.id = :id`,
        { id },
      )
      return success(res, rows[0], "Layanan berhasil diperbarui")
    } catch (err) {
      return error(res, 500, "Gagal memperbarui layanan")
    }
  },
)

router.delete(
  "/:id",
  validate([param("id").isInt({ min: 1 })]),
  async (req, res) => {
    const { id } = req.params
    try {
      await query(`DELETE FROM services WHERE id = :id`, { id })
      return success(res, null, "Layanan berhasil dihapus")
    } catch (err) {
      return error(res, 500, "Gagal menghapus layanan")
    }
  },
)

export default router
