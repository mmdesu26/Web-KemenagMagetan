"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaCalendarAlt, FaUser, FaArrowLeft } from "react-icons/fa"
import Header from "@/components/frontend/header"
import Footer from "@/components/frontend/footer"
import { apiClient } from "@/lib/api-client"
import Link from "next/link"

interface NewsItem {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  status: string
  image: string
  author: string
  publishedAt: string
  createdAt: string
}

export default function BeritaPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { value: "all", label: "Semua Berita" },
    { value: "Keagamaan", label: "Keagamaan" },
    { value: "Sosial", label: "Sosial" },
    { value: "Pendidikan", label: "Pendidikan" },
    { value: "Pengumuman", label: "Pengumuman" },
  ]

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getNews({
          category: selectedCategory === "all" ? undefined : selectedCategory,
          status: "published",
        })
        if (response.success && response.data) {
          setNews(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20 sm:pt-24 lg:pt-28">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-800 mb-4 text-sm sm:text-base hover:underline"
            >
              <FaArrowLeft className="mr-2" />
              Kembali ke Beranda
            </Link>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-4 sm:mb-6">
              Berita Kemenag Magetan
            </h1>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.value
                      ? "bg-green-600 text-white shadow-md scale-105"
                      : "bg-white text-green-600 hover:bg-green-50 border border-green-200 hover:border-green-300"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* News Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                  <div className="h-40 sm:h-48 bg-gray-200"></div>
                  <div className="p-4 sm:p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {news.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={item.image || "/placeholder.svg?height=200&width=400"}
                    alt={item.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap items-center text-gray-500 text-xs sm:text-sm mb-3 gap-2">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <FaUser className="mr-1" />
                        <span className="truncate max-w-20 sm:max-w-none">{item.author}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg mb-3 text-green-800 line-clamp-2 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{item.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {item.category}
                      </span>

                      <Link
                        href={`/berita/${item.id}`}
                        className="text-green-600 hover:text-green-800 text-xs sm:text-sm font-medium hover:underline flex items-center"
                      >
                        <span className="hidden sm:inline">Baca selengkapnya</span>
                        <span className="sm:hidden">Baca</span>
                        <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {!loading && news.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 sm:py-16">
              <div className="text-4xl sm:text-6xl mb-4">📰</div>
              <div className="text-gray-500 text-base sm:text-lg">
                Tidak ada berita yang ditemukan untuk kategori "
                {categories.find((c) => c.value === selectedCategory)?.label}".
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
