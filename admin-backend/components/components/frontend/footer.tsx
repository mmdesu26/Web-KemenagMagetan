"use client"
import { motion } from "framer-motion"
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa"

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com/kemenagmagetan" },
    { icon: <FaInstagram />, url: "https://instagram.com/kemenagmagetan" },
    { icon: <FaYoutube />, url: "https://youtube.com/kemenagmagetan" },
    { icon: <FaTiktok />, url: "https://tiktok.com/@kemenagmagetan" },
  ]

  const footerLinks = [
    {
      title: "Tautan Cepat",
      links: [
        { name: "Beranda", url: "/" },
        { name: "Profil", url: "/profil" },
        { name: "Berita", url: "/berita" },
        { name: "Layanan", url: "/layanan" },
      ],
    },
    {
      title: "Layanan",
      links: [
        { name: "PTSP", url: "/ptsp" },
        { name: "PPID", url: "/ppid" },
        { name: "FAQ", url: "/faq" },
        { name: "Pengaduan", url: "/pengaduan" },
      ],
    },
  ]

  return (
    <footer className="bg-green-800 text-white pt-8 sm:pt-12 pb-4 sm:pb-6">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Kontak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Kontak Kami</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start text-sm sm:text-base">
                <FaMapMarkerAlt className="mt-1 mr-2 sm:mr-3 flex-shrink-0 text-sm" />
                <span>Jl. Raya Magetan No. 123, Magetan, Jawa Timur</span>
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <FaPhone className="mr-2 sm:mr-3 flex-shrink-0 text-sm" />
                <span>(0351) 1234567</span>
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <FaEnvelope className="mr-2 sm:mr-3 flex-shrink-0 text-sm" />
                <span className="break-all">kemenag@magetan.go.id</span>
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <FaWhatsapp className="mr-2 sm:mr-3 flex-shrink-0 text-sm" />
                <a href="https://wa.me/6281234567890" className="hover:underline">
                  0812-3456-7890
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Jam Layanan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Jam Layanan</h3>
            <div className="bg-green-700 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaClock className="mr-2 sm:mr-3 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">PTSP Kemenag Magetan</span>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li>Senin-Kamis: 08.00 - 15.00 WIB</li>
                <li>Jumat: 08.00 - 14.30 WIB</li>
                <li>Sabtu-Minggu: Libur</li>
              </ul>
            </div>
          </motion.div>

          {/* Tautan */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
              viewport={{ once: true }}
              className="sm:col-span-1"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{section.title}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:underline text-sm sm:text-base hover:text-green-200 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Media Sosial & Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-green-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Media Sosial</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-700 hover:bg-green-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl transition-colors hover:scale-110 transform duration-200"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:text-right">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Lokasi</h3>
              <div className="bg-green-700 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10606.221887853904!2d111.316505!3d-7.665481!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e799227621f6a2f%3A0x3499f2feb9af52c!2sKantor%20Kemenag%20Kabupaten%20Magetan!5e1!3m2!1sen!2sid!4v1755475752889!5m2!1sen!2sid"
                  width="100%"
                  height="120"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="sm:h-32 lg:h-40"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-green-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-xs sm:text-sm"
        >
          <p>© {new Date().getFullYear()} Kementerian Agama Kabupaten Magetan. Seluruh hak cipta dilindungi.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
