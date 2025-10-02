import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Features from '../sections/Features';
import Hero from '../sections/Hero';
import Highlight from '../sections/Highlight';
import HowItWorks from '../sections/HowItWorks';
import Model from '../sections/Model';
import ProductCarousel from '../sections/ProductCarousel';
const HomePage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlight />
      <Model />
      <ProductCarousel />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default HomePage;
