import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMosque, FaClock } from "react-icons/fa";

const PrayerTimes = ({ currentDate, isMobile }) => {
	const [prayerTimes, setPrayerTimes] = useState({
		subuh: "04:30",
		syuruq: "05:45",
		dzuhur: "12:00",
		ashar: "15:15",
		maghrib: "18:00",
		isya: "19:15",
	});

	const [currentPrayer, setCurrentPrayer] = useState("");
	const [nextPrayer, setNextPrayer] = useState("");
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		// In a real app, you would fetch prayer times based on location and date
		updateCurrentPrayer();

		const interval = setInterval(() => {
			updateCurrentPrayer();
		}, 60000); // Update every minute

		return () => clearInterval(interval);
	}, [currentDate]);

	const updateCurrentPrayer = () => {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const currentTime = hours * 60 + minutes;

		const prayers = [
			{ name: "Subuh", time: prayerTimes.subuh },
			{ name: "Syuruq", time: prayerTimes.syuruq },
			{ name: "Dzuhur", time: prayerTimes.dzuhur },
			{ name: "Ashar", time: prayerTimes.ashar },
			{ name: "Maghrib", time: prayerTimes.maghrib },
			{ name: "Isya", time: prayerTimes.isya },
		];

		// Convert prayer times to minutes since midnight
		const prayerMinutes = prayers.map((prayer) => {
			const [h, m] = prayer.time.split(":").map(Number);
			return {
				name: prayer.name,
				minutes: h * 60 + m,
			};
		});

		// Find current and next prayer
		let current = "";
		let next = "";
		let nextTime = 0;

		for (let i = 0; i < prayerMinutes.length; i++) {
			if (currentTime >= prayerMinutes[i].minutes) {
				current = prayerMinutes[i].name;
				next =
					i === prayerMinutes.length - 1
						? prayerMinutes[0].name
						: prayerMinutes[i + 1].name;
				nextTime =
					i === prayerMinutes.length - 1
						? prayerMinutes[0].minutes + 24 * 60
						: prayerMinutes[i + 1].minutes;
			}
		}

		if (!current) {
			current = "";
			next = prayerMinutes[0].name;
			nextTime = prayerMinutes[0].minutes;
		}

		// Calculate time left for next prayer
		const timeDiff = nextTime - currentTime;
		const hoursLeft = Math.floor(timeDiff / 60);
		const minutesLeft = timeDiff % 60;

		setCurrentPrayer(current);
		setNextPrayer(next);
		setTimeLeft(
			`${hoursLeft > 0 ? hoursLeft + " jam " : ""}${minutesLeft} menit`
		);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="bg-white rounded-xl shadow-sm p-4 md:p-6"
		>
			<div className="flex items-center justify-between mb-3 md:mb-4">
				<h2 className="text-lg md:text-xl font-bold text-green-800 flex items-center">
					<FaMosque className="mr-2" />
					<span className={isMobile ? "hidden" : ""}>Jadwal Sholat</span>
				</h2>
				<div className="text-xs md:text-sm text-gray-500">
					{currentDate.toLocaleDateString("id-ID", {
						weekday: isMobile ? undefined : "long",
						day: "numeric",
						month: isMobile ? "short" : "long",
						year: "numeric",
					})}
				</div>
			</div>

			{currentPrayer && (
				<div className="mb-4 p-3 bg-green-100 rounded-lg">
					<div className="text-sm text-green-800">Sedang berlangsung:</div>
					<div className="font-bold text-green-900">{currentPrayer}</div>
				</div>
			)}

			{nextPrayer && (
				<div className="mb-6 p-3 bg-yellow-100 rounded-lg">
					<div className="text-sm text-yellow-800">Sholat berikutnya:</div>
					<div className="font-bold text-yellow-900">{nextPrayer}</div>
					<div className="text-sm mt-1 flex items-center">
						<FaClock className="mr-1" /> {timeLeft}
					</div>
				</div>
			)}

			<div
				className={`grid ${
					isMobile ? "grid-cols-3" : "grid-cols-2"
				} gap-2 md:gap-3`}
			>
				{Object.entries(prayerTimes).map(([name, time]) => (
					<div
						key={name}
						className={`p-2 md:p-3 rounded-lg text-xs md:text-sm ${
							currentPrayer === name.charAt(0).toUpperCase() + name.slice(1)
								? "bg-green-700 text-white"
								: "bg-gray-100"
						}`}
					>
						<div className="font-bold">
							{name.charAt(0).toUpperCase() + name.slice(1)}
						</div>
						<div>{time}</div>
					</div>
				))}
			</div>

			<div className="mt-3 md:mt-4 text-center text-xs md:text-sm text-gray-500">
				Jadwal sholat untuk wilayah Magetan
			</div>
		</motion.div>
	);
};

export default PrayerTimes;
