// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   FaSearch,
//   FaBars,
//   FaTimes,
//   FaPhone,
//   FaEnvelope,
//   FaFacebook,
//   FaInstagram,
//   FaYoutube,
//   FaTiktok,
//   FaChevronDown,
// } from "react-icons/fa"

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
//   const [isLayananDropdownOpen, setIsLayananDropdownOpen] = useState(false)
//   const [isPTSPDropdownOpen, setIsPTSPDropdownOpen] = useState(false)
//   const [isPPIDDropdownOpen, setIsPPIDDropdownOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const menuItems = [
//     { name: "Beranda", path: "/" },
//     {
//       name: "Profil",
//       path: "/profil",
//       submenu: [
//         { name: "Sejarah Instansi", path: "/profil/sejarah" },
//         { name: "Visi & Misi", path: "/profil/visi-misi" },
//         { name: "Tugas Pokok & Fungsi", path: "/profil/tupoksi" },
//         { name: "Kepala Kemenag", path: "/profil/kepala" },
//         { name: "Struktur Organisasi", path: "/profil/struktur" },
//       ],
//     },
//     { name: "Berita", path: "/berita" },
//     { name: "Info Bantuan", path: "/bantuan" },
//     {
//       name: "Layanan",
//       path: "/layanan",
//       submenu: [
//         { name: "Standar Pelayanan", path: "/layanan/standar-pelayanan" },
//         { name: "SOP (Standar Operasional Prosedur)", path: "/layanan/sop" },
//         { name: "SPM (Standar Pelayanan Minimal)", path: "/layanan/spm" },
//       ],
//     },
//     {
//       name: "PTSP",
//       path: "/ptsp",
//       submenu: [
//         { name: "Tugas PTSP", path: "/ptsp/tugas" },
//         { name: "PTSP Online", path: "/ptsp/online" },
//       ],
//     },
//     {
//       name: "PPID",
//       path: "/ppid",
//       submenu: [
//         { name: "Data Kemenag Magetan", path: "/ppid/data-kemenag" },
//         { name: "Tugas PPID", path: "/ppid/tugas" },
//         { name: "Informasi Berkala", path: "/ppid/informasi-berkala" },
//         { name: "Informasi Serta Merta", path: "/ppid/informasi-serta-merta" },
//         { name: "Informasi Setiap Saat", path: "/ppid/informasi-setiap-saat" },
//       ],
//     },
//     { name: "FAQ", path: "/faq" },
//   ]

//   const socialLinks = [
//     { icon: <FaFacebook />, url: "https://facebook.com/kemenagmagetan" },
//     { icon: <FaInstagram />, url: "https://instagram.com/kemenagmagetan" },
//     { icon: <FaYoutube />, url: "https://youtube.com/@humaskemenagmagetan1932" },
//     { icon: <FaTiktok />, url: "https://tiktok.com/@kemenagmagetan" },
//   ]

//   return (
//     <header
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         scrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         {/* Top Bar */}
//         <div className="flex justify-between items-center mb-2">
//           <div className="flex items-center">
//             <img src="/logo.png" alt="Kemenag Magetan" className="h-12 mr-3" />
//             <div>
//               <h1 className="text-lg font-bold text-green-800">KEMENTERIAN AGAMA</h1>
//               <p className="text-sm text-gray-600">Kabupaten Magetan</p>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <div className="flex items-center text-green-700">
//               <FaPhone className="mr-2" />
//               <span>(0351) 1234567</span>
//             </div>
//             <div className="flex items-center text-green-700">
//               <FaEnvelope className="mr-2" />
//               <span>kemenag@magetan.go.id</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Navigation */}
//         <div className="flex justify-between items-center border-t border-gray-200 pt-2">
//           <nav className="hidden md:flex space-x-6">
//             {menuItems.map((item, index) => (
//               <div key={index} className="relative">
//                 {item.submenu ? (
//                   <div
//                     className="relative"
//                     onMouseEnter={() => {
//                       if (item.name === "Profil") {
//                         setIsProfileDropdownOpen(true)
//                       } else if (item.name === "Layanan") {
//                         setIsLayananDropdownOpen(true)
//                       } else if (item.name === "PTSP") {
//                         setIsPTSPDropdownOpen(true)
//                       } else if (item.name === "PPID") {
//                         setIsPPIDDropdownOpen(true)
//                       }
//                     }}
//                     onMouseLeave={() => {
//                       if (item.name === "Profil") {
//                         setIsProfileDropdownOpen(false)
//                       } else if (item.name === "Layanan") {
//                         setIsLayananDropdownOpen(false)
//                       } else if (item.name === "PTSP") {
//                         setIsPTSPDropdownOpen(false)
//                       } else if (item.name === "PPID") {
//                         setIsPPIDDropdownOpen(false)
//                       }
//                     }}
//                   >
//                     <button className="flex items-center text-green-800 hover:text-green-600 font-medium transition-colors">
//                       {item.name}
//                       <FaChevronDown className="ml-1 text-xs" />
//                     </button>

