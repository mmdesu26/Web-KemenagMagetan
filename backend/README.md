# Backend API - Kemenag Magetan

REST API untuk Website Kemenag Magetan yang dibangun dengan Express.js dan MySQL.

## 🚀 Teknologi

- **Express.js** 5.1.0 - Web Framework
- **MySQL2** 3.15.1 - Database Driver
- **bcryptjs** - Password Hashing
- **Helmet** - Security Headers
- **CORS** - Cross-Origin Resource Sharing
- **Compression** - Response Compression
- **Morgan** - HTTP Logger
- **Dotenv** - Environment Variables

## 📁 Struktur Folder

```
backend/
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── bootstrap/          # Database initialization
│   │   └── init-db.js      # Table creation & seeding
│   ├── config/
│   │   ├── database.js     # MySQL connection pool
│   │   └── env.js          # Environment variables
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication
│   │   └── error-handler.js
│   ├── routes/             # API routes
│   │   ├── public.js       # Public endpoints
│   │   ├── admin-*.js      # Admin endpoints
│   │   └── ...
│   └── utils/
│       └── responses.js    # Response helpers
├── uploads/                # File uploads directory
├── .env                    # Environment variables (create this!)
├── .env.example            # Environment template
├── server.js               # Entry point
└── package.json
```

## 🛠 Instalasi

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup MySQL Database

Pastikan MySQL server sudah berjalan:

```bash
# Cek status MySQL (Windows with XAMPP)
# Buka XAMPP Control Panel dan start MySQL

# Atau cek via command line
mysql --version
```

Buat database baru:

```sql
CREATE DATABASE kemenag_magetan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Konfigurasi Environment Variables

Salin file `.env.example` menjadi `.env`:

```bash
copy .env.example .env
```

Edit file `.env` dan sesuaikan dengan konfigurasi Anda:

```env
# Server Configuration
NODE_ENV=development
BACKEND_HOST=0.0.0.0
BACKEND_PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=kemenag_magetan

# CORS Configuration
CLIENT_ORIGIN=http://localhost:5173
ADMIN_ORIGIN=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
```

**⚠️ PENTING**: Ganti `DB_PASSWORD` dengan password MySQL Anda!

### 4. Jalankan Backend

```bash
# Development mode
npm run dev

# atau dari root project
cd ..
npm run backend:dev
```

Backend akan berjalan di `http://localhost:5000`

## 🔧 Troubleshooting

### ❌ Error: "Backend berjalan" muncul tapi langsung berhenti

**Penyebab**: Database connection gagal

**Solusi**:

1. **Cek MySQL berjalan**:
   ```bash
   # Windows - Cek process MySQL
   tasklist | findstr mysql
   
   # Atau buka XAMPP Control Panel dan pastikan MySQL hijau
   ```

2. **Verifikasi kredensial database** di `.env`:
   - `DB_HOST`: biasanya `localhost` atau `127.0.0.1`
   - `DB_USER`: biasanya `root`
   - `DB_PASSWORD`: password MySQL Anda (kosongkan jika no password)
   - `DB_NAME`: `kemenag_magetan` (harus sudah dibuat!)

3. **Test koneksi manual**:
   ```bash
   mysql -u root -p
   # Masukkan password
   
   # Di MySQL prompt:
   SHOW DATABASES;
   USE kemenag_magetan;
   SHOW TABLES;
   ```

4. **Jalankan backend dengan error detail**:
   ```bash
   node backend/server.js
   ```
   Lihat error message yang muncul.

### ❌ Error: "Failed to load resource: net::ERR_CONNECTION_REFUSED"

**Penyebab**: Backend tidak benar-benar berjalan atau crash setelah start

**Solusi**:

1. **Pastikan backend tetap running**:
   - Jangan tutup terminal setelah menjalankan `npm run backend:dev`
   - Jika backend crash, error akan muncul di terminal

2. **Test endpoint langsung**:
   ```bash
   # PowerShell
   Invoke-RestMethod -Uri http://localhost:5000/health
   
   # Atau buka browser ke:
   # http://localhost:5000/health
   ```
   
   Response yang benar:
   ```json
   {"status":"ok","timestamp":"2025-10-03T..."}
   ```

3. **Cek port tidak bentrok**:
   ```bash
   # Windows - Cek apa yang pakai port 5000
   netstat -ano | findstr :5000
   
   # Jika ada, kill process atau ganti port di .env
   ```

4. **Pastikan file .env ada**:
   ```bash
   # Dari folder backend
   dir .env
   
   # Jika tidak ada, salin dari .env.example
   copy .env.example .env
   ```

### ❌ Error: Cannot find module 'mysql2'

**Solusi**:
```bash
cd backend
npm install
```

### ❌ Error: ER_BAD_DB_ERROR: Unknown database 'kemenag_magetan'

**Solusi**:
```bash
mysql -u root -p
# Di MySQL:
CREATE DATABASE kemenag_magetan;
exit;
```

