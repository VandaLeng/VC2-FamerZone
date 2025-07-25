import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout({ children, currentLanguage, setCurrentLanguage }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
}
