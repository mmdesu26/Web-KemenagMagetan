import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaChevronDown, FaSearch, FaQuestionCircle, FaFileAlt, FaUsers, FaHeart } from "react-icons/fa"

const categories = [
  { key: "all", label: "Semua", color: "bg-green-600", icon: FaQuestionCircle },
  { key: "bimas", label: "Bimas Islam", color: "bg-green-700", icon: FaHeart },
  { key: "haji", label: "Haji dan Umrah", color: "bg-yellow-600", icon: FaUsers },
  { key: "nikah", label: "Nikah", color: "bg-green-500", icon: FaHeart },
  { key: "pendidikan", label: "Pendidikan", color: "bg-yellow-700", icon: FaFileAlt },
]

const faqData = [
  {
    category: "bimas",
    question: "Bagaimana cara mengajukan permohonan Pembaca Doa?",
    answer:
      "Untuk mengajukan permohonan pembaca doa, Anda perlu: 1) Mengisi formulir permohonan yang tersedia di kantor Kemenag, 2) Melampirkan fotokopi KTP dan KK, 3) Menyertakan surat keterangan dari RT/RW, 4) Menyerahkan berkas ke bagian Bimas Islam. Proses persetujuan memakan waktu 3-5 hari kerja.",
  },
  {
    category: "bimas",
    question: "Bagaimana cara Permohonan Rohaniwan?",
    answer:
      "Permohonan rohaniwan dapat dilakukan dengan: 1) Mengajukan surat permohonan resmi dari instansi/lembaga, 2) Melampirkan data lengkap acara (waktu, tempat, jenis kegiatan), 3) Menyertakan kontak person yang dapat dihubungi, 4) Mengajukan minimal 7 hari sebelum acara.",
  },
  {
    category: "bimas",
    question: "Bagaimana cara mengajukan permohonan Pengukuran Arah Kiblat?",
    answer:
      "Untuk pengukuran arah kiblat: 1) Ajukan permohonan tertulis ke Kemenag, 2) Sertakan alamat lengkap lokasi masjid/musholla, 3) Koordinat GPS jika tersedia, 4) Kontak person penanggungjawab, 5) Tim akan melakukan survei dan pengukuran di lokasi.",
  },
  {
    category: "bimas",
    question: "Bagaimana cara mengajukan permohonan data tempat ibadah?",
    answer:
      "Untuk mendapatkan data tempat ibadah: 1) Ajukan surat permohonan resmi, 2) Sebutkan tujuan penggunaan data, 3) Lampirkan identitas pemohon, 4) Data akan diberikan sesuai ketentuan yang berlaku dan keperluan yang sah.",
  },
  {
    category: "bimas",
    question: "Bagaimana cara mengajukan permohonan Rekomendasi Izin Pendirian Tempat Ibadah?",
    answer:
      "Persyaratan rekomendasi izin pendirian tempat ibadah: 1) Surat permohonan dari pengurus, 2) Akta notaris pendirian yayasan/organisasi, 3) Surat dukungan dari masyarakat sekitar, 4) Surat keterangan dari RT/RW dan Kelurahan, 5) Denah lokasi dan rencana bangunan, 6) NPWP yayasan.",
  },
  {
    category: "haji",
    question: "Bagaimana cara mengajukan permohonan Rekomendasi Pembatalan Pemberangkatan Ibadah Haji?",
    answer:
      "Untuk pembatalan pemberangkatan haji: 1) Surat permohonan pembatalan dengan alasan yang jelas, 2) Surat keterangan dokter (jika karena sakit), 3) Fotokopi buku tabungan haji, 4) Fotokopi KTP dan KK, 5) Surat pernyataan bermaterai. Proses pembatalan akan dikoordinasikan dengan Kemenag Pusat.",
  },
  {
    category: "haji",
    question: "Bagaimana cara mengajukan permohonan rekomendasi perpanjangan izin operasional PPIU?",
    answer:
      "Perpanjangan izin PPIU memerlukan: 1) Surat permohonan perpanjangan, 2) Fotokopi izin operasional yang akan habis, 3) Laporan kegiatan tahun sebelumnya, 4) Laporan keuangan, 5) Daftar jamaah yang telah dilayani, 6) Sertifikat kompetensi SDM yang masih berlaku.",
  },
  {
    category: "haji",
    question: "Bagaimana cara mengajukan permohonan rekomendasi Izin Pendirian Operasional PPIU?",
    answer:
      "Untuk izin pendirian PPIU baru: 1) Surat permohonan dari direksi perusahaan, 2) Akta pendirian perusahaan, 3) NPWP dan SIUP, 4) Sertifikat kompetensi penyelenggara umrah, 5) Rencana kerja dan anggaran, 6) Surat pernyataan kesanggupan, 7) Jaminan bank sesuai ketentuan.",
  },
  {
    category: "nikah",
    question: "Bagaimana cara mengajukan permohonan data pernikahan?",
    answer:
      "Untuk mendapatkan data pernikahan: 1) Surat permohonan resmi, 2) Fotokopi KTP pemohon, 3) Sebutkan tujuan penggunaan data, 4) Jika untuk keperluan hukum, sertakan surat kuasa jika diperlukan, 5) Data akan diberikan sesuai ketentuan privasi yang berlaku.",
  },
  {
    category: "nikah",
    question: "Bagaimana cara mengajukan Surat Permohonan Wali Hakim?",
    answer:
      "Permohonan wali hakim diperlukan jika: 1) Wali nasab tidak ada/tidak bisa hadir, 2) Ajukan surat permohonan ke KUA, 3) Lampirkan fotokopi KTP calon pengantin, 4) Surat keterangan tidak ada wali dari kelurahan, 5) Surat pernyataan dari calon pengantin wanita, 6) Proses akan dilakukan oleh Penghulu KUA.",
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan permohonan izin pendirian TPA/TQA?",
    answer:
      "Persyaratan pendirian TPA/TQA: 1) Surat permohonan dari pengurus, 2) Akta notaris yayasan/organisasi, 3) Daftar pengurus dan tenaga pengajar, 4) Kurikulum pembelajaran, 5) Denah lokasi dan fasilitas, 6) Surat dukungan masyarakat, 7) Rekomendasi dari MUI setempat.",
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan Izin Pendirian Pondok Pesantren?",
    answer:
      "Pendirian pondok pesantren memerlukan: 1) Surat permohonan dari calon pimpinan pesantren, 2) Akta notaris yayasan, 3) Riwayat hidup dan ijazah pimpinan pesantren, 4) Rencana kurikulum dan program pendidikan, 5) Sertifikat tanah dan bangunan, 6) Struktur organisasi, 7) Rekomendasi ulama setempat.",
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan permohonan izin pendirian madrasah diniyah?",
    answer:
      "Izin pendirian madrasah diniyah: 1) Surat permohonan dari yayasan, 2) Akta notaris dan NPWP yayasan, 3) Daftar tenaga pendidik dan kualifikasinya, 4) Kurikulum sesuai standar Kemenag, 5) Sarana dan prasarana pembelajaran, 6) Rencana pembiayaan, 7) Surat dukungan masyarakat.",
  },
  {
    category: "pendidikan",
    question:
      "Bagaimana cara mengajukan rekomendasi santri pondok pesantren belajar/mondok Keluar Negeri (Paspor Pendidikan)?",
    answer:
      "Rekomendasi santri ke luar negeri: 1) Surat permohonan dari pimpinan pesantren, 2) Biodata lengkap santri, 3) Surat penerimaan dari lembaga pendidikan luar negeri, 4) Fotokopi ijazah terakhir, 5) Surat pernyataan orang tua/wali, 6) Rekomendasi dari pesantren asal, 7) Pas foto terbaru.",
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan permohonan rekomendasi santri luar negeri?",
    answer:
      "Untuk rekomendasi santri luar negeri: 1) Surat permohonan resmi, 2) Dokumen penerimaan dari institusi luar negeri, 3) Transkrip nilai dan ijazah, 4) Surat rekomendasi dari ustadz/kyai, 5) Surat pernyataan kesanggupan biaya, 6) Fotokopi paspor, 7) Medical check-up.",
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan permohonan rekomendasi pindah sekolah santri Wajardiknas?",
    answer:
      "Rekomendasi pindah sekolah santri: 1) Surat permohonan dari orang tua/wali, 2) Surat keterangan dari sekolah asal, 3) Surat penerimaan dari sekolah tujuan, 4) Fotokopi rapor terakhir, 5) Surat keterangan kelakuan baik, 6) Alasan perpindahan yang jelas.",
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan permohonan rekomendasi pindah madrasah?",
    answer:
      "Perpindahan madrasah memerlukan: 1) Surat permohonan dari orang tua, 2) Surat keterangan pindah dari madrasah asal, 3) Surat penerimaan madrasah tujuan, 4) Fotokopi ijazah dan SKHUN, 5) Transkrip nilai, 6) Surat keterangan berkelakuan baik, 7) Alasan perpindahan.",
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan permohonan rekomendasi izin operasional RA/Madrasah?",
    answer:
      "Izin operasional RA/Madrasah: 1) Surat permohonan dari yayasan, 2) Akta notaris dan NPWP, 3) Sertifikat tanah dan IMB, 4) Daftar tenaga pendidik dan kualifikasi, 5) Kurikulum dan program pembelajaran, 6) Sarana prasarana sesuai standar, 7) Rencana anggaran operasional.",
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan permohonan rekomendasi izin/tugas belajar?",
    answer:
      "Rekomendasi izin tugas belajar: 1) Surat permohonan dari instansi/lembaga, 2) Surat penerimaan dari institusi pendidikan, 3) Riwayat hidup dan ijazah terakhir, 4) Surat pernyataan kesanggupan, 5) Rencana studi dan jadwal kuliah, 6) Surat rekomendasi atasan langsung.",
  },
]

