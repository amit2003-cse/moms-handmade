import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Categories from '../components/home/Categories';
import Newsletter from '../components/home/Newsletter';

const Home = () => {

  useEffect(() => {
    // API call karne ke liye fetch ka use
    fetch('https://moms-handmade.onrender.com')
      .then(() => {
        console.log('backend started');
      })
      .catch((error) => {
        console.error('Error starting backend:', error);
      });
  }, []); // Khali array ka matlab hai ye sirf pehli baar chalega

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Features />
      <Categories />
      <Newsletter />
    </div>
  );
};

export default Home;
