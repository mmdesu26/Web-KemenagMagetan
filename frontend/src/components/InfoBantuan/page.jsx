"use client";

import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

const bantuanList = [
  "Bantuan Pendidikan Diniyah dan Pondok Pesantren",
  "Bantuan Masjid dan Mushalla",
  "SIM-SARPRAS",
  "Beasiswa Indonesia Bangkit",
  "Program Beasiswa Santri Berprestasi (PBSB)",
];

export default function InfoBantuan() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-33 pb-12 px-4">
      {/* Judul Halaman */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Info Bantuan Kemenag
      </motion.h1>

      {/* Daftar Bantuan */}
      <div className="max-w-2xl mx-auto space-y-4">
        {bantuanList.map((item, index) => (
          <motion.div
            key={index}
            className="group flex items-center justify-between bg-white rounded-2xl shadow-md p-5 cursor-pointer 
                       hover:shadow-xl transition duration-300 border border-green-200"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full group-hover:bg-green-600 transition"></span>
              <p className="text-lg font-semibold text-green-900 group-hover:text-green-700">
                {item}
              </p>
            </div>
            <FaChevronRight className="text-green-400 group-hover:text-green-600 transition" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
