"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AuthGuard from "@/components/admin/auth-guard"
import AdminLayout from "@/components/admin/admin-layout"
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
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa"

interface MenuItem {
  id: number
  name: string
  path: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function MenuManagement() {
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    path: "",
    order: 0,
    isActive: true,
  })

  // Initialize with default menus from Header component
  useEffect(() => {
    const defaultMenus: MenuItem[] = [
      { id: 1, name: "Beranda", path: "/", order: 1, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
      {
        id: 2,
        name: "Profil",
        path: "/profil",
        order: 2,
        isActive: true,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      {
        id: 3,
        name: "Berita",
        path: "/berita",
        order: 3,
        isActive: true,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      {
        id: 4,
        name: "Info Bantuan",
        path: "/bantuan",
        order: 4,
        isActive: true,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      {
        id: 5,
        name: "Layanan",
        path: "/layanan",
        order: 5,
        isActive: true,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      {
        id: 6,
        name: "PTSP",
        path: "/ptsp",
        order: 6,
        isActive: true,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      {
        id: 7,
        name: "PPID",
        path: "/ppid",
        order: 7,
        isActive: true,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      { id: 8, name: "FAQ", path: "/faq", order: 8, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    ]

    const savedMenus = localStorage.getItem("adminMenus")
    if (savedMenus) {
      setMenus(JSON.parse(savedMenus))
    } else {
      setMenus(defaultMenus)
      localStorage.setItem("adminMenus", JSON.stringify(defaultMenus))
    }
  }, [])

  const saveMenus = (updatedMenus: MenuItem[]) => {
    setMenus(updatedMenus)
    localStorage.setItem("adminMenus", JSON.stringify(updatedMenus))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingMenu) {
      // Update existing menu
      const updatedMenus = menus.map((menu) =>
        menu.id === editingMenu.id ? { ...menu, ...formData, updatedAt: new Date().toISOString() } : menu,
      )
      saveMenus(updatedMenus)
    } else {
      // Create new menu
      const newMenu: MenuItem = {
        id: Math.max(...menus.map((m) => m.id), 0) + 1,
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      saveMenus([...menus, newMenu])
    }

    resetForm()
  }

  const handleEdit = (menu: MenuItem) => {
    setEditingMenu(menu)
    setFormData({
      name: menu.name,
      path: menu.path,
      order: menu.order,
      isActive: menu.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      const updatedMenus = menus.filter((menu) => menu.id !== id)
      saveMenus(updatedMenus)
    }
  }

  const toggleActive = (id: number) => {
    const updatedMenus = menus.map((menu) =>
      menu.id === id ? { ...menu, isActive: !menu.isActive, updatedAt: new Date().toISOString() } : menu,
    )
    saveMenus(updatedMenus)
  }

  const resetForm = () => {
    setFormData({ name: "", path: "", order: 0, isActive: true })
    setEditingMenu(null)
    setIsDialogOpen(false)
  }

  const sortedMenus = [...menus].sort((a, b) => a.order - b.order)

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-800">Kelola Menu</h1>
              <p className="text-gray-600 mt-2">Atur menu navigasi website</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <FaPlus className="mr-2" />
                  Tambah Menu
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingMenu ? "Edit Menu" : "Tambah Menu Baru"}</DialogTitle>
                  <DialogDescription>
                    {editingMenu ? "Perbarui informasi menu" : "Buat menu navigasi baru"}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Menu</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Beranda"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="path">Path URL</Label>
                    <Input
                      id="path"
                      value={formData.path}
                      onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                      placeholder="Contoh: /beranda"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="order">Urutan</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
                      placeholder="1"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="isActive">Menu Aktif</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingMenu ? "Perbarui" : "Simpan"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Menu</CardTitle>
              <CardDescription>
                Total {menus.length} menu, {menus.filter((m) => m.isActive).length} aktif
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Urutan</th>
                      <th className="text-left py-3 px-4">Nama Menu</th>
                      <th className="text-left py-3 px-4">Path</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Terakhir Diperbarui</th>
                      <th className="text-left py-3 px-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMenus.map((menu) => (
                      <tr key={menu.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{menu.order}</td>
                        <td className="py-3 px-4 font-medium text-green-800">{menu.name}</td>
                        <td className="py-3 px-4 text-gray-600 font-mono text-sm">{menu.path}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              menu.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {menu.isActive ? "Aktif" : "Nonaktif"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {new Date(menu.updatedAt).toLocaleDateString("id-ID")}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => toggleActive(menu.id)} className="p-2">
                              {menu.isActive ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(menu)} className="p-2">
                              <FaEdit />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(menu.id)}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AuthGuard>
  )
}
