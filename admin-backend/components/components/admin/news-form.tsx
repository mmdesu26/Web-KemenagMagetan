"use client"

import { useState } from "react"

interface NewsFormProps {
  news?: any
  onSubmit: (formData: any) => void
  onCancel: () => void
}

const NewsForm = ({ news, onSubmit, onCancel }: NewsFormProps) => {
  const [formData, setFormData] = useState({
    title: news?.title || "",
    category: news?.category || "",
    status: news?.status || "draft",
    image: news?.image || "",
    excerpt: news?.excerpt || "",
    content: news?.content || "",
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    onSubmit(formData)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Berita</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="Keagamaan">Keagamaan</option>
            <option value="Sosial">Sosial</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Pengumuman">Pengumuman</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Gambar URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ringkasan</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ringkasan singkat berita..."
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Konten</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tulis konten berita di sini..."
            required
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 sm:flex-none bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Menyimpan..." : news ? "Update Berita" : "Simpan Berita"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 sm:flex-none bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  )
}
