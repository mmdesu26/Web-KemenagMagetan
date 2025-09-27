"use client"
import { motion } from "framer-motion"
import { FaClock, FaLightbulb, FaBalanceScale, FaHeart, FaShieldAlt } from "react-icons/fa"

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
  ]

  return (
    <section className="relative bg-gradient-to-r from-green-700 to-green-600 text-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Melayani dengan <span className="text-yellow-300">CINTA</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed">
              Kementerian Agama Kabupaten Magetan siap memberikan pelayanan terbaik untuk masyarakat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base hover:scale-105 transform duration-200">
                Layanan Online
              </button>
              <button className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base hover:scale-105 transform duration-200">
                Kontak Kami
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <img
              src="/assets/images/hero.png"
              alt="Pelayanan Kemenag"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg shadow-xl"
            />
          </motion.div>
        </div>

        {/* Nilai-nilai CINTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20 bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center">Nilai-nilai CINTA</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 p-3 sm:p-4 lg:p-6 rounded-lg text-center hover:bg-white/30 transition-all duration-200 cursor-pointer"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 flex justify-center">{value.icon}</div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">{value.title}</h3>
                <p className="text-xs sm:text-sm lg:text-base opacity-90">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