//                     <AnimatePresence>
//                       {((item.name === "Profil" && isProfileDropdownOpen) ||
//                         (item.name === "Layanan" && isLayananDropdownOpen) ||
//                         (item.name === "PTSP" && isPTSPDropdownOpen) ||
//                         (item.name === "PPID" && isPPIDDropdownOpen)) && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           transition={{ duration: 0.2 }}
//                           className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
//                         >
//                           {item.submenu.map((subItem, subIndex) => (
//                             <a
//                               key={subIndex}
//                               href={subItem.path}
//                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"
//                             >
//                               {subItem.name}
//                             </a>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ) : (
//                   <a href={item.path} className="text-green-800 hover:text-green-600 font-medium transition-colors">
//                     {item.name}
//                   </a>
//                 )}
//               </div>
//             ))}
//           </nav>

//           <div className="flex items-center space-x-4">
//             <div className="relative hidden md:block">
//               <input
//                 type="text"
//                 placeholder="Cari..."
//                 className="border border-gray-300 rounded-full py-1 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <FaSearch className="absolute left-3 top-2 text-gray-400" />
//             </div>

//             <button className="md:hidden text-green-800" onClick={() => setIsOpen(!isOpen)}>
//               {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-white shadow-lg rounded-b-lg overflow-hidden"
//           >
//             <div className="p-4">
//               <div className="relative mb-4">
//                 <input
//                   type="text"
//                   placeholder="Cari..."
//                   className="border border-gray-300 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <FaSearch className="absolute left-3 top-3 text-gray-400" />
//               </div>

//               <nav className="flex flex-col space-y-3">
//                 {menuItems.map((item, index) => (
//                   <div key={index}>
//                     <a
//                       href={item.path}
//                       className="text-green-800 hover:text-green-600 font-medium py-2 border-b border-gray-100 flex items-center justify-between"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {item.name}
//                       {item.submenu && <FaChevronDown className="text-xs" />}
//                     </a>
//                     {item.submenu && (
//                       <div className="ml-4 mt-2 space-y-2">
//                         {item.submenu.map((subItem, subIndex) => (
//                           <a
//                             key={subIndex}
//                             href={subItem.path}
//                             className="block text-sm text-gray-600 hover:text-green-600 py-1"
//                             onClick={() => setIsOpen(false)}
//                           >
//                             {subItem.name}
//                           </a>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </nav>

//               <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
//                 {socialLinks.map((link, index) => (
//                   <a
//                     key={index}
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-green-700 hover:text-green-500 text-xl"
//                   >
//                     {link.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </header>
//   )
// }

// export default Header



