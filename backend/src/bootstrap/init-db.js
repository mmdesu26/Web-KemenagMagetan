import fs from "fs"
import path from "path"
import bcrypt from "bcryptjs"
import { fileURLToPath } from "url"
import { env } from "../config/env.js"
import { query } from "../config/database.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ensureUploadsDir = () => {
  if (!fs.existsSync(env.uploadsDir)) {
    fs.mkdirSync(env.uploadsDir, { recursive: true })
  }
}

const createTables = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(150) DEFAULT NULL,
      full_name VARCHAR(150) DEFAULT NULL,
      role ENUM('admin','superadmin') NOT NULL DEFAULT 'admin',
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      last_login DATETIME DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      created_by VARCHAR(100) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS menus (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      path VARCHAR(255) NOT NULL,
      icon VARCHAR(100) DEFAULT NULL,
      parent_id INT DEFAULT NULL,
      order_index INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_menu_parent FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image VARCHAR(255) DEFAULT NULL,
      published_at DATE DEFAULT NULL,
      url VARCHAR(255) DEFAULT NULL,
      status ENUM('draft','published') NOT NULL DEFAULT 'published',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category ENUM('kemenag','umum') NOT NULL DEFAULT 'kemenag',
      title VARCHAR(255) NOT NULL,
      image VARCHAR(255) DEFAULT NULL,
      published_at DATE DEFAULT NULL,
      url VARCHAR(255) DEFAULT NULL,
      status ENUM('draft','published') NOT NULL DEFAULT 'published',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS service_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      icon VARCHAR(20) DEFAULT NULL,
      url VARCHAR(255) DEFAULT NULL,
      order_index INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_service_category FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS videos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      image VARCHAR(255) DEFAULT NULL,
      url VARCHAR(255) DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS external_links (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      image VARCHAR(255) DEFAULT NULL,
      url VARCHAR(255) DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS agendas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      location VARCHAR(255) DEFAULT NULL,
      event_date DATE NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS prayer_times (
      id INT AUTO_INCREMENT PRIMARY KEY,
      schedule_date DATE NOT NULL,
      subuh TIME NOT NULL,
      dzuhur TIME NOT NULL,
      ashar TIME NOT NULL,
      maghrib TIME NOT NULL,
      isya TIME NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_schedule_date (schedule_date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS uploads (
      id INT AUTO_INCREMENT PRIMARY KEY,
      original_name VARCHAR(255) NOT NULL,
      file_name VARCHAR(255) NOT NULL,
      mime_type VARCHAR(100) NOT NULL,
      size BIGINT NOT NULL,
      url VARCHAR(255) NOT NULL,
      uploaded_by VARCHAR(100) DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)
}

const seedAdmins = async () => {
  const [rows] = await query(`SELECT COUNT(*) as total FROM admins`)
  if (rows[0].total > 0) return

  const superPassword = await bcrypt.hash("Superadmin123!", 12)
  const adminPassword = await bcrypt.hash("Admin123!", 12)

  const admins = [
    {
      username: "superadmin",
      password: superPassword,
      email: "superadmin@kemenagmagetan.go.id",
      full_name: "Super Admin",
      role: "superadmin",
      created_by: "system",
    },
    {
      username: "admin",
      password: adminPassword,
      email: "admin@kemenagmagetan.go.id",
      full_name: "Administrator",
      role: "admin",
      created_by: "system",
    },
  ]

  for (const admin of admins) {
    await query(
      `INSERT INTO admins (username, password, email, full_name, role, created_by) VALUES (:username, :password, :email, :full_name, :role, :created_by)`,
      admin,
    )
  }
}

const seedMenus = async () => {
  const [rows] = await query(`SELECT COUNT(*) as total FROM menus`)
  if (rows[0].total > 0) return

  const topMenus = [
    { name: "Beranda", path: "/", order_index: 1 },
    { name: "Profil", path: "/profil", order_index: 2 },
    { name: "Berita", path: "/berita", order_index: 3 },
    { name: "Info Bantuan", path: "/bantuan", order_index: 4 },
    { name: "Layanan", path: "/layanan", order_index: 5 },
    { name: "PTSP", path: "/ptsp", order_index: 6 },
    { name: "PPID", path: "/ppid", order_index: 7 },
    { name: "FAQ", path: "/faq", order_index: 8 },
  ]

  const submenuMap = {
    Profil: [
      { name: "Sejarah Instansi", path: "/profil/sejarah", order_index: 1 },
      { name: "Visi & Misi", path: "/profil/visi-misi", order_index: 2 },
      { name: "Tugas Pokok & Fungsi", path: "/profil/tupoksi", order_index: 3 },
      { name: "Kepala Kemenag", path: "/profil/kepala", order_index: 4 },
      { name: "Struktur Organisasi", path: "/profil/struktur", order_index: 5 },
    ],
    Layanan: [
      { name: "Standar Pelayanan", path: "/layanan/standar-pelayanan", order_index: 1 },
      { name: "SOP (Standar Operasional Prosedur)", path: "/layanan/sop", order_index: 2 },
      { name: "SPM (Standar Pelayanan Minimal)", path: "/layanan/spm", order_index: 3 },
    ],
    PTSP: [
      { name: "Tugas PTSP", path: "/ptsp/tugas", order_index: 1 },
      { name: "PTSP Online", path: "/ptsp/online", order_index: 2 },
    ],
    PPID: [
      { name: "Data Kemenag Magetan", path: "/ppid/data-kemenag", order_index: 1 },
      { name: "Tugas PPID", path: "/ppid/tugas", order_index: 2 },
      { name: "Informasi Berkala", path: "/ppid/informasi-berkala", order_index: 3 },
      { name: "Informasi Serta Merta", path: "/ppid/informasi-serta-merta", order_index: 4 },
      { name: "Informasi Setiap Saat", path: "/ppid/informasi-setiap-saat", order_index: 5 },
    ],
  }

  const parentIds = {}

  for (const menu of topMenus) {
    const [result] = await query(
      `INSERT INTO menus (name, path, order_index, parent_id, is_active) VALUES (:name, :path, :order_index, NULL, 1)`,
      menu,
    )
    parentIds[menu.name] = result.insertId
  }

  for (const [parentName, items] of Object.entries(submenuMap)) {
    const parentId = parentIds[parentName]
    if (!parentId) continue
    for (const item of items) {
      await query(
        `INSERT INTO menus (name, path, order_index, parent_id, is_active) VALUES (:name, :path, :order_index, :parent_id, 1)`,
        { ...item, parent_id: parentId },
      )
    }
  }
}

const seedArticles = async () => {
  const [rows] = await query(`SELECT COUNT(*) as total FROM articles`)
  if (rows[0].total > 0) return

  const data = [
    {
      title: "Selamat Datang di Pusaka V3",
      description: "Pusaka V3 hadir dengan tampilan baru, fitur lebih lengkap, dan akses lebih mudah.",
      image: "/assets/images/artikel1.jpg",
      published_at: "2025-08-01",
      url: "/articles/selamat-datang-pusaka-v3",
    },
    {
      title: "Ucapan Menteri Agama",
      description: "Pesan khusus Menteri Agama dalam rangka memperingati Hari Santri Nasional.",
      image: "/assets/images/artikel2.jpg",
      published_at: "2025-07-25",
      url: "/articles/ucapan-menag",
    },
    {
      title: "Notifikasi Pusaka V3",
      description: "Kini tersedia fitur notifikasi untuk memudahkan jamaah dalam mengakses layanan.",
      image: "/assets/images/artikel3.jpg",
      published_at: "2025-07-20",
      url: "/articles/notifikasi-pusaka-v3",
    },
  ]

  for (const article of data) {
    await query(
      `INSERT INTO articles (title, description, image, published_at, url, status) VALUES (:title, :description, :image, :published_at, :url, 'published')`,
      article,
    )
  }
}

const seedNews = async () => {
  const [rows] = await query(`SELECT COUNT(*) as total FROM news`)
  if (rows[0].total > 0) return

  const data = [
    {
      category: "kemenag",
      title: "Kemenag Magetan Raih Penghargaan Zona Integritas 2025",
      image: "/assets/images/news1.jpeg",
      published_at: "2025-08-10",
      url: "/news/zona-integritas-2025",
    },
    {
      category: "kemenag",
      title: "Pemberangkatan Jamaah Haji Kloter Pertama Tahun 2025",
      image: "/assets/images/news2.jpg",
      published_at: "2025-07-30",
      url: "/news/pemberangkatan-haji-2025",
    },
    {
      category: "kemenag",
      title: "ASN Kemenag Raih Penghargaan Inovasi Pelayanan Publik",
      image: "/assets/images/news3.jpg",
      published_at: "2025-07-20",
      url: "/news/asn-inovasi-2025",
    },
    {
      category: "umum",
      title: "Magetan Gelar Festival Santri Nasional",
      image: "/assets/images/news1.jpeg",
      published_at: "2025-07-18",
      url: "/news/festival-santri-2025",
    },
    {
      category: "umum",
      title: "Pemkab Magetan Luncurkan Program Beasiswa Pendidikan",
      image: "/assets/images/news2.jpg",
      published_at: "2025-06-25",
      url: "/news/beasiswa-pendidikan-2025",
    },
    {
      category: "umum",
      title: "Hari Pramuka ke-64 Diperingati di Magetan",
      image: "/assets/images/news3.jpg",
      published_at: "2025-06-15",
      url: "/news/hari-pramuka-64",
    },
  ]

  for (const item of data) {
    await query(
      `INSERT INTO news (category, title, image, published_at, url, status) VALUES (:category, :title, :image, :published_at, :url, 'published')`,
      item,
    )
  }
}

const seedServices = async () => {
  const [rows] = await query(`SELECT COUNT(*) as total FROM service_categories`)
  if (rows[0].total > 0) return

  const categories = [
    {
      name: "Layanan Keagamaan",
      services: [
        { name: "Pendaftaran Sertifikasi Halal", icon: "✅", url: "/layanan/sertifikasi-halal" },
        { name: "Haji & Umrah", icon: "🕋", url: "/layanan/haji-umrah" },
        { name: "Buku Manasik Haji dan Umrah Jamaah Lansia", icon: "📖", url: "/layanan/buku-manasik-lansia" },
        { name: "Buku Manasik Haji dan Umrah", icon: "📖", url: "/layanan/buku-manasik" },
        { name: "Doa dan Dzikir Manasik Haji dan Umrah", icon: "🙏", url: "/layanan/doa-dzikir" },
        { name: "Alkitab Katolik (Audio)", icon: "🎧", url: "/layanan/alkitab-audio" },
        { name: "Video Serial Manasik Haji", icon: "🎥", url: "/layanan/video-manasik" },
        { name: "Pendaftaran Izin Produksi Batik Haji", icon: "🧵", url: "/layanan/batik-haji" },
        { name: "Pendaftaran Petugas Haji", icon: "🧑‍💼", url: "/layanan/petugas-haji" },
        { name: "Pendaftaran Media Center Haji 2024", icon: "📰", url: "/layanan/media-center-haji" },
      ],
    },
    {
      name: "Layanan Pendidikan",
      services: [
        { name: "Video Pembelajaran", icon: "📺", url: "/layanan/video-pembelajaran" },
        { name: "Lembaga Pendidikan", icon: "🏫", url: "/layanan/lembaga-pendidikan" },
        { name: "Layanan EMIS", icon: "🗂️", url: "/layanan/emis" },
      ],
    },
    {
      name: "Layanan Favorit",
      services: [
        { name: "Layanan Pusaka", icon: "⭐", url: "/layanan/pusaka" },
        { name: "Favorit", icon: "❤️", url: "/layanan/favorit" },
        { name: "Layanan Publik", icon: "🌍", url: "/layanan/publik" },
        { name: "Layanan Terpadu", icon: "🔗", url: "/layanan/terpadu" },
        { name: "Layanan Internal", icon: "🔒", url: "/layanan/internal" },
      ],
    },
    {
      name: "Layanan Publik",
      services: [{ name: "Pengaduan Masyarakat", icon: "📢", url: "/layanan/pengaduan" }],
    },
    {
      name: "Layanan Terpadu",
      services: [
        { name: "SIM SDM", icon: "👥", url: "/layanan/sim-sdm" },
        { name: "Layanan Rawat Kerukunan", icon: "🤝", url: "/layanan/rawat-kerukunan" },
        { name: "MOOC PINTAR", icon: "💻", url: "/layanan/mooc-pintar" },
        { name: "Beasiswa Indonesia Bangkit", icon: "🎓", url: "/layanan/beasiswa-indonesia" },
        { name: "Tashih Al-Qur'an", icon: "📜", url: "/layanan/tashih" },
        { name: "Pelatihan Jarak Jauh", icon: "🌐", url: "/layanan/pelatihan-online" },
        { name: "Perpustakaan Digital", icon: "📚", url: "/layanan/perpus-digital" },
        { name: "Layanan Pendidikan Tinggi Islam", icon: "🏛️", url: "/layanan/pti" },
        { name: "Layanan Kanwil Bali", icon: "🌴", url: "/layanan/kanwil-bali" },
        { name: "Penilaian Buku Pendidikan Agama", icon: "📖", url: "/layanan/penilaian-buku" },
        { name: "Layanan SIP2KAT", icon: "📊", url: "/layanan/sip2kat" },
        { name: "E-Registrasi Rumah Ibadat Katolik", icon: "⛪", url: "/layanan/eregistrasi-rumah-ibadat" },
        { name: "Sistem PAK Dosen Bimas Katolik", icon: "👨‍🏫", url: "/layanan/pak-dosen" },
        { name: "Layanan SIBANDOKAT", icon: "📑", url: "/layanan/sibandokat" },
        { name: "Layanan SITARA", icon: "🗄️", url: "/layanan/sitara" },
      ],
    },
    {
      name: "Layanan Internal",
      services: [
        { name: "Bantuan", icon: "🤲", url: "/layanan/bantuan" },
        { name: "Pelatihan", icon: "📘", url: "/layanan/pelatihan" },
        { name: "Beasiswa", icon: "🎓", url: "/layanan/beasiswa" },
        { name: "Rekap Bantuan", icon: "📝", url: "/layanan/rekap-bantuan" },
        { name: "Rekap Beasiswa", icon: "📊", url: "/layanan/rekap-beasiswa" },
      ],
    },
  ]

  for (const [index, category] of categories.entries()) {
    const [result] = await query(
      `INSERT INTO service_categories (name) VALUES (:name)`,
      { name: category.name },
    )
    const categoryId = result.insertId
    for (const [serviceIndex, service] of category.services.entries()) {
      await query(
        `INSERT INTO services (category_id, name, icon, url, order_index) VALUES (:category_id, :name, :icon, :url, :order_index)`,
        {
          category_id: categoryId,
          name: service.name,
          icon: service.icon,
          url: service.url,
          order_index: serviceIndex + 1,
        },
      )
    }
  }
}

const seedVideos = async () => {
  const [rows] = await query(`SELECT COUNT(*) as total FROM videos`)
  if (rows[0].total > 0) return

  const data = [
    {
      title: "Tutorial Pendaftaran Sertifikasi Halal",
      image: "/assets/images/video1.jpg",
      url: "https://www.youtube.com/watch?v=abcd1234",
    },
    {
      title: "Panduan Manasik Haji Lansia",
      image: "/assets/images/video2.jpg",
      url: "https://www.youtube.com/watch?v=efgh5678",
    },
    {
      title: "MOOC Pintar - Belajar Agama Digital",
      image: "/assets/images/video3.jpg",
      url: "https://www.youtube.com/watch?v=ijkl9101",
    },
    {
      title: "Ucapan Menteri Agama Hari Santri 2025",
      image: "/assets/images/video1.jpg",
      url: "https://www.youtube.com/watch?v=mnop1121",
    },
  ]

  for (const item of data) {
    await query(
      `INSERT INTO videos (title, image, url) VALUES (:title, :image, :url)`,
      item,
    )
  }
}

const seedLinks = async () => {
  const [rows] = await query(`SELECT COUNT(*) as total FROM external_links`)
  if (rows[0].total > 0) return

  const data = [
    {
      title: "Kementerian Agama RI",
      image: "/assets/images/link1.png",
      url: "https://kemenag.go.id",
    },
    {
      title: "Sistem Informasi Haji Terpadu (SISKOHAT)",
      image: "/assets/images/link2.png",
      url: "https://siskohat.kemenag.go.id",
    },
    {
      title: "Lembaga Sertifikasi Halal",
      image: "/assets/images/link3.png",
      url: "https://halal.go.id",
    },
    {
      title: "Perguruan Tinggi Keagamaan Islam Negeri (PTKIN)",
      image: "/assets/images/link1.png",
      url: "https://ptkin.ac.id",
    },
    {
      title: "Direktorat Jenderal Bimas Kristen",
      image: "/assets/images/link2.png",
      url: "https://bimaskristen.kemenag.go.id",
    },
    {
      title: "Direktorat Jenderal Bimas Katolik",
      image: "/assets/images/link3.png",
      url: "https://bimaskatolik.kemenag.go.id",
    },
  ]

  for (const item of data) {
    await query(
      `INSERT INTO external_links (title, image, url) VALUES (:title, :image, :url)`,
      item,
    )
  }
}

const seedAgendas = async () => {
  const [rows] = await query(`SELECT COUNT(*) as total FROM agendas`)
  if (rows[0].total > 0) return

  const data = [
    {
      title: "Apel Pagi ASN Kemenag",
      description: "Apel pagi seluruh ASN Kemenag Magetan",
      location: "Halaman Kantor Kemenag Magetan",
      event_date: "2025-08-15",
    },
    {
      title: "Pelatihan Digitalisasi Layanan",
      description: "Pelatihan untuk seluruh petugas layanan digital",
      location: "Aula Kemenag Magetan",
      event_date: "2025-08-17",
    },
    {
      title: "Pengajian Bulanan",
      description: "Pengajian bulanan untuk masyarakat umum",
      location: "Masjid Agung Magetan",
      event_date: "2025-08-20",
    },
    {
      title: "Rapat Koordinasi",
      description: "Rapat koordinasi dengan seluruh kepala seksi",
      location: "Ruang Rapat Kemenag",
      event_date: "2025-08-25",
    },
  ]

  for (const item of data) {
    await query(
      `INSERT INTO agendas (title, description, location, event_date) VALUES (:title, :description, :location, :event_date)`,
      item,
    )
  }
}

const seedPrayerTimes = async () => {
  const today = new Date()
  const [rows] = await query(`SELECT COUNT(*) as total FROM prayer_times WHERE schedule_date = :schedule_date`, {
    schedule_date: today.toISOString().split("T")[0],
  })
  if (rows[0].total > 0) return

  await query(
    `INSERT INTO prayer_times (schedule_date, subuh, dzuhur, ashar, maghrib, isya) VALUES (:schedule_date, :subuh, :dzuhur, :ashar, :maghrib, :isya)
    ON DUPLICATE KEY UPDATE subuh = VALUES(subuh), dzuhur = VALUES(dzuhur), ashar = VALUES(ashar), maghrib = VALUES(maghrib), isya = VALUES(isya)`,
    {
      schedule_date: today.toISOString().split("T")[0],
      subuh: "04:30:00",
      dzuhur: "12:00:00",
      ashar: "15:15:00",
      maghrib: "18:00:00",
      isya: "19:15:00",
    },
  )
}

const seedVideosAndMore = async () => {
  await Promise.all([seedVideos(), seedLinks(), seedAgendas(), seedPrayerTimes()])
}

export const initDatabase = async () => {
  ensureUploadsDir()
  await createTables()
  await seedAdmins()
  await seedMenus()
  await seedArticles()
  await seedNews()
  await seedServices()
  await seedVideosAndMore()
}
