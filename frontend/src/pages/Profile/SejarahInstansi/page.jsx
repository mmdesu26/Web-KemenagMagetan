import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaCalendarAlt, FaUsers, FaBuilding, FaAward, FaChevronDown } from "react-icons/fa"

const SejarahInstansi = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [visibleEvents, setVisibleEvents] = useState(4)

  const heroRef = useRef(null)
  const timelineRef = useRef(null)
  const statsRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true })
  const isTimelineInView = useInView(timelineRef, { once: true })
  const isStatsInView = useInView(statsRef, { once: true })

  const timelineEvents = [
    {
      year: "1946",
      title: "Pembentukan Awal",
      description: "Kementerian Agama didirikan untuk mengelola urusan keagamaan di Indonesia.",
      icon: <FaBuilding className="text-green-600" />,
      category: "establishment",
    },
    {
      year: "1950",
      title: "Perluasan Fungsi",
      description: "Peran Kementerian diperluas untuk mengelola pendidikan agama di sekolah-sekolah.",
      icon: <FaUsers className="text-yellow-600" />,
      category: "development",
    },
    {
      year: "1989",
      title: "Pengesahan Undang-Undang Pendidikan",
      description: "Undang-undang pendidikan agama menjadi bagian dari kurikulum nasional.",
      icon: <FaAward className="text-green-600" />,
      category: "achievement",
    },
    {
      year: "2000",
      title: "Modernisasi Layanan",
      description: "Digitalisasi layanan keagamaan dan pendidikan agama dimulai.",
      icon: <FaCalendarAlt className="text-yellow-600" />,
      category: "modernization",
    },
    {
      year: "2010",
      title: "Pembentukan Kantor Wilayah Magetan",
      description: "Kantor Kementerian Agama Kabupaten Magetan resmi dibentuk untuk melayani masyarakat setempat.",
      icon: <FaBuilding className="text-green-600" />,
      category: "establishment",
    },
    {
      year: "2015",
      title: "Program Kerukunan Umat Beragama",
      description: "Peluncuran program khusus untuk memperkuat kerukunan antar umat beragama di Kabupaten Magetan.",
      icon: <FaUsers className="text-yellow-600" />,
      category: "development",
    },
  ]

  const categories = [
    { id: "all", name: "Semua" },
    { id: "establishment", name: "Pembentukan" },
    { id: "development", name: "Pengembangan" },
    { id: "achievement", name: "Pencapaian" },
    { id: "modernization", name: "Modernisasi" },
  ]

  const filteredEvents =
    selectedCategory === "all" ? timelineEvents : timelineEvents.filter((event) => event.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <motion.img
          src="/masjid.jpg"
          alt="Kantor Kementerian Agama Magetan"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          initial={{ scale: 1.2 }}
          animate={{ scale: isHeroInView ? 1 : 1.2 }}
          transition={{ duration: 2 }}
        />
        <motion.div
          className="relative text-center text-white px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isHeroInView ? 1 : 0, y: isHeroInView ? 0 : 50 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Sejarah Kementerian Agama</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Kabupaten Magetan</p>
          <p className="text-base md:text-lg max-w-3xl mx-auto mt-2">
            Perjalanan panjang dalam menjaga kerukunan dan pendidikan agama di Kabupaten Magetan
          </p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isTimelineInView ? 1 : 0,
            y: isTimelineInView ? 0 : 30,
          }}
          transition={{ duration: 1 }}
        >
          Perjalanan Waktu
        </motion.h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedCategory === cat.id
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-600 border-green-600 hover:bg-yellow-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Timeline Items */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-300 h-full"></div>
          <div className="space-y-12">
            {filteredEvents.slice(0, visibleEvents).map((event, idx) => (
              <motion.div
                key={idx}
                className="relative flex items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: isTimelineInView ? 1 : 0,
                  y: isTimelineInView ? 0 : 50,
                }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="w-1/2 pr-8 text-right hidden md:block">
                  <h3 className="text-xl font-semibold text-green-800">{event.year}</h3>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border-4 border-green-600 rounded-full p-3">
                  {event.icon}
                </div>

                <div className="w-full md:w-1/2 pl-8">
                  <h3 className="text-xl font-semibold text-green-800 md:hidden">{event.year}</h3>
                  <h4 className="text-lg font-bold mt-2">{event.title}</h4>
                  <p className="mt-1 text-gray-600">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {visibleEvents < filteredEvents.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleEvents((prev) => prev + 4)}
              className="px-6 py-3 bg-green-600 text-white rounded-full flex items-center gap-2 mx-auto hover:bg-yellow-600 transition"
            >
              Lihat Lebih Banyak <FaChevronDown />
            </button>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-4 md:px-8">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isStatsInView ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div>
            <h3 className="text-4xl font-bold mb-2 text-yellow-300">78+</h3>
            <p>Tahun Melayani</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2 text-yellow-300">1</h3>
            <p>Kantor Kabupaten</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2 text-yellow-300">25+</h3>
            <p>Kecamatan Dilayani</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2 text-yellow-300">500+</h3>
            <p>Tenaga Pendidikan Agama</p>
          </div>
        </motion.div>
      </section>

      {/* Vision Mission Section */}
      <section className="py-16 px-4 md:px-8 bg-yellow-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Visi & Misi
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-600"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-green-800">Visi</h3>
              <p className="text-gray-700 leading-relaxed">
                Terwujudnya masyarakat Kabupaten Magetan yang taat beragama, rukun, cerdas, mandiri, dan sejahtera lahir
                batin.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-yellow-600"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-green-800">Misi</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Meningkatkan kualitas kehidupan beragama</li>
                <li>• Memperkuat kerukunan umat beragama</li>
                <li>• Mengembangkan pendidikan agama berkualitas</li>
                <li>• Memberikan pelayanan prima kepada masyarakat</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SejarahInstansi
