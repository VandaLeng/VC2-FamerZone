import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = ({ children, currentLanguage, setCurrentLanguage }) => {
  return (
    <>
      <Navbar currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      <main>{children}</main>
      <Footer currentLanguage={currentLanguage} />
    </>
  );
};

export default PublicLayout;
