import React from "react";
import { motion } from "framer-motion";
import { FaChevronRight, FaHandHoldingHeart } from "react-icons/fa";

const bantuanList = [
  {
    title: "Bantuan Pendidikan Diniyah dan Pondok Pesantren",
    link: "https://simba.kemenag.go.id/",
  },
  {
    title: "Bantuan Masjid dan Mushalla",
    link: "https://bimasislam.kemenag.go.id/",
  },
  {
    title: "SIM-SARPRAS",
    link: "https://appmadrasah.kemenag.go.id/simsarpras/",
  },
  {
    title: "Beasiswa Indonesia Bangkit",
    link: "https://beasiswa.kemenag.go.id/",
  },
  {
    title: "Program Beasiswa Santri Berprestasi (PBSB)",
    link: "https://pendaftaran-beasiswa.kemenag.go.id/login",
  },
];

const InfoBantuan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 pt-24 pb-16 px-4 md:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-green-800 mb-3 tracking-wide flex justify-center items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Info Bantuan Kemenag
        </motion.h1>
        <motion.div
          className="w-32 h-1 bg-green-600 mx-auto rounded-full mb-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        ></motion.div>
        <p className="text-lg text-green-700 font-medium">
          Informasi Program Bantuan dari Kementerian Agama Kabupaten Magetan
        </p>
      </motion.div>

      {/* Daftar Bantuan */}
      <div className="max-w-3xl mx-auto space-y-5">
        {bantuanList.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-white rounded-2xl shadow-md p-5 border border-green-200
                       hover:shadow-xl hover:border-green-400 transition duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <motion.span
                className="w-4 h-4 bg-green-500 rounded-full group-hover:bg-green-600 transition"
                whileHover={{ scale: 1.2 }}
              ></motion.span>
              <p className="text-lg font-semibold text-green-900 group-hover:text-green-700 transition-colors duration-200">
                {item.title}
              </p>
            </div>
            <FaChevronRight className="text-green-400 group-hover:text-green-600 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default InfoBantuan;
