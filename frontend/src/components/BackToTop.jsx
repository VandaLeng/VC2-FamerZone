import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility based on scroll position
  const toggleVisibility = () => {
    // Show button when user scrolls past 100 pixels from the top
    const scrolledPastTop = window.scrollY > 100;
    setIsVisible(scrolledPastTop);
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-2xl hover:scale-110 hover:-rotate-12 transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } group`}
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
    </button>
  );
};

export default BackToTopButton;