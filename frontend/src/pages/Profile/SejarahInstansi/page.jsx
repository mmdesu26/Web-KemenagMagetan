import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaCalendarAlt, FaUsers, FaBuilding, FaAward, FaChevronDown, FaMapMarkerAlt, FaHistory } from "react-icons/fa"

const SejarahInstansi = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const timelineRef = useRef(null)
  const [expandedSection, setExpandedSection] = useState(null)
  
  const isHeroInView = useInView(heroRef, { once: true })
  const isContentInView = useInView(contentRef, { once: true })
  const isTimelineInView = useInView(timelineRef, { once: true })

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const leaders = [
    { name: "Bapak Moh. Ihsan", period: "sebelum 1974", role: "Kepala Perdepag" },
    { name: "Bapak H. Imam Murdji", period: "±1974 – 1983", role: "Kepala Kantor" },
    { name: "Bapak H. Achmad Said", period: "1984 – 1988", role: "Kepala Kantor" },
    { name: "Bapak H. Kurdi Ichsan, BA", period: "1988 – 1991", role: "Kepala Kantor" },
    { name: "Bapak Drs. H. Tulabi", period: "1991 – 1993", role: "Kepala Kantor" },
    { name: "Bapak Drs. H. Imam Tabroni", period: "1993 – 1998", role: "Kepala Kantor" },
    { name: "Bapak Drs. Maeran Asyik", period: "1998 – 2002", role: "Kepala Kantor" },
    { name: "Bapak Drs. Joefri", period: "2002 – Feb 2009", role: "Kepala Kantor" },
    { name: "Bapak Drs. Sofyan Djauhari", period: "Feb 2009 – Apr 2009", role: "Kepala Kantor" },
    { name: "Bapak DR. H.M. Suyudi, M.Ag", period: "Apr 2009 – Mar 2011", role: "Kepala Kantor" },
    { name: "Bapak Drs. Chomsin, M.Si", period: "Mar 2011 – Jan 2014", role: "Kepala Kantor" },
    { name: "Bapak Mas'ud, S.Ag, M.Pd.I", period: "Jan 2014 – Mei 2014", role: "Kepala Kantor" },
    { name: "Bapak Drs. H. Moch. Amin Mahfud, M.Pd.I", period: "Mei 2014 – 2019", role: "Kepala Kantor" },
    { name: "Bapak Muttakin, S.Ag", period: "2019 – 2023", role: "Kepala Kantor" },
    { name: "Bapak Dr. H. Taufiqurrohman, M.Ag", period: "2023 – sekarang", role: "Kepala Kantor" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pt-20">
      {/* Hero Section dengan Pattern */}
      <section
        ref={heroRef}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-95">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isHeroInView ? 1 : 0, y: isHeroInView ? 0 : 50 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isHeroInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Sejarah Kementerian Agama
          </h1>
          <div className="flex items-center justify-center gap-2 text-xl md:text-2xl mb-3">
            <p>Kabupaten Magetan</p>
          </div>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Perjalanan panjang dalam menjaga kerukunan dan pendidikan agama di Kabupaten Magetan
          </p>
        </motion.div>
      </section>

      {/* Info Cards Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto -mt-16 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: FaCalendarAlt, title: "Berdiri", value: "03 Januari 1946" },
            { icon: FaBuilding, title: "Luas Lahan", value: "6.370 m²" },
            { icon: FaUsers, title: "Pimpinan", value: "15 Periode" }
          ].map((card, idx) => (
          <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isHeroInView ? 1 : 0, y: isHeroInView ? 0 : 30 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-green-900 shadow-md hover:shadow-xl border border-green-100 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-inner">
              <card.icon className="text-2xl text-green-700" />
              </div>
              <h3 className="text-sm font-semibold mb-1 opacity-80">{card.title}</h3>
              <p className="text-2xl font-bold">{card.value}</p>
          </motion.div>
        ))}
        </div>
      </section>


      {/* Main Content Section */}
      <section ref={contentRef} className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isContentInView ? 1 : 0, y: isContentInView ? 0 : 40 }}
          transition={{ duration: 1 }}
        >
          {/* Sejarah Berdiri */}
          <div className="bg-white shadow-xl rounded-3xl p-8 md:p-10 mb-8 border-t-4 border-green-600 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <FaHistory className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-green-800">
                Sejarah Berdirinya
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Sebagaimana yang diperingati dalam Hari Amal Bhakti setiap tahun oleh insan Departemen Agama maka
                sebenarnya Departemen Agama lahir tanggal <span className="font-bold text-green-700">03 Januari 1946</span>, itu berarti setahun setelah
                Bangsa kita memproklamirkan Kemerdekaan. Departemen Agama lahir, sehingga bisa dikatakan sebagai
                Departemen yang sudah tua usianya, meskipun kabinet pemerintahan RI telah berkali-kali mengalami
                perubahan dan penyempurnaan.
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                <p className="text-green-800 font-medium">
                  Pada masa Kabinet Indonesia Bersatu tahun 2009, Departemen Agama diubah namanya menjadi <strong>Kementerian Agama</strong>.
                </p>
              </div>

              <p>
                Kantor Kemenag Kabupaten Magetan menempati lahan seluas <strong className="text-green-700">3.000 m²</strong> di Jl. Karya Dharma
                No.178 pada tahun 1984. Sebelumnya menempati lahan seluas <strong className="text-green-700">2.700 m²</strong> di Jl. Jaksa Agung
                Suprapto No.5 hingga akhir tahun 1983 yang sekarang berubah fungsi menjadi Gedung PPI (Pusat Pengkajian
                Islam).
              </p>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-6">
            {/* Pra-1993 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isContentInView ? 1 : 0, x: isContentInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-green-100"
            >
              <button
                onClick={() => toggleSection('pra1993')}
                className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-green-50 to-white hover:from-green-100 hover:to-green-50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <FaBuilding className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Kondisi Bangunan Pra-Tahun 1993</h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === 'pra1993' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-green-600 text-xl" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedSection === 'pra1993' ? 'auto' : 0,
                  opacity: expandedSection === 'pra1993' ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 py-6 bg-white">
                  <ul className="space-y-3">
                    {[
                      "Ruang Pimpinan (sekarang) merupakan gabungan Ruang Pimpinan dan Ruang Kepala Urusan Keuangan.",
                      "Ruang Pengawas Pendidikan (sekarang), dulu dijadikan Ruang Kerja Urusan Keuangan.",
                      "Ruang Urusan Keuangan (sekarang), dulu dijadikan Ruang Kepegawaian.",
                      "Ruang Urusan Kepegawaian (sekarang), dulu adalah Aula Kecil.",
                      "Ruang Urusan Umum (sekarang), merupakan gabungan dengan Ruang Pengawas Pendidikan.",
                      "Ruang Kasi Urais (sekarang), dulu sebagai ruang BPUH.",
                      "Antara Ruang Seksi Penais dan Urais, dulu ada ruang kerja Seksi Pendais (Mapenda).",
                      "Rumah Tamu (kini Guest House), dulu sebagai Kantin."
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-xl border-l-4 border-green-600">
                    <p className="text-gray-700">
                      Melihat kondisi dan tata ruang yang demikian, maka pasca tahun 1993 (setelah kepemimpinan dipegang oleh
                      <strong className="text-green-800"> Drs. H. Imam Tabroni</strong>), mulailah dilakukan pengembangan dengan mendirikan bangunan baru
                      dan memperluas ruang yang telah ada.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Pasca-1993 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isContentInView ? 1 : 0, x: isContentInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-green-100"
            >
              <button
                onClick={() => toggleSection('pasca1993')}
                className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-green-50 to-white hover:from-green-100 hover:to-green-50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <FaBuilding className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Kondisi Kantor Pasca Tahun 1993</h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === 'pasca1993' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-green-600 text-xl" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedSection === 'pasca1993' ? 'auto' : 0,
                  opacity: expandedSection === 'pasca1993' ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 py-6 bg-white">
                  <p className="text-gray-700 mb-4">
                    Diawali dengan mendirikan mushola di sebelah utara Seksi Mapenda, kemudian secara bertahap dibangun:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Ruang Tamu dan Ruang Data (sekarang menjadi Ruang Seksi Penyelenggara Haji dan Wakaf).",
                      "Ruang Jaga/Pos dan Ruang Humas (sekarang Ruang Perencana).",
                      "Gedung dua lokal di belakang rumah dinas pimpinan.",
                      "Gedung berlantai dua di depan kiri (atas: Ruang Pengawas & Aula, bawah: Ruang Fotokopi dan Garasi).",
                      "Penambahan dua buah gapura permanen dan pengembangan ruang kerja seperti sekarang."
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            {/* Perluasan Lahan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isContentInView ? 1 : 0, x: isContentInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-green-100"
            >
              <button
                onClick={() => toggleSection('perluasan')}
                className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-green-50 to-white hover:from-green-100 hover:to-green-50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <FaBuilding className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Perluasan Lahan Baru</h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === 'perluasan' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-green-600 text-xl" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedSection === 'perluasan' ? 'auto' : 0,
                  opacity: expandedSection === 'perluasan' ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 py-6 bg-white">
                  <p className="text-gray-700 mb-4">
                    Kondisi di atas ditambah dengan perluasan lahan baru seluas <strong className="text-green-700">3.370 m²</strong> di bagian utara
                    lahan lama, dengan pembangunan berikut:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Gedung dua lantai untuk pelayanan anggota KPRI Sejahtera.",
                      "Aula Utama berkapasitas ±1.500 orang menghadap ke timur.",
                      "Ruang Kerja Seksi Pendais (Mapenda).",
                      "Gudang Peralatan di sebelah utara Aula Utama.",
                      "Tempat parkir roda 4 (±10 kendaraan) dan roda 2 di selatan aula.",
                      "Lapangan tenis standar dengan pagar kawat keliling.",
                      "Kantin Dharma Wanita dan Ruang Inap Pesuruh (3 lokal lengkap dengan kamar mandi).",
                      "Pemagaran belakang setinggi ±4 meter.",
                      "Pengembangan taman di area kantor, rumah dinas, dan sekitar aula."
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Timeline Pimpinan */}
      <section ref={timelineRef} className="py-16 px-6 md:px-12 max-w-6xl mx-auto bg-gradient-to-b from-green-50 to-white rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isTimelineInView ? 1 : 0, y: isTimelineInView ? 0 : 40 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <FaAward className="text-5xl text-green-600 mx-auto" />
            </div>
            <h2 className="text-4xl font-bold text-green-800 mb-3">
              Daftar Pimpinan
            </h2>
            <p className="text-gray-600 text-lg">Kementerian Agama Kabupaten Magetan</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-600 via-green-500 to-green-600 transform md:-translate-x-1/2"></div>

            {leaders.map((leader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: isTimelineInView ? 1 : 0, x: isTimelineInView ? 0 : (idx % 2 === 0 ? -50 : 50) }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative mb-8 ${idx % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'} pl-20 md:pl-0 md:pr-0`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 top-6 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 ${idx === leaders.length - 1 ? 'ring-4 ring-green-200' : ''}`}></div>

                {/* Content Card */}
                <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-green-600 ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className="flex items-start gap-3 md:flex-row-reverse md:justify-end">
                    <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                      <h3 className="font-bold text-lg text-green-800 mb-1">{leader.name}</h3>
                      <p className="text-green-600 font-medium mb-1">{leader.period}</p>
                      <p className="text-sm text-gray-500">{leader.role}</p>
                      {idx === leaders.length - 1 && (
                        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Saat Ini
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default SejarahInstansi