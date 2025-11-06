# Frontend - Website Kemenag Magetan

Website publik untuk Kementerian Agama Kabupaten Magetan yang dibangun dengan React dan Vite.

## 🚀 Teknologi

- **React** 19.1.1 - UI Library
- **Vite** 7.1.2 - Build Tool & Dev Server
- **React Router DOM** 7.8.1 - Routing
- **Tailwind CSS** 4.1.12 - Styling
- **Framer Motion** 12.23.12 - Animations
- **React Icons** 5.5.0 - Icon Library

## 📁 Struktur Folder

```
frontend/
├── public/              # Static assets
│   └── assets/         # Images, fonts, etc
├── src/
│   ├── api/            # API service functions
│   ├── assets/         # Images & media
│   ├── components/     # Reusable components
│   ├── views/          # Page components
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## 🛠 Instalasi

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## ⚙️ Konfigurasi

Buat file `.env` di root folder frontend:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_UPLOADS_URL=http://localhost:5000/uploads

# App Configuration
VITE_APP_NAME=Kemenag Magetan
VITE_APP_DESCRIPTION=Website Resmi Kementerian Agama Kabupaten Magetan
```

## 🎨 Fitur Utama

### 1. Halaman Beranda
- Hero section dengan informasi utama
- Berita terbaru
- Layanan unggulan
- Statistik pengunjung

### 2. Berita & Artikel
- List berita dengan pagination
- Detail berita dengan kategori
- Search & filter berita
- Share ke social media

### 3. Agenda & Kegiatan
- Kalender kegiatan
- Detail agenda
- Filter berdasarkan tanggal

### 4. Jadwal Sholat
- Jadwal sholat harian
- Auto-update berdasarkan lokasi
- Notifikasi waktu sholat

### 5. Galeri Video
- Video dari YouTube
- Kategori video
- Video player

### 6. Responsive Design
- Mobile-first approach
- Touch-friendly navigation
- Optimized for all devices

## 📝 Penggunaan

### Routing

Rute utama aplikasi (lihat `App.jsx`):

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/berita" element={<News />} />
  <Route path="/berita/:id" element={<NewsDetail />} />
  <Route path="/agenda" element={<Agenda />} />
  <Route path="/layanan" element={<Services />} />
  <Route path="/video" element={<Videos />} />
  <Route path="/jadwal-sholat" element={<PrayerTimes />} />
</Routes>
```

### API Service

Contoh penggunaan API service:

```javascript
import { getNews, getNewsDetail } from './api/newsService'

// Get all news
const news = await getNews({ page: 1, limit: 10 })

// Get news detail
const newsDetail = await getNewsDetail(newsId)
```

### Styling dengan Tailwind

```jsx
<div className="container mx-auto px-4">
  <h1 className="text-3xl font-bold text-gray-800">
    Berita Terbaru
  </h1>
  <p className="text-gray-600 mt-2">
    Informasi terkini dari Kemenag Magetan
  </p>
</div>
```

### Animations dengan Framer Motion

```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h1>Animated Content</h1>
</motion.div>
```

## 🔧 Development

### Menambah Halaman Baru

1. Buat component di `src/views/`:
```jsx
// src/views/NewPage.jsx
export default function NewPage() {
  return (
    <div className="container mx-auto">
      <h1>New Page</h1>
    </div>
  )
}
```

2. Tambahkan route di `App.jsx`:
```jsx
import NewPage from './views/NewPage'

<Route path="/new-page" element={<NewPage />} />
```

### Menambah Component

```jsx
// src/components/Card.jsx
export default function Card({ title, description, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  )
}
```

### API Integration

```javascript
// src/api/client.js
const API_URL = import.meta.env.VITE_API_URL

export async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  
  if (!response.ok) {
    throw new Error('API request failed')
  }
  
  return response.json()
}
```

## 📦 Build & Deploy

### Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/`.

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy ke Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy ke Server

```bash
# Build aplikasi
npm run build

# Upload folder dist ke server
# Setup Nginx untuk serve static files
```

Contoh konfigurasi Nginx:

```nginx
server {
    listen 80;
    server_name kemenagmagetan.id;
    root /var/www/kemenag/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🐛 Troubleshooting

### Port sudah digunakan

Ubah port di `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3001
  }
})
```

### API Connection Error

1. Cek apakah backend berjalan
2. Verify URL di `.env`
3. Cek CORS settings di backend

### Build Error

```bash
# Clear cache dan rebuild
rm -rf node_modules dist
npm install
npm run build
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion)

## 🤝 Kontribusi

Silakan baca [CONTRIBUTING.md](../CONTRIBUTING.md) untuk detail tentang code of conduct dan proses untuk submit pull requests.

---

**Maintained by**: mmdesu26
