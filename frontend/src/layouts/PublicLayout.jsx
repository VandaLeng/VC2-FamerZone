import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// Back to top
import BackToTopButton from "../components/BackToTop";

const PublicLayout = ({ children, currentLanguage, setCurrentLanguage }) => {
  return (
    <>
      <Navbar currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      <main>{children}</main>
      <Footer currentLanguage={currentLanguage} />
      <BackToTopButton />
    </>
  );
};

export default PublicLayout;
