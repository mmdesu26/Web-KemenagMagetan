import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaLightbulb,
  FaBalanceScale,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";

const values = [
  { icon: <FaClock />, title: "Cepat", desc: "Pelayanan responsif dan efisien untuk masyarakat." },
  { icon: <FaLightbulb />, title: "Inovatif", desc: "Selalu berinovasi dalam memberikan solusi terbaik." },
  { icon: <FaBalanceScale />, title: "Netral", desc: "Menjaga profesionalisme dan keadilan dalam pelayanan." },
  { icon: <FaHeart />, title: "Tulus", desc: "Melayani dengan hati yang tulus dan ikhlas." },
  { icon: <FaShieldAlt />, title: "Amanah", desc: "Mengutamakan kepercayaan dan tanggung jawab." },
];

const gambarHero = [
  "/assets/images/hero.png",
  "/assets/images/hero2.png",
  "/assets/images/hero3.png",
];

const HeroSection = () => {
  const [indexGambarSaatIni, setIndexGambarSaatIni] = useState(0);

  useEffect(() => {
    const intervalGantiGambar = setInterval(() => {
      setIndexGambarSaatIni((prev) =>
        prev === gambarHero.length - 1 ? 0 : prev + 1
      );
    }, 3500);
    return () => clearInterval(intervalGantiGambar);
  }, []);

  return (
   <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-22 overflow-hidden">
      {/* === Corak Bambu === */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/bambuu.png')] 
                   bg-repeat bg-center opacity-10 pointer-events-none"
        style={{ backgroundSize: "300px auto" }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* ==== Kiri: Teks ==== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight drop-shadow-lg"
            >
              <span className="block text-yellow-300">Kemenag Magetan</span>
              <span className="block">
                Melayani dengan <span className="text-yellow-300 relative">CINTA</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed px-4 lg:px-0"
            >
              Kami hadir untuk memberikan pelayanan terbaik, ramah, dan profesional kepada seluruh masyarakat Magetan.
            </motion.p>

            {/* Nilai-nilai */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 sm:gap-2 md:gap-3 max-w-3xl mx-auto lg:mx-0">
              {values.map((nilai, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.18)",
                    transition: { duration: 0.2 },
                  }}
                  className="bg-white/15 p-1 sm:p-2 rounded-lg text-center cursor-pointer border border-white/10 hover:border-yellow-300 transition-all duration-300 shadow"
                >
                  <div className="text-sm sm:text-base md:text-lg mb-1 flex justify-center text-yellow-300">{nilai.icon}</div>
                  <h3 className="font-bold text-xs mb-1">{nilai.title}</h3>
                  <p className="text-xs opacity-90 hidden sm:block md:hidden lg:block leading-tight">{nilai.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ==== Kanan: Gambar Hero ==== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full lg:w-1/2 flex justify-center items-center"
          >
            <div
              className="
                relative w-full 
                max-w-lg sm:max-w-xl md:max-w-5xl lg:max-w-8xl /* ✅ lebih besar */
                mx-auto
              "
            >
              <div
                className="
                  relative overflow-hidden rounded-lg sm:rounded-xl 
                  shadow-2xl bg-gradient-to-br from-white/20 to-white/5 
                  p-1 sm:p-1 md:p-1 /* ✅ padding diperkecil */
                  backdrop-blur-sm border border-white/10 /* ✅ border lebih tipis */
                "
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={indexGambarSaatIni}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    src={gambarHero[indexGambarSaatIni]}
                    alt={`Pelayanan Kemenag ${indexGambarSaatIni + 1}`}
                    className="w-full h-auto rounded-md sm:rounded-lg shadow-xl"
                  />
                </AnimatePresence>
              </div>

              {/* Bullet Navigasi */}
              <div className="flex justify-center mt-3 sm:mt-4 space-x-1 sm:space-x-2">
                {gambarHero.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setIndexGambarSaatIni(idx)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      indexGambarSaatIni === idx
                        ? "bg-yellow-300 w-4 sm:w-5"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
