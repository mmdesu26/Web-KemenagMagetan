"use client"

import { useState, useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import AuthGuard from "@/components/admin/auth-guard"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaUsers, FaNewspaper, FaList, FaEye, FaCalendarAlt, FaChartLine, FaClock } from "react-icons/fa"
import { FiTrendingUp } from "react-icons/fi"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalNews: 0,
    totalMenus: 0,
    totalViews: 0,
    todayNews: 0,
    monthlyViews: 0,
  })

  useEffect(() => {
    const targetStats = {
      totalUsers: 5,
      totalNews: 24,
      totalMenus: 8,
      totalViews: 1250,
      todayNews: 3,
      monthlyViews: 15420,
    }

    const animateStats = () => {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setStats({
          totalUsers: Math.floor(targetStats.totalUsers * progress),
          totalNews: Math.floor(targetStats.totalNews * progress),
          totalMenus: Math.floor(targetStats.totalMenus * progress),
          totalViews: Math.floor(targetStats.totalViews * progress),
          todayNews: Math.floor(targetStats.todayNews * progress),
          monthlyViews: Math.floor(targetStats.monthlyViews * progress),
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setStats(targetStats)
        }
      }, stepDuration)
    }

    const timer = setTimeout(animateStats, 500)
    return () => clearTimeout(timer)
  }, [])

  const recentNews = [
    { id: 1, title: "Pelaksanaan Sholat Jumat di Masjid Agung", date: "2024-01-15", status: "published" },
    { id: 2, title: "Kegiatan Pengajian Rutin Bulanan", date: "2024-01-14", status: "draft" },
    { id: 3, title: "Bantuan Sosial untuk Masyarakat Kurang Mampu", date: "2024-01-13", status: "published" },
  ]

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const statsCards = [
    { title: "Total Admin", value: stats.totalUsers, icon: FaUsers, color: "blue", desc: "Akun admin aktif" },
    { title: "Total Berita", value: stats.totalNews, icon: FaNewspaper, color: "green", desc: "Artikel dipublikasi" },
    { title: "Menu Aktif", value: stats.totalMenus, icon: FaList, color: "purple", desc: "Menu navigasi" },
    { title: "Views Hari Ini", value: stats.totalViews, icon: FaEye, color: "orange", desc: "Pengunjung website" },
    { title: "Berita Hari Ini", value: stats.todayNews, icon: FaCalendarAlt, color: "red", desc: "Artikel baru" },
    {
      title: "Views Bulan Ini",
      value: stats.monthlyViews.toLocaleString(),
      icon: FaChartLine,
      color: "teal",
      desc: "Total pengunjung",
    },
  ]

  const colorClasses = {
    blue: "border-l-blue-500 text-blue-500 bg-blue-50",
    green: "border-l-green-500 text-green-500 bg-green-50",
    purple: "border-l-purple-500 text-purple-500 bg-purple-50",
    orange: "border-l-orange-500 text-orange-500 bg-orange-50",
    red: "border-l-red-500 text-red-500 bg-red-50",
    teal: "border-l-teal-500 text-teal-500 bg-teal-50",
  }

  return (
    <AuthGuard>
      <AdminLayout>
        <main className="w-full min-h-screen bg-gray-50 p-6 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                    Dashboard Admin
                  </h1>
                  <motion.p
                    className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Selamat datang di panel administrasi Kemenag Magetan
                  </motion.p>
                </div>
                <motion.div
                  className="flex items-center space-x-2 bg-green-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <FaClock className="text-green-600" />
                  <span className="text-green-700 font-medium text-sm sm:text-base">
                    {new Date().toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Statistik Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6">
              {statsCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="h-full"
                >
                  <Card
                    className={`h-full border-l-4 ${colorClasses[card.color as keyof typeof colorClasses].split(" ")[0]} hover:shadow-xl transition-all duration-300 overflow-hidden relative`}
                  >
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 ${colorClasses[card.color as keyof typeof colorClasses].split(" ")[2]} opacity-10 rounded-full -mr-10 -mt-10`}
                    />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                      <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">{card.title}</CardTitle>
                      <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                        <card.icon
                          className={`h-5 w-5 ${colorClasses[card.color as keyof typeof colorClasses].split(" ")[1]}`}
                        />
                      </motion.div>
                    </CardHeader>
                    <CardContent className="relative z-10 p-4 sm:p-6 flex flex-col justify-between h-full">
                      <motion.div
                        className="text-2xl sm:text-3xl font-bold text-gray-900"
                        key={card.value}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {card.value}
                      </motion.div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center">
                        <FiTrendingUp className="mr-1 text-green-500" />
                        {card.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Berita Terbaru */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
                  <CardTitle className="text-green-800 flex items-center text-lg sm:text-xl">
                    <FaNewspaper className="mr-2" />
                    Berita Terbaru
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Artikel yang baru ditambahkan atau diperbarui
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentNews.map((news, index) => (
                      <motion.div
                        key={news.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        whileHover={{ x: 5, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer h-full"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-800 hover:text-green-600 transition-colors break-words">
                            {news.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {new Date(news.date).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                          <motion.span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              news.status === "published"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {news.status === "published" ? "Dipublikasi" : "Draft"}
                          </motion.span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </AdminLayout>
    </AuthGuard>
  )
}