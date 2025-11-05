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
  {
    icon: <FaClock />,
    title: "Cepat",
    desc: "Pelayanan responsif dan efisien untuk masyarakat.",
  },
  {
    icon: <FaLightbulb />,
    title: "Inovatif",
    desc: "Selalu berinovasi dalam memberikan solusi terbaik.",
  },
  {
    icon: <FaBalanceScale />,
    title: "Netral",
    desc: "Menjaga profesionalisme dan keadilan dalam pelayanan.",
  },
  {
    icon: <FaHeart />,
    title: "Tulus",
    desc: "Melayani dengan hati yang tulus dan ikhlas.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Amanah",
    desc: "Mengutamakan kepercayaan dan tanggung jawab.",
  },
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
    <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white py-20 overflow-hidden">
      {/* ==== CORAK BAMBU ==== */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/bambuu.png')] 
                   bg-repeat bg-center opacity-10 pointer-events-none"
        style={{ backgroundSize: "600px auto" }}
      ></div>

      {/* Dekorasi SVG Atas */}
      <div className="absolute top-0 left-0 w-full rotate-180 overflow-hidden pointer-events-none">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,80 900,-40 1200,20 L1200,0 L0,0 Z" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>

      {/* Dekorasi Bulat & Blur */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-300/10 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Kiri: Headline & Nilai */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg"
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
              className="text-lg md:text-xl mb-6 leading-relaxed"
            >
              Kami hadir untuk memberikan pelayanan terbaik, ramah, dan profesional kepada seluruh masyarakat Magetan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {values.map((nilai, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.07,
                      backgroundColor: "rgba(255,255,255,0.25)",
                      transition: { duration: 0.2 },
                    }}
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    className="p-3 rounded-xl text-center cursor-pointer border border-white/10 hover:border-yellow-300 transition-all duration-300 shadow"
                  >
                    <div className="text-2xl mb-2 flex justify-center text-yellow-300">{nilai.icon}</div>
                    <h3 className="font-bold text-sm mb-1">{nilai.title}</h3>
                    <p className="text-xs opacity-90">{nilai.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-8"
            >
              <a
                href="#layanan"
                className="inline-block px-6 py-3 rounded-full bg-yellow-300 text-green-900 font-semibold shadow-lg hover:bg-yellow-400 transition"
              >
                Lihat Layanan Kami
              </a>
            </motion.div>
          </motion.div>

          {/* Kanan: Gambar Hero */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:w-1/2 flex justify-center items-center pl-8 md:pl-16"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white/20 to-white/5 p-6 backdrop-blur-sm border border-white/20">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={indexGambarSaatIni}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    src={gambarHero[indexGambarSaatIni]}
                    alt={`Pelayanan Kemenag ${indexGambarSaatIni + 1}`}
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                </AnimatePresence>
                <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                {gambarHero.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setIndexGambarSaatIni(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      indexGambarSaatIni === idx
                        ? "bg-yellow-300 w-8"
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

      {/* Dekorasi SVG Bawah */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,60 C120,120 240,0 360,60 C480,120 600,0 720,60 C840,120 960,0 1080,60 C1140,80 1200,100 1200,120 L1200,120 L0,120 Z"
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
