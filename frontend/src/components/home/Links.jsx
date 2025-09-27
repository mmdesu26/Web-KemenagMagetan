import React from "react";
import { motion } from "framer-motion";
import { links } from "../../data/links";
import { FaExternalLinkAlt } from "react-icons/fa";

const Links = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="bg-white rounded-xl shadow-sm p-6"
		>
			<h2 className="text-xl font-bold text-green-800 mb-6">Link Terkait</h2>

			<div className="overflow-x-auto">
				<div className="flex gap-4 pb-2">
					{links.map((link, index) => (
						<motion.a
							key={link.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							whileHover={{ y: -3 }}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex-shrink-0 w-40 flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
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
				</div>
			</div>
		</motion.div>
	);
};

export default Links;
