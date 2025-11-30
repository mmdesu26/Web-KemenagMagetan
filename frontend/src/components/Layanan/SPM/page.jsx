import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

const spmServices = [
  {
    id: 1,
    name: "Pendaftaran Nikah",
    unit: "Kantor KUA Kabupaten Magetan",
    waktu: "1 hari kerja",
    persyaratan: [
      "Fotokopi KTP",
      "Fotokopi KK",
      "Akta Lahir",
      "Formulir pendaftaran nikah"
    ],
    prosedur: [
      "Datang ke loket KUA",
      "Petugas memverifikasi dokumen",
      "Mengisi formulir",
      "Menerima akta nikah"
    ],
    output: "Akta Nikah resmi",
    biaya: "Bebas biaya",
    mutu: "Petugas ramah & profesional; pengaduan via call center / PPID"
  },
  {
    id: 2,
    name: "Izin Haji",
    unit: "Kantor Kemenag Kabupaten Magetan",
    waktu: "3 hari kerja",
    persyaratan: ["Fotokopi KTP", "KK", "Surat keterangan kesehatan"],
    prosedur: [
      "Datang ke loket Kemenag",
      "Verifikasi dokumen",
      "Input data ke sistem",
      "Terbitkan surat izin haji"
    ],
    output: "Surat izin haji resmi",
    biaya: "Bebas biaya",
    mutu: "Petugas profesional; pengaduan via call center / website"
  },
  {
    id: 3,
    name: "Pendaftaran Madrasah",
    unit: "Kantor Kemenag Kabupaten Magetan",
    waktu: "5 hari kerja",
    persyaratan: ["Fotokopi akta pendirian", "Formulir pendaftaran"],
    prosedur: [
      "Datang ke kantor Kemenag",
      "Verifikasi dokumen",
      "Input data ke sistem",
      "Terbitkan SK pendirian madrasah"
    ],
    output: "SK Pendirian Madrasah",
    biaya: "Bebas biaya",
    mutu: "Pelayanan cepat dan transparan; pengaduan via website"
  }
];

const SPM = () => {
  return (
    <div className="min-h-screen bg-green-50 py-24 px-4 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-800 mb-2">
          Standar Pelayanan Minimal (SPM)
        </h1>
        <p className="text-green-700 text-lg">
          Informasi layanan publik Kemenag Kabupaten Magetan
        </p>
      </div>

      {/* Grid Layanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {spmServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-xl shadow-md border border-green-100 p-6 flex flex-col gap-3 cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-green-800">{service.name}</h2>
            <p className="text-green-700 font-medium">{service.unit}</p>

            <p><span className="font-semibold">Waktu Pelayanan:</span> {service.waktu}</p>

            <div>
              <p className="font-semibold">Persyaratan:</p>
              <ul className="list-disc list-inside ml-4">
                {service.persyaratan.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div>
              <p className="font-semibold">Prosedur:</p>
              <ol className="list-decimal list-inside ml-4">
                {service.prosedur.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>

            <p><span className="font-semibold">Output:</span> {service.output}</p>
            <p><span className="font-semibold">Biaya:</span> {service.biaya}</p>
            <p><span className="font-semibold">Standar Mutu & Pengaduan:</span> {service.mutu}</p>
          </motion.div>
        ))}
      </div>

      {/* Kontak Informasi */}
      <div className="text-center mt-12 flex flex-col md:flex-row justify-center items-center gap-4">
        <a
          href="tel:+62351234567"
          className="bg-yellow-500 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
        >
          <FaPhone /> Telepon
        </a>
        <a
          href="https://wa.me/081234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
        >
          <FaWhatsapp /> WhatsApp
        </a>
      </div>
    </div>
  );
};

export default SPM;
