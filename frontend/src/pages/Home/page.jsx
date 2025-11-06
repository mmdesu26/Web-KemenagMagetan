import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


// ✅ Home Components
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
    // 🛑 PERBAIKAN: Hapus kelas layout utama (min-h-screen, flex flex-col, bg-gray-50) 
    //    dan HAPUS <Header />. Biarkan <main> menjadi root element.
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
      <main className="grow"> {/* Menghapus padding-top yang sekarang ditangani oleh Header di App.jsx */}
        {/* Hero Section */}
        <HeroSection />

        {/* Layanan */}
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

            {/* Berita Kemenag dan Umum */}
            <div className="space-y-8">
              <News category="kemenag" title="Berita Kemenag" isMobile={isMobile} limit={4} />
              <News category="umum" title="Berita Umum" isMobile={isMobile} limit={4} />
            </div>
          </div>

          {/* Right Column - Sidebar (Desktop/Tablet) */}
          {!isMobile && (
            <div className="space-y-8">
              <PrayerTimes currentDate={currentDate} isMobile={isMobile} />
              <CalendarAgenda currentDate={currentDate} isMobile={isMobile} />
              <Videos showItems={isMobile ? 1 : 2} />
              <Links columns={isMobile ? 2 : isTablet ? 3 : 2} />
            </div>
          )}
        </div>

        {/* Pada mobile: sidebar di bawah */}
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
    </motion.div>
  );
};

export default Home;