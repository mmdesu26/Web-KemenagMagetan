import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMosque, FaClock, FaCalendarAlt } from "react-icons/fa";
import { apiClient } from "../../api/client";
import { FaMoon, FaSun } from "react-icons/fa";

const PrayerTimes = ({ currentDate = new Date() }) => {
	const [prayerTimes, setPrayerTimes] = useState({
		subuh: "04:30",
		dzuhur: "12:00",
		ashar: "15:15",
		maghrib: "18:00",
		isya: "19:15",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [currentPrayer, setCurrentPrayer] = useState("");
	const [nextPrayer, setNextPrayer] = useState("");
	const [timeLeft, setTimeLeft] = useState("");
	const [currentTime, setCurrentTime] = useState(new Date());

	// Icons
	const prayerIcons = {
		subuh: <FaMoon className="text-slate-600 text-lg sm:text-xl" />,
		dzuhur: <FaSun className="text-amber-600 text-lg sm:text-xl" />,
		ashar: <FaSun className="text-orange-600 text-lg sm:text-xl" />,
		maghrib: <FaSun className="text-red-600 text-lg sm:text-xl" />,
		isya: <FaMoon className="text-indigo-600 text-lg sm:text-xl" />,
	};

	const prayerColors = {
		subuh: "from-slate-500 to-slate-600",
		dzuhur: "from-amber-500 to-amber-600",
		ashar: "from-orange-500 to-orange-600",
		maghrib: "from-red-500 to-red-600",
		isya: "from-indigo-500 to-indigo-600",
	};

	// Load API
	useEffect(() => {
		const loadPrayerTimes = async () => {
			try {
				setLoading(true);
				setError("");
				const date = currentDate.toISOString().split("T")[0];
				const data = await apiClient.get("/public/prayer-times", { date });

				if (data) {
					setPrayerTimes({
						subuh: (data.subuh || "04:30:00").slice(0, 5),
						dzuhur: (data.dzuhur || "12:00:00").slice(0, 5),
						ashar: (data.ashar || "15:15:00").slice(0, 5),
						maghrib: (data.maghrib || "18:00:00").slice(0, 5),
						isya: (data.isya || "19:15:00").slice(0, 5),
					});
				}
			} catch (err) {
				setError("Gagal memuat jadwal sholat");
			} finally {
				setLoading(false);
			}
		};
		loadPrayerTimes();
	}, [currentDate]);

	// Update waktu real-time
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
			updateCurrentPrayer();
		}, 1000);

		return () => clearInterval(interval);
	}, [prayerTimes]);

	const updateCurrentPrayer = () => {
		const now = new Date();
		const minutesNow = now.getHours() * 60 + now.getMinutes();

		const arr = [
			{ name: "Subuh", time: prayerTimes.subuh },
			{ name: "Dzuhur", time: prayerTimes.dzuhur },
			{ name: "Ashar", time: prayerTimes.ashar },
			{ name: "Maghrib", time: prayerTimes.maghrib },
			{ name: "Isya", time: prayerTimes.isya },
		].map((p) => {
			const [h, m] = p.time.split(":").map(Number);
			return { name: p.name, minutes: h * 60 + m };
		});

		let cur = "";
		let next = "";
		let nextTime = 0;

		for (let i = 0; i < arr.length; i++) {
			if (minutesNow >= arr[i].minutes) {
				cur = arr[i].name;
				next = arr[(i + 1) % arr.length].name;
				nextTime = arr[(i + 1) % arr.length].minutes + (i === arr.length - 1 ? 1440 : 0);
			}
		}

		if (!cur) {
			cur = "";
			next = arr[0].name;
			nextTime = arr[0].minutes;
		}

		const sisa = nextTime - minutesNow;
		const jam = Math.floor(sisa / 60);
		const menit = sisa % 60;
		const detik = 60 - now.getSeconds();

		setCurrentPrayer(cur);
		setNextPrayer(next);
		setTimeLeft(`${jam > 0 ? jam + "j " : ""}${menit}m ${detik}d`);
	};

	const getCurrentTimeString = () => {
		return currentTime.toLocaleTimeString("id-ID", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm w-full max-w-full"
		>
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 bg-emerald-600 rounded flex items-center justify-center">
						<FaMosque className="text-white" />
					</div>
					<div>
						<h2 className="text-lg sm:text-xl font-bold text-green-900">Jadwal Sholat</h2>
						<p className="text-xs text-gray-500">Magetan, Jawa Timur</p>
					</div>
				</div>

				<div className="text-right">
					<div className="text-xs text-gray-500 flex items-center justify-end gap-1">
						<FaCalendarAlt />
						{currentDate.toLocaleDateString("id-ID", {
							weekday: "long",
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</div>
					<div className="font-bold text-gray-700 text-sm">{getCurrentTimeString()}</div>
				</div>
			</div>

			{/* Status Current */}
			<AnimatePresence>
				{currentPrayer && (
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200"
					>
						<div className="text-xs text-emerald-700">Sedang berlangsung:</div>
						<div className="font-bold text-emerald-900 flex items-center gap-2 mt-1">
							{prayerIcons[currentPrayer.toLowerCase()]}
							{currentPrayer}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Next Prayer */}
			{nextPrayer && (
				<div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
					<div className="flex justify-between items-center">
						<div>
							<div className="text-xs text-amber-700">Sholat berikutnya:</div>
							<div className="font-bold text-amber-900 flex items-center gap-2 mt-1">
								{prayerIcons[nextPrayer.toLowerCase()]}
								{nextPrayer}
							</div>
						</div>
						<div className="text-right">
							<div className="text-xs text-amber-700">Sisa waktu:</div>
							<div className="font-bold text-amber-800 flex items-center gap-1 text-sm">
								<FaClock />
								{timeLeft}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Grid Jadwal – SUPER RESPONSIF */}
			<div className="
				grid 
				grid-cols-2 
				sm:grid-cols-3 
				md:grid-cols-5 
				gap-2 
				w-full
			">
				{Object.entries(prayerTimes).map(([name, time]) => {
					const prayerName = name.charAt(0).toUpperCase() + name.slice(1);
					const isActive = currentPrayer === prayerName;
					const isNext = nextPrayer === prayerName;

					return (
						<div
							key={name}
							className={`relative p-3 rounded-lg border text-center transition-all duration-200
								${isActive
									? `bg-gradient-to-br ${prayerColors[name]} text-white`
									: isNext
									? "bg-amber-50 border-amber-300"
									: "bg-gray-50 border-gray-200"
								}`}
						>

							<div className="flex justify-center mb-2">{prayerIcons[name]}</div>
							<div className="font-medium text-sm sm:text-base">{prayerName}</div>
							<div className="font-bold text-sm sm:text-lg mt-1">{time}</div>
						</div>
					);
				})}
			</div>

			<div className="text-center mt-4 pt-3 border-t border-gray-200">
				<p className="text-xs text-gray-500">
					Jadwal waktu sholat berdasarkan koordinat Kabupaten Magetan
				</p>
			</div>
		</motion.div>
	);
};

export default PrayerTimes;
