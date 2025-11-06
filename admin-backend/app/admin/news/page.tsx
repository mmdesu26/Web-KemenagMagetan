"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import AuthGuard from "@/components/admin/auth-guard"
import AdminLayout from "@/components/admin/admin-layout"
import FilePicker from "@/components/admin/file-picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaCalendarAlt, FaImage, FaLink } from "react-icons/fa"
import { apiClient } from "@/lib/api-client"
import { getImageUrl } from "@/lib/utils"

type NewsCategory = "kemenag" | "umum"
type NewsStatus = "draft" | "published"

interface NewsItem {
  id: number
  title: string
  category: NewsCategory
  status: NewsStatus
  image: string | null
  url: string | null
  publishedAt: string | null
  createdAt?: string
  updatedAt?: string
}

const CATEGORY_OPTIONS: { value: NewsCategory; label: string }[] = [
  { value: "kemenag", label: "Berita Kemenag" },
  { value: "umum", label: "Berita Umum" },
]

const STATUS_OPTIONS: { value: "all" | NewsStatus; label: string }[] = [
  { value: "all", label: "Semua Status" },
  { value: "published", label: "Dipublikasi" },
  { value: "draft", label: "Draft" },
]

const EMPTY_FORM = {
  title: "",
  category: "kemenag" as NewsCategory,
  status: "draft" as NewsStatus,
  image: "",
  url: "",
  publishedAt: "",
}

export default function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [filterCategory, setFilterCategory] = useState<"all" | NewsCategory>("all")
  const [filterStatus, setFilterStatus] = useState<"all" | NewsStatus>("all")
  const [formData, setFormData] = useState(EMPTY_FORM)

  const loadNews = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.getNews()
      if (response.success) {
        setNews(response.data)
      }
    } catch (err) {
      console.error(err)
      setError("Gagal memuat berita")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  const resetForm = () => {
    setFormData(EMPTY_FORM)
    setEditingNews(null)
    setIsDialogOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const payload = {
      title: formData.title,
      category: formData.category,
      status: formData.status,
      image: formData.image || null,
      url: formData.url || null,
      publishedAt: formData.publishedAt || null,
    }

    try {
      if (editingNews) {
        await apiClient.updateNews(editingNews.id, payload)
      } else {
        await apiClient.createNews(payload)
      }
      await loadNews()
      resetForm()
    } catch (err) {
      console.error(err)
      alert("Terjadi kendala saat menyimpan data berita")
    }
  }

  const handleEdit = (item: NewsItem) => {
    setEditingNews(item)
    setFormData({
      title: item.title,
      category: item.category,
      status: item.status,
      image: item.image ?? "",
      url: item.url ?? "",
      publishedAt: item.publishedAt ? item.publishedAt.slice(0, 10) : "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus berita ini?")) return
    try {
      await apiClient.deleteNews(id)
      await loadNews()
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus berita")
    }
  }

  const toggleStatus = async (item: NewsItem) => {
    try {
      await apiClient.updateNews(item.id, {
        title: item.title,
        category: item.category,
        status: item.status === "published" ? "draft" : "published",
        image: item.image,
        url: item.url,
        publishedAt: item.publishedAt,
      })
      await loadNews()
    } catch (err) {
      console.error(err)
      alert("Gagal memperbarui status berita")
    }
  }

  const filteredNews = useMemo(() => {
    return news
      .filter((item) => (filterCategory === "all" ? true : item.category === filterCategory))
      .filter((item) => (filterStatus === "all" ? true : item.status === filterStatus))
      .sort((a, b) => new Date(b.updatedAt ?? b.publishedAt ?? 0).getTime() - new Date(a.updatedAt ?? a.publishedAt ?? 0).getTime())
  }, [news, filterCategory, filterStatus])

  const renderCategoryLabel = (value: NewsCategory) => CATEGORY_OPTIONS.find((option) => option.value === value)?.label

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-800">Kelola Berita</h1>
              <p className="text-gray-600 mt-2">Atur konten berita dan artikel website</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => (!open ? resetForm() : setIsDialogOpen(open))}>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Kategori</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: NewsCategory) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: NewsStatus) => setFormData({ ...formData, status: value })}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="publishedAt">Tanggal Publikasi</Label>
                      <Input
                        id="publishedAt"
                        type="date"
                        value={formData.publishedAt}
                        onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="url">Tautan Berita</Label>
                      <div className="flex items-center space-x-2">
                        <FaLink className="text-gray-400" />
                        <Input
                          id="url"
                          value={formData.url}
                          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                          placeholder="https://"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Gambar Berita</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/assets/images/news.jpg"
                        className="flex-1"
                      />
                      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0]
    if (file) {
      const formDataFile = new FormData()
      formDataFile.append("file", file)

      // Upload ke API Next.js
      fetch("/api/upload", {
        method: "POST",
        body: formDataFile,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({ ...formData, image: data.url }) // simpan URL gambar
        })
        .catch(() => alert("Gagal upload gambar"))
    }
  }}
/>

                    </div>
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={getImageUrl(formData.image)}
                          alt="Preview berita"
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

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <Label>Filter Kategori</Label>
                  <Select value={filterCategory} onValueChange={(value: "all" | NewsCategory) => setFilterCategory(value)}>
                    <SelectTrigger className="w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Filter Status</Label>
                  <Select value={filterStatus} onValueChange={(value: "all" | NewsStatus) => setFilterStatus(value)}>
                    <SelectTrigger className="w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
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
                Total {news.length} berita, {news.filter((item) => item.status === "published").length} dipublikasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
              {loading ? (
                <p className="text-sm text-gray-500">Memuat data...</p>
              ) : (
                <div className="space-y-4">
                  {filteredNews.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex gap-4">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-green-800 text-lg mb-1">{item.title}</h3>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                  {renderCategoryLabel(item.category)}
                                </span>
                                <span className="px-2 py-1 rounded-full border border-gray-200 flex items-center">
                                  <FaCalendarAlt className="mr-1" />
                                  {item.publishedAt
                                    ? new Date(item.publishedAt).toLocaleDateString("id-ID")
                                    : "Belum dijadwalkan"}
                                </span>
                              </div>
                              {item.url && (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-green-600 hover:text-green-800"
                                >
                                  Lihat tautan berita
                                </a>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => toggleStatus(item)} className="p-2">
                                {item.status === "published" ? <FaEyeSlash /> : <FaEye />}
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="p-2">
                                <FaEdit />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-600 hover:text-red-700"
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span
                              className={`px-2 py-1 rounded-full ${
                                item.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status === "published" ? "Dipublikasi" : "Draft"}
                            </span>
                            {item.updatedAt && <span>Diperbarui {new Date(item.updatedAt).toLocaleString("id-ID")}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredNews.length === 0 && (
                    <div className="text-center py-8 text-gray-500">Tidak ada berita sesuai filter.</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AuthGuard>
  )
}