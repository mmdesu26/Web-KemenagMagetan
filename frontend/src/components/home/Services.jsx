import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import * as FaIcons from "react-icons/fa"; // <<< SOLUSI 1: Import semua ikon FA
import { apiClient } from "../../api/client";

// Fungsi Helper untuk merender ikon berdasarkan nama string
const renderIcon = (iconName) => {
    // Asumsi semua ikon layanan ada di FaIcons (react-icons/fa)
    const IconComponent = FaIcons[iconName]; 
    if (IconComponent) {
        return <IconComponent />;
    }
    // Ikon pengganti jika ikon tidak ditemukan
    return <FaIcons.FaQuestionCircle />; 
};

const Services = () => {
    // ... (State & useEffect sama seperti sebelumnya) ...
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadServices = async () => {
            try {
                setLoading(true);
                setError("");
                const { data } = await apiClient.get("/public/services"); // Asumsi apiClient mengembalikan objek dengan properti data
                setCategories(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Gagal memuat layanan");
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, []);

    useEffect(() => {
        if (categories.length > 0 && activeCategory >= categories.length) {
            setActiveCategory(0);
        }
    }, [categories, activeCategory]);

    const currentCategory = categories[activeCategory] || { items: [] };

    const filteredServices = currentCategory.items.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                {/* ... (Judul dan Search sama seperti sebelumnya) ... */}

                {/* Perbaikan: Ganti service.icon dengan renderIcon(service.icon) */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {!loading && filteredServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex items-start">
                                    {/* <<< SOLUSI 2: Panggil fungsi renderIcon */}
                                    <span className="text-3xl mr-4">
                                        {renderIcon(service.icon)} 
                                    </span>
                                    {/* ... (Konten lainnya) ... */}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredServices.length === 0 && !loading && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-gray-500"
                    >
                         {/* Tambahkan ikon placeholder (FaQuestionCircle sudah diimport dari FaIcons) */}
                        <FaIcons.FaQuestionCircle className="text-4xl mx-auto mb-4 text-gray-300" />
                        <p>Tidak ditemukan layanan yang sesuai dengan pencarian Anda.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Services;