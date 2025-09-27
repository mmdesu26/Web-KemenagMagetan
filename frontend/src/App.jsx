// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './views/Home/Home';
// import { AnimatePresence } from 'framer-motion';

// const App = () => {
//   return (
//     <Router>
//       <AnimatePresence>
//         <Routes>
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </AnimatePresence>
//     </Router>
//   );
// };

// export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './views/Home/Home';
// import { AnimatePresence } from 'framer-motion';
// import SejarahInstansi from './components/profile/SejarahInstansi/page.jsx'; // ✅ tambahkan import

// const App = () => {
//   return (
//     <Router>
//       <AnimatePresence>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* ✅ route baru untuk halaman Sejarah Instansi */}
//           <Route path="/sejarah-instansi" element={<SejarahInstansi />} />
//         </Routes>
//       </AnimatePresence>
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './views/Home/Home';
import Header from "./components/layout/Header";                // <-- pastikan path sesuai
import SejarahInstansi from './components/profile/SejarahInstansi/page.jsx'; // <-- file yang tadi kita buat
import VisiMisi from './components/profile/VisiMisi/page.jsx'; // <-- file yang tadi kita buat
import TugasPokokFungsi from './components/profile/TugasPokokFungsi/page.jsx'; // <-- file yang tadi kita buat
import KepalaKemenag from './components/profile/KepalaKemenag/page.jsx'; 
import StrukturOrganisasi from './components/profile/StrukturOrganisasi/page.jsx'; 
import InfoBantuan from './components/InfoBantuan/page.jsx'; 
import FAQ from './components/FAQ/page.jsx'; 
import Footer from "./components/layout/Footer";

// Komponen pembungkus agar AnimatePresence bisa membaca perubahan lokasi
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/profil/sejarah" element={<SejarahInstansi />} />
        <Route path="/profil/visi-misi" element={<VisiMisi />} />
        <Route path="/profil/tupoksi" element={<TugasPokokFungsi />} />
        <Route path="/profil/kepala" element={<KepalaKemenag />} />
        <Route path="/profil/struktur" element={<StrukturOrganisasi />} />
        <Route path="/bantuan" element={<InfoBantuan />} />
        <Route path="/faq" element={<FAQ />} />
        {/* tambahkan route lain di sini bila perlu */}
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  return (
    <Router>
      <Header />           {/* Header selalu muncul di setiap halaman */}
      <AnimatedRoutes />   {/* Routes yang diberi animasi */}
      <Footer />
    </Router>
  );
};

export default App;
