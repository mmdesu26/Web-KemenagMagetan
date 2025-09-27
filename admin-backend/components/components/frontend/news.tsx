"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaCalendarAlt, FaFilter, FaArrowRight } from "react-icons/fa"
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

interface NewsProps {
  category: string
  title: string
  isMobile?: boolean
}

const News: React.FC<NewsProps> = ({ category, title, isMobile = false }) => {
  const [sortBy, setSortBy] = useState("newest")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getNews({
          category: category === "all" ? undefined : category,
          status: "published",
        })
        if (response.success && response.data) {
          setNews(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch news:", error)
        // Set default news if API fails
        setNews([
          {
            id: 1,
            title: "Pelaksanaan Sholat Jumat di Masjid Agung",
            content:
              "Kemenag Magetan mengumumkan jadwal sholat Jumat di Masjid Agung dengan protokol kesehatan yang ketat.",
            excerpt: "Jadwal sholat Jumat dengan protokol kesehatan ketat",
            category: "Keagamaan",
            status: "published",
            image: "/majestic-masjid.png",
            author: "Admin Kemenag",
            publishedAt: "2024-01-15T10:00:00Z",
            createdAt: "2024-01-15T09:00:00Z",
          },
          {
            id: 2,
            title: "Program Bantuan Sosial Ramadhan 2024",
            content:
              "Kemenag Magetan meluncurkan program bantuan sosial untuk masyarakat kurang mampu di bulan Ramadhan.",
            excerpt: "Program bantuan sosial untuk masyarakat kurang mampu",
            category: "Sosial",
            status: "published",
            image: "/bantuan-sosial.jpg",
            author: "Admin Kemenag",
            publishedAt: "2024-01-14T08:00:00Z",
            createdAt: "2024-01-14T07:00:00Z",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [category])

  const handleButtonClick = () => {
    if (inputRef.current) {
      if (inputRef.current.showPicker) {
        inputRef.current.showPicker()
      } else {
        inputRef.current.click()
      }
    }
  }

  const filteredNews = news
    .filter((item) => category === "all" || item.category === category)
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      } else {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      }
    })
    .filter((item) => {
      if (!selectedDate) return true
      return new Date(item.publishedAt).toDateString() === new Date(selectedDate).toDateString()
    })

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-32 h-24 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6"
    >
      <div
        className={`flex ${isMobile ? "flex-col" : "flex-col sm:flex-row"} justify-between items-start gap-3 sm:gap-4 mb-4 md:mb-6`}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800">{title}</h2>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="relative">
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm transition-colors">
              <FaFilter className="mr-1 sm:mr-2" />
              {sortBy === "newest" ? "Terbaru" : "Terlama"}
            </button>
            <select
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
          </div>

          <div className="relative" onClick={handleButtonClick}>
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm transition-colors">
              <FaCalendarAlt className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">
                {selectedDate ? new Date(selectedDate).toLocaleDateString("id-ID") : "Tanggal"}
              </span>
              <span className="sm:hidden">
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit" })
                  : "Tanggal"}
              </span>
            </button>
            <input
              type="date"
              ref={inputRef}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={(e) => setSelectedDate(e.target.value)}
              value={selectedDate || ""}
            />
          </div>

          <Link
            href={`/berita?category=${category}`}
            className="text-green-600 hover:text-green-800 text-xs sm:text-sm font-medium flex items-center px-2 py-1 hover:bg-green-50 rounded transition-colors"
          >
            <span className="hidden sm:inline">Lihat Semua</span>
            <span className="sm:hidden">Lihat</span>
            <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {filteredNews.slice(0, isMobile ? 2 : 3).map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: isMobile ? 0 : 5 }}
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer`}
          >
            <img
              src={item.image || "/placeholder.svg?height=200&width=300"}
              alt={item.title}
              className="w-full sm:w-24 md:w-32 h-40 sm:h-20 md:h-24 lg:h-32 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">
                <FaCalendarAlt className="mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">
                  {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 text-green-800 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2 sm:line-clamp-3">{item.excerpt}</p>
              <Link
                href={`/berita/${item.id}`}
                className="inline-flex items-center text-green-600 hover:text-green-800 text-xs sm:text-sm font-medium hover:underline"
              >
                Baca selengkapnya <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-sm sm:text-base">
          <div className="mb-2">📰</div>
          Tidak ada berita yang ditemukan untuk kriteria yang dipilih.
        </div>
      )}
    </motion.section>
  )
}

export default News
