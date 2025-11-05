# Web Kemenag Magetan

Website resmi Kementerian Agama Kabupaten Magetan yang terdiri dari 3 aplikasi utama: Frontend Publik, Admin Backend (Dashboard), dan API Backend.

## 📋 Daftar Isi

- [Struktur Proyek](#struktur-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Fitur Utama](#fitur-utama)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 📁 Struktur Proyek

```
Web-KemenagMagetan/
├── frontend/              # Website publik (React + Vite)
├── admin-backend/         # Dashboard admin (Next.js)
├── backend/              # REST API Backend (Express.js)
└── uploads/              # Direktori file upload
```

### Frontend (Website Publik)
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS 4
- **Router**: React Router DOM 7
- **Animation**: Framer Motion

### Admin Backend (Dashboard)
- **Framework**: Next.js 15
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend (API Server)
- **Framework**: Express.js 5
- **Database**: MySQL 2 (via mysql2)
- **Security**: Helmet, CORS
- **Performance**: Compression
- **Logging**: Morgan

## 🛠 Teknologi yang Digunakan

### Frontend Stack
- React 19.1.1
- Vite 7.1.2
- Tailwind CSS 4.1.12
- React Router DOM 7.8.1
- Framer Motion 12.23.22
- React Icons 5.5.0

### Admin Stack
- Next.js 15.5.4
- TypeScript
- Radix UI Components
- React Hook Form 7.54.2
- Zod (Validation)
- Recharts (Charts)
- Sonner (Notifications)

### Backend Stack
- Express.js 5.1.0
- MySQL2 3.15.1
- Helmet 7.2.0
- CORS 2.8.5
- Compression 1.7.5
- Morgan 1.10.0
- Body Parser 2.2.0
- Dotenv 16.4.5

## 📋 Persyaratan Sistem

- **Node.js**: v18.x atau lebih tinggi
- **npm**: v9.x atau lebih tinggi / **pnpm**: v8.x atau lebih tinggi
- **MySQL**: v8.x atau lebih tinggi
- **OS**: Windows, Linux, atau MacOS

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/mmdesu26/Web-KemenagMagetan.git
cd Web-KemenagMagetan
```

### 2. Install Dependencies

#### Root Project (Backend API)
```bash
npm install
```

#### Frontend
```bash
cd frontend
npm install
cd ..
```

#### Admin Backend
```bash
cd admin-backend
npm install
# atau gunakan pnpm
pnpm install
cd ..
```

### 3. Setup Database

1. Buat database MySQL:
```sql
CREATE DATABASE kemenag_magetan;
```

2. Import skema database (jika ada file SQL):
```bash
mysql -u root -p kemenag_magetan < database.sql
```

3. Atau jalankan migrasi otomatis saat pertama kali menjalankan backend

## ⚙️ Konfigurasi

### Backend API

Buat file `.env` di folder `backend/`:

```env
# Server Configuration
NODE_ENV=development
HOST=localhost
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=kemenag_magetan

# CORS Configuration
CLIENT_ORIGIN=http://localhost:5173
ADMIN_ORIGIN=http://localhost:3000

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=24h

# Upload Configuration
UPLOADS_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### Admin Backend (Next.js)

Buat file `.env.local` di folder `admin-backend/`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_UPLOADS_URL=http://localhost:5000/uploads

# App Configuration
NEXT_PUBLIC_APP_NAME=Admin Kemenag Magetan
```

### Frontend (React)

Buat file `.env` di folder `frontend/`:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_UPLOADS_URL=http://localhost:5000/uploads

# App Configuration
VITE_APP_NAME=Kemenag Magetan
```

## 🎯 Menjalankan Aplikasi

### Development Mode

#### 1. Jalankan Backend API
```bash
npm run backend:dev
# atau
cd backend
node server.js
```
Backend akan berjalan di: `http://localhost:5000`

#### 2. Jalankan Frontend
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di: `http://localhost:5173`

#### 3. Jalankan Admin Dashboard
```bash
cd admin-backend
npm run dev
# atau
pnpm dev
```
Admin akan berjalan di: `http://localhost:3000`

### Production Mode

#### Build Frontend
```bash
cd frontend
npm run build
npm run preview
```

#### Build Admin
```bash
cd admin-backend
npm run build
npm run start
```

#### Production Backend
```bash
cd backend
NODE_ENV=production node server.js
```

## ✨ Fitur Utama

### Website Publik (Frontend)
- 🏠 Halaman Beranda
- 📰 Berita & Artikel
- 📅 Agenda & Kegiatan
- 🕌 Jadwal Sholat
- 🎥 Galeri Video
- 📱 Responsive Design
- ⚡ Fast Loading (Vite)

### Dashboard Admin
- 🔐 Autentikasi & Autorisasi
- 📊 Dashboard Statistik
- 📝 Manajemen Konten:
  - Berita/Artikel
  - Menu
  - Layanan
  - Video
  - Link Eksternal
  - Agenda
  - Jadwal Sholat
- 👥 Manajemen User
- 📁 File Manager
- 🎨 Modern UI dengan Dark Mode

### Backend API
- 🔒 JWT Authentication
- 🛡️ Security Headers (Helmet)
- 📦 File Upload Management
- 🗄️ MySQL Database Integration
- 🚀 Optimized Performance (Compression)
- 📝 Request Logging (Morgan)
- ⚠️ Error Handling Middleware

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/menus` | Daftar menu |
| GET | `/api/news` | Daftar berita |
| GET | `/api/news/:id` | Detail berita |
| GET | `/api/services` | Daftar layanan |
| GET | `/api/videos` | Daftar video |
| GET | `/api/agendas` | Daftar agenda |
| GET | `/api/prayer-times` | Jadwal sholat |
| GET | `/api/links` | Link eksternal |

### Admin Endpoints (Requires Authentication)

#### Auth
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/admin/auth/login` | Login admin |
| POST | `/api/admin/auth/logout` | Logout admin |
| GET | `/api/admin/auth/me` | Info user login |

#### Dashboard
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/dashboard/stats` | Statistik dashboard |

#### Content Management
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/news` | List berita |
| POST | `/api/admin/news` | Tambah berita |
| PUT | `/api/admin/news/:id` | Update berita |
| DELETE | `/api/admin/news/:id` | Hapus berita |
| GET | `/api/admin/menus` | List menu |
| POST | `/api/admin/menus` | Tambah menu |
| PUT | `/api/admin/menus/:id` | Update menu |
| DELETE | `/api/admin/menus/:id` | Hapus menu |

#### File Management
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/admin/uploads` | Upload file |
| GET | `/api/admin/uploads` | List file |
| DELETE | `/api/admin/uploads/:id` | Hapus file |

#### User Management
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/users` | List users |
| POST | `/api/admin/users` | Tambah user |
| PUT | `/api/admin/users/:id` | Update user |
| DELETE | `/api/admin/users/:id` | Hapus user |

## 📦 Deployment

### Backend (Express)

#### Option 1: VPS/Cloud Server
```bash
# Clone repository
git clone https://github.com/mmdesu26/Web-KemenagMagetan.git
cd Web-KemenagMagetan

# Install dependencies
npm install

# Setup environment
cp .env.example .env
nano .env

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start backend/server.js --name kemenag-api
pm2 save
pm2 startup
```

#### Option 2: Docker
```dockerfile
# Dockerfile untuk backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "backend/server.js"]
```

### Frontend (React + Vite)

#### Build
```bash
cd frontend
npm run build
```

#### Deploy ke Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Deploy ke Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Admin (Next.js)

#### Deploy ke Vercel
```bash
cd admin-backend
vercel --prod
```

#### Self-hosted
```bash
cd admin-backend
npm run build
pm2 start npm --name "kemenag-admin" -- start
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Database Connection Error
1. Pastikan MySQL berjalan
2. Cek kredensial di `.env`
3. Pastikan database sudah dibuat
4. Cek firewall settings

### Module Not Found
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

### Build Error di Admin
```bash
cd admin-backend
rm -rf .next node_modules
pnpm install
pnpm build
```

### CORS Error
- Pastikan `CLIENT_ORIGIN` dan `ADMIN_ORIGIN` di backend `.env` sesuai dengan URL frontend/admin
- Cek konfigurasi CORS di `backend/src/app.js`

## 📝 Development Workflow

### Branching Strategy
```bash
# Create feature branch
git checkout -b feature/nama-fitur

# Create bugfix branch
git checkout -b bugfix/nama-bug

# Merge ke main
git checkout main
git merge feature/nama-fitur
```

### Code Style
- Gunakan ESLint untuk linting
- Format code dengan Prettier
- Follow Airbnb JavaScript Style Guide

### Commit Convention
```
feat: Menambah fitur baru
fix: Memperbaiki bug
docs: Update dokumentasi
style: Format code
refactor: Refactor code
test: Menambah test
chore: Update dependencies
```

## 🤝 Kontribusi

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Proyek ini adalah milik Kementerian Agama Kabupaten Magetan.

## 👥 Tim Pengembang

- **Developer**: mmdesu26
- **Repository**: https://github.com/mmdesu26/Web-KemenagMagetan

## 📞 Kontak & Support

Untuk pertanyaan dan dukungan, silakan buka issue di GitHub atau hubungi tim pengembang.

---

**Last Updated**: October 2025
