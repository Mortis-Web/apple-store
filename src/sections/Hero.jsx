import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
import SmoothVideo from '../components/SmoothVideo';
import useInView from './../hooks/useInView';
import { useEffect } from 'react';
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            role="img"
            aria-labelledby="cartTitle cartDesc"
            focusable="false"
          >
            <title id="cartTitle">Shopping cart</title>
            <desc id="cartDesc">Icon of a shopping cart with two wheels</desc>
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a1 1 0 0 0 .98-.79L22 6H6" />
              <circle
                cx="8.5"
                cy="20.5"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="18"
                cy="20.5"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </g>
          </svg>
          Get Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
