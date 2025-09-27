import React from "react";
import { motion } from "framer-motion";
import { links } from "../../data/links";
import { FaExternalLinkAlt } from "react-icons/fa";

const Links = () => {
	// Duplikasi array links untuk membuat loop seamless
	const duplicatedLinks = [...links, ...links];

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="bg-white rounded-xl shadow-sm p-6"
		>
			<h2 className="text-xl font-bold text-green-800 mb-6">Link Terkait</h2>

			<div className="relative overflow-hidden">
				<motion.div
					className="flex gap-4"
					animate={{
						x: [0, -((links.length * 176) + (links.length * 16))], // 176px = width (160px) + gap (16px)
					}}
					transition={{
						duration: links.length * 2, // Durasi berdasarkan jumlah link
						repeat: Infinity,
						ease: "linear",
					}}
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