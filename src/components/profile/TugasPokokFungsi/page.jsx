// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   FaUsers,
//   FaBook,
//   FaHandsHelping,
//   FaGavel,
//   FaBuilding,
//   FaChevronRight,
//   FaChevronDown,
//   FaCheckCircle,
//   FaArrowRight,
// } from "react-icons/fa"

// export default function TupoksiPage() {
//   const [activeTab, setActiveTab] = useState("tugas-pokok")
//   const [expandedFunction, setExpandedFunction] = useState<number(null)

//   const tugasPokok = [
//     {
//       title: "Penyelenggaraan Urusan Pemerintahan Bidang Agama",
//       description:
//         "Melaksanakan urusan pemerintahan di bidang agama sesuai dengan ketentuan peraturan perundang-undangan",
//       icon: <FaGavel className="text-3xl text-green-600" />,
//       details: [
//         "Pembinaan kehidupan beragama",
//         "Pelayanan kehidupan beragama",
//         "Penyelenggaraan ibadah dan syiar agama",
//         "Pemberdayaan ekonomi umat beragama",
//       ],
//     },
//     {
//       title: "Pembinaan Umat Beragama",
//       description: "Memberikan pembinaan dan bimbingan kepada umat beragama dalam menjalankan ajaran agamanya",
//       icon: <FaUsers className="text-3xl text-yellow-600" />,
//       details: [
//         "Bimbingan masyarakat Islam",
//         "Bimbingan masyarakat Kristen",
//         "Bimbingan masyarakat Katolik",
//         "Bimbingan masyarakat Hindu dan Buddha",
//       ],
//     },
//     {
//       title: "Penyelenggaraan Pendidikan Agama",
//       description: "Menyelenggarakan dan mengawasi pendidikan agama di berbagai jenjang pendidikan",
//       icon: <FaBook className="text-3xl text-blue-600" />,
//       details: [
//         "Pendidikan Agama Islam",
//         "Pendidikan Diniyah dan Pondok Pesantren",
//         "Pendidikan Agama Kristen",
//         "Pendidikan Agama Katolik, Hindu, dan Buddha",
//       ],
//     },
//     {
//       title: "Pelayanan Administrasi Keagamaan",
//       description: "Memberikan pelayanan administrasi dalam bidang keagamaan kepada masyarakat",
//       icon: <FaHandsHelping className="text-3xl text-purple-600" />,
//       details: [
//         "Nikah, Talak, Cerai, dan Rujuk (NTCR)",
//         "Sertifikasi Halal",
//         "Bimbingan Ibadah Haji dan Umrah",
//         "Wakaf dan Zakat",
//       ],
//     },
//   ]

//   const fungsiUtama = [
//     {
//       id: 1,
//       title: "Perumusan Kebijakan Teknis",
//       description:
//         "Merumuskan kebijakan teknis di bidang urusan agama sesuai dengan kebijakan yang ditetapkan oleh Menteri Agama",
//       activities: [
//         "Penyusunan rencana strategis bidang agama",
//         "Koordinasi dengan instansi terkait",
//         "Evaluasi implementasi kebijakan",
//         "Pelaporan hasil pelaksanaan program",
//       ],
//     },
//     {
//       id: 2,
//       title: "Pelaksanaan Tugas Dekonsentrasi",
//       description: "Melaksanakan tugas dekonsentrasi di bidang urusan agama yang dilimpahkan oleh pemerintah pusat",
//       activities: [
//         "Pelaksanaan program nasional bidang agama",
//         "Koordinasi dengan pemerintah daerah",
//         "Monitoring dan evaluasi program",
//         "Pelaporan kepada pemerintah pusat",
//       ],
//     },
//     {
//       id: 3,
//       title: "Pembinaan dan Pelayanan Teknis",
//       description: "Memberikan pembinaan dan pelayanan teknis kepada unit pelaksana teknis dan masyarakat",
//       activities: [
//         "Pembinaan SDM bidang agama",
//         "Pelayanan teknis keagamaan",
//         "Fasilitasi kegiatan keagamaan",
//         "Pengembangan sarana prasarana",
//       ],
//     },
//     {
//       id: 4,
//       title: "Pengawasan dan Pengendalian",
//       description: "Melakukan pengawasan dan pengendalian terhadap pelaksanaan urusan agama di wilayah kabupaten",
//       activities: [
//         "Pengawasan pelaksanaan program",
//         "Pengendalian kualitas layanan",
//         "Audit internal",
//         "Tindak lanjut hasil pengawasan",
//       ],
//     },
//     {
//       id: 5,
//       title: "Koordinasi dan Kerjasama",
//       description: "Menjalin koordinasi dan kerjasama dengan berbagai pihak dalam pelaksanaan urusan agama",
//       activities: [
//         "Koordinasi lintas sektoral",
//         "Kerjasama dengan organisasi keagamaan",
//         "Sinergi dengan pemerintah daerah",
//         "Kemitraan dengan masyarakat",
//       ],
//     },
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
//       {/* Hero Section */}
//       <motion.section
//         className="relative h-[25vh] bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center text-white overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="absolute inset-0 bg-black/20"></div>
//         <motion.div
//           className="relative z-10 text-center px-4"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//         >
//           <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Tugas Pokok & Fungsi</h1>
//           <p className="text-lg md:text-xl text-green-100 text-pretty">Kementerian Agama Kabupaten Magetan</p>
//         </motion.div>

