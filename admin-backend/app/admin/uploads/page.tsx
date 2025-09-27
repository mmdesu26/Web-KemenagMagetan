"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
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
import {
  FaUpload,
  FaTrash,
  FaEye,
  FaCopy,
  FaImage,
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaSearch,
} from "react-icons/fa"

interface UploadedFile {
  id: number
  name: string
  originalName: string
  size: number
  type: string
  url: string
  uploadedAt: string
  uploadedBy: string
}

export default function FileUploadManagement() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [uploading, setUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize with sample uploaded files
  useEffect(() => {
    const sampleFiles: UploadedFile[] = [
      {
        id: 1,
        name: "logo-kemenag.jpg",
        originalName: "logo-kemenag.jpg",
        size: 245760,
        type: "image/jpeg",
        url: "/logo-kemenag.jpg",
        uploadedAt: "2024-01-15T10:00:00Z",
        uploadedBy: "Admin Kemenag",
      },
      {
        id: 2,
        name: "majestic-masjid.png",
        originalName: "masjid-agung.png",
        size: 512000,
        type: "image/png",
        url: "/majestic-masjid.png",
        uploadedAt: "2024-01-14T09:30:00Z",
        uploadedBy: "Admin Kemenag",
      },
      {
        id: 3,
        name: "bantuan-sosial.jpg",
        originalName: "bantuan-sosial.jpg",
        size: 387200,
        type: "image/jpeg",
        url: "/bantuan-sosial.jpg",
        uploadedAt: "2024-01-13T14:15:00Z",
        uploadedBy: "Admin Kemenag",
      },
    ]

    const savedFiles = localStorage.getItem("adminFiles")
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles))
    } else {
      setFiles(sampleFiles)
      localStorage.setItem("adminFiles", JSON.stringify(sampleFiles))
    }
  }, [])

  const saveFiles = (updatedFiles: UploadedFile[]) => {
    setFiles(updatedFiles)
    localStorage.setItem("adminFiles", JSON.stringify(updatedFiles))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files)
  }

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return

    setUploading(true)

    // Simulate file upload process
    const newFiles: UploadedFile[] = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]

      // Create a mock URL for the uploaded file
      const mockUrl = URL.createObjectURL(file)

      const newFile: UploadedFile = {
        id: Math.max(...files.map((f) => f.id), 0) + i + 1,
        name: `${Date.now()}-${file.name}`,
        originalName: file.name,
        size: file.size,
        type: file.type,
        url: mockUrl,
        uploadedAt: new Date().toISOString(),
        uploadedBy: "Admin Kemenag",
      }

      newFiles.push(newFile)
    }

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    saveFiles([...files, ...newFiles])
    setUploading(false)
    setSelectedFiles(null)
    setIsDialogOpen(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus file ini?")) {
      const updatedFiles = files.filter((file) => file.id !== id)
      saveFiles(updatedFiles)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    alert("URL berhasil disalin ke clipboard!")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <FaImage className="text-blue-500" />
    if (type === "application/pdf") return <FaFilePdf className="text-red-500" />
    if (type.includes("word")) return <FaFileWord className="text-blue-600" />
    if (type.includes("excel") || type.includes("spreadsheet")) return <FaFileExcel className="text-green-600" />
    return <FaFile className="text-gray-500" />
  }

  const filteredFiles = files
    .filter((file) => {
      const matchesSearch = file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType =
        filterType === "all" ||
        (filterType === "images" && file.type.startsWith("image/")) ||
        (filterType === "documents" && !file.type.startsWith("image/"))

      return matchesSearch && matchesType
    })
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-800">Kelola File</h1>
              <p className="text-gray-600 mt-2">Upload dan kelola file gambar dan dokumen</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <FaUpload className="mr-2" />
                  Upload File
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload File Baru</DialogTitle>
                  <DialogDescription>Pilih file untuk diupload ke server</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="files">Pilih File</Label>
                    <Input
                      ref={fileInputRef}
                      id="files"
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                      onChange={handleFileSelect}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-500 mt-1">Mendukung: Gambar (JPG, PNG, GIF), PDF, Word, Excel</p>
                  </div>

                  {selectedFiles && selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>File yang akan diupload:</Label>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {Array.from(selectedFiles).map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(file.type)}
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={uploading}>
                      Batal
                    </Button>
                    <Button
                      onClick={handleUpload}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!selectedFiles || selectedFiles.length === 0 || uploading}
                    >
                      {uploading ? "Mengupload..." : "Upload"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <Label>Cari File</Label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Cari nama file..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Filter Tipe</Label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="all">Semua File</option>
                    <option value="images">Gambar</option>
                    <option value="documents">Dokumen</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>File Terupload</CardTitle>
              <CardDescription>
                Total {files.length} file, {files.filter((f) => f.type.startsWith("image/")).length} gambar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(file.type)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{file.originalName}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(file.id)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <FaTrash />
                      </Button>
                    </div>

                    {file.type.startsWith("image/") && (
                      <div className="mb-3">
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.originalName}
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Upload: {new Date(file.uploadedAt).toLocaleDateString("id-ID")}</span>
                        <span>Oleh: {file.uploadedBy}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(file.url, "_blank")}
                          className="flex-1"
                        >
                          <FaEye className="mr-1" />
                          Lihat
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(file.url)}
                          className="flex-1"
                        >
                          <FaCopy className="mr-1" />
                          Copy URL
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredFiles.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    {searchQuery || filterType !== "all"
                      ? "Tidak ada file yang sesuai dengan filter."
                      : "Belum ada file yang diupload."}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AuthGuard>
  )
}
