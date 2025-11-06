import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { apiClient } from "../../api/client";

const Links = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadLinks = async () => {
			try {
				setLoading(true);
				setError("");
				const data = await apiClient.get("/public/links");
				setItems(Array.isArray(data) ? data : []);
			} catch (err) {
				setError(err.message || "Gagal memuat tautan");
			} finally {
				setLoading(false);
			}
		};
		loadLinks();
	}, []);

	const duplicatedLinks = useMemo(() => {
		if (items.length === 0) return [];
		return [...items, ...items];
	}, [items]);

	const itemCount = items.length || 1;

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="bg-white rounded-xl shadow-sm p-6"
		>
			<h2 className="text-xl font-bold text-green-800 mb-6">Link Terkait</h2>

			{loading && (
				<div className="text-center text-gray-500">Memuat tautan...</div>
			)}

			{error && !loading && (
				<div className="text-center text-red-500 mb-4">{error}</div>
			)}

			<div className="relative overflow-hidden">
				<motion.div
					className="flex gap-4"
					animate={duplicatedLinks.length > 0 ? { x: [0, -((itemCount * 176) + (itemCount * 16))] } : undefined}
					transition={duplicatedLinks.length > 0 ? {
						duration: Math.max(itemCount * 2, 4),
						repeat: Infinity,
						ease: "linear",
					} : undefined}
				>
					{duplicatedLinks.map((link, index) => (
						<motion.a
							key={`${link.id}-${index}`}
							whileHover={{ 
								y: -3,
								scale: 1.05,
								transition: { duration: 0.2 }
							}}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex-shrink-0 w-40 flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer"
						>
							<img
								src={link.image}
								alt={link.title}
								className="h-12 mb-2 object-contain"
							/>
							<span className="text-sm text-center font-medium text-green-800 flex items-center">
								{link.title} <FaExternalLinkAlt className="ml-1 text-xs" />
							</span>
						</motion.a>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Links;