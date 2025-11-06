"use client"

import { ChevronDown } from "lucide-react"

export default function TaskCard({ task, isExpanded, onToggle }) {
  return (
    <div className="group relative h-full cursor-pointer" onClick={onToggle}>
      {/* Efek bayangan warna ketika hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

      {/* Kartu utama */}
      <div
        className={`relative h-full bg-white rounded-2xl shadow-lg border-2 border-transparent transition-all duration-300 overflow-hidden ${
          isExpanded
            ? "ring-2 ring-green-500 shadow-2xl"
            : "group-hover:shadow-xl group-hover:border-green-200"
        }`}
      >
        {/* Garis atas kartu */}
        <div className="h-1 bg-gradient-to-r from-green-500 to-yellow-500" />

        {/* Konten utama */}
        <div className="p-6">
          {/* Icon dan Nomor */}
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl">{task.icon}</div>
            <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              #{task.id}
            </div>
          </div>

          {/* Judul */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
            {task.title}
          </h3>

          {/* Deskripsi (expandable) */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {task.description}
            </p>
          </div>

          {/* Tombol Expand */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span
              className={`text-xs font-semibold transition-colors duration-300 ${
                isExpanded ? "text-green-600" : "text-gray-500"
              }`}
            >
              {isExpanded ? "Tutup" : "Baca Selengkapnya"}
            </span>
            <ChevronDown
              size={20}
              className={`text-green-600 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Efek garis bawah saat hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </div>
  )
}
