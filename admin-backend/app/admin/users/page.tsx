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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlus, FaEdit, FaTrash, FaUser, FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa"
import { getAdminAuth } from "@/lib/auth"
import { apiClient } from "@/lib/api-client"

interface AdminUser {
  id: number
  username: string
  email: string
  fullName: string
  role: "admin" | "superadmin"
  isActive: boolean
  lastLogin: string | null
  createdAt: string
  updatedAt: string
  createdBy: string
}

export default function AdminUserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: "admin" as "admin" | "superadmin",
    isActive: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentUser = getAdminAuth()

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiClient.getUsers()
        if (response.success) {
          setUsers(response.data)
        }
      } catch (err) {
        console.error(err)
        setError("Gagal memuat data admin")
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = "Username wajib diisi"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter"
    } else if (!editingUser && users.some((u) => u.username === formData.username)) {
      newErrors.username = "Username sudah digunakan"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    } else if (!editingUser && users.some((u) => u.email === formData.email)) {
      newErrors.email = "Email sudah digunakan"
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi"
    }

    if (!editingUser) {
      if (!formData.password) {
        newErrors.password = "Password wajib diisi"
      } else if (formData.password.length < 6) {
        newErrors.password = "Password minimal 6 karakter"
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Konfirmasi password tidak cocok"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      if (editingUser) {
        await apiClient.updateUser(editingUser.id, {
          email: formData.email,
          fullName: formData.fullName,
          role: formData.role,
          isActive: formData.isActive,
        })
      } else {
        await apiClient.createUser({
          username: formData.username,
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password,
          role: formData.role,
          isActive: formData.isActive,
        })
      }
      const response = await apiClient.getUsers()
      if (response.success) {
        setUsers(response.data)
      }
      resetForm()
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan saat menyimpan admin")
    }
  }

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      password: "",
      confirmPassword: "",
      role: user.role,
      isActive: user.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    const userToDelete = users.find((u) => u.id === id)
    if (!userToDelete) return

    if (userToDelete.username === currentUser?.username) {
      alert("Anda tidak dapat menghapus akun yang sedang digunakan!")
      return
    }

    const superAdmins = users.filter((u) => u.role === "superadmin" && u.isActive)
    if (userToDelete.role === "superadmin" && superAdmins.length === 1) {
      alert("Tidak dapat menghapus superadmin terakhir!")
      return
    }

    if (!confirm(`Apakah Anda yakin ingin menghapus user "${userToDelete.fullName}"?`)) return

    try {
      await apiClient.deleteUser(id)
      const response = await apiClient.getUsers()
      if (response.success) {
        setUsers(response.data)
      }
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus admin")
    }
  }

  const toggleActive = async (id: number) => {
    const userToToggle = users.find((u) => u.id === id)
    if (!userToToggle) return

    if (userToToggle.username === currentUser?.username) {
      alert("Anda tidak dapat menonaktifkan akun yang sedang digunakan!")
      return
    }

    const activeSuperAdmins = users.filter((u) => u.role === "superadmin" && u.isActive)
    if (userToToggle.role === "superadmin" && userToToggle.isActive && activeSuperAdmins.length === 1) {
      alert("Tidak dapat menonaktifkan superadmin terakhir!")
      return
    }

    try {
      await apiClient.updateUser(id, {
        email: userToToggle.email,
        fullName: userToToggle.fullName,
        role: userToToggle.role,
        isActive: !userToToggle.isActive,
      })
      const response = await apiClient.getUsers()
      if (response.success) {
        setUsers(response.data)
      }
    } catch (err) {
      console.error(err)
      alert("Gagal memperbarui status admin")
    }
  }

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      role: "admin",
      isActive: true,
    })
    setEditingUser(null)
    setIsDialogOpen(false)
    setErrors({})
    setShowPassword(false)
  }

  const canManageUser = (user: AdminUser) => {
    // Superadmin can manage all users
    if (currentUser?.role === "superadmin") return true

    // Admin can only manage other admins (not superadmins)
    if (currentUser?.role === "admin" && user.role === "admin") return true

    return false
  }

  const sortedUsers = [...users].sort((a, b) => {
    // Sort by role (superadmin first), then by creation date
    if (a.role !== b.role) {
      return a.role === "superadmin" ? -1 : 1
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-800">Kelola Admin</h1>
              <p className="text-gray-600 mt-2">Atur akun administrator sistem</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <FaPlus className="mr-2" />
                  Tambah Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingUser ? "Edit Admin" : "Tambah Admin Baru"}</DialogTitle>
                  <DialogDescription>
                    {editingUser ? "Perbarui informasi admin" : "Buat akun administrator baru"}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="username"
                      disabled={!!editingUser}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@kemenagmagetan.go.id"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="fullName">Nama Lengkap</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Nama Lengkap"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  {!editingUser && (
                    <>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Minimal 6 karakter"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="Ulangi password"
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: "admin" | "superadmin") => setFormData({ ...formData, role: value })}
                      disabled={currentUser?.role !== "superadmin"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
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
                    <Label htmlFor="isActive">Akun Aktif</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingUser ? "Perbarui" : "Simpan"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Card>
            <CardHeader>
              <CardTitle>Daftar Administrator</CardTitle>
              <CardDescription>
                Total {users.length} admin, {users.filter((u) => u.isActive).length} aktif
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-gray-500">Memuat data...</p>
              ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Admin</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Login Terakhir</th>
                      <th className="text-left py-3 px-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                user.role === "superadmin" ? "bg-red-100" : "bg-blue-100"
                              }`}
                            >
                              {user.role === "superadmin" ? (
                                <FaUserShield
                                  className={`${user.role === "superadmin" ? "text-red-600" : "text-blue-600"}`}
                                />
                              ) : (
                                <FaUser className="text-blue-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-green-800">{user.fullName}</p>
                              <p className="text-sm text-gray-500">@{user.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "superadmin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role === "superadmin" ? "Super Admin" : "Admin"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.isActive ? "Aktif" : "Nonaktif"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("id-ID") : "Belum pernah"}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleActive(user.id)}
                              className="p-2"
                              disabled={!canManageUser(user)}
                            >
                              {user.isActive ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(user)}
                              className="p-2"
                              disabled={!canManageUser(user)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(user.id)}
                              className="p-2 text-red-600 hover:text-red-700"
                              disabled={!canManageUser(user)}
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
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AuthGuard>
  )
}
