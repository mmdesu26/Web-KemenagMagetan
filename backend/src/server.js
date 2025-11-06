import { env } from "./config/env.js"
import app from "./app.js"
import { initDatabase } from "./bootstrap/init-db.js"

const start = async () => {
  try {
    await initDatabase()
    app.listen(env.port, env.host, () => {
      console.log(`Backend berjalan di http://${env.host}:${env.port}`)
    })
  } catch (err) {
    console.error("Gagal memulai server backend", err)
    process.exit(1)
  }
}

start()
