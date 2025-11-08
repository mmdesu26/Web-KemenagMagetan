import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaChevronDown, FaChevronRight, FaCheckCircle } from "react-icons/fa"

function TugasPokokFungsi() {
  const [activeTab, setActiveTab] = useState("tugas")
  const [expanded, setExpanded] = useState(false)

  const tugas = {
    title: "Tugas",
    description:
      "Melaksanakan tugas dan fungsi Kementerian Agama dalam wilayah Kabupaten Magetan berdasarkan kebijakan Kepala Kantor Wilayah Kementerian Agama Provinsi Jawa Timur dan ketentuan peraturan perundang-undangan.",
  }

  const fungsiList = [
    "Perumusan dan penetapan visi, misi, dan kebijakan teknis di bidang pelayanan dan bimbingan kehidupan beragama kepada masyarakat di kabupaten/kota.",
    "Pelayanan, bimbingan, dan pembinaan kehidupan beragama.",
    "Pelayanan, bimbingan, dan pembinaan haji dan umrah, serta zakat dan wakaf.",
    "Pelayanan, bimbingan, dan pembinaan di bidang pendidikan madrasah, pendidikan agama, dan pendidikan keagamaan.",
    "Pembinaan kerukunan umat beragama.",
    "Pelaksanaan kebijakan teknis di bidang pengelolaan administrasi dan informasi.",
    "Pengkoordinasian perencanaan, pengendalian, pengawasan, dan evaluasi program.",
    "Pelaksanaan hubungan dengan pemerintah daerah, instansi terkait, dan lembaga masyarakat dalam rangka pelaksanaan tugas Kementerian Agama di kabupaten/kota.",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 pt-20">
      {/* Hero Section */}
      <motion.section
        className="relative h-[25vh] bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center text-white overflow-hidden"
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tugas Pokok & Fungsi
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Kementerian Agama Kabupaten Magetan
          </p>
        </motion.div>
      </motion.section>

      {/* Konten */}
      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white rounded-full p-2 shadow-md border border-green-100">
            <button
              onClick={() => setActiveTab("tugas")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "tugas"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              Tugas
            </button>
            <button
              onClick={() => setActiveTab("fungsi")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "fungsi"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              Fungsi
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "tugas" && (
            <motion.div
              key="tugas"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-green-100"
            >
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-emerald-800 mb-4"
              >
                {tugas.title}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-700 leading-relaxed text-justify"
              >
                {tugas.description}
              </motion.p>
            </motion.div>
          )}

          {activeTab === "fungsi" && (
            <motion.div
              key="fungsi"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-4xl mx-auto space-y-4"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-lg border border-green-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="w-full p-6 flex justify-between items-center text-left"
                >
                  <span className="text-xl font-bold text-emerald-800">
                    Fungsi
                  </span>
                  <FaChevronDown
                    className={`text-emerald-600 transition-transform duration-300 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 border-t border-green-100"
                    >
                      <ul className="space-y-3">
                        {fungsiList.map((fungsi, i) => (
                          <li
                            key={i}
                            className="flex items-start text-gray-700 leading-relaxed"
                          >
                            <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                            {fungsi}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TugasPokokFungsi
