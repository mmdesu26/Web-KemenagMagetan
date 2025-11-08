import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTasks,
  FaEnvelopeOpenText,
  FaFolderOpen,
  FaPenNib,
  FaClipboardList,
  FaUsersCog,
  FaHome,
  FaShieldAlt,
  FaBox,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";

const tasks = [
  {
    id: 1,
    icon: <FaFolderOpen className="text-green-600 text-2xl" />,
    title: "Mengklasifikasikan dan Mengarahkan Surat Masuk",
    description:
      "Mengklasifikasikan dan mengarahkan surat masuk sesuai dengan prosedur untuk memastikan surat sampai ke tujuan yang tepat.",
  },
  {
    id: 2,
    icon: <FaPenNib className="text-green-600 text-2xl" />,
    title: "Mengoreksi dan Memberi Paraf Surat Keluar",
    description:
      "Memeriksa, mengoreksi, dan memberi paraf surat keluar agar kualitas dan keabsahan dokumen terjamin sebelum dikirimkan.",
  },
  {
    id: 3,
    icon: <FaClipboardList className="text-green-600 text-2xl" />,
    title: "Menyiapkan Bahan dan Konsep Kebijakan Pimpinan",
    description:
      "Menyiapkan bahan dan konsep kebijakan pimpinan sebagai bahan pertimbangan dalam pengambilan keputusan strategis.",
  },
  {
    id: 4,
    icon: <FaUsersCog className="text-green-600 text-2xl" />,
    title: "Mengkoordinasikan Tugas Pelayanan Urusan Umum",
    description:
      "Mengkoordinasikan tugas pelayanan urusan umum untuk memastikan kelancaran operasional dan efisiensi kegiatan kantor.",
  },
  {
    id: 5,
    icon: <FaHome className="text-green-600 text-2xl" />,
    title: "Menyiapkan Bahan Kebutuhan Kegiatan Rumah Tangga",
    description:
      "Menyiapkan bahan kebutuhan kegiatan rumah tangga Kankemenag untuk mendukung kelancaran operasional kantor.",
  },
  {
    id: 6,
    icon: <FaShieldAlt className="text-green-600 text-2xl" />,
    title: "Mengatur Tugas Keamanan, Kebersihan dan Keindahan",
    description:
      "Mengatur dan mengawasi tugas keamanan, kebersihan, serta keindahan kantor agar tercipta lingkungan kerja yang nyaman.",
  },
  {
    id: 7,
    icon: <FaBox className="text-green-600 text-2xl" />,
    title: "Membuat Daftar Usul Persediaan",
    description:
      "Menyusun daftar usulan persediaan barang dan perlengkapan yang diperlukan untuk mendukung kegiatan operasional.",
  },
  {
    id: 8,
    icon: <FaFileAlt className="text-green-600 text-2xl" />,
    title: "Melaksanakan Pelayanan dalam Administrasi Persuratan",
    description:
      "Memberikan pelayanan administrasi persuratan secara profesional, tertib, dan tepat waktu.",
  },
  {
    id: 9,
    icon: <FaEnvelopeOpenText className="text-green-600 text-2xl" />,
    title: "Menindaklanjuti Disposisi Surat dari Pimpinan",
    description:
      "Menindaklanjuti disposisi surat dari pimpinan sesuai instruksi, serta melaporkan hasil pelaksanaan dengan tepat waktu.",
  },
  {
    id: 10,
    icon: <FaChartLine className="text-green-600 text-2xl" />,
    title: "Mengkoordinasikan dan Menindaklanjuti Temuan Hasil Pengawasan",
    description:
      "Mengkoordinasikan dan menindaklanjuti temuan hasil pengawasan untuk meningkatkan mutu pelayanan dan tata kelola.",
  },
];

function TugasPtsp() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-bold text-green-800 mb-3 flex justify-center items-center gap-3">
            Tugas PTSP
          </h1>
          <div className="w-28 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Pelayanan Terpadu Satu Pintu Kementerian Agama Kabupaten Magetan
          </p>
        </motion.div>

        {/* Deskripsi Umum */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl border border-green-200 shadow-md p-8 mb-14"
        >
          <h2 className="text-2xl font-semibold text-green-800 mb-3 flex items-center gap-2">
            <FaTasks className="text-green-600" />
            Deskripsi Umum
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            Melaksanakan koordinasi perumusan kebijakan teknis dan pelayanan,
            pembinaan di bidang urusan tata usaha, kearsipan, perlengkapan, dan
            rumah tangga serta penyelesaian tindak lanjut hasil pengawasan.
          </p>
        </motion.div>

        {/* Daftar Tugas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-green-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer p-6"
              onClick={() =>
                setExpandedId(expandedId === task.id ? null : task.id)
              }
            >
              <div className="flex items-center gap-3 mb-3">
                {task.icon}
                <h3 className="text-lg font-semibold text-green-800">
                  {task.title}
                </h3>
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: expandedId === task.id ? "auto" : 0,
                  opacity: expandedId === task.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden text-gray-600 text-sm leading-relaxed"
              >
                {task.description}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default TugasPtsp;
