import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;