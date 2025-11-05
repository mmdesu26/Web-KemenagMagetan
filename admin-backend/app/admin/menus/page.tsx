"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
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
import { apiClient } from "@/lib/api-client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MenuItem {
  id: number
  name: string
  path: string
  orderIndex: number
  isActive: boolean
  parentId: number | null
  parentName?: string | null
  icon?: string | null
  updatedAt?: string
}

export default function MenuManagement() {
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    path: "",
    orderIndex: 0,
    isActive: true,
    parentId: "root" as "root" | number,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiClient.getMenus()
        if (response.success) {
          setMenus(response.data)
        }
      } catch (err) {
        setError("Gagal memuat menu")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenus()
  }, [])

  const refreshMenus = async () => {
    try {
      const response = await apiClient.getMenus()
      if (response.success) {
        setMenus(response.data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      name: formData.name,
      path: formData.path,
      orderIndex: formData.orderIndex,
      isActive: formData.isActive,
      parentId: formData.parentId === "root" ? null : Number(formData.parentId),
    }

    const submit = async () => {
      try {
        if (editingMenu) {
          await apiClient.updateMenu(editingMenu.id, payload)
        } else {
          await apiClient.createMenu(payload)
        }
        await refreshMenus()
        resetForm()
      } catch (err) {
        console.error(err)
        alert("Terjadi kesalahan saat menyimpan menu")
      }
    }

    submit()
  }

  const handleEdit = (menu: MenuItem) => {
    setEditingMenu(menu)
    setFormData({
      name: menu.name,
      path: menu.path,
      orderIndex: menu.orderIndex,
      isActive: menu.isActive,
      parentId: menu.parentId ?? "root",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      const submit = async () => {
        try {
          await apiClient.deleteMenu(id)
          await refreshMenus()
        } catch (err) {
          console.error(err)
          alert("Gagal menghapus menu")
        }
      }
      submit()
    }
  }

  const toggleActive = (id: number) => {
    const target = menus.find((menu) => menu.id === id)
    if (!target) return

    const submit = async () => {
      try {
        await apiClient.updateMenu(id, {
          name: target.name,
          path: target.path,
          orderIndex: target.orderIndex,
          isActive: !target.isActive,
          parentId: target.parentId,
        })
        await refreshMenus()
      } catch (err) {
        console.error(err)
        alert("Gagal memperbarui status menu")
      }
    }
    submit()
  }

  const resetForm = () => {
    setFormData({ name: "", path: "", orderIndex: 0, isActive: true, parentId: "root" })
    setEditingMenu(null)
    setIsDialogOpen(false)
  }

  const sortedMenus = useMemo(
    () =>
      [...menus].sort((a, b) => {
        if ((a.parentId ?? 0) !== (b.parentId ?? 0)) {
          return (a.parentId ?? 0) - (b.parentId ?? 0)
        }
        return a.orderIndex - b.orderIndex
      }),
    [menus],
  )

  const parentOptions = useMemo(() => menus.filter((menu) => menu.parentId === null), [menus])

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-800">Kelola Menu</h1>
              <p className="text-gray-600 mt-2">Atur menu navigasi website</p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

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
                      value={formData.orderIndex}
                      onChange={(e) => setFormData({ ...formData, orderIndex: Number.parseInt(e.target.value) })}
                      placeholder="1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="parent">Menu Induk</Label>
                    <Select
                      value={String(formData.parentId)}
                      onValueChange={(value) =>
                        setFormData({ ...formData, parentId: value === "root" ? "root" : Number(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih menu induk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="root">Menu Utama</SelectItem>
                        {parentOptions.map((parent) => (
                          <SelectItem key={parent.id} value={String(parent.id)}>
                            {parent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <th className="text-left py-3 px-4">Menu Induk</th>
                      <th className="text-left py-3 px-4">Path</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMenus.map((menu) => (
                      <tr key={menu.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{menu.orderIndex}</td>
                        <td className="py-3 px-4 font-medium text-green-800">{menu.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{menu.parentName || "-"}</td>
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
          {loading && <p className="text-sm text-gray-500">Memuat data...</p>}
        </div>
      </AdminLayout>
    </AuthGuard>
  )
}
