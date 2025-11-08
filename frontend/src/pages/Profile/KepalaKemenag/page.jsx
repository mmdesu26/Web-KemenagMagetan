import React from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaCalendarAlt,
  FaGraduationCap,
  FaClock,
  FaPray,
  FaVenusMars,
  FaMedal,
} from "react-icons/fa";

const KepalaKemenag = () => {
  const data = {
    nama: "Dr. H. Taufiqurrohman, M.Ag",
    jabatan: "Kepala Kantor Kementerian Agama Kabupaten Magetan",
    nip: "-",
    pangkat: "Pembina Tk.I / IV/b",
    tanggalLahir: "-",
    masaKerja: "25 Tahun 11 Bulan",
    jenisKelamin: "Laki-laki",
    pendidikan:
      "S3, Manajemen Pendidikan Islam, Universitas Islam Negeri Maulana Malik Ibrahim, 2016",
    agama: "Islam",
    tanggalPensiun: "01/06/2033",
    foto: "/assets/images/kepalakemenag.jpg", // pastikan path sesuai di folder public/images
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pt-24 pb-24 px-4 md:px-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-green-800 mb-3 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Kepala Kemenag
        </motion.h1>
        <motion.div
          className="w-32 h-1 bg-green-600 mx-auto rounded-full mb-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        ></motion.div>
        <p className="text-lg text-green-700 font-medium">
          Kementerian Agama Kabupaten Magetan
        </p>
      </motion.div>

      {/* Card Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center md:items-start max-w-6xl mx-auto hover:shadow-green-200 transition-shadow duration-500"
      >
        {/* Foto */}
        <div className="md:w-1/3 w-full h-full flex justify-center items-center bg-gradient-to-br from-green-600 to-green-700 p-8 relative">
          <motion.div
            className="absolute inset-0 bg-green-800/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          ></motion.div>

          <motion.img
            src={data.foto}
            alt="Foto Kepala Kemenag"
            className="rounded-2xl shadow-lg border-4 border-white object-cover w-64 h-80 relative z-10 hover:scale-105 transition-transform duration-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>

        {/* Data */}
        <div className="md:w-2/3 w-full p-8 md:p-10 space-y-5">
          <motion.h2
            className="text-3xl font-bold text-green-800"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {data.nama}
          </motion.h2>
          <p className="text-green-700 font-medium text-lg mb-4">
            {data.jabatan}
          </p>

          <div className="grid md:grid-cols-2 gap-5 text-gray-700">
            {[
              {
                icon: <FaUserTie className="text-green-600 text-xl mt-1" />,
                label: "NIP",
                value: data.nip,
              },
              {
                icon: <FaMedal className="text-green-600 text-xl mt-1" />,
                label: "Pangkat/Gol.",
                value: data.pangkat,
              },
              {
                icon: <FaCalendarAlt className="text-green-600 text-xl mt-1" />,
                label: "Tanggal Lahir",
                value: data.tanggalLahir,
              },
              {
                icon: <FaClock className="text-green-600 text-xl mt-1" />,
                label: "Masa Kerja",
                value: data.masaKerja,
              },
              {
                icon: <FaVenusMars className="text-green-600 text-xl mt-1" />,
                label: "Jenis Kelamin",
                value: data.jenisKelamin,
              },
              {
                icon: (
                  <FaGraduationCap className="text-green-600 text-xl mt-1" />
                ),
                label: "Pendidikan Terakhir",
                value: data.pendidikan,
              },
              {
                icon: <FaPray className="text-green-600 text-xl mt-1" />,
                label: "Agama",
                value: data.agama,
              },
              {
                icon: <FaCalendarAlt className="text-green-600 text-xl mt-1" />,
                label: "Tanggal Pensiun",
                value: data.tanggalPensiun,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 hover:bg-green-50 p-2 rounded-lg transition-all duration-300"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                {item.icon}
                <p>
                  <span className="font-semibold">{item.label}:</span>{" "}
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default KepalaKemenag;
