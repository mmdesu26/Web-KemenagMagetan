"use client"

import { useState } from "react"
import TaskCard from "../../task-card"

const tasks = [
  {
    id: 1,
    title: "Melaksanakan Koordinasi Perumusan Kebijakan",
    description:
      "Melaksanakan Koordinasi Perumusan kebijakan Tehnis dan pelayanan, pembinaan di bidang urusan tata usaha, kearsipan, perlengkapan dan rumah tangga penyelesaian tidak lanjut hasil pengawasan",
    icon: "📋",
  },
  {
    id: 2,
    title: "Mengklasifikasikan dan Mengarahkan Surat Masuk",
    description:
      "Mengklasifikasikan dan mengarahkan surat masuk sesuai dengan prosedur yang berlaku untuk memastikan surat sampai ke tujuan yang tepat",
    icon: "📬",
  },
  {
    id: 3,
    title: "Mengoreksi dan Memberi Paraf Surat Keluar",
    description:
      "Mengoreksi dan memberi paraf surat keluar untuk memastikan kualitas dan keabsahan dokumen sebelum dikirimkan",
    icon: "✍️",
  },
  {
    id: 4,
    title: "Menyiapkan Bahan dan Konsep Kebijakan Pimpinan",
    description:
      "Menyiapkan bahan dan konsep kebijakan pimpinan sebagai bahan pertimbangan dalam pengambilan keputusan",
    icon: "📝",
  },
  {
    id: 5,
    title: "Mengkoordinasikan Tugas Pelayanan Urusan Umum",
    description: "Mengkoordinasikan tugas pelayanan urusan umum untuk memastikan kelancaran operasional kantor",
    icon: "🤝",
  },
  {
    id: 6,
    title: "Menyiapkan Bahan Kebutuhan Kegiatan Rumah Tangga",
    description: "Menyiapkan bahan kebutuhan kegiatan rumah tangga Kankemenag untuk mendukung kelancaran kegiatan",
    icon: "🏢",
  },
  {
    id: 7,
    title: "Mengatur Tugas Keamanan, Kebersihan dan Keindahan",
    description:
      "Mengatur tugas keamanan, kebersihan dan keindahan kantor untuk menciptakan lingkungan kerja yang nyaman",
    icon: "🔒",
  },
  {
    id: 8,
    title: "Membuat Daftar Usul Persediaan",
    description: "Membuat daftar usul persediaan barang dan perlengkapan yang diperlukan untuk operasional kantor",
    icon: "📊",
  },
  {
    id: 9,
    title: "Melaksanakan Pelayanan dalam Administrasi Persuratan",
    description: "Melaksanakan pelayanan dalam administrasi persuratan dengan profesional dan tepat waktu",
    icon: "📧",
  },
  {
    id: 10,
    title: "Menindaklanjuti Disposisi Surat dari Pimpinan",
    description: "Menindaklanjuti Disposisi Surat dari pimpinan sesuai dengan instruksi yang diberikan",
    icon: "⚡",
  },
  {
    id: 11,
    title: "Mengkoordinasikan dan Menindaklanjuti Temuan Hasil Pengawasan",
    description: "Mengkoordinasikan dan Menindaklanjuti temuan hasil pengawasan untuk perbaikan berkelanjutan",
    icon: "✅",
  },
]

export default function TugasPtsp() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 text-balance">Tugas PTSP</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Pelayanan Terpadu Satu Pintu - Koordinasi dan Pembinaan Urusan Tata Usaha
          </p>
        </div>

        {/* Introduction Section */}
        <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-green-200 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Tugas</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Melaksanakan Koordinasi Perumusan kebijakan Tehnis dan pelayanan, pembinaan di bidang urusan tata usaha,
            kearsipan, perlengkapan dan rumah tangga penyelesaian tidak lanjut hasil pengawasan.
          </p>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-scale-in"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <TaskCard
                task={task}
                isExpanded={expandedId === task.id}
                onToggle={() => setExpandedId(expandedId === task.id ? null : task.id)}
              />
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ number: "11", label: "Tugas Utama", color: "green" },
            { number: "100%", label: "Komitmen", color: "yellow" },
            { number: "24/7", label: "Layanan", color: "green" }].map((stat, index) => (
            <div
              key={index}
              className={`p-6 bg-white rounded-xl shadow-md border-2 text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in ${
                stat.color === "green"
                  ? "border-green-300 hover:border-green-400"
                  : "border-yellow-300 hover:border-yellow-400"
              }`}
              style={{ animationDelay: `${(index + 11) * 50}ms` }}
            >
              <div
                className={`text-4xl font-bold mb-2 ${stat.color === "green" ? "text-green-600" : "text-yellow-600"}`}
              >
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
