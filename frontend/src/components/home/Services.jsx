import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { apiClient } from "../../api/client";

const Services = () => {
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
                const data = await apiClient.get("/public/services");
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

                <div className="mb-8">
					<div className="flex flex-wrap justify-center gap-2 mb-6">
                        {categories.map((category, index) => (
							<button
								key={index}
								onClick={() => setActiveCategory(index)}
								className={`px-4 py-2 rounded-full transition-colors ${
									activeCategory === index
										? "bg-green-700 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{category.kategori}
							</button>
						))}
					</div>

					<div className="relative max-w-md mx-auto mb-8">
						<input
							type="text"
							placeholder="Cari layanan..."
							className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<FaSearch className="absolute left-3 top-3 text-gray-400" />
					</div>
				</div>

                {loading && (
                    <div className="text-center text-gray-500">Memuat layanan...</div>
                )}

                {error && !loading && (
                    <div className="text-center text-red-500">{error}</div>
                )}

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
									<span className="text-3xl mr-4">{service.icon}</span>
									<div>
										<h3 className="font-bold text-lg mb-2 text-green-800">
											{service.name}
										</h3>
										<a
											href={service.url}
											className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
										>
											Akses layanan <FaArrowRight className="ml-1" />
										</a>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{filteredServices.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center py-8 text-gray-500"
					>
						Tidak ditemukan layanan yang sesuai dengan pencarian Anda.
					</motion.div>
				)}
			</div>
		</section>
	);
};

export default Services;