export default function FAQ() {
  const [activeCat, setActiveCat] = useState("all")
  const [expanded, setExpanded] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaq = faqData.filter((item) => {
    const matchesCategory = activeCat === "all" || item.category === activeCat
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-yellow-600 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <FaQuestionCircle className="text-6xl mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan seputar layanan Kementerian Agama Kabupaten Magetan
            </p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-300/20 rounded-full"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((cat) => {
            const IconComponent = cat.icon
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCat(cat.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 ${cat.color} ${
                  activeCat === cat.key
                    ? "ring-4 ring-offset-2 ring-green-300 scale-105"
                    : "opacity-80 hover:opacity-100 hover:scale-105"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="text-sm" />
                {cat.label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFaq.map((item, idx) => {
              const catColor = categories.find((c) => c.key === item.category)?.color || "bg-gray-500"
              const isOpen = expanded === idx
              return (
                <motion.div
                  key={`${activeCat}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
                >
                  <motion.button
                    onClick={() => setExpanded(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <span
                        className={`text-xs text-white px-3 py-1 rounded-full font-medium ${catColor} flex-shrink-0 mt-1`}
                      >
                        {categories.find((c) => c.key === item.category)?.label}
                      </span>
                      <p className="text-gray-800 font-semibold text-lg leading-relaxed">{item.question}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <FaChevronDown className="text-green-600 text-xl" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-6 border-l-4 border-green-500">
                            <p className="text-gray-700 leading-relaxed text-base">{item.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredFaq.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada pertanyaan yang ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau pilih kategori lain</p>
          </motion.div>
        )}

        {/* Contact Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-green-600 to-yellow-600 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Tidak menemukan jawaban yang Anda cari?</h3>
          <p className="text-lg opacity-90 mb-6">Hubungi kami langsung untuk mendapatkan bantuan lebih lanjut</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="tel:+62351462324"
              className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📞 (0351) 462324
            </motion.a>
            <motion.a
              href="mailto:kemenagmagetan@gmail.com"
              className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✉️ Email Kami
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
