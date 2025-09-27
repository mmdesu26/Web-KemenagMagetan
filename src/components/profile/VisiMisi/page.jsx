import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaStar,
  FaHandshake,
  FaUsers,
  FaHeart,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";

const VisiMisiPage = () => {
  const [activeTab, setActiveTab] = useState("visi");
  const [visibleItems, setVisibleItems] = useState([]); // hapus tipe number[]

  const visiData = {
    title: "Visi Kementerian Agama Kabupaten Magetan",
    content:
      "Terwujudnya masyarakat Indonesia yang taat beragama, rukun, cerdas, mandiri, dan sejahtera lahir batin dalam rangka mewujudkan Indonesia yang berdaulat, mandiri, dan berkepribadian berlandaskan gotong royong.",
    icon: <FaEye className="text-4xl" />,
    color: "from-green-500 to-green-600",
  };

  const misiData = [
    {
      id: 1,
      title: "Meningkatkan Kualitas Kehidupan Beragama",
      description:
        "Memfasilitasi dan membina kehidupan beragama yang harmonis dan berkualitas bagi seluruh masyarakat Kabupaten Magetan.",
      icon: <FaStar className="text-2xl" />,
      color: "bg-yellow-500",
    },
    {
      id: 2,
      title: "Memperkuat Kerukunan Umat Beragama",
      description:
        "Membangun dan memelihara keharmonisan antar umat beragama melalui dialog dan kerjasama yang konstruktif.",
      icon: <FaHandshake className="text-2xl" />,
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Mengembangkan Pendidikan Agama",
      description:
        "Meningkatkan kualitas pendidikan agama dan pendidikan keagamaan yang bermutu dan relevan.",
      icon: <FaUsers className="text-2xl" />,
      color: "bg-yellow-600",
    },
    {
      id: 4,
      title: "Memberdayakan Ekonomi Umat",
      description:
        "Mendorong pengembangan ekonomi syariah dan pemberdayaan ekonomi umat untuk kesejahteraan bersama.",
      icon: <FaHeart className="text-2xl" />,
      color: "bg-green-600",
    },
  ];

  const nilaiData = [
    { title: "Integritas", desc: "Konsisten dalam perkataan dan perbuatan" },
    { title: "Profesionalitas", desc: "Bekerja dengan keahlian dan dedikasi tinggi" },
    { title: "Inovasi", desc: "Selalu mencari cara terbaik dalam melayani" },
    { title: "Tanggung Jawab", desc: "Bertanggung jawab penuh atas tugas yang diamanahkan" },
    { title: "Keteladanan", desc: "Menjadi contoh yang baik bagi masyarakat" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev.length < misiData.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [activeTab, misiData.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[25vh] bg-gradient-to-r from-green-600 via-green-500 to-yellow-500 flex items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Visi & Misi
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-green-100"
          >
            Kementerian Agama Kabupaten Magetan
          </motion.p>
        </div>

        {/* Animated Background */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-10 right-10 w-20 h-20 border-2 border-white/30 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360, y: [0, -10, 0] }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-10 left-10 w-16 h-16 border-2 border-yellow-300/40 rounded-full"
        />
      </motion.section>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
            {["visi", "misi", "nilai"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setVisibleItems([]);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "visi" && (
            <motion.div
              key="visi"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full text-white mb-6 mx-auto"
                >
                  {visiData.icon}
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
                >
                  {visiData.title}
                </motion.h2>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="relative"
                >
                  <FaQuoteLeft className="absolute -top-4 -left-4 text-3xl text-green-300" />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic px-8">
                    {visiData.content}
                  </p>
                  <FaQuoteRight className="absolute -bottom-4 -right-4 text-3xl text-green-300" />
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "misi" && (
            <motion.div
              key="misi"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
              >
                Misi Kami
              </motion.h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-6"
              >
                {misiData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-green-200 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: visibleItems.includes(index) ? 1 : 0 }}
                        transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                        className={`flex-shrink-0 w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white`}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === "nilai" && (
            <motion.div
              key="nilai"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
              >
                Nilai-Nilai Organisasi
              </motion.h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {nilaiData.map((nilai, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    }}
                    className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:border-yellow-200 transition-all duration-300"
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 5 }}
                      className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <FaChevronRight className="text-white text-xl" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{nilai.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{nilai.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-green-600 to-yellow-500 py-16 mt-16"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h3
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Mari Bersama Mewujudkan Visi & Misi
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg mb-8 text-green-100"
          >
            Bergabunglah dengan kami dalam membangun masyarakat yang religius dan sejahtera
          </motion.p>
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default VisiMisiPage;
