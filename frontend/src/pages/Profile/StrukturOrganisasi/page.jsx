import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StrukturOrganisasi = () => {
  const struktur = {
    kepala: {
      jabatan: "Kepala Kantor Kementerian Agama Kabupaten Magetan",
      nama: "Dr. H. Taufiqurrohman, M.Ag",
      foto: "/assets/images/kepalakemenag.jpg", // Ganti sesuai nama file kamu
    },
    kasubbag: {
      jabatan: "Plt. Kasubbag Tata Usaha",
      nama: "Sumadi, S.Pd, M.Pd.I",
      foto: "/images/sumadi.jpg", // Ganti sesuai file kamu
    },
    bawahan: [
      {
        jabatan: "Kasi Bimbingan Masyarakat Islam",
        nama: "Drs. Muttaqin, M.Pd.I",
        foto: "/images/muttaqin.jpg",
      },
      {
        jabatan: "Kasi Pendidikan Madrasah",
        nama: "Muh. Sujud Mizanul Qodri, M.Pd.I",
        foto: "/images/sujud.jpg",
      },
       {
        jabatan: "Kasi Pendidikan Diniyah dan Pondok Pesantren (PD Pontren)",
        nama: "Sumadi, S.Pd, M.Pd.I",
        foto: "/images/wahyu.jpg",
      },
      {
        jabatan: "Kasi Pendidikan Agama Islam (PAIS)",
        nama: "Eliyanti Nurmalita, S.Ag",
        foto: "/images/eliyanti.jpg",
      },
      {
        jabatan: "Kasi Penyelenggara Haji dan Umrah (PHU)",
        nama: "Ida Dwi Martini, S.Pd.I",
        foto: "/images/ida.jpg",
      },
      {
        jabatan: "Penyelenggara Zakat dan Wakaf",
        nama: "Ridwan Yulianto, S.Ag",
        foto: "/images/ridwan.jpg",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 pt-24 pb-24 px-4 md:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-3">
          Struktur Organisasi
        </h1>
        <p className="text-green-600 text-lg font-medium">
          Kantor Kementerian Agama Kabupaten Magetan
        </p>
      </motion.div>

      <div className="flex flex-col items-center">
        {/* Kepala Kemenag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-md text-center border-t-8 border-green-600 hover:scale-105 transition-all duration-300"
        >
          <img
            src={struktur.kepala.foto}
            alt={struktur.kepala.nama}
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-green-500 shadow-md"
          />
          <h2 className="text-2xl font-bold text-green-800">{struktur.kepala.nama}</h2>
          <p className="text-green-700 font-medium">{struktur.kepala.jabatan}</p>
        </motion.div>

        {/* Garis Penghubung */}
        <div className="w-1 h-16 bg-green-500 my-6"></div>

        {/* Kasubbag TU */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-md text-center border-t-8 border-green-500 hover:scale-105 transition-all duration-300"
        >
          <img
            src={struktur.kasubbag.foto}
            alt={struktur.kasubbag.nama}
            className="w-28 h-28 object-cover rounded-full mx-auto mb-4 border-4 border-green-400 shadow-md"
          />
          <h3 className="text-xl font-semibold text-green-800">{struktur.kasubbag.nama}</h3>
          <p className="text-green-600 font-medium">{struktur.kasubbag.jabatan}</p>
        </motion.div>

        {/* Garis Penghubung */}
        <div className="w-1 h-16 bg-green-400 my-6"></div>

        {/* Bawahan */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
          {struktur.bawahan.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-green-300 hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.foto}
                alt={item.nama}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3 border-2 border-green-300 shadow-sm"
              />
              <h3 className="text-lg font-semibold text-green-800">{item.nama}</h3>
              <p className="text-green-600 text-sm mt-1">{item.jabatan}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
