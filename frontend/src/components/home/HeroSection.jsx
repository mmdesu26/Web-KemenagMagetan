import React from "react";
import { motion } from "framer-motion";
import {
	FaClock,
	FaLightbulb,
	FaBalanceScale,
	FaHeart,
	FaShieldAlt,
} from "react-icons/fa";

const HeroSection = () => {
	const values = [
		{
			icon: <FaClock />,
			title: "Cepat",
			desc: "Pelayanan yang cepat dan tepat",
		},
		{
			icon: <FaLightbulb />,
			title: "Inovatif",
			desc: "Terus berinovasi dalam pelayanan",
		},
		{
			icon: <FaBalanceScale />,
			title: "Netral",
			desc: "Bersikap netral dan profesional",
		},
		{
			icon: <FaHeart />,
			title: "Tulus",
			desc: "Pelayanan dengan ketulusan hati",
		},
		{
			icon: <FaShieldAlt />,
			title: "Amanah",
			desc: "Menjunjung tinggi amanah",
		},
	];

	return (
		<section className="relative bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="md:w-1/2 mb-8 md:mb-0"
					>
						<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
							Melayani dengan <span className="text-yellow-300">CINTA</span>
						</h1>
						<p className="text-xl mb-6">
							Kementerian Agama Kabupaten Magetan siap memberikan pelayanan
							terbaik untuk masyarakat.
						</p>
						<div className="flex flex-wrap gap-4">
							<button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
								Layanan Online
							</button>
							<button className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-6 rounded-lg transition-colors">
								Kontak Kami
							</button>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="md:w-1/2"
					>
						<img
							src="/assets/images/hero.png"
							alt="Pelayanan Kemenag"
							className="w-full max-w-md mx-auto rounded-lg shadow-xl"
						/>
					</motion.div>
				</div>

				{/* Nilai-nilai CINTA */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6"
				>
					<h2 className="text-2xl font-bold mb-6 text-center">
						Nilai-nilai CINTA
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
						{values.map((value, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.05 }}
								className="bg-white/20 p-4 rounded-lg text-center"
							>
								<div className="text-3xl mb-2 flex justify-center">
									{value.icon}
								</div>
								<h3 className="font-bold text-lg mb-1">{value.title}</h3>
								<p className="text-sm">{value.desc}</p>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
