import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// ✅ Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// ✅ Halaman HOME
import Home from "../app/Home/page.jsx";

// ✅ PROFILE
import SejarahInstansi from "../app/profile/SejarahInstansi/page.jsx";
import VisiMisi from "../app/profile/VisiMisi/page.jsx";
import TugasPokokFungsi from "../app/profile/TugasPokokFungsi/page.jsx";
import KepalaKemenag from "../app/profile/KepalaKemenag/page.jsx";
import StrukturOrganisasi from "../app/profile/StrukturOrganisasi/page.jsx";

// ✅ MENU LAIN
import InfoBantuan from "../app/InfoBantuan/page.jsx";
import FAQ from "../app/FAQ/page.jsx";

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

        {/* LAINNYA */}
        <Route path="/bantuan" element={<InfoBantuan />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </AnimatePresence>
  );
}

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
