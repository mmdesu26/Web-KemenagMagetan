"use client"
import { FaBars, FaSearch, FaBell } from "react-icons/fa"

interface HeaderProps {
  onMenuClick: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-gray-900 mr-3">
            <FaBars size={20} />
          </button>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Cari..."
              className="bg-gray-100 border-0 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-48 lg:w-64"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <button className="sm:hidden text-gray-600 hover:text-gray-900">
            <FaSearch size={18} />
          </button>

          <button className="text-gray-600 hover:text-gray-900 relative">
            <FaBell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="h-8 w-8 rounded-full" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@kemenag.go.id</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
