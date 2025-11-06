import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { apiClient } from "../../api/client";

const Articles = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadArticles = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await apiClient.get("/public/articles", { limit: 6 });
                setItems(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Gagal memuat artikel");
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, []);

    const visibleArticles = items.slice(0, 3);

	return (
		<motion.section
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="bg-white rounded-xl shadow-sm p-6"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-green-800">Artikel Highlight</h2>
				<a
					href="/articles"
					className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
				>
					Lihat semua <FaArrowRight className="ml-1" />
				</a>
			</div>

			{loading && (
				<div className="text-center text-gray-500">Memuat artikel...</div>
			)}

			{error && !loading && (
				<div className="text-center text-red-500 mb-4">{error}</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{!loading && visibleArticles.map((article, index) => (
					<motion.article
						key={article.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.1 }}
						whileHover={{ y: -5 }}
						className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
					>
						<img
							src={article.image}
							alt={article.title}
							className="w-full h-48 object-cover"
						/>
						<div className="p-6">
							<div className="flex items-center text-gray-500 text-sm mb-2">
								<FaCalendarAlt className="mr-2" />
							{new Date(article.date || article.publishedAt).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "long",
									year: "numeric",
								})}
							</div>
							<h3 className="font-bold text-lg mb-2 text-green-800">
								{article.title}
							</h3>
							<p className="text-gray-600 mb-4">{article.description}</p>
							<a
								href={article.url}
								className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
							>
								Baca selengkapnya <FaArrowRight className="ml-1" />
							</a>
						</div>
					</motion.article>
				))}
			</div>
		</motion.section>
	);
};

export default Articles;
