"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaImage, FaSearch } from "react-icons/fa"

interface UploadedFile {
  id: number
  name: string
  originalName: string
  url: string
  type: string
}

interface FilePickerProps {
  onSelect: (url: string) => void
  trigger?: React.ReactNode
  accept?: "images" | "all"
}

export default function FilePicker({ onSelect, trigger, accept = "all" }: FilePickerProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const savedFiles = localStorage.getItem("adminFiles")
    if (savedFiles) {
      const allFiles = JSON.parse(savedFiles)
      const filteredFiles =
        accept === "images" ? allFiles.filter((f: UploadedFile) => f.type.startsWith("image/")) : allFiles
      setFiles(filteredFiles)
    }
  }, [accept])

  const filteredFiles = files.filter((file) => file.originalName.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSelect = (url: string) => {
    onSelect(url)
    setIsOpen(false)
    setSearchQuery("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <FaImage className="mr-2" />
            Pilih dari Gallery
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Pilih File</DialogTitle>
          <DialogDescription>Pilih file dari gallery yang sudah diupload</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Cari file..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="border rounded-lg p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelect(file.url)}
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={file.url || "/placeholder.svg"}
                    alt={file.originalName}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                ) : (
                  <div className="w-full h-24 bg-gray-100 rounded mb-2 flex items-center justify-center">
                    <FaImage className="text-gray-400" />
                  </div>
                )}
                <p className="text-xs truncate">{file.originalName}</p>
              </div>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? "Tidak ada file yang ditemukan." : "Belum ada file yang diupload."}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
