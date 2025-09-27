import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMosque, FaClock, FaSun, FaMoon, FaCalendarAlt } from "react-icons/fa";

const PrayerTimes = ({ currentDate = new Date(), isMobile = false }) => {
	const [prayerTimes, setPrayerTimes] = useState({
		subuh: "04:30",
		dzuhur: "12:00",
		ashar: "15:15",
		maghrib: "18:00",
		isya: "19:15",
	});

	const [currentPrayer, setCurrentPrayer] = useState("");
	const [nextPrayer, setNextPrayer] = useState("");
	const [timeLeft, setTimeLeft] = useState("");
	const [currentTime, setCurrentTime] = useState(new Date());


	// Prayer icons mapping
	const prayerIcons = {
		subuh: <FaMoon className="text-slate-600" />,
		dzuhur: <FaSun className="text-amber-600" />,
		ashar: <FaSun className="text-orange-600" />,
		maghrib: <FaSun className="text-red-600" />,
		isya: <FaMoon className="text-indigo-600" />
	};

	const prayerColors = {
		subuh: "from-slate-500 to-slate-600",
		dzuhur: "from-amber-500 to-amber-600",
		ashar: "from-orange-500 to-orange-600",
		maghrib: "from-red-500 to-red-600",
		isya: "from-indigo-500 to-indigo-600"
	};

	useEffect(() => {
		updateCurrentPrayer();
		
		const interval = setInterval(() => {
			setCurrentTime(new Date());
			updateCurrentPrayer();
		}, 1000); // Update every second for real-time

		return () => clearInterval(interval);
	}, [currentDate]);



	const updateCurrentPrayer = () => {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const currentTimeMinutes = hours * 60 + minutes;

		const prayers = [
			{ name: "Subuh", time: prayerTimes.subuh },
			{ name: "Dzuhur", time: prayerTimes.dzuhur },
			{ name: "Ashar", time: prayerTimes.ashar },
			{ name: "Maghrib", time: prayerTimes.maghrib },
			{ name: "Isya", time: prayerTimes.isya },
		];

		const prayerMinutes = prayers.map((prayer) => {
			const [h, m] = prayer.time.split(":").map(Number);
			return {
				name: prayer.name,
				minutes: h * 60 + m,
			};
		});

		let current = "";
		let next = "";
		let nextTime = 0;

		for (let i = 0; i < prayerMinutes.length; i++) {
			if (currentTimeMinutes >= prayerMinutes[i].minutes) {
				current = prayerMinutes[i].name;
				next = i === prayerMinutes.length - 1 
					? prayerMinutes[0].name 
					: prayerMinutes[i + 1].name;
				nextTime = i === prayerMinutes.length - 1 
					? prayerMinutes[0].minutes + 24 * 60 
					: prayerMinutes[i + 1].minutes;
			}
		}

		if (!current) {
			current = "";
			next = prayerMinutes[0].name;
			nextTime = prayerMinutes[0].minutes;
		}

		const timeDiff = nextTime - currentTimeMinutes;
		const hoursLeft = Math.floor(Math.abs(timeDiff) / 60);
		const minutesLeft = Math.abs(timeDiff) % 60;
		const secondsLeft = 60 - now.getSeconds();

		setCurrentPrayer(current);
		setNextPrayer(next);
		setTimeLeft(
			`${hoursLeft > 0 ? hoursLeft + "j " : ""}${minutesLeft}m ${secondsLeft}d`
		);
	};

	const formatTime = (time24) => {
		const [hours, minutes] = time24.split(':');
		const hour12 = parseInt(hours) % 12 || 12;
		const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
		return `${hour12}:${minutes} ${ampm}`;
	};

	const getCurrentTimeString = () => {
		return currentTime.toLocaleTimeString('id-ID', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	};

	const containerVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: { 
			opacity: 1, 
			scale: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
				staggerChildren: 0.1
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};

	const pulseAnimation = {
		scale: [1, 1.05, 1],
		transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="rounded-lg border border-gray-200 p-4 bg-white"
		>


			{/* Header */}
			<motion.div 
				variants={itemVariants}
				className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4"
			>
				<div className="flex items-center mb-2 sm:mb-0">
					<div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center mr-3">
						<FaMosque className="text-white text-sm" />
					</div>
					<div>
						<h2 className="text-lg font-bold text-black-900">
							{!isMobile && "Jadwal "}Sholat
						</h2>
						<p className="text-sm text-gray-500">Magetan, Jawa Timur</p>
					</div>
				</div>
				
				<div className="text-right">
					<div className="flex items-center text-xs text-gray-500 mb-1">
						<FaCalendarAlt className="mr-1" />
						{currentDate.toLocaleDateString("id-ID", {
							weekday: isMobile ? "short" : "long",
							day: "numeric",
							month: isMobile ? "short" : "long",
							year: "numeric",
						})}
					</div>
					<div className="text-sm font-bold text-gray-700">
						{getCurrentTimeString()}
					</div>
				</div>
			</motion.div>

			{/* Current Prayer Status */}
			<AnimatePresence mode="wait">
				{currentPrayer && (
					<motion.div
						key="current"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 50 }}
						className="mb-3 p-3 rounded bg-emerald-50 border border-emerald-200"
					>
						<div>
							<div className="text-xs text-emerald-700 mb-1">Sedang berlangsung:</div>
							<div className="font-bold text-emerald-900 flex items-center">
								{prayerIcons[currentPrayer.toLowerCase()]}
								<span className="ml-2">{currentPrayer}</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Next Prayer Countdown */}
			{nextPrayer && (
				<motion.div
					variants={itemVariants}
					className="mb-3 p-3 rounded bg-amber-50 border border-amber-200"
				>
					<div className="flex items-center justify-between">
						<div>
							<div className="text-xs text-amber-700 mb-1">Sholat berikutnya:</div>
							<div className="font-bold text-amber-900 flex items-center">
								{prayerIcons[nextPrayer.toLowerCase()]}
								<span className="ml-2">{nextPrayer}</span>
							</div>
						</div>
						<div className="text-right">
							<div className="text-xs text-amber-600 mb-1">Sisa waktu:</div>
							<div className="font-bold text-sm text-amber-800 flex items-center">
								<FaClock className="mr-1" />
								{timeLeft}
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Prayer Times Grid */}
			<div className={`grid ${
					isMobile ? "grid-cols-2" : "grid-cols-5"
				} gap-2 mb-3`}>
				{Object.entries(prayerTimes).map(([name, time], index) => {
					const prayerName = name.charAt(0).toUpperCase() + name.slice(1);
					const isActive = currentPrayer === prayerName;
					const isNext = nextPrayer === prayerName;
					
					return (
					<div
						key={name}
						className={`p-3 rounded border transition-colors ${
							isActive
								? `bg-gradient-to-br ${prayerColors[name]} text-white`
								: isNext
								? 'bg-amber-50 border-amber-300'
								: 'bg-gray-50 border-gray-200'
						}`}
					>
						{/* Next prayer indicator */}
						{isNext && !isActive && (
							<div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
						)}

						<div className="text-center">
							<div className="mb-2">
								{prayerIcons[name]}
							</div>
							
							<div className="font-medium text-sm mb-1">
								{prayerName}
							</div>
							
							<div className="text-sm font-bold">
								{time}
							</div>
						</div>
					</div>
					);
				})}
			</div>

			{/* Footer */}
			<div className="text-center pt-3 border-t border-gray-200">
				<p className="text-xs text-gray-500">
					Jadwal waktu sholat berdasarkan koordinat Kabupaten Magetan
				</p>
			</div>
		</motion.div>
	);
};

export default PrayerTimes;