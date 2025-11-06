import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../components/layout/Header";
import HeroSection from "../../components/home/HeroSection";
import Services from "../../components/home/Services";
import Articles from "../../components/home/Articles";
import News from "../../components/home/News";
import Videos from "../../components/home/Videos";
import Links from "../../components/home/Links";
import PrayerTimes from "../../components/home/PrayerTimes";
import CalendarAgenda from "../../components/home/CalendarAgenda";

const Home = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDate(new Date());
		}, 60000); // Update every minute

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			clearInterval(timer);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Breakpoints untuk responsive design
	const isMobile = windowWidth < 768;
	const isTablet = windowWidth >= 768 && windowWidth < 1024;
	const isDesktop = windowWidth >= 1024;

	return (
		<div className="bg-gray-50 min-h-screen flex flex-col">
			<Header />

			<main className="flex-grow pt-16 md:pt-20 lg:pt-24">
				{/* Hero Section - Full width */}
				<HeroSection />

				{/* Layanan - Full width */}
				<Services />

				{/* Main Content Area */}
				<div
					className={`container mx-auto px-4 py-8 ${
						isDesktop ? "grid grid-cols-1 lg:grid-cols-3 gap-8" : "space-y-8"
					}`}
				>
					{/* Left Column - Articles & News */}
					<div className={isDesktop ? "lg:col-span-2 space-y-8" : "space-y-8"}>
						{/* Artikel Highlight */}
						<Articles />

						{/* Pada mobile: Tampilkan berita Kemenag dan Umum secara stack (atas-bawah) */}
						<div className="space-y-8">
							{/* Berita Kemenag */}
							<News
								category="kemenag"
								title="Berita Kemenag"
								isMobile={isMobile}
							/>

							{/* Berita Umum */}
							<News category="umum" title="Berita Umum" isMobile={isMobile} />
						</div>
					</div>

					{/* Right Column - Sidebar */}
					{!isMobile && (
						<div className="space-y-8">
							{/* Jadwal Sholat */}
							<PrayerTimes currentDate={currentDate} isMobile={isMobile} />

							{/* Kalender & Agenda */}
							<CalendarAgenda currentDate={currentDate} isMobile={isMobile} />

							{/* Video */}
							<Videos showItems={isMobile ? 1 : 2} />

							{/* Link Terkait */}
							<Links columns={isMobile ? 2 : isTablet ? 3 : 2} />
						</div>
					)}
				</div>

				{/* Pada mobile: Tampilkan sidebar di bawah konten utama */}
				{isMobile && (
					<div className="container mx-auto px-4 pb-8 space-y-8">
						<PrayerTimes currentDate={currentDate} isMobile={isMobile} />
						{windowWidth > 480 && (
							<CalendarAgenda currentDate={currentDate} isMobile={isMobile} />
						)}
						<Videos showItems={1} />
						<Links columns={2} />
					</div>
				)}
			</main>

		</div>
	);
};

export default Home;
