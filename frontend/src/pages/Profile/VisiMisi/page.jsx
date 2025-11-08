import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaCheckCircle,
  FaBalanceScale,
  FaHandsHelping,
  FaBookOpen,
  FaChartLine,
  FaCogs,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";

const VisiMisiPage = () => {
  const [activeTab, setActiveTab] = useState("visi");
  const [visibleItems, setVisibleItems] = useState([]);

  // VISI
  const visiData = {
    title: "Visi Kementerian Agama Kabupaten Magetan",
    content: `"Kementerian Agama yang profesional dan andal dalam membangun masyarakat yang saleh, moderat, cerdas dan unggul untuk mewujudkan Indonesia maju yang berdaulat, mandiri, dan berkepribadian berdasarkan gotong royong."`,
    icon: <FaEye className="text-4xl" />,
    color: "from-green-300 to-green-500",
  };

  // MISI
  const misiData = [
    {
      id: 1,
      title: "Meningkatkan Kualitas Kesalehan Umat Beragama",
      description:
        "Menumbuhkan dan memperkuat pemahaman serta pengamalan ajaran agama yang mendukung kehidupan berbangsa yang damai dan harmonis.",
      icon: <FaCheckCircle className="text-2xl" />,
      color: "bg-green-400",
    },
    {
      id: 2,
      title: "Memperkuat Moderasi Beragama dan Kerukunan Umat",
      description:
        "Menumbuhkan semangat moderasi beragama serta memperkuat hubungan antarumat beragama secara inklusif dan berkeadilan.",
      icon: <FaBalanceScale className="text-2xl" />,
      color: "bg-green-300",
    },
    {
      id: 3,
      title: "Meningkatkan Layanan Keagamaan",
      description:
        "Mewujudkan pelayanan keagamaan yang adil, mudah, merata, dan responsif terhadap kebutuhan masyarakat.",
      icon: <FaHandsHelping className="text-2xl" />,
      color: "bg-green-400",
    },
    {
      id: 4,
      title: "Meningkatkan Layanan Pendidikan",
      description:
        "Menjamin pendidikan yang merata, bermutu, dan relevan dengan tantangan zaman serta berlandaskan nilai-nilai agama.",
      icon: <FaBookOpen className="text-2xl" />,
      color: "bg-green-300",
    },
    {
      id: 5,
      title: "Meningkatkan Produktivitas dan Daya Saing Pendidikan",
      description:
        "Mendorong peningkatan mutu lulusan pendidikan agama dan keagamaan agar memiliki daya saing tinggi di era global.",
      icon: <FaChartLine className="text-2xl" />,
      color: "bg-green-400",
    },
    {
      id: 6,
      title: "Memantapkan Tata Kelola Pemerintahan yang Baik",
      description:
        "Menegakkan prinsip Good Governance dengan transparansi, akuntabilitas, dan profesionalisme dalam setiap aspek layanan publik.",
      icon: <FaCogs className="text-2xl" />,
      color: "bg-green-300",
    },
  ];

  // Animasi tampil bertahap
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev.length < misiData.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [activeTab]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-white pt-20">
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[25vh] bg-gradient-to-r from-green-500 via-green-400 to-green-300 flex items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Visi & Misi
          </motion.h1>
          <p className="text-lg md:text-xl text-green-50">
            Kementerian Agama Kabupaten Magetan
          </p>
        </div>
      </motion.section>

      {/* TAB PILIHAN */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-md border border-green-100">
            {["visi", "misi"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setVisibleItems([]);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* KONTEN */}
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
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-green-100 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-300 to-green-500 rounded-full text-white mb-6 mx-auto"
                >
                  {visiData.icon}
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  {visiData.title}
                </h2>
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-4 -left-4 text-3xl text-green-200" />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic px-8">
                    {visiData.content}
                  </p>
                  <FaQuoteRight className="absolute -bottom-4 -right-4 text-3xl text-green-200" />
                </div>
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
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {misiData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    }}
                    className="bg-white rounded-xl shadow-md p-6 border border-green-100 hover:border-green-300 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                          scale: visibleItems.includes(index) ? 1 : 0,
                        }}
                        transition={{
                          delay: index * 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className={`flex-shrink-0 w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white`}
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VisiMisiPage;
