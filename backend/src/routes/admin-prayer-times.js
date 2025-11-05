import { Router } from "express"
import { body, query as queryValidator, validationResult } from "express-validator"
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
  validate([queryValidator("date").optional().isISO8601().withMessage("Tanggal tidak valid")]),
  async (req, res) => {
    const date = req.query.date || new Date().toISOString().split("T")[0]
    try {
      const [rows] = await query(
        `SELECT id, schedule_date as scheduleDate, subuh, dzuhur, ashar, maghrib, isya
         FROM prayer_times
         WHERE schedule_date = :schedule_date`,
        { schedule_date: date },
      )
      return success(res, rows.length > 0 ? rows[0] : null)
    } catch (err) {
      return error(res, 500, "Gagal mengambil jadwal sholat")
    }
  },
)

router.post(
  "/",
  validate([
    body("scheduleDate").notEmpty().isISO8601().withMessage("Tanggal tidak valid"),
    body("subuh").notEmpty().matches(/^\d{2}:\d{2}$/),
    body("dzuhur").notEmpty().matches(/^\d{2}:\d{2}$/),
    body("ashar").notEmpty().matches(/^\d{2}:\d{2}$/),
    body("maghrib").notEmpty().matches(/^\d{2}:\d{2}$/),
    body("isya").notEmpty().matches(/^\d{2}:\d{2}$/),
  ]),
  async (req, res) => {
    const { scheduleDate, subuh, dzuhur, ashar, maghrib, isya } = req.body
    try {
      await query(
        `INSERT INTO prayer_times (schedule_date, subuh, dzuhur, ashar, maghrib, isya)
         VALUES (:schedule_date, :subuh, :dzuhur, :ashar, :maghrib, :isya)
         ON DUPLICATE KEY UPDATE subuh = VALUES(subuh), dzuhur = VALUES(dzuhur), ashar = VALUES(ashar), maghrib = VALUES(maghrib), isya = VALUES(isya)`,
        { schedule_date: scheduleDate, subuh: `${subuh}:00`, dzuhur: `${dzuhur}:00`, ashar: `${ashar}:00`, maghrib: `${maghrib}:00`, isya: `${isya}:00` },
      )
      const [rows] = await query(
        `SELECT id, schedule_date as scheduleDate, subuh, dzuhur, ashar, maghrib, isya
         FROM prayer_times WHERE schedule_date = :schedule_date`,
        { schedule_date: scheduleDate },
      )
      return success(res, rows[0], "Jadwal sholat berhasil disimpan")
    } catch (err) {
      return error(res, 500, "Gagal menyimpan jadwal sholat")
    }
  },
)

export default router
