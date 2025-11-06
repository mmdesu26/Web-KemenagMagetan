import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaGavel,
  FaUsers,
  FaFileAlt,
  FaChevronDown,
} from "react-icons/fa";

const TugasPPIDModern = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const tugasPPID = [
    {
      title: "Pelayanan Informasi Publik",
      detail:
        "PPID bertanggung jawab menyediakan informasi publik dengan prinsip cepat, tepat, dan sederhana, serta menjaga keamanan dan validitas data.",
      icon: FaShieldAlt,
    },
    {
      title: "Penyusunan Daftar Informasi",
      detail:
        "Menetapkan daftar informasi publik dan informasi yang dikecualikan, untuk memastikan transparansi dan keteraturan dalam pelayanan publik.",
      icon: FaFileAlt,
    },
    {
      title: "Koordinasi dan Pembinaan",
      detail:
        "Melakukan koordinasi dan pembinaan PPID di unit kerja, guna menjamin konsistensi dan standar layanan di seluruh wilayah.",
      icon: FaUsers,
    },
  ];

  const wewenang = [
    "Menetapkan standar pelayanan informasi publik.",
    "Menolak permohonan informasi yang dikecualikan sesuai ketentuan.",
    "Mengembangkan sistem informasi publik secara berkala.",
    "Melakukan koordinasi penyelesaian keberatan.",
    "Melaporkan hasil pelaksanaan pelayanan informasi setiap tahun.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 pt-28 pb-16 px-4 sm:px-6 md:px-10">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-700 mb-3 sm:mb-4"
        >
          Tugas & Wewenang PPID
        </motion.h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-3">
          Pejabat Pengelola Informasi dan Dokumentasi berperan penting dalam
          mewujudkan keterbukaan informasi publik secara transparan dan
          profesional.
        </p>
      </div>

      {/* Tugas Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
          <FaShieldAlt className="text-green-600 flex-shrink-0" />
          <span>Tugas Utama</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {tugasPPID.map((item, idx) => {
            const Icon = item.icon;
            const active = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                layout
                className={`rounded-2xl shadow-md border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  active ? "ring-2 ring-green-500" : ""
                }`}
              >
                <button
                  onClick={() => setActiveIndex(active ? null : idx)}
                  className="w-full p-5 sm:p-6 flex flex-col items-center"
                >
                  <div className="bg-gradient-to-br from-green-600 to-yellow-600 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                    <Icon className="text-white text-xl sm:text-2xl" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 text-center">
                    {item.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: active ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-green-600 text-sm sm:text-base" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-700 text-sm sm:text-base leading-relaxed"
                    >
                      {item.detail}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Wewenang Section */}
      <section className="max-w-6xl mx-auto mb-16 px-2 sm:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FaGavel className="text-yellow-600 flex-shrink-0" />
          <span>Wewenang PPID</span>
        </h2>
        <div className="space-y-3">
          {wewenang.map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 bg-white rounded-xl p-3 sm:p-4 border-l-4 border-green-500 shadow-sm hover:shadow-md"
            >
              <span className="bg-green-600 text-white w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-xs font-bold">
                {idx + 1}
              </span>
              <p className="text-gray-700 text-sm sm:text-base">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Informasi Tambahan */}
      <section className="max-w-5xl mx-auto text-center bg-gradient-to-r from-green-600 to-yellow-600 rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl text-white">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
        >
          Maklumat Layanan PPID
        </motion.h3>
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-green-50 mb-5 sm:mb-6">
          “Kami berkomitmen memberikan pelayanan informasi publik yang
          transparan, akurat, dan profesional demi terciptanya pemerintahan
          yang terbuka.”
        </p>
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3">
          {["Transparansi", "Akuntabilitas", "Keterbukaan", "Integritas"].map(
            (item, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-green-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base shadow-md"
              >
                {item}
              </motion.span>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default TugasPPIDModern;
