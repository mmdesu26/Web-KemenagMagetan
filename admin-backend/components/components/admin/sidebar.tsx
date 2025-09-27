"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaHome, FaNewspaper, FaBars, FaUsers, FaCog, FaTimes } from "react-icons/fa"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname()

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", href: "/admin" },
    { icon: <FaNewspaper />, label: "Berita", href: "/admin/news" },
    { icon: <FaBars />, label: "Menu", href: "/admin/menu" },
    { icon: <FaUsers />, label: "Pengguna", href: "/admin/users" },
    { icon: <FaCog />, label: "Pengaturan", href: "/admin/settings" },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto w-64 lg:w-64`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logo-kemenag.jpg" alt="Logo" className="h-8 w-8 mr-2" />
              <h2 className="text-lg font-bold text-green-800">Admin Panel</h2>
            </div>
            <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.href ? "bg-green-100 text-green-800" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    // Close sidebar on mobile when item is clicked
                    if (window.innerWidth < 1024) {
                      onClose()
                    }
                  }}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