//         {/* Decorative Elements */}
//         <motion.div
//           className="absolute top-10 right-10 w-20 h-20 bg-yellow-400/20 rounded-full"
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 180, 360],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full"
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.3, 0.8, 0.3],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//         />
//       </motion.section>

//       <div className="container mx-auto px-4 py-12">
//         {/* Tab Navigation */}
//         <motion.div
//           className="flex justify-center mb-12"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
//             <button
//               onClick={() => setActiveTab("tugas-pokok")}
//               className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
//                 activeTab === "tugas-pokok" ? "bg-green-600 text-white shadow-md" : "text-green-600 hover:bg-green-50"
//               }`}
//             >
//               Tugas Pokok
//             </button>
//             <button
//               onClick={() => setActiveTab("fungsi")}
//               className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
//                 activeTab === "fungsi" ? "bg-green-600 text-white shadow-md" : "text-green-600 hover:bg-green-50"
//               }`}
//             >
//               Fungsi Utama
//             </button>
//           </div>
//         </motion.div>

//         <AnimatePresence mode="wait">
//           {activeTab === "tugas-pokok" && (
//             <motion.div
//               key="tugas-pokok"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               className="grid grid-cols-1 md:grid-cols-2 gap-8"
//             >
//               {tugasPokok.map((tugas, index) => (
//                 <motion.div
//                   key={index}
//                   variants={itemVariants}
//                   className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
//                   whileHover={{ y: -5 }}
//                 >
//                   <div className="p-8">
//                     <div className="flex items-center mb-6">
//                       <motion.div
//                         className="mr-4 p-3 bg-gray-50 rounded-full group-hover:bg-green-50 transition-colors duration-300"
//                         whileHover={{ scale: 1.1, rotate: 5 }}
//                       >
//                         {tugas.icon}
//                       </motion.div>
//                       <h3 className="text-xl font-bold text-gray-800 text-balance">{tugas.title}</h3>
//                     </div>

//                     <p className="text-gray-600 mb-6 leading-relaxed text-pretty">{tugas.description}</p>

//                     <div className="space-y-3">
//                       {tugas.details.map((detail, detailIndex) => (
//                         <motion.div
//                           key={detailIndex}
//                           className="flex items-center text-sm text-gray-700"
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: 0.1 * detailIndex }}
//                         >
//                           <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
//                           <span>{detail}</span>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
//                     <motion.button
//                       className="flex items-center text-white font-semibold hover:text-yellow-200 transition-colors"
//                       whileHover={{ x: 5 }}
//                     >
//                       Pelajari Lebih Lanjut
//                       <FaArrowRight className="ml-2" />
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}

//           {activeTab === "fungsi" && (
//             <motion.div
//               key="fungsi"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               className="space-y-6"
//             >
//               {fungsiUtama.map((fungsi, index) => (
//                 <motion.div
//                   key={fungsi.id}
//                   variants={itemVariants}
//                   className="bg-white rounded-2xl shadow-lg overflow-hidden"
//                 >
//                   <motion.button
//                     onClick={() => setExpandedFunction(expandedFunction === fungsi.id ? null : fungsi.id)}
//                     className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
//                     whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <motion.div
//                           className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
//                           whileHover={{ scale: 1.1 }}
//                         >
//                           {fungsi.id}
//                         </motion.div>
//                         <div>
//                           <h3 className="text-xl font-bold text-gray-800 mb-2 text-balance">{fungsi.title}</h3>
//                           <p className="text-gray-600 text-pretty">{fungsi.description}</p>
//                         </div>
//                       </div>
//                       <motion.div
//                         animate={{ rotate: expandedFunction === fungsi.id ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <FaChevronDown className="text-green-600 text-xl" />
//                       </motion.div>
//                     </div>
//                   </motion.button>

