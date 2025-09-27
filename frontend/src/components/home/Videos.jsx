import React from "react";
import { motion } from "framer-motion";
import { videos } from "../../data/videos";
import { FaPlay, FaArrowRight } from "react-icons/fa";

const Videos = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="bg-white rounded-xl shadow-sm p-6"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-bold text-green-800">Video Kemenag</h2>
				<a
					href="/videos"
					className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
				>
					Lihat semua <FaArrowRight className="ml-1" />
				</a>
			</div>

			<div className="space-y-4">
				{videos.slice(0, 2).map((video, index) => (
					<motion.div
						key={video.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.1 }}
						whileHover={{ scale: 1.02 }}
						className="relative rounded-lg overflow-hidden cursor-pointer"
					>
						<img
							src={video.image}
							alt={video.title}
							className="w-full h-40 object-cover"
						/>
						<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
							<div className="bg-white/80 text-green-700 rounded-full p-3">
								<FaPlay />
							</div>
						</div>
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
							<h3 className="text-white font-medium">{video.title}</h3>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default Videos;
