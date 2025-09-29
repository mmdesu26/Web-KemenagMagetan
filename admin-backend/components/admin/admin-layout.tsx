"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaHome,
  FaNewspaper,
  FaList,
  FaUsers,
  FaSignOutAlt,
  FaUpload,
  FaTimes,
} from "react-icons/fa"
import { getAdminAuth, logoutAdmin } from "@/lib/auth"
import Header from "@/components/admin/header"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const adminAuth = getAdminAuth()

  const menuItems = [
    { name: "Dashboard", icon: FaHome, path: "/admin/dashboard" },
    { name: "Kelola Menu", icon: FaList, path: "/admin/menus" },
    { name: "Kelola Berita", icon: FaNewspaper, path: "/admin/news" },
    { name: "Upload File", icon: FaUpload, path: "/admin/uploads" },
    { name: "Kelola Admin", icon: FaUsers, path: "/admin/users" },
  ]

  const handleLogout = () => {
    logoutAdmin()
    router.push("/admin/login")
  }

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 250, damping: 25 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 250, damping: 25 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar Mobile */}
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 border-r border-gray-200 lg:hidden"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h2 className="font-bold text-lg text-gray-800">Admin Panel</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="mt-4 px-3">
                {menuItems.map((item, i) => {
                  const isActive = pathname === item.path
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, x: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <button
                        onClick={() => {
                          router.push(item.path)
                          setSidebarOpen(false)
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg mb-2 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="mr-3 text-lg" />
                        {item.name}
                      </button>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Logout */}
              <div className="absolute bottom-4 w-full px-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <FaSignOutAlt className="mr-3 text-lg" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen lg:fixed lg:left-0 lg:top-0 bg-white border-r border-gray-200 shadow-md">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h2 className="font-bold text-lg text-green-700">Admin Panel</h2>
        </div>
        <nav className="mt-4 px-3">
          {menuItems.map((item, i) => {
            const isActive = pathname === item.path
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  onClick={() => router.push(item.path)}
                  className={`flex items-center w-full px-4 py-2 rounded-lg mb-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="mr-3 text-lg" />
                  {item.name}
                </button>
              </motion.div>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-3 text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <motion.main
          className="p-6 flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
