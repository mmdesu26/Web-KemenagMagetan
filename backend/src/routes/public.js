import { Router } from "express"
import { query } from "../config/database.js"
import { success, error } from "../utils/responses.js"

const router = Router()

const mapMenus = (rows) => {
  const parents = rows.filter((item) => item.parent_id === null)
  const children = rows.filter((item) => item.parent_id !== null)
  return parents
    .sort((a, b) => a.order_index - b.order_index)
    .map((parent) => ({
      id: parent.id,
      name: parent.name,
      path: parent.path,
      icon: parent.icon,
      order: parent.order_index,
      submenu: children
        .filter((child) => child.parent_id === parent.id)
        .sort((a, b) => a.order_index - b.order_index)
        .map((child) => ({
          id: child.id,
          name: child.name,
          path: child.path,
          order: child.order_index,
        })),
    }))
}

router.get("/menus", async (req, res) => {
  try {
    const [rows] = await query(`SELECT * FROM menus WHERE is_active = 1`)
    return success(res, mapMenus(rows))
  } catch (err) {
    return error(res, 500, "Gagal mengambil data menu")
  }
})

router.get("/articles", async (req, res) => {
  const limit = Number.parseInt(req.query.limit || "10", 10)
  try {
    const [rows] = await query(
      `SELECT id, title, description, image, published_at as date, url
       FROM articles
       WHERE status = 'published'
       ORDER BY published_at DESC
       LIMIT ${limit}`
    )
    return success(res, rows)
  } catch (err) {
    console.error("Error fetching articles:", err)
    return error(res, 500, "Gagal mengambil data artikel")
  }
})

router.get("/news", async (req, res) => {
  const limit = Number.parseInt(req.query.limit || "10", 10)
  const category = req.query.category
  try {
    let sql = `SELECT id, category, title, image, published_at as date, url
      FROM news
      WHERE status = 'published'`
    const params = {}
    if (category) {
      sql += " AND category = :category"
      params.category = category
    }
    sql += ` ORDER BY published_at DESC LIMIT ${limit}`
    const [rows] = await query(sql, params)
    return success(res, rows)
  } catch (err) {
    console.error("Error fetching news:", err)
    return error(res, 500, "Gagal mengambil data berita")
  }
})

router.get("/services", async (req, res) => {
  try {
    const [categories] = await query(`SELECT id, name FROM service_categories ORDER BY id ASC`)
    const [services] = await query(
      `SELECT id, category_id, name, icon, url, order_index
       FROM services
       ORDER BY category_id ASC, order_index ASC`
    )
    const data = categories.map((category) => ({
      id: category.id,
      kategori: category.name,
      items: services
        .filter((service) => service.category_id === category.id)
        .map((service) => ({
          id: service.id,
          name: service.name,
          icon: service.icon,
          url: service.url,
        })),
    }))
    return success(res, data)
  } catch (err) {
    return error(res, 500, "Gagal mengambil data layanan")
  }
})

router.get("/videos", async (req, res) => {
  try {
    const [rows] = await query(`SELECT id, title, image, url FROM videos ORDER BY created_at DESC`)
    return success(res, rows)
  } catch (err) {
    return error(res, 500, "Gagal mengambil data video")
  }
})

router.get("/links", async (req, res) => {
  try {
    const [rows] = await query(`SELECT id, title, image, url FROM external_links ORDER BY id ASC`)
    return success(res, rows)
  } catch (err) {
    return error(res, 500, "Gagal mengambil tautan eksternal")
  }
})

router.get("/agendas", async (req, res) => {
  try {
    const [rows] = await query(
      `SELECT id, title, description, location, event_date as date
       FROM agendas
       WHERE event_date >= CURDATE()
       ORDER BY event_date ASC`
    )
    return success(res, rows)
  } catch (err) {
    return error(res, 500, "Gagal mengambil agenda")
  }
})

router.get("/prayer-times", async (req, res) => {
  const date = req.query.date || new Date().toISOString().split("T")[0]
  try {
    const [rows] = await query(
      `SELECT schedule_date as date, subuh, dzuhur, ashar, maghrib, isya
       FROM prayer_times
       WHERE schedule_date = :schedule_date`,
      { schedule_date: date },
    )
    if (rows.length === 0) {
      return success(res, null, "Belum ada jadwal pada tanggal tersebut")
    }
    return success(res, rows[0])
  } catch (err) {
    return error(res, 500, "Gagal mengambil jadwal sholat")
  }
})

export default router
