import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Current URL path pata karne ke liye
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi pathname badle, window ko top (0,0) par scroll kar do
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ye UI me kuch dikhayega nahi, bas logic run karega
};

export default ScrollToTop;