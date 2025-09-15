import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import Highlight from '../sections/Highlight';
import Model from '../sections/Model';
const HomePage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlight/>
      <Model/>
    </main>
  );
};

export default HomePage;
