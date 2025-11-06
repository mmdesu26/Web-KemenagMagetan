import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import morgan from "morgan"
import { env } from "./config/env.js"
import publicRouter from "./routes/public.js"
import adminAuthRouter from "./routes/admin-auth.js"
import adminMenusRouter from "./routes/admin-menus.js"
import adminArticlesRouter from "./routes/admin-articles.js"
import adminNewsRouter from "./routes/admin-news.js"
import adminServicesRouter from "./routes/admin-services.js"
import adminVideosRouter from "./routes/admin-videos.js"
import adminLinksRouter from "./routes/admin-links.js"
import adminAgendasRouter from "./routes/admin-agendas.js"
import adminPrayerTimesRouter from "./routes/admin-prayer-times.js"
import adminUploads from './routes/admin-uploads.js';
import adminUploadsRouter from "./routes/admin-uploads.js";
import adminUsersRouter from "./routes/admin-users.js"
import adminDashboardRouter from "./routes/admin-dashboard.js"
import { notFoundHandler, errorHandler } from "./middleware/error-handler.js"

const app = express()

const allowedOrigins = Array.from(new Set([env.clientOrigin, env.adminOrigin])).filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, origin)
      }
      return callback(null, false)
    },
    credentials: true,
  }),
)

app.use(helmet())
app.use(compression())
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"))

// Global CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "HEAD", "OPTIONS"],
  allowedHeaders: ["*"],
}))

// Serve uploads folder
app.use('/uploads', express.static(env.uploadsDir, {
  setHeaders(res) {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin")
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless")
    res.setHeader("Cache-Control", "public, max-age=31536000")
  },
}))


app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.use("/api/public", publicRouter)
app.use("/api/admin/auth", adminAuthRouter)
app.use("/api/admin/menus", adminMenusRouter)
app.use("/api/admin/articles", adminArticlesRouter)
app.use("/api/admin/news", adminNewsRouter)
app.use("/api/admin/services", adminServicesRouter)
app.use("/api/admin/videos", adminVideosRouter)
app.use("/api/admin/links", adminLinksRouter)
app.use("/api/admin/agendas", adminAgendasRouter)
app.use("/api/admin/prayer-times", adminPrayerTimesRouter)
app.use("/api/admin/uploads", adminUploadsRouter)
app.use("/api/admin/users", adminUsersRouter)
app.use("/api/admin/dashboard", adminDashboardRouter)
app.use('/uploads', adminUploads);

app.use(notFoundHandler)
app.use(errorHandler)

export default app
