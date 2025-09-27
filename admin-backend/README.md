# Kemenag Magetan Admin Backend

Sistem administrasi backend untuk website Kementerian Agama Kabupaten Magetan yang dibangun dengan Next.js, TypeScript, dan SQLite.

## Fitur Utama

- 🔐 **Sistem Autentikasi** - Login/logout admin dengan JWT
- 📰 **Manajemen Berita** - CRUD berita dengan kategori dan status
- 🧭 **Manajemen Menu** - Kelola menu navigasi website
- 👥 **Manajemen Admin** - Kelola akun administrator
- 📁 **Upload File** - Upload dan manajemen file media
- 📱 **Responsive Design** - Tampilan optimal di semua perangkat
- 🎨 **UI Modern** - Interface yang clean dan user-friendly
- ⚡ **Performance** - Optimasi kecepatan dan caching

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite dengan Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animation**: Framer Motion
- **Icons**: React Icons
- **Authentication**: JWT
- **Validation**: Zod

## Instalasi

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Setup Project

1. **Clone repository**
\`\`\`bash
git clone <repository-url>
cd kemenag-admin-backend
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# atau
yarn install
\`\`\`

3. **Setup environment variables**
\`\`\`bash
cp .env.example .env
\`\`\`

Edit file `.env` dan sesuaikan konfigurasi:

\`\`\`env
# Database
DATABASE_URL="sqlite:./database.db"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"

# Application
NODE_ENV="development"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Lihat .env.example untuk konfigurasi lengkap
\`\`\`

4. **Setup database**
\`\`\`bash
npm run db:generate
npm run db:migrate
npm run db:seed
\`\`\`

5. **Run development server**
\`\`\`bash
npm run dev
\`\`\`

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Project

\`\`\`
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── (frontend)/        # Public website pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── frontend/         # Frontend components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── config.ts         # Environment configuration
│   ├── database.ts       # Database connection
│   ├── auth.ts           # Authentication utilities
│   └── api-client.ts     # API client
├── hooks/                # Custom React hooks
├── scripts/              # Database scripts
└── public/               # Static assets
\`\`\`

## Konfigurasi Environment

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | Database connection string | `sqlite:./database.db` | ✅ |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | - | ✅ |
| `NODE_ENV` | Environment mode | `development` | ❌ |
| `PORT` | Server port | `3000` | ❌ |
| `NEXT_PUBLIC_BASE_URL` | Base URL for frontend | `http://localhost:3000` | ❌ |

### Feature Flags

| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_REGISTRATION` | Allow new admin registration | `true` |
| `ENABLE_FILE_UPLOAD` | Enable file upload feature | `true` |
| `ENABLE_EMAIL_NOTIFICATIONS` | Send email notifications | `false` |
| `ENABLE_AUDIT_LOG` | Log admin activities | `true` |

### File Upload Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `MAX_FILE_SIZE` | Maximum file size in bytes | `5242880` (5MB) |
| `ALLOWED_FILE_TYPES` | Comma-separated allowed MIME types | `image/jpeg,image/png,image/gif,image/webp,application/pdf` |
| `UPLOAD_DIR` | Upload directory path | `./public/uploads` |

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current admin info

### News Management
- `GET /api/news` - Get news list
- `POST /api/news` - Create news
- `GET /api/news/[id]` - Get news by ID
- `PUT /api/news/[id]` - Update news
- `DELETE /api/news/[id]` - Delete news

### Menu Management
- `GET /api/menus` - Get menu list
- `POST /api/menus` - Create menu
- `PUT /api/menus/[id]` - Update menu
- `DELETE /api/menus/[id]` - Delete menu

### File Upload
- `POST /api/upload` - Upload files
- `GET /api/files` - Get file list
- `DELETE /api/files/[id]` - Delete file

### Admin Management
- `GET /api/users` - Get admin list
- `POST /api/users` - Create admin
- `PUT /api/users/[id]` - Update admin
- `DELETE /api/users/[id]` - Delete admin

## Database Schema

### Users (Admins)
\`\`\`sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  isActive BOOLEAN DEFAULT true,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### News
\`\`\`sql
CREATE TABLE news (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  image TEXT,
  author TEXT NOT NULL,
  publishedAt TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Menus
\`\`\`sql
CREATE TABLE menus (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  order INTEGER DEFAULT 0,
  isActive BOOLEAN DEFAULT true,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Scripts

\`\`\`bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate database migrations
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with initial data
npm run db:studio       # Open database studio

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript check
\`\`\`

## Default Admin Account

Setelah menjalankan `npm run db:seed`, akun admin default akan dibuat:

- **Username**: `admin`
- **Email**: `admin@kemenag-magetan.go.id`
- **Password**: `admin123`

⚠️ **Penting**: Ubah password default setelah login pertama!

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub repository
2. Connect repository di Vercel dashboard
3. Set environment variables di Vercel
4. Deploy otomatis akan berjalan

### Manual Deployment

1. **Build aplikasi**
\`\`\`bash
npm run build
\`\`\`

2. **Setup production environment**
\`\`\`bash
cp .env.example .env.production
# Edit .env.production dengan konfigurasi production
\`\`\`

3. **Run production server**
\`\`\`bash
npm start
\`\`\`

## Troubleshooting

### Database Issues

**Error: Database locked**
\`\`\`bash
# Stop semua proses yang menggunakan database
# Restart development server
npm run dev
\`\`\`

**Error: Migration failed**
\`\`\`bash
# Reset database (HATI-HATI: akan menghapus semua data)
rm database.db
npm run db:migrate
npm run db:seed
\`\`\`

### Authentication Issues

**Error: JWT malformed**
- Pastikan `JWT_SECRET` sudah diset dengan benar
- Clear browser cookies dan localStorage
- Login ulang

### File Upload Issues

**Error: File too large**
- Check `MAX_FILE_SIZE` di environment variables
- Pastikan file tidak melebihi batas yang ditentukan

**Error: File type not allowed**
- Check `ALLOWED_FILE_TYPES` di environment variables
- Pastikan tipe file sudah diizinkan

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

Untuk bantuan dan support, silakan hubungi:
- Email: admin@kemenag-magetan.go.id
- Phone: (0351) 1234567