//                   <AnimatePresence>
//                     {expandedFunction === fungsi.id && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="border-t border-gray-100"
//                       >
//                         <div className="p-6 bg-gradient-to-r from-green-50 to-yellow-50">
//                           <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
//                             <FaBuilding className="text-green-600 mr-2" />
//                             Kegiatan Utama:
//                           </h4>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {fungsi.activities.map((activity, activityIndex) => (
//                               <motion.div
//                                 key={activityIndex}
//                                 className="flex items-start bg-white p-4 rounded-lg shadow-sm"
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.1 * activityIndex }}
//                                 whileHover={{ scale: 1.02 }}
//                               >
//                                 <FaChevronRight className="text-green-500 mr-3 mt-1 flex-shrink-0" />
//                                 <span className="text-gray-700">{activity}</span>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Call to Action */}
//         <motion.div
//           className="mt-16 text-center"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.6 }}
//         >
//           <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white">
//             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 0.5 }}>
//               <h3 className="text-2xl font-bold mb-4 text-balance">Butuh Informasi Lebih Lanjut?</h3>
//               <p className="text-green-100 mb-6 text-pretty">
//                 Hubungi kami untuk mendapatkan informasi detail mengenai tugas pokok dan fungsi Kementerian Agama
//                 Kabupaten Magetan
//               </p>
//               <motion.button
//                 className="bg-yellow-500 hover:bg-yellow-400 text-green-800 font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
//                 whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Hubungi Kami
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }


import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaUsers,
  FaBook,
  FaHandsHelping,
  FaGavel,
  FaBuilding,
  FaChevronRight,
  FaChevronDown,
  FaCheckCircle,
} from "react-icons/fa"

