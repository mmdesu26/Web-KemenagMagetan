import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const SOP = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-green-800 mb-3">
            Standar Operasional Prosedur (SOP)
          </h1>
          <div className="w-32 h-1 bg-green-600 mx-auto rounded-full mb-3"></div>
          <p className="text-lg text-green-700">
            Akses dokumen resmi SOP Kementerian Agama Kabupaten Magetan
          </p>
        </motion.div>

        {/* Card SOP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center md:items-start p-8 hover:shadow-green-200 transition-shadow duration-500"
        >
          {/* Gambar SOP */}
          <div className="md:w-1/3 w-full flex justify-center items-center p-4">
            <img
              src="/assets/images/sopkemenag.png"
              alt="SOP Kemenag"
              className="rounded-xl shadow-md object-cover w-64 h-64 md:w-72 md:h-72"
            />
          </div>

          {/* Info & Download */}
          <div className="md:w-2/3 w-full md:pl-10 pt-6 md:pt-0 space-y-5">
            <p className="text-green-800 font-semibold text-lg">
              Dokumen SOP resmi ini memuat panduan dan prosedur layanan Kemenag
              Kabupaten Magetan.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Prosedur pelayanan digital Kemenag</li>
              <li>Panduan internal dan tata kerja</li>
              <li>Standar operasional bagi petugas</li>
            </ul>

            <a
              href="/assets/images/sopkemenag.png"
              download="SOP_Kemenag"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Download className="w-5 h-5" />
              Download SOP
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SOP;
