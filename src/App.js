import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import Home from './Pages/Home';
import NoPage from './Pages/NoPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/index.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const publicUrl = process.env.PUBLIC_URL || '';
  const basename = (publicUrl && window.location.pathname.startsWith(publicUrl)) ? publicUrl : '';

  return (
    <ThemeProvider>
      <Router basename={basename}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;