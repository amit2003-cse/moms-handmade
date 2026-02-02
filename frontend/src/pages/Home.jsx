import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Categories from '../components/home/Categories';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
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