import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaChevronDown,
} from "react-icons/fa"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isLayananDropdownOpen, setIsLayananDropdownOpen] = useState(false)
  const [isPTSPDropdownOpen, setIsPTSPDropdownOpen] = useState(false)
  const [isPPIDDropdownOpen, setIsPPIDDropdownOpen] = useState(false)

  // state tambahan untuk mobile dropdown
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { name: "Beranda", path: "/" },
    {
      name: "Profil",
      path: "/profil",
      submenu: [
        { name: "Sejarah Instansi", path: "/profil/sejarah" },
        { name: "Visi & Misi", path: "/profil/visi-misi" },
        { name: "Tugas Pokok & Fungsi", path: "/profil/tupoksi" },
        { name: "Kepala Kemenag", path: "/profil/kepala" },
        { name: "Struktur Organisasi", path: "/profil/struktur" },
      ],
    },
    { name: "Berita", path: "/berita" },
    { name: "Info Bantuan", path: "/bantuan" },
    {
      name: "Layanan",
      path: "/layanan",
      submenu: [
        { name: "Standar Pelayanan", path: "/layanan/standar-pelayanan" },
        { name: "SOP (Standar Operasional Prosedur)", path: "/layanan/sop" },
        { name: "SPM (Standar Pelayanan Minimal)", path: "/layanan/spm" },
      ],
    },
    {
      name: "PTSP",
      path: "/ptsp",
      submenu: [
        { name: "Tugas PTSP", path: "/ptsp/tugas" },
        { name: "PTSP Online", path: "/ptsp/online" },
      ],
    },
    {
      name: "PPID",
      path: "/ppid",
      submenu: [
        { name: "Data Kemenag Magetan", path: "https://lookerstudio.google.com/u/0/reporting/544981f2-01e6-4046-bae0-58c759acc646/page/bZlSF" },
        { name: "Tugas PPID", path: "/ppid/tugas" },
        { name: "Informasi Berkala", path: "/ppid/informasiberkala" },
        { name: "Informasi Serta Merta", path: "/ppid/informasisertamerta" },
        { name: "Informasi Setiap Saat", path: "/ppid/informasisetiapsaat" },
      ],
    },
    { name: "FAQ", path: "/faq" },
  ]

  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com/kemenagmagetan" },
    { icon: <FaInstagram />, url: "https://instagram.com/kemenagmagetan" },
    { icon: <FaYoutube />, url: "https://youtube.com/@humaskemenagmagetan1932" },
    { icon: <FaTiktok />, url: "https://tiktok.com/@kemenagmagetan" },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo kiri */}
        <div className="flex items-center">
          <img src="/assets/images/logo.png" alt="Kemenag Magetan" className="h-12 mr-3" />
          <div>
            <h1 className="text-lg font-bold text-green-800">KEMENTERIAN AGAMA</h1>
            <p className="text-sm text-gray-600">Kabupaten Magetan</p>
          </div>
        </div>

        {/* Menu kanan */}
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                {item.submenu ? (
                  <div
                    onMouseEnter={() => {
                      if (item.name === "Profil") setIsProfileDropdownOpen(true)
                      if (item.name === "Layanan") setIsLayananDropdownOpen(true)
                      if (item.name === "PTSP") setIsPTSPDropdownOpen(true)
                      if (item.name === "PPID") setIsPPIDDropdownOpen(true)
                    }}
                    onMouseLeave={() => {
                      if (item.name === "Profil") setIsProfileDropdownOpen(false)
                      if (item.name === "Layanan") setIsLayananDropdownOpen(false)
                      if (item.name === "PTSP") setIsPTSPDropdownOpen(false)
                      if (item.name === "PPID") setIsPPIDDropdownOpen(false)
                    }}
                  >
                    <button className="flex items-center text-green-800 hover:text-green-600 font-medium transition-colors">
                      {item.name}
                      <FaChevronDown className="ml-1 text-xs" />
                    </button>

                    <AnimatePresence>
                      {((item.name === "Profil" && isProfileDropdownOpen) ||
                        (item.name === "Layanan" && isLayananDropdownOpen) ||
                        (item.name === "PTSP" && isPTSPDropdownOpen) ||
                        (item.name === "PPID" && isPPIDDropdownOpen)) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a href={item.path} className="text-green-800 hover:text-green-600 font-medium transition-colors">
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Tombol hamburger untuk mobile */}
          <button className="md:hidden text-green-800 ml-4" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg rounded-b-lg overflow-hidden"
        >
          <div className="p-4">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item, index) => {
                const hasSubmenu = !!item.submenu
                const isDropdownOpen = openDropdown === index

                return (
                  <div key={index}>
                    <button
                      onClick={() => {
                        if (hasSubmenu) {
                          setOpenDropdown(isDropdownOpen ? null : index)
                        } else {
                          setIsOpen(false)
                          window.location.href = item.path
                        }
                      }}
                      className="w-full flex items-center justify-between text-green-800 hover:text-green-600 font-medium py-2 border-b border-gray-100"
                    >
                      {item.name}
                      {hasSubmenu && (
                        <FaChevronDown
                          className={`ml-2 text-xs transform transition-transform ${
                            isDropdownOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      )}
                    </button>

                    {hasSubmenu && isDropdownOpen && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.path}
                            className="block text-sm text-gray-600 hover:text-green-600 py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Social media di bawah menu mobile */}
            <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-500 text-xl"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header

