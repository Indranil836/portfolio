import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import NoPage from './Pages/NoPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/index.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;