import { Router } from "express"
import { authenticateAdmin } from "../middleware/auth.js"
import { query } from "../config/database.js"
import { success, error } from "../utils/responses.js"

const router = Router()

router.use(authenticateAdmin)

router.get("/summary", async (req, res) => {
  try {
    const [userRows] = await query(`SELECT COUNT(*) as totalUsers FROM admins`)
    const [newsRows] = await query(`SELECT COUNT(*) as totalNews FROM news WHERE status = 'published'`)
    const [menuRows] = await query(`SELECT COUNT(*) as totalMenus FROM menus WHERE parent_id IS NULL`)
    const totalViews = 1250
    const [todayNewsRows] = await query(`SELECT COUNT(*) as todayNews FROM news WHERE DATE(published_at) = CURDATE()`)
    const monthlyViews = 15420

    return success(res, {
      totalUsers: userRows[0]?.totalUsers || 0,
      totalNews: newsRows[0]?.totalNews || 0,
      totalMenus: menuRows[0]?.totalMenus || 0,
      totalViews,
      todayNews: todayNewsRows[0]?.todayNews || 0,
      monthlyViews,
    })
  } catch (err) {
    return error(res, 500, "Gagal mengambil ringkasan dashboard")
  }
})

export default router
