import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { apiClient } from "../../api/client";

const CalendarAgenda = ({ currentDate, isMobile }) => {
	const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
	const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
	const [selectedDate, setSelectedDate] = useState(currentDate);
	const [agenda, setAgenda] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadAgenda = async () => {
			try {
				setLoading(true);
				setError("");
				const data = await apiClient.get("/public/agendas");
				const items = Array.isArray(data)
					? data.map((item) => ({
						...item,
						date: new Date(item.date || item.event_date || item.eventDate),
					}))
					: [];
				setAgenda(items);
			} catch (err) {
				setError(err.message || "Gagal memuat agenda");
			} finally {
				setLoading(false);
			}
		};
		loadAgenda();
	}, []);

	const daysInMonth = (month, year) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const firstDayOfMonth = () => {
		return new Date(currentYear, currentMonth, 1).getDay();
	};

	const renderDays = () => {
		const totalDays = daysInMonth(currentMonth, currentYear);
		const firstDay = firstDayOfMonth();
		const days = [];

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < firstDay; i++) {
			days.push(<div key={`empty-${i}`} className="h-8"></div>);
		}

		// Add cells for each day of the month
		for (let i = 1; i <= totalDays; i++) {
			const date = new Date(currentYear, currentMonth, i);
			const isSelected =
				selectedDate && date.toDateString() === selectedDate.toDateString();
			const hasEvent = agenda.some(
				(event) => event.date.toDateString() === date.toDateString()
			);

			days.push(
				<div
					key={`day-${i}`}
					onClick={() => setSelectedDate(date)}
					className={`h-8 flex items-center justify-center rounded-full cursor-pointer ${
						isSelected
							? "bg-green-700 text-white"
							: hasEvent
							? "bg-green-100 text-green-800"
							: "hover:bg-gray-100"
					}`}
				>
					{i}
				</div>
			);
		}

		return days;
	};

	const monthNames = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	const changeMonth = (increment) => {
		let newMonth = currentMonth + increment;
		let newYear = currentYear;

		if (newMonth < 0) {
			newMonth = 11;
			newYear--;
		} else if (newMonth > 11) {
			newMonth = 0;
			newYear++;
		}

		setCurrentMonth(newMonth);
		setCurrentYear(newYear);
	};

	const todayEvents = agenda.filter(
		(event) =>
			selectedDate && event.date.toDateString() === selectedDate.toDateString()
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="bg-white rounded-xl shadow-sm p-4 md:p-6"
		>
			<div className="flex justify-between items-center mb-3 md:mb-4">
				<h2 className="text-lg md:text-xl font-bold text-green-800 flex items-center">
					<FaCalendarAlt className="mr-2" />
					{isMobile ? "Agenda" : "Kalender Agenda"}
				</h2>
				<a
					href="/agenda"
					className="text-green-600 hover:text-green-800 text-xs md:text-sm font-medium flex items-center"
				>
					{isMobile ? <FaArrowRight /> : "Lihat semua"}
				</a>
			</div>

			{loading && (
				<div className="text-center text-gray-500 mb-3">Memuat agenda...</div>
			)}

			{error && !loading && (
				<div className="text-center text-red-500 mb-3">{error}</div>
			)}

			<div className="mb-4 flex justify-between items-center">
				<button
					onClick={() => changeMonth(-1)}
					className="text-gray-600 hover:text-green-700"
				>
					&lt;
				</button>
				<h3 className="font-bold">
					{monthNames[currentMonth]} {currentYear}
				</h3>
				<button
					onClick={() => changeMonth(1)}
					className="text-gray-600 hover:text-green-700"
				>
					&gt;
				</button>
			</div>

			<div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm text-gray-500">
				{["M", "S", "S", "R", "K", "J", "S"].map((day, i) => (
					<div key={i}>{day}</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-1 mb-6">{renderDays()}</div>

			<div>
				<h4 className="font-bold text-green-800 mb-1 md:mb-2 text-sm md:text-base">
					{selectedDate.toLocaleDateString("id-ID", {
						weekday: isMobile ? undefined : "long",
						day: "numeric",
						month: "long",
						year: isMobile ? undefined : "numeric",
					})}
				</h4>

				{todayEvents.length > 0 ? (
					<div className="space-y-2 md:space-y-3">
						{todayEvents.slice(0, isMobile ? 1 : 3).map((event) => (
							<div
								key={event.id}
								className="p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs md:text-sm"
							>
								<div className="font-bold text-green-800">{event.title}</div>
								<div className="text-gray-600 line-clamp-1">
									{event.description}
								</div>
								{!isMobile && (
									<div className="text-xs mt-1 text-gray-500">
										{event.location}
									</div>
								)}
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-2 md:py-4 text-gray-500 text-xs md:text-sm">
						Tidak ada agenda hari ini
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default CalendarAgenda;
