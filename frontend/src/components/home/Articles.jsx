import React from "react";
import { motion } from "framer-motion";
import { articles } from "../../data/articles";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Articles = () => {
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

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{articles.slice(0, 3).map((article, index) => (
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
								{new Date(article.date).toLocaleDateString("id-ID", {
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
