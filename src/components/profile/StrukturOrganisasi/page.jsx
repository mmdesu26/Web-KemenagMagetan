"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaUser,
  FaUsers,
  FaChevronDown,
  FaChevronRight,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEye,
  FaHandshake,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa"

const StrukturOrganisasiPage = () => {
  const [selectedDivision, setSelectedDivision] = useState(null)
  const [expandedNodes, setExpandedNodes] = useState(new Set())

  const organizationData = {
    kepala: {
      nama: "Dr. H. Ahmad Syaifuddin, M.Ag",
      jabatan: "Kepala Kantor Kementerian Agama Kabupaten Magetan",
      foto: "/professional-headshot-of-indonesian-government-off.jpg",
      phone: "(0351) 891234",
      email: "kepala@kemenagmagetan.go.id",
    },
    struktur: [
      {
        id: "kasubag-tu",
        nama: "Drs. H. Mochammad Ridwan, M.Pd.I",
        jabatan: "Kasubag Tata Usaha",
        divisi: "Tata Usaha",
        foto: "/professional-indonesian-man-in-formal-attire.jpg",
        phone: "(0351) 891235",
        email: "tu@kemenagmagetan.go.id",
        tugas: [
          "Koordinasi administrasi umum",
          "Pengelolaan kepegawaian",
          "Pengelolaan keuangan",
          "Pengelolaan sarana prasarana",
        ],
        bawahan: [
          {
            nama: "Siti Nurhasanah, S.Pd",
            jabatan: "Staff Administrasi",
            tugas: "Administrasi surat menyurat",
          },
          {
            nama: "Ahmad Fauzi, S.Kom",
            jabatan: "Staff IT",
            tugas: "Pengelolaan sistem informasi",
          },
        ],
      },
      {
        id: "kasi-bimas-islam",
        nama: "Dr. Hj. Siti Maryam, M.Ag",
        jabatan: "Kasi Bimbingan Masyarakat Islam",
        divisi: "Bimbingan Masyarakat Islam",
        foto: "/professional-indonesian-woman-in-hijab-formal-atti.jpg",
        phone: "(0351) 891236",
        email: "bimasislam@kemenagmagetan.go.id",
        tugas: [
          "Pembinaan kehidupan beragama",
          "Pengelolaan masjid dan musholla",
          "Pembinaan organisasi keagamaan",
          "Penyelenggaraan haji dan umrah",
        ],
        bawahan: [
          {
            nama: "H. Bambang Sutrisno, S.Ag",
            jabatan: "Penyuluh Agama",
            tugas: "Penyuluhan agama Islam",
          },
          {
            nama: "Hj. Fatimah, S.Pd.I",
            jabatan: "Staff Haji",
            tugas: "Pelayanan haji dan umrah",
          },
        ],
      },
      {
        id: "kasi-pendis",
        nama: "Prof. Dr. H. Abdul Rahman, M.Pd",
        jabatan: "Kasi Pendidikan Islam",
        divisi: "Pendidikan Islam",
        foto: "/professional-indonesian-man-with-glasses-formal-at.jpg",
        phone: "(0351) 891237",
        email: "pendis@kemenagmagetan.go.id",
        tugas: [
          "Pembinaan madrasah",
          "Pembinaan pendidikan diniyah",
          "Pembinaan pondok pesantren",
          "Sertifikasi guru agama",
        ],
        bawahan: [
          {
            nama: "Dra. Hj. Khoiriyah, M.Pd.I",
            jabatan: "Pengawas Madrasah",
            tugas: "Pengawasan madrasah",
          },
          {
            nama: "H. Suryanto, S.Ag",
            jabatan: "Staff Pendis",
            tugas: "Administrasi pendidikan Islam",
          },
        ],
      },
      {
        id: "kasi-bimas-kristen",
        nama: "Pdt. Dr. Yohanes Kristianto, M.Th",
        jabatan: "Kasi Bimbingan Masyarakat Kristen",
        divisi: "Bimbingan Masyarakat Kristen",
        foto: "/professional-indonesian-christian-pastor-formal-at.jpg",
        phone: "(0351) 891238",
        email: "bimaskristen@kemenagmagetan.go.id",
        tugas: [
          "Pembinaan umat Kristen",
          "Pengelolaan gereja",
          "Pembinaan organisasi Kristen",
          "Pelayanan pernikahan Kristen",
        ],
        bawahan: [
          {
            nama: "Maria Magdalena, S.Th",
            jabatan: "Staff Bimas Kristen",
            tugas: "Administrasi umat Kristen",
          },
        ],
      },
      {
        id: "kasi-bimas-katolik",
        nama: "Rm. Dr. Antonius Widodo, M.Th",
        jabatan: "Kasi Bimbingan Masyarakat Katolik",
        divisi: "Bimbingan Masyarakat Katolik",
        foto: "/professional-indonesian-catholic-priest-formal-att.jpg",
        phone: "(0351) 891239",
        email: "bimaskatolik@kemenagmagetan.go.id",
        tugas: [
          "Pembinaan umat Katolik",
          "Pengelolaan gereja Katolik",
          "Pembinaan organisasi Katolik",
          "Pelayanan pernikahan Katolik",
        ],
        bawahan: [
          {
            nama: "Theresia Wulandari, S.Th",
            jabatan: "Staff Bimas Katolik",
            tugas: "Administrasi umat Katolik",
          },
        ],
      },
      {
        id: "kasi-bimas-hindu-buddha",
        nama: "I Made Sutrisna, S.Ag, M.Pd.H",
        jabatan: "Kasi Bimbingan Masyarakat Hindu & Buddha",
        divisi: "Bimbingan Masyarakat Hindu & Buddha",
        foto: "/professional-indonesian-hindu-buddhist-leader-form.jpg",
        phone: "(0351) 891240",
        email: "bimashindubuddha@kemenagmagetan.go.id",
        tugas: [
          "Pembinaan umat Hindu & Buddha",
          "Pengelolaan pura dan vihara",
          "Pembinaan organisasi Hindu & Buddha",
          "Pelayanan pernikahan Hindu & Buddha",
        ],
        bawahan: [
          {
            nama: "Ni Kadek Sari, S.Ag",
            jabatan: "Staff Bimas Hindu",
            tugas: "Administrasi umat Hindu",
          },
          {
            nama: "Bhikkhu Dhammavaro",
            jabatan: "Staff Bimas Buddha",
            tugas: "Administrasi umat Buddha",
          },
        ],
      },
    ],
  }

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-200/30 to-yellow-200/30 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-yellow-200/20 to-green-200/20 rounded-full"
        />
      </div>

      <div className="relative z-10 pt-44 pb-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-lg">
              <FaBuilding className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 text-balance">Struktur Organisasi</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Struktur organisasi Kantor Kementerian Agama Kabupaten Magetan yang terdiri dari berbagai bidang dan seksi
            </p>
          </motion.div>

          {/* Kepala Kantor Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-yellow-500" />

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-200 shadow-lg"
                  >
                    <img
                      src={organizationData.kepala.foto || "/placeholder.svg"}
                      alt={organizationData.kepala.nama}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-green-800 mb-2">{organizationData.kepala.nama}</h2>
                  <p className="text-lg text-gray-600 mb-4">{organizationData.kepala.jabatan}</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-green-500" />
                      <span>{organizationData.kepala.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-green-500" />
                      <span>{organizationData.kepala.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Organization Chart */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Struktur Organisasi</h2>
              <p className="text-gray-600">Klik pada setiap divisi untuk melihat detail struktur dan tugas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizationData.struktur.map((divisi, index) => (
                <motion.div
                  key={divisi.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedDivision(selectedDivision === divisi.id ? null : divisi.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-white text-xl" />
                      </div>
                      <motion.div
                        animate={{ rotate: selectedDivision === divisi.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="text-green-500" />
                      </motion.div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-200">
                        <img
                          src={divisi.foto || "/placeholder.svg"}
                          alt={divisi.nama}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-green-800 text-sm mb-1">{divisi.nama}</h3>
                        <p className="text-xs text-gray-600 mb-1">{divisi.jabatan}</p>
                        <p className="text-xs font-medium text-green-600">{divisi.divisi}</p>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedDivision === divisi.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-100 pt-4 mt-4"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-green-800 mb-2 text-sm">Kontak:</h4>
                              <div className="space-y-1 text-xs text-gray-600">
                                <div className="flex items-center gap-2">
                                  <FaPhone className="text-green-500" />
                                  <span>{divisi.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaEnvelope className="text-green-500" />
                                  <span>{divisi.email}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-green-800 mb-2 text-sm">Tugas Pokok:</h4>
                              <ul className="space-y-1">
                                {divisi.tugas.map((tugas, tugasIndex) => (
                                  <li key={tugasIndex} className="text-xs text-gray-600 flex items-start gap-2">
                                    <FaChevronRight className="text-green-500 mt-1 flex-shrink-0" size={8} />
                                    <span>{tugas}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-green-800 mb-2 text-sm">Tim:</h4>
                              <div className="space-y-2">
                                {divisi.bawahan.map((staff, staffIndex) => (
                                  <div key={staffIndex} className="bg-green-50 rounded-lg p-3">
                                    <p className="font-medium text-green-800 text-xs">{staff.nama}</p>
                                    <p className="text-xs text-gray-600 mb-1">{staff.jabatan}</p>
                                    <p className="text-xs text-gray-500">{staff.tugas}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-center">Nilai-Nilai Organisasi</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: <FaEye />, title: "Transparansi", desc: "Keterbukaan dalam setiap proses" },
                    { icon: <FaHandshake />, title: "Integritas", desc: "Konsisten dalam nilai dan tindakan" },
                    { icon: <FaLightbulb />, title: "Inovasi", desc: "Terus berinovasi untuk pelayanan terbaik" },
                    { icon: <FaHeart />, title: "Empati", desc: "Memahami kebutuhan masyarakat" },
                  ].map((value, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-2xl">{value.icon}</div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                      <p className="text-green-100 text-sm">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              <h2 className="text-2xl font-bold text-green-800 mb-6">Hubungi Kami</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <FaMapMarkerAlt className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">Alamat</h3>
                  <p className="text-gray-600 text-sm text-center">
                    Jl. Raya Magetan-Madiun No. 123
                    <br />
                    Magetan, Jawa Timur 63314
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <FaPhone className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">Telepon</h3>
                  <p className="text-gray-600 text-sm">(0351) 891234</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <FaEnvelope className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">Email</h3>
                  <p className="text-gray-600 text-sm">info@kemenagmagetan.go.id</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default StrukturOrganisasiPage
