import React, { useState } from "react";
import { motion } from "framer-motion";
import { services } from "../../data/services";
import { FaSearch, FaArrowRight, FaGraduationCap, FaLightbulb } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
// Impor ikon tambahan yang relevan untuk fallback atau default (opsional)
import { IoIosApps } from "react-icons/io";


// Komponen Ikon Layanan (Di-embed di sini untuk penyederhanaan)
// Gunakan komponen ini untuk menghasilkan efek icon button.
const ServiceIconButton = ({ service, index }) => {
    // Tentukan warna acak minimalis untuk variasi UI (atau Anda bisa tentukan warna di services.js)
    const colors = [
        'bg-blue-100 text-blue-600',
        'bg-purple-100 text-purple-600',
        'bg-yellow-100 text-yellow-600',
        'bg-teal-100 text-teal-600',
    ];
    const colorClass = colors[service.id % colors.length];

    // Fungsi untuk mengarahkan ke URL (gunakan window.location jika tidak ada react-router-dom)
    const handleNavigate = () => {
        window.location.href = service.url;
        // Jika menggunakan React Router: navigate(service.url);
    };

    // Ini adalah bagian KRITIS: Merender Ikon.
    // Karena data masih emoji, kita akan menampilkannya sebagai teks besar.
    // Jika Anda mengganti data menjadi string nama ikon (mis. "FaGraduationCap"),
    // Anda harus membuat fungsi lookup untuk memuat komponen React Icon.
    
    // Untuk saat ini, kita akan menggunakan emoji dari data sebagai teks di tengah lingkaran
    const IconContent = (
        <span className="text-4xl">
            {service.icon}
        </span>
    );
    
    // Atau, jika Anda ingin menggunakan React Icon sebagai fallback:
    // const IconComponent = FaGraduationCap; // Default Icon
    // const IconContent = <IconComponent className="text-4xl" />;


    return (
        <motion.button
            key={service.id}
            onClick={handleNavigate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-4 w-full cursor-pointer transition-transform duration-300 transform"
        >
            {/* Lingkaran Ikon (seperti di gambar) */}
            <div className={`p-4 rounded-3xl mb-3 ${colorClass}`}>
                {IconContent}
            </div>
            {/* Nama Layanan */}
            <p className="text-center text-sm font-medium text-gray-700 leading-snug">
                {service.name}
            </p>
        </motion.button>
    );
};


const Services = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const activeItems = services[activeCategory] ? services[activeCategory].items : [];

    const filteredServices = activeItems.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                {/* Judul dan Subjudul */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
                        Layanan Digital Kemenag
                    </h2>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto">
                        Akses berbagai layanan digital Kementerian Agama Kabupaten Magetan
                        dengan mudah dan cepat.
                    </p>
                </motion.div>

                {/* Navigasi Kategori Horizontal */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {services.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(index)}
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                                activeCategory === index
                                    ? "bg-green-600 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {category.kategori}
                        </button>
                    ))}
                </div>

                {/* Search Box */}
                <div className="relative max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Cari layanan..."
                        className="w-full border border-gray-300 rounded-full py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Grid Layanan */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center"
                >
                    {filteredServices.map((service, index) => (
                        <div key={service.id} className="w-full max-w-[120px]">
                            <ServiceIconButton service={service} index={index} />
                        </div>
                    ))}
                </motion.div>

                {/* Pesan tidak ditemukan */}
                {filteredServices.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-gray-500"
                    >
                        <MdHelp className="text-4xl mx-auto mb-4 text-gray-300" />
                        <p>Tidak ditemukan layanan yang sesuai dengan pencarian Anda.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Services;