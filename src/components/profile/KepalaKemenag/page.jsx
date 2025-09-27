import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaUser,
  FaGraduationCap,
  FaAward,
  FaBriefcase,
  FaQuoteLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa"

export default function KepalaKemenagPage() {
  const [activeSection, setActiveSection] = useState("profil")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const kepalaKemenag = {
    nama: "Dr. H. Ahmad Syaifuddin, M.Ag",
    jabatan: "Kepala Kantor Kementerian Agama Kabupaten Magetan",
    foto: "/kepalakemenag.jpg",
    periode: "2020 - Sekarang",
    tempat_lahir: "Magetan",
    tanggal_lahir: "15 Januari 1975",
    alamat: "Jl. Raya Magetan No. 123, Magetan",
    telepon: "(0351) 891234",
    email: "kepala@kemenagmagetan.go.id",
    motto: "Melayani dengan Hati, Mengabdi untuk Negeri",
    visi_kepemimpinan:
      "Mewujudkan pelayanan keagamaan yang prima, profesional, dan berintegritas tinggi untuk kesejahteraan umat beragama di Kabupaten Magetan.",
  }

  const pendidikan = [
    {
      tingkat: "S3 (Doktor)",
      jurusan: "Ilmu Agama Islam",
      institusi: "UIN Sunan Kalijaga Yogyakarta",
      tahun: "2015-2019",
      prestasi: "Summa Cum Laude",
    },
    {
      tingkat: "S2 (Magister)",
      jurusan: "Manajemen Pendidikan Islam",
      institusi: "IAIN Ponorogo",
      tahun: "2008-2010",
      prestasi: "IPK 3.85",
    },
    {
      tingkat: "S1 (Sarjana)",
      jurusan: "Pendidikan Agama Islam",
      institusi: "IAIN Sunan Ampel Surabaya",
      tahun: "1993-1997",
      prestasi: "IPK 3.75",
    },
  ]

  const pengalaman = [
    {
      jabatan: "Kepala Kantor Kementerian Agama Kabupaten Magetan",
      periode: "2020 - Sekarang",
      deskripsi: "Memimpin dan mengkoordinasikan seluruh kegiatan keagamaan di Kabupaten Magetan",
      pencapaian: [
        "Meningkatkan kualitas pelayanan haji dan umrah",
        "Mengembangkan program pemberdayaan ekonomi umat",
        "Memperkuat sinergi dengan organisasi keagamaan",
      ],
    },
    {
      jabatan: "Kepala Seksi Pendidikan Madrasah",
      periode: "2015 - 2020",
      deskripsi: "Mengawasi dan mengembangkan pendidikan madrasah di wilayah Magetan",
      pencapaian: [
        "Meningkatkan akreditasi madrasah",
        "Mengembangkan kurikulum berbasis karakter",
        "Melatih guru-guru madrasah",
      ],
    },
    {
      jabatan: "Kepala MAN 1 Magetan",
      periode: "2010 - 2015",
      deskripsi: "Memimpin Madrasah Aliyah Negeri 1 Magetan",
      pencapaian: ["Meraih akreditasi A", "Mengembangkan program unggulan", "Meningkatkan prestasi siswa"],
    },
  ]

  const penghargaan = [
    {
      nama: "Satya Lencana Karya Satya XX Tahun",
      pemberi: "Presiden Republik Indonesia",
      tahun: "2023",
      deskripsi: "Penghargaan atas dedikasi 20 tahun mengabdi sebagai ASN",
    },
    {
      nama: "Kepala Kantor Terbaik Jawa Timur",
      pemberi: "Kanwil Kemenag Jawa Timur",
      tahun: "2022",
      deskripsi: "Prestasi dalam kepemimpinan dan inovasi pelayanan",
    },
    {
      nama: "Tokoh Pendidikan Berprestasi",
      pemberi: "Pemerintah Kabupaten Magetan",
      tahun: "2021",
      deskripsi: "Kontribusi dalam pengembangan pendidikan agama",
    },
  ]

  const testimonials = [
    {
      nama: "H. Bambang Sutrisno",
      jabatan: "Ketua MUI Kabupaten Magetan",
      testimoni:
        "Beliau adalah pemimpin yang visioner dan selalu mengutamakan kepentingan umat. Kerjasama yang terjalin sangat baik.",
      rating: 5,
    },
    {
      nama: "Dra. Siti Aminah",
      jabatan: "Kepala SMPN 1 Magetan",
      testimoni: "Kepemimpinan yang inspiratif dan selalu mendukung pengembangan pendidikan di Magetan.",
      rating: 5,
    },
    {
      nama: "KH. Abdul Rahman",
      jabatan: "Pengasuh Pondok Pesantren Al-Hikmah",
      testimoni: "Sosok yang humble dan selalu siap membantu dalam pengembangan pendidikan pesantren.",
      rating: 5,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

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
      {/* Hero Section */}
      <motion.section
        className="relative h-[30vh] bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Kepala Kementerian Agama</h1>
          <p className="text-lg md:text-xl text-green-100 text-pretty">Kabupaten Magetan</p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 bg-yellow-400/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 -mt-20 relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-green-600 to-green-800 p-8 text-white text-center">
              <motion.div
                className="relative inline-block mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={kepalaKemenag.foto || "/placeholder.svg"}
                  alt={kepalaKemenag.nama}
                  className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <FaUser className="text-white text-xl" />
                </motion.div>
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 text-balance">{kepalaKemenag.nama}</h2>
              <p className="text-green-100 mb-4 text-pretty">{kepalaKemenag.jabatan}</p>
              <div className="flex items-center justify-center text-sm text-green-100 mb-2">
                <FaCalendarAlt className="mr-2" />
                <span>{kepalaKemenag.periode}</span>
              </div>
              <div className="flex items-center justify-center text-sm text-green-100">
                <FaMapMarkerAlt className="mr-2" />
                <span>{kepalaKemenag.tempat_lahir}</span>
              </div>
            </div>

            <div className="md:w-2/3 p-8">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <FaQuoteLeft className="text-green-600 text-2xl mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Motto Kepemimpinan</h3>
                </div>
                <p className="text-lg text-gray-700 italic text-pretty">"{kepalaKemenag.motto}"</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Visi Kepemimpinan</h3>
                <p className="text-gray-700 leading-relaxed text-pretty">{kepalaKemenag.visi_kepemimpinan}</p>
              </motion.div>

              <motion.div
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center text-gray-600">
                  <FaPhone className="text-green-600 mr-3" />
                  <span>{kepalaKemenag.telepon}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="text-green-600 mr-3" />
                  <span>{kepalaKemenag.email}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
            {["profil", "pendidikan", "pengalaman", "penghargaan"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                  activeSection === section ? "bg-green-600 text-white shadow-md" : "text-green-600 hover:bg-green-50"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === "profil" && (
            <motion.div
              key="profil"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaUser className="text-green-600 mr-3" />
                  Data Pribadi
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-semibold text-gray-600">Nama Lengkap:</span>
                    <span className="text-gray-800">{kepalaKemenag.nama}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-semibold text-gray-600">Tempat Lahir:</span>
                    <span className="text-gray-800">{kepalaKemenag.tempat_lahir}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-semibold text-gray-600">Tanggal Lahir:</span>
                    <span className="text-gray-800">{kepalaKemenag.tanggal_lahir}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-semibold text-gray-600">Alamat:</span>
                    <span className="text-gray-800 text-right">{kepalaKemenag.alamat}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Testimoni</h3>
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500 text-xl" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-4 text-pretty">
                        "{testimonials[currentTestimonial].testimoni}"
                      </p>
                      <div>
                        <p className="font-bold text-gray-800">{testimonials[currentTestimonial].nama}</p>
                        <p className="text-sm text-gray-600">{testimonials[currentTestimonial].jabatan}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={() =>
                        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                      }
                      className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                    >
                      <FaChevronLeft />
                    </button>
                    <div className="flex space-x-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentTestimonial ? "bg-green-600" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                      className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeSection === "pendidikan" && (
            <motion.div
              key="pendidikan"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              {pendidikan.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start">
                    <motion.div
                      className="mr-6 p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full text-white"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <FaGraduationCap className="text-2xl" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{edu.tingkat}</h3>
                        <span className="text-green-600 font-semibold">{edu.tahun}</span>
                      </div>
                      <p className="text-lg text-gray-700 mb-2">{edu.jurusan}</p>
                      <p className="text-gray-600 mb-3">{edu.institusi}</p>
                      <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        <FaAward className="mr-2" />
                        {edu.prestasi}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeSection === "pengalaman" && (
            <motion.div
              key="pengalaman"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              {pengalaman.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start">
                    <motion.div
                      className="mr-6 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <FaBriefcase className="text-2xl" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 text-balance">{exp.jabatan}</h3>
                        <span className="text-blue-600 font-semibold">{exp.periode}</span>
                      </div>
                      <p className="text-gray-700 mb-4 text-pretty">{exp.deskripsi}</p>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Pencapaian Utama:</h4>
                        <ul className="space-y-2">
                          {exp.pencapaian.map((pencapaian, pencapaianIndex) => (
                            <motion.li
                              key={pencapaianIndex}
                              className="flex items-start text-gray-700"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * pencapaianIndex }}
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>{pencapaian}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeSection === "penghargaan" && (
            <motion.div
              key="penghargaan"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {penghargaan.map((award, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div
                    className="mx-auto mb-6 p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full text-white w-20 h-20 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaAward className="text-3xl" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 text-balance">{award.nama}</h3>
                  <p className="text-green-600 font-semibold mb-2">{award.pemberi}</p>
                  <p className="text-gray-600 text-sm mb-4">{award.tahun}</p>
                  <p className="text-gray-700 text-sm text-pretty">{award.deskripsi}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 0.5 }}>
              <h3 className="text-2xl font-bold mb-4 text-balance">Ingin Bertemu Langsung?</h3>
              <p className="text-green-100 mb-6 text-pretty">
                Kami siap melayani dan mendengarkan aspirasi masyarakat untuk kemajuan bersama
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-yellow-500 hover:bg-yellow-400 text-green-800 font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buat Janji Temu
                </motion.button>
                <motion.button
                  className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-bold py-3 px-8 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hubungi Sekretariat
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
