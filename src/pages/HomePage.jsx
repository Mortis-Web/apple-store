import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Features from '../sections/Features';
import Hero from '../sections/Hero';
import Highlight from '../sections/Highlight';
import HowItWorks from '../sections/HowItWorks';
import Model from '../sections/Model';
const HomePage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlight />
      <Model />
      <Features />
      <HowItWorks />
      <Footer/>
    </main>
  );
};

export default HomePage;
