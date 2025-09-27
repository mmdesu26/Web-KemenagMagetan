"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AuthGuard from "@/components/admin/auth-guard"
import AdminLayout from "@/components/admin/admin-layout"
import FilePicker from "@/components/admin/file-picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaCalendarAlt, FaImage } from "react-icons/fa"

interface NewsItem {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  image: string
  status: "draft" | "published"
  author: string
  date: string
  createdAt: string
  updatedAt: string
}

export default function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "umum",
    image: "",
    status: "draft" as "draft" | "published",
    author: "",
  })

  const categories = [
    { value: "umum", label: "Umum" },
    { value: "kegiatan", label: "Kegiatan" },
    { value: "pengumuman", label: "Pengumuman" },
    { value: "layanan", label: "Layanan" },
    { value: "bantuan", label: "Bantuan Sosial" },
  ]

  // Initialize with sample news data
  useEffect(() => {
    const sampleNews: NewsItem[] = [
      {
        id: 1,
        title: "Pelaksanaan Sholat Jumat di Masjid Agung Magetan",
        content:
          "Kegiatan sholat Jumat rutin dilaksanakan setiap hari Jumat di Masjid Agung Magetan dengan protokol kesehatan yang ketat...",
        excerpt: "Kegiatan sholat Jumat rutin dilaksanakan setiap hari Jumat di Masjid Agung Magetan",
        category: "kegiatan",
        image: "/majestic-masjid.png",
        status: "published",
        author: "Admin Kemenag",
        date: "2024-01-15",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: 2,
        title: "Bantuan Sosial untuk Masyarakat Kurang Mampu",
        content:
          "Program bantuan sosial dari Kementerian Agama Kabupaten Magetan untuk membantu masyarakat yang membutuhkan...",
        excerpt: "Program bantuan sosial dari Kementerian Agama Kabupaten Magetan",
        category: "bantuan",
        image: "/bantuan-sosial.jpg",
        status: "published",
        author: "Admin Kemenag",
        date: "2024-01-14",
        createdAt: "2024-01-14T09:00:00Z",
        updatedAt: "2024-01-14T09:00:00Z",
      },
      {
        id: 3,
        title: "Pengajian Rutin Bulanan Januari 2024",
        content: "Kegiatan pengajian rutin bulanan akan dilaksanakan pada akhir bulan Januari 2024...",
        excerpt: "Kegiatan pengajian rutin bulanan akan dilaksanakan pada akhir bulan Januari",
        category: "kegiatan",
        image: "/pengajian.jpg",
        status: "draft",
        author: "Admin Kemenag",
        date: "2024-01-13",
        createdAt: "2024-01-13T08:00:00Z",
        updatedAt: "2024-01-13T08:00:00Z",
      },
    ]

    const savedNews = localStorage.getItem("adminNews")
    if (savedNews) {
      setNews(JSON.parse(savedNews))
    } else {
      setNews(sampleNews)
      localStorage.setItem("adminNews", JSON.stringify(sampleNews))
    }
  }, [])

  const saveNews = (updatedNews: NewsItem[]) => {
    setNews(updatedNews)
    localStorage.setItem("adminNews", JSON.stringify(updatedNews))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingNews) {
      // Update existing news
      const updatedNews = news.map((item) =>
        item.id === editingNews.id
          ? {
              ...item,
              ...formData,
              updatedAt: new Date().toISOString(),
              date: formData.status === "published" ? new Date().toISOString().split("T")[0] : item.date,
            }
          : item,
      )
      saveNews(updatedNews)
    } else {
      // Create new news
      const newNews: NewsItem = {
        id: Math.max(...news.map((n) => n.id), 0) + 1,
        ...formData,
        date:
          formData.status === "published"
            ? new Date().toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      saveNews([...news, newNews])
    }

    resetForm()
  }

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt,
      category: newsItem.category,
      image: newsItem.image,
      status: newsItem.status,
      author: newsItem.author,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      const updatedNews = news.filter((item) => item.id !== id)
      saveNews(updatedNews)
    }
  }

  const toggleStatus = (id: number) => {
    const updatedNews = news.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === "published" ? "draft" : "published",
            updatedAt: new Date().toISOString(),
            date: item.status === "draft" ? new Date().toISOString().split("T")[0] : item.date,
          }
        : item,
    )
    saveNews(updatedNews)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "umum",
      image: "",
      status: "draft",
      author: "",
    })
    setEditingNews(null)
    setIsDialogOpen(false)
  }

  const filteredNews = news
    .filter((item) => {
      const categoryMatch = filterCategory === "all" || item.category === filterCategory
      const statusMatch = filterStatus === "all" || item.status === filterStatus
      return categoryMatch && statusMatch
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-800">Kelola Berita</h1>
              <p className="text-gray-600 mt-2">Atur konten berita dan artikel website</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <FaPlus className="mr-2" />
                  Tambah Berita
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingNews ? "Edit Berita" : "Tambah Berita Baru"}</DialogTitle>
                  <DialogDescription>
                    {editingNews ? "Perbarui informasi berita" : "Buat artikel berita baru"}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Judul Berita</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Masukkan judul berita"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Ringkasan</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Ringkasan singkat berita"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Konten Berita</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Tulis konten berita lengkap di sini"
                      rows={6}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Kategori</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: "draft" | "published") => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Dipublikasi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="author">Penulis</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Nama penulis"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Gambar Berita</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/berita.jpg"
                        className="flex-1"
                      />
                      <FilePicker
                        accept="images"
                        onSelect={(url) => setFormData({ ...formData, image: url })}
                        trigger={
                          <Button type="button" variant="outline">
                            <FaImage className="mr-2" />
                            Pilih
                          </Button>
                        }
                      />
                    </div>
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={formData.image || "/placeholder.svg"}
                          alt="Preview"
                          className="w-32 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingNews ? "Perbarui" : "Simpan"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <Label>Filter Kategori</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Filter Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="published">Dipublikasi</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Berita</CardTitle>
              <CardDescription>
                Total {news.length} berita, {news.filter((n) => n.status === "published").length} dipublikasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNews.map((newsItem) => (
                  <div key={newsItem.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex gap-4">
                      <img
                        src={newsItem.image || "/placeholder.svg?height=100&width=150&query=news"}
                        alt={newsItem.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-green-800 text-lg">{newsItem.title}</h3>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleStatus(newsItem.id)}
                              className="p-2"
                            >
                              {newsItem.status === "published" ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(newsItem)} className="p-2">
                              <FaEdit />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(newsItem.id)}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-2">{newsItem.excerpt}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span
                              className={`px-2 py-1 rounded-full ${
                                newsItem.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {newsItem.status === "published" ? "Dipublikasi" : "Draft"}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {categories.find((c) => c.value === newsItem.category)?.label}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span>Oleh: {newsItem.author}</span>
                            <span className="flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              {new Date(newsItem.date).toLocaleDateString("id-ID")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredNews.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Tidak ada berita yang ditemukan untuk filter yang dipilih.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AuthGuard>
  )
}
