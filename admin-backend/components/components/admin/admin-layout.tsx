"use client"

import type React from "react"
import { FaUser } from "react-icons/fa" // Import FaUser here

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaHome,
  FaNewspaper,
  FaList,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUpload,
  FaChevronRight,
} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { getAdminAuth, logoutAdmin } from "@/lib/auth"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
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
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const menuItemVariants = {
    hover: {
      x: 8,
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.98,
    },
  }

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 lg:translate-x-0 lg:static lg:z-auto border-r border-gray-200"
      >
        <div className="p-6 border-b bg-gradient-to-r from-green-600 to-green-700">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.img
                src="/logo-kemenag.jpg"
                alt="Kemenag Logo"
                className="h-12 w-12 mr-3 rounded-full border-2 border-white shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div>
                <h2 className="font-bold text-white text-lg">Admin Panel</h2>
                <p className="text-sm text-green-100">Kemenag Magetan</p>
              </div>
            </motion.div>
            <motion.button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-green-200 p-2 rounded-full hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path
              return (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-green-100 text-green-700 shadow-md border border-green-200"
                        : "text-gray-700 hover:text-green-700"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                    variants={menuItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onHoverStart={() => setHoveredItem(item.path)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <div className="flex items-center">
                      <motion.div
                        variants={iconVariants}
                        whileHover="hover"
                        className={`mr-3 ${isActive ? "text-green-600" : ""}`}
                      >
                        <item.icon />
                      </motion.div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: hoveredItem === item.path || isActive ? 1 : 0,
                        x: hoveredItem === item.path || isActive ? 0 : -10,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronRight className="text-sm" />
                    </motion.div>
                  </motion.a>
                </motion.li>
              )
            })}
          </ul>
        </nav>

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="mb-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(34, 197, 94, 0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center">
              <motion.div
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaUser className="text-white text-sm" /> {/* Use FaUser here */}
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-green-800">{adminAuth?.username}</p>
                <p className="text-xs text-green-600 capitalize">{adminAuth?.role}</p>
              </div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-white hover:border-red-300 transition-all duration-200 shadow-sm"
            >
              <motion.div whileHover={{ x: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                <FaSignOutAlt className="mr-2" />
              </motion.div>
              Logout
            </Button>
          </motion.div>
        </motion.div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:ml-64">
        <motion.header
          className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaBars size={20} />
            </motion.button>

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="hidden sm:block">
                <span className="text-sm text-gray-600 font-medium">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </div>
        </motion.header>

        <motion.main
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
