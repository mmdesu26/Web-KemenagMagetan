"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [menuItems, setMenuItems] = useState([
    { name: "Beranda", path: "/" },
    { name: "Profil", path: "/profil" },
    { name: "Berita", path: "/berita" },
    { name: "Info Bantuan", path: "/bantuan" },
    { name: "Layanan", path: "/layanan" },
    { name: "PTSP", path: "/ptsp" },
    { name: "PPID", path: "/ppid" },
    { name: "FAQ", path: "/faq" },
  ])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await apiClient.getMenus()
        if (response.success && response.data) {
          const activeMenus = response.data
            .filter((menu: any) => menu.isActive)
            .sort((a: any, b: any) => a.order - b.order)
            .map((menu: any) => ({
              name: menu.name,
              path: menu.url,
            }))
          setMenuItems(activeMenus)
        }
      } catch (error) {
        console.error("Failed to fetch menu items:", error)
        // Keep default menu items if API fails
      }
    }

    fetchMenuItems()
  }, [])

  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com/kemenagmagetan" },
    { icon: <FaInstagram />, url: "https://instagram.com/kemenagmagetan" },
    { icon: <FaYoutube />, url: "https://youtube.com/kemenagmagetan" },
    { icon: <FaTiktok />, url: "https://tiktok.com/@kemenagmagetan" },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-1 sm:py-2" : "bg-white/90 py-2 sm:py-4"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <div className="flex items-center">
            <img src="/logo-kemenag.jpg" alt="Kemenag Magetan" className="h-8 sm:h-10 lg:h-12 mr-2 sm:mr-3" />
            <div>
              <h1 className="text-sm sm:text-base lg:text-lg font-bold text-green-800">KEMENTERIAN AGAMA</h1>
              <p className="text-xs sm:text-sm text-gray-600">Kabupaten Magetan</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <div className="flex items-center text-green-700 text-sm lg:text-base">
              <FaPhone className="mr-1 lg:mr-2 text-xs lg:text-sm" />
              <span className="hidden lg:inline">(0351) 1234567</span>
              <span className="lg:hidden">0351-1234567</span>
            </div>
            <div className="flex items-center text-green-700 text-sm lg:text-base">
              <FaEnvelope className="mr-1 lg:mr-2 text-xs lg:text-sm" />
              <span className="hidden xl:inline">kemenag@magetan.go.id</span>
              <span className="xl:hidden">Email</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-1 sm:pt-2">
          <nav className="hidden lg:flex space-x-4 xl:space-x-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-green-800 hover:text-green-600 font-medium transition-colors text-sm xl:text-base py-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Cari..."
                className="border border-gray-300 rounded-full py-1 px-3 pl-8 lg:pl-10 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-32 lg:w-48 xl:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-2 lg:left-3 top-1.5 lg:top-2 text-gray-400 text-xs lg:text-sm" />
            </div>

            <button
              className="lg:hidden text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg rounded-b-lg overflow-hidden mt-2"
          >
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Cari..."
                  className="border border-gray-300 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>

              <nav className="flex flex-col space-y-1">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className="text-green-800 hover:text-green-600 font-medium py-3 px-2 border-b border-gray-100 last:border-b-0 hover:bg-green-50 rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Contact Info */}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center text-green-700 text-sm">
                  <FaPhone className="mr-2" />
                  <span>(0351) 1234567</span>
                </div>
                <div className="flex items-center text-green-700 text-sm">
                  <FaEnvelope className="mr-2" />
                  <span>kemenag@magetan.go.id</span>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-500 text-xl p-2 hover:bg-green-50 rounded-full transition-colors"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header
