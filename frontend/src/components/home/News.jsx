import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaFilter, FaArrowRight } from "react-icons/fa";
import { apiClient } from "../../api/client";

const News = ({ category, title, isMobile }) => {
	const [sortBy, setSortBy] = useState("newest");
	const [selectedDate, setSelectedDate] = useState(null);
	const inputRef = useRef(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadNews = async () => {
			try {
				setLoading(true);
				setError("");
				const data = await apiClient.get("/public/news", { category, limit: 20 });
				setItems(Array.isArray(data) ? data : []);
			} catch (err) {
				setError(err.message || "Gagal memuat berita");
			} finally {
				setLoading(false);
			}
		};
		loadNews();
	}, [category]);

	const handleButtonClick = () => {
		if (inputRef.current) {
			if (inputRef.current.showPicker) {
				inputRef.current.showPicker();
			} else {
				inputRef.current.click();
			}
		}
	};

	const filteredNews = [...items]
		.sort((a, b) => {
			if (sortBy === "newest") {
				return new Date(b.date) - new Date(a.date);
			} else {
				return new Date(a.date) - new Date(b.date);
			}
		})
		.filter((item) => {
			if (!selectedDate) return true;
			return (
				new Date(item.date).toDateString() ===
				new Date(selectedDate).toDateString()
			);
		});

	return (
		<motion.section
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="bg-white rounded-xl shadow-sm p-4 md:p-6"
		>
			<div
				className={`flex ${
					isMobile ? "flex-col" : "flex-row"
				} justify-between items-start gap-4 mb-4 md:mb-6`}
			>
				<h2 className="text-xl md:text-2xl font-bold text-green-800">
					{title}
				</h2>

				<div className="flex items-center space-x-2 md:space-x-3">
					<div className="relative">
						<button className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm">
							<FaFilter className="mr-1 md:mr-2" />
							{sortBy === "newest" ? "Terbaru" : "Terlama"}
						</button>
						<select
							className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
						>
							<option value="newest">Terbaru</option>
							<option value="oldest">Terlama</option>
						</select>
					</div>

					<div className="relative" onClick={handleButtonClick}>
						<button className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm">
							<FaCalendarAlt className="mr-1 md:mr-2" />
							{selectedDate
								? new Date(selectedDate).toLocaleDateString("id-ID")
								: "Tanggal"}
						</button>
						<input
							type="date"
							ref={inputRef}
							className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
							onChange={(e) => setSelectedDate(e.target.value)}
							value={selectedDate || ""}
						/>
					</div>

					<a
						href={`/news?category=${category}`}
						className="text-green-600 hover:text-green-800 text-xs md:text-sm font-medium flex items-center"
					>
						Lihat <FaArrowRight className="ml-1 hidden md:inline" />
					</a>
				</div>
			</div>

		{loading && (
			<div className="text-center text-gray-500 py-4">Memuat berita...</div>
		)}

		{error && !loading && (
			<div className="text-center text-red-500 py-4">{error}</div>
		)}

		<div className="space-y-3 md:space-y-4">
			{!loading && filteredNews.slice(0, isMobile ? 2 : 3).map((item, index) => (
					<motion.article
						key={item.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.1 }}
						whileHover={{ x: isMobile ? 0 : 5 }}
						className={`flex ${
							isMobile ? "flex-col" : "flex-row"
						} gap-3 md:gap-4 p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors`}
					>
						<img
							src={item.image}
							alt={item.title}
							className={`${
								isMobile ? "w-full h-40" : "w-32 h-24 md:w-32 md:h-32"
							} object-cover rounded-lg`}
						/>
						<div className="flex-1">
							<div className="flex items-center text-gray-500 text-xs md:text-sm mb-1 md:mb-2">
								<FaCalendarAlt className="mr-1 md:mr-2" />
								{new Date(item.date).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "long",
									year: "numeric",
								})}
							</div>
							<h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 text-green-800">
								{item.title}
							</h3>
							<a
								href={item.url}
								className="inline-flex items-center text-green-600 hover:text-green-800 text-xs md:text-sm font-medium"
							>
								Baca selengkapnya <FaArrowRight className="ml-1" />
							</a>
						</div>
					</motion.article>
				))}
			</div>

		{!loading && filteredNews.length === 0 && !error && (
				<div className="text-center py-4 md:py-8 text-gray-500 text-sm md:text-base">
					Tidak ada berita yang ditemukan untuk kriteria yang dipilih.
				</div>
			)}
		</motion.section>
	);
};

export default News;
