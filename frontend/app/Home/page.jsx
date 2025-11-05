import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../src/components/layout/Header";
import Footer from "../../src/components/layout/Footer";
import HeroSection from "../../src/components/Home/HeroSection";
import Services from "../../src/components/Home/Services";
import Articles from "../../src/components/Home/Articles";
import News from "../../src/components/Home/News";
import Videos from "../../src/components/Home/Videos";
import Links from "../../src/components/Home/Links";
import PrayerTimes from "../../src/components/Home/PrayerTimes";
import CalendarAgenda from "../../src/components/Home/CalendarAgenda";

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

			<Footer />
		</div>
	);
};

export default Home;
