// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MapView from './pages/Map.jsx';
import Credits from './pages/Credits.jsx';
import Stories from './pages/Stories.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/stories" element={<Stories />} />
      </Routes>
    </Router>
  );
};

export default App;
