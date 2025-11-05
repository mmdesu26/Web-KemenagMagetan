"use client"

import { useState, useEffect } from "react"
import AuthGuard from "@/components/admin/auth-guard"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import { apiClient } from "@/lib/api-client"

interface ProfilItem {
  id: number
  title: string
  content: string
}

export default function ProfilManagement() {
  const [items, setItems] = useState<ProfilItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ProfilItem | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const loadData = async () => {
    const res = await apiClient.getProfil()
    if (res.success) setItems(res.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSave = async () => {
    if (editingItem) {
      await apiClient.updateProfil(editingItem.id, { title, content })
    } else {
      await apiClient.createProfil({ title, content })
    }
    setIsDialogOpen(false)
    setEditingItem(null)
    setTitle("")
    setContent("")
    await loadData()
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus item ini?")) return
    await apiClient.deleteProfil(id)
    await loadData()
  }

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-800">Kelola Profil</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <FaPlus className="mr-2" /> Tambah Profil
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Edit Profil" : "Tambah Profil"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Judul</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div>
                    <Label>Konten</Label>
                    <Input value={content} onChange={(e) => setContent(e.target.value)} />
                  </div>
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 w-full">
                    Simpan
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.content}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" onClick={() => { setEditingItem(item); setTitle(item.title); setContent(item.content); setIsDialogOpen(true) }}>
                      <FaEdit className="mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                      <FaTrash className="mr-1" /> Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  )
}
