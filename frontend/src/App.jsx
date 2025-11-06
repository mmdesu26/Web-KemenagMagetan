
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


import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// ✅ Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// ✅ HOME
import Home from "./pages/Home/page.jsx";

// ✅ PROFILE
import SejarahInstansi from "./pages/Profile/SejarahInstansi/page.jsx";
import VisiMisi from "./pages/Profile/VisiMisi/page.jsx";
import TugasPokokFungsi from "./pages/Profile/TugasPokokFungsi/page.jsx";
import KepalaKemenag from "./pages/Profile/KepalaKemenag/page.jsx";
import StrukturOrganisasi from "./pages/Profile/StrukturOrganisasi/page.jsx";

// ✅ BERITA
import BeritaPage from "./pages/Berita/page.jsx";

// ✅ MENU LAIN
import InfoBantuan from "./pages/InfoBantuan/page.jsx";
import FAQ from "./pages/FAQ/page.jsx";

// ✅ LAYANAN
import SOP from "./components/Layanan/SOP/page.jsx";
import SPM from "./components/Layanan/SPM/page.jsx";
import StandarPelayanan from "./components/Layanan/StandarPelayanan/page.jsx";

// ✅ PTSP
import TugasPtsp from './components/PTSP/TugasPtsp/page.jsx'; 
import PtspOnline from './components/PTSP/PtspOnline/page.jsx'; 

// ✅ PPID
import DataKemenagMagetan from "./components/PPID/DataKemenagMagetan/page.jsx";
import InformasiBerkala from "./components/PPID/InformasiBerkala/page.jsx";
import InformasiSertaMerta from "./components/PPID/InformasiSertaMerta/page.jsx";
import InformasiSetiapSaat from "./components/PPID/InformasiSetiapSaat/page.jsx";
import TugasPPID from "./components/PPID/Tugas/page.jsx";

// ✅ Routes dengan animasi transisi antar halaman
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PROFILE */}
        <Route path="/profil/sejarah" element={<SejarahInstansi />} />
        <Route path="/profil/visi-misi" element={<VisiMisi />} />
        <Route path="/profil/tupoksi" element={<TugasPokokFungsi />} />
        <Route path="/profil/kepala" element={<KepalaKemenag />} />
        <Route path="/profil/struktur" element={<StrukturOrganisasi />} />

        {/* BERITA */}
        <Route path="/berita" element={<BeritaPage />} />

        {/* LAYANAN */}
        <Route path="/Layanan/standar" element={<StandarPelayanan />} />
        <Route path="/Layanan/SOP" element={<SOP />} />
        <Route path="/Layanan/SPM" element={<SPM />} />

        {/* PPID */}
        <Route path="/PPID/DataKemenagMagetan" element={<DataKemenagMagetan />} />
        <Route path="/PPID/InformasiBerkala" element={<InformasiBerkala />} />
        <Route path="/PPID/InformasiSertaMerta" element={<InformasiSertaMerta />} />
        <Route path="/PPID/InformasiSetiapSaat" element={<InformasiSetiapSaat />} />
        <Route path="/PPID/Tugas" element={<TugasPPID />} />

        {/* PTSP */}
        <Route path="/ptsp/tugas" element={<TugasPtsp />} />
        <Route path="/ptsp/online" element={<PtspOnline />} />

        {/* LAINNYA */}
        <Route path="/bantuan" element={<InfoBantuan />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </AnimatePresence>
  );
}

// ✅ Struktur utama aplikasi
const App = () => {
  return (
    <Router>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
};

export default App;
