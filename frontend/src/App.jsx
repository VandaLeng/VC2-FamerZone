import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import Home from './views/user/HomePage';
import Products from './views/user/ProductPage';
import About from './views/user/AboutPage';
import LearningCenter from './views/user/LearningCenterPage';
import Contact from './views/user/ContactPage';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('kh');

  return (
    <Router>
      <Navbar currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      {/* <div className="flex">
        <Sidebar currentLanguage={currentLanguage} /> 
        <div className="flex-1"> */}
          <Routes>
            <Route path="/" element={<Home currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />} />
            <Route path="/products" element={<Products currentLanguage={currentLanguage} />} />
            <Route path="/about" element={<About currentLanguage={currentLanguage} />} />
            <Route path="/learning-center" element={<LearningCenter currentLanguage={currentLanguage} />} />
            <Route path="/contact" element={<Contact currentLanguage={currentLanguage} />} />
            <Route path="/register" element={<RegisterForm currentLanguage={currentLanguage} />} />
            <Route path="/login" element={<LoginForm currentLanguage={currentLanguage} />} />
          </Routes>
        {/* </div>
      </div> */}
      <Footer currentLanguage={currentLanguage} />
    </Router>
  );
}

export default App;