export default function TugasPokokFungsi() {
  const [activeTab, setActiveTab] = useState("tugas-pokok")
  const [expandedFunction, setExpandedFunction] = useState(null)

  const tugasPokok = [
    {
      title: "Penyelenggaraan Urusan Pemerintahan Bidang Agama",
      description:
        "Melaksanakan urusan pemerintahan di bidang agama sesuai dengan ketentuan peraturan perundang-undangan",
      icon: <FaGavel className="text-3xl text-green-600" />,
      details: [
        "Pembinaan kehidupan beragama",
        "Pelayanan kehidupan beragama",
        "Penyelenggaraan ibadah dan syiar agama",
        "Pemberdayaan ekonomi umat beragama",
      ],
    },
    {
      title: "Pembinaan Umat Beragama",
      description: "Memberikan pembinaan dan bimbingan kepada umat beragama dalam menjalankan ajaran agamanya",
      icon: <FaUsers className="text-3xl text-yellow-600" />,
      details: [
        "Bimbingan masyarakat Islam",
        "Bimbingan masyarakat Kristen",
        "Bimbingan masyarakat Katolik",
        "Bimbingan masyarakat Hindu dan Buddha",
      ],
    },
    {
      title: "Penyelenggaraan Pendidikan Agama",
      description: "Menyelenggarakan dan mengawasi pendidikan agama di berbagai jenjang pendidikan",
      icon: <FaBook className="text-3xl text-blue-600" />,
      details: [
        "Pendidikan Agama Islam",
        "Pendidikan Diniyah dan Pondok Pesantren",
        "Pendidikan Agama Kristen",
        "Pendidikan Agama Katolik, Hindu, dan Buddha",
      ],
    },
    {
      title: "Pelayanan Administrasi Keagamaan",
      description: "Memberikan pelayanan administrasi dalam bidang keagamaan kepada masyarakat",
      icon: <FaHandsHelping className="text-3xl text-purple-600" />,
      details: [
        "Nikah, Talak, Cerai, dan Rujuk (NTCR)",
        "Sertifikasi Halal",
        "Bimbingan Ibadah Haji dan Umrah",
        "Wakaf dan Zakat",
      ],
    },
  ]

  const fungsiUtama = [
    {
      id: 1,
      title: "Perumusan Kebijakan Teknis",
      description:
        "Merumuskan kebijakan teknis di bidang urusan agama sesuai dengan kebijakan yang ditetapkan oleh Menteri Agama",
      activities: [
        "Penyusunan rencana strategis bidang agama",
        "Koordinasi dengan instansi terkait",
        "Evaluasi implementasi kebijakan",
        "Pelaporan hasil pelaksanaan program",
      ],
    },
    {
      id: 2,
      title: "Pelaksanaan Tugas Dekonsentrasi",
      description: "Melaksanakan tugas dekonsentrasi di bidang urusan agama yang dilimpahkan oleh pemerintah pusat",
      activities: [
        "Pelaksanaan program nasional bidang agama",
        "Koordinasi dengan pemerintah daerah",
        "Monitoring dan evaluasi program",
        "Pelaporan kepada pemerintah pusat",
      ],
    },
    {
      id: 3,
      title: "Pembinaan dan Pelayanan Teknis",
      description: "Memberikan pembinaan dan pelayanan teknis kepada unit pelaksana teknis dan masyarakat",
      activities: [
        "Pembinaan SDM bidang agama",
        "Pelayanan teknis keagamaan",
        "Fasilitasi kegiatan keagamaan",
        "Pengembangan sarana prasarana",
      ],
    },
    {
      id: 4,
      title: "Pengawasan dan Pengendalian",
      description: "Melakukan pengawasan dan pengendalian terhadap pelaksanaan urusan agama di wilayah kabupaten",
      activities: [
        "Pengawasan pelaksanaan program",
        "Pengendalian kualitas layanan",
        "Audit internal",
        "Tindak lanjut hasil pengawasan",
      ],
    },
    {
      id: 5,
      title: "Koordinasi dan Kerjasama",
      description: "Menjalin koordinasi dan kerjasama dengan berbagai pihak dalam pelaksanaan urusan agama",
      activities: [
        "Koordinasi lintas sektoral",
        "Kerjasama dengan organisasi keagamaan",
        "Sinergi dengan pemerintah daerah",
        "Kemitraan dengan masyarakat",
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Hero */}
      <motion.section className="relative h-[25vh] bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center text-white overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div className="relative z-10 text-center px-4" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tugas Pokok & Fungsi</h1>
          <p className="text-lg md:text-xl text-green-100">Kementerian Agama Kabupaten Magetan</p>
        </motion.div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <motion.div className="flex justify-center mb-12" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
            <button onClick={() => setActiveTab("tugas-pokok")} className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "tugas-pokok" ? "bg-green-600 text-white shadow-md" : "text-green-600 hover:bg-green-50"}`}>Tugas Pokok</button>
            <button onClick={() => setActiveTab("fungsi")} className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "fungsi" ? "bg-green-600 text-white shadow-md" : "text-green-600 hover:bg-green-50"}`}>Fungsi Utama</button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "tugas-pokok" && (
            <motion.div key="tugas-pokok" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tugasPokok.map((tugas, index) => (
                <motion.div key={index} variants={itemVariants} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">{tugas.icon}</div>
                    <h3 className="text-lg font-bold">{tugas.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-2">{tugas.description}</p>
                  <ul className="list-disc list-inside">
                    {tugas.details.map((detail, i) => (
                      <li key={i} className="text-gray-600 flex items-center"><FaCheckCircle className="text-green-500 mr-2" />{detail}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "fungsi" && (
            <motion.div key="fungsi" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-4">
              {fungsiUtama.map((fungsi) => (
                <motion.div key={fungsi.id} variants={itemVariants} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button onClick={() => setExpandedFunction(expandedFunction === fungsi.id ? null : fungsi.id)} className="w-full p-4 text-left flex justify-between items-center">
                    <span className="font-bold">{fungsi.title}</span>
                    <FaChevronDown className={`text-green-600 transition-transform ${expandedFunction === fungsi.id ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {expandedFunction === fungsi.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="p-4 border-t border-gray-100 overflow-hidden">
                        <ul className="list-disc list-inside">
                          {fungsi.activities.map((act, i) => (
                            <li key={i} className="text-gray-700 flex items-center"><FaChevronRight className="text-green-500 mr-2" />{act}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