### ❌ Error: ER_ACCESS_DENIED_ERROR

**Solusi**: Password MySQL salah. Update `DB_PASSWORD` di `.env`

## 📝 API Endpoints

### Public Endpoints

```
GET  /health                              - Health check
GET  /api/public/menus                    - Daftar menu
GET  /api/public/articles?limit=10        - Artikel
GET  /api/public/news?category=kemenag    - Berita
GET  /api/public/services                 - Layanan
GET  /api/public/videos                   - Video
GET  /api/public/links                    - Link eksternal
GET  /api/public/agendas                  - Agenda
GET  /api/public/prayer-times?date=2025-10-03 - Jadwal sholat
```

### Admin Endpoints (Requires JWT Token)

```
POST /api/admin/auth/login                - Login admin
POST /api/admin/auth/logout               - Logout
GET  /api/admin/auth/me                   - User info

GET  /api/admin/dashboard/stats           - Dashboard stats

# Content Management
GET/POST/PUT/DELETE /api/admin/news       - Berita
GET/POST/PUT/DELETE /api/admin/articles   - Artikel
GET/POST/PUT/DELETE /api/admin/menus      - Menu
GET/POST/PUT/DELETE /api/admin/services   - Layanan
GET/POST/PUT/DELETE /api/admin/videos     - Video
GET/POST/PUT/DELETE /api/admin/links      - Link
GET/POST/PUT/DELETE /api/admin/agendas    - Agenda
GET/POST/PUT/DELETE /api/admin/prayer-times - Jadwal sholat

POST   /api/admin/uploads                 - Upload file
GET    /api/admin/uploads                 - List files
DELETE /api/admin/uploads/:id             - Delete file

GET/POST/PUT/DELETE /api/admin/users      - User management
```

## 🔐 Default Admin Accounts

Setelah pertama kali menjalankan backend, admin default akan dibuat:

**Super Admin**:
- Username: `superadmin`
- Password: `Superadmin123!`

**Admin**:
- Username: `admin`
- Password: `Admin123!`

⚠️ **WAJIB ganti password ini di production!**

## 🗄️ Database Schema

Backend akan otomatis membuat tabel-tabel berikut:

- `admins` - User admin
- `menus` - Menu navigasi
- `articles` - Artikel
- `news` - Berita
- `service_categories` - Kategori layanan
- `services` - Layanan
- `videos` - Video
- `external_links` - Link eksternal
- `agendas` - Agenda kegiatan
- `prayer_times` - Jadwal sholat
- `uploads` - File uploads

## 🚀 Production Deployment

### Environment Variables untuk Production

```env
NODE_ENV=production
BACKEND_HOST=0.0.0.0
BACKEND_PORT=5000

DB_HOST=your-production-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-strong-password
DB_NAME=kemenag_magetan

CLIENT_ORIGIN=https://kemenagmagetan.id
ADMIN_ORIGIN=https://admin.kemenagmagetan.id

JWT_SECRET=your-very-strong-jwt-secret-min-32-chars
JWT_EXPIRES_IN=24h
```

### Deploy dengan PM2

```bash
# Install PM2
npm install -g pm2

# Start backend
pm2 start backend/server.js --name kemenag-api

# Save process list
pm2 save

# Setup auto-restart on boot
pm2 startup
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name api.kemenagmagetan.id;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads {
        alias /path/to/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

## 📊 Monitoring

### Check Backend Status

```bash
# PowerShell
Invoke-RestMethod -Uri http://localhost:5000/health

# atau curl
curl http://localhost:5000/health
```

### View Logs

```bash
# PM2 logs
pm2 logs kemenag-api

# PM2 monitoring
pm2 monit
```

## 🤝 Development Tips

### Hot Reload Development

Install `nodemon` untuk auto-restart:

```bash
npm install -g nodemon

# Jalankan dengan nodemon
nodemon backend/server.js
```

### Database Reset

Jika ingin reset database:

```sql
DROP DATABASE kemenag_magetan;
CREATE DATABASE kemenag_magetan;
```

Lalu restart backend - semua tabel dan data default akan dibuat ulang.

### Testing API

Gunakan tools berikut untuk testing:
- **Postman**: https://www.postman.com/
- **Thunder Client**: VS Code extension
- **curl** atau PowerShell `Invoke-RestMethod`

Contoh test login:

```bash
Invoke-RestMethod -Method POST -Uri http://localhost:5000/api/admin/auth/login -Body (@{username="admin";password="Admin123!"} | ConvertTo-Json) -ContentType "application/json"
```

## 📞 Support

Jika masih ada masalah:

1. Cek log error di terminal backend
2. Verifikasi semua langkah di troubleshooting sudah dilakukan
3. Pastikan MySQL service berjalan
4. Pastikan file `.env` sudah dikonfigurasi dengan benar

---

**Last Updated**: October 2025
**Maintained by**: mmdesu26
