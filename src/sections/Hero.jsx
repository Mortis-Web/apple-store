import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
import SmoothVideo from '../components/SmoothVideo';
import useInView from './../hooks/useInView';
gsap.registerPlugin(useGSAP);

const Hero = () => {
  const IsMobile = useMediaQuery({ maxWidth: 640 });
  const [ref, isInView] = useInView();
  useGSAP(() => {
    gsap.to('.hero-title', {
      opacity: 1,
      delay: 1.5,
      duration: 1.25,
      scale: 1.25,
      ease: 'back.inOut',
    });
    gsap.to('#cta', {
      opacity: 1,
      y: IsMobile ? -50 : -100,
      scale: 1.25,
      duration: 0.75,
      delay: 1.75,
      ease: 'power1.inOut',
    });
  });
  return (
    <section
      ref={ref}
      className="nav-height relative w-full overflow-hidden bg-black"
    >
      <div className="flex-center h-5/6 w-full flex-col">
        <p className="hero-title relative z-50">iPhone 15 Pro</p>
        <figure className="flex-center tilt-wrapper w-7/12 min-w-[300px] sm:w-10/12 sm:min-w-[600px]">
          <SmoothVideo IsMobile={IsMobile} isInView={isInView} />
        </figure>
      </div>

      <div
        id="cta"
        className="flex translate-y-20 flex-col items-center opacity-0"
      >
        <a href="#highlights" className="btn duration-300">
          Buy
        </a>
        <p className="text-gradient text-xl font-medium">
          From $199/month or $999
        </p>
      </div>
    </section>
  );
};

export default Hero;
