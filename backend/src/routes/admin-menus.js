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
    const [rows] = await query(
      `SELECT m.id, m.name, m.path, m.icon, m.parent_id as parentId, m.order_index as orderIndex, m.is_active as isActive,
              p.name as parentName
       FROM menus m
       LEFT JOIN menus p ON p.id = m.parent_id
       ORDER BY COALESCE(p.order_index, m.order_index), m.parent_id IS NOT NULL, m.order_index`
    )
    return success(res, rows)
  } catch (err) {
    return error(res, 500, "Gagal mengambil data menu")
  }
})

router.post(
  "/",
  validate([
    body("name").trim().notEmpty().withMessage("Nama wajib diisi"),
    body("path").trim().notEmpty().withMessage("Path wajib diisi"),
    body("orderIndex").optional().isInt({ min: 0 }).withMessage("Urutan harus angka"),
    body("parentId").optional({ nullable: true }).isInt({ min: 1 }).withMessage("Parent tidak valid"),
    body("icon").optional({ nullable: true }).isString(),
  ]),
  async (req, res) => {
    const { name, path: menuPath, parentId = null, orderIndex = 0, icon = null } = req.body

    try {
      if (parentId) {
        const [parents] = await query(`SELECT id FROM menus WHERE id = :id`, { id: parentId })
        if (parents.length === 0) {
          return error(res, 400, "Parent menu tidak ditemukan")
        }
      }

      const [result] = await query(
        `INSERT INTO menus (name, path, parent_id, order_index, icon, is_active)
         VALUES (:name, :path, :parent_id, :order_index, :icon, 1)`,
        { name, path: menuPath, parent_id: parentId, order_index: orderIndex, icon },
      )

      const [created] = await query(`SELECT id, name, path, icon, parent_id as parentId, order_index as orderIndex, is_active as isActive FROM menus WHERE id = :id`, {
        id: result.insertId,
      })

      return success(res, created[0], "Menu berhasil dibuat")
    } catch (err) {
      return error(res, 500, "Gagal membuat menu")
    }
  },
)

router.put(
  "/:id",
  validate([
    param("id").isInt({ min: 1 }).withMessage("ID tidak valid"),
    body("name").trim().notEmpty().withMessage("Nama wajib diisi"),
    body("path").trim().notEmpty().withMessage("Path wajib diisi"),
    body("orderIndex").optional().isInt({ min: 0 }).withMessage("Urutan harus angka"),
    body("parentId").optional({ nullable: true }).isInt({ min: 1 }).withMessage("Parent tidak valid"),
    body("icon").optional({ nullable: true }).isString(),
    body("isActive").optional().isBoolean().withMessage("Status tidak valid"),
  ]),
  async (req, res) => {
    const { id } = req.params
    const { name, path: menuPath, parentId = null, orderIndex = 0, icon = null, isActive = true } = req.body

    try {
      if (Number(id) === Number(parentId)) {
        return error(res, 400, "Menu tidak dapat menjadi parent dirinya sendiri")
      }

      if (parentId) {
        const [parents] = await query(`SELECT id FROM menus WHERE id = :id`, { id: parentId })
        if (parents.length === 0) {
          return error(res, 400, "Parent menu tidak ditemukan")
        }
      }

      await query(
        `UPDATE menus SET name = :name, path = :path, parent_id = :parent_id, order_index = :order_index, icon = :icon, is_active = :is_active WHERE id = :id`,
        {
          id,
          name,
          path: menuPath,
          parent_id: parentId,
          order_index: orderIndex,
          icon,
          is_active: isActive ? 1 : 0,
        },
      )

      const [updated] = await query(`SELECT id, name, path, icon, parent_id as parentId, order_index as orderIndex, is_active as isActive FROM menus WHERE id = :id`, {
        id,
      })

      return success(res, updated[0], "Menu berhasil diperbarui")
    } catch (err) {
      return error(res, 500, "Gagal memperbarui menu")
    }
  },
)

router.delete(
  "/:id",
  validate([param("id").isInt({ min: 1 }).withMessage("ID tidak valid")]),
  async (req, res) => {
    const { id } = req.params
    try {
      await query(`DELETE FROM menus WHERE id = :id`, { id })
      return success(res, null, "Menu berhasil dihapus")
    } catch (err) {
      return error(res, 500, "Gagal menghapus menu")
    }
  },
)

export default router
