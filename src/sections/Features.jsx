import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import useInView from '../hooks/useInView';
import { explore1Img, explore2Img, exploreVideo, HIWposter } from '../utils';
import { animateWithGsapScrollTrigger } from '../utils/animations';
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const videoRef = useRef(null);
  const [ref, isInView] = useInView();

  useGSAP(() => {
    if (isInView) {
      gsap.to('#features_title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.inOut',
      });
    } else {
      return null;
    }

    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWithGsapScrollTrigger(
      '.g_grow',
      {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: 'power1',
      },
      { scrub: 5 }
    );

    animateWithGsapScrollTrigger('.g_text', {
      y: 0,
      opacity: 1,
      ease: 'power2.inOut',
      duration: 1,
      stagger: 0.1,
    });
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="common-padding bg-zinc relative h-full overflow-hidden"
    >
      <div className="screen-max-width">
        <div className="container">
          <h1
            id="features_title"
            className="section-heading text-gradient pb-2"
          >
            Explore The Full Story
          </h1>
        </div>

        <article className="flex-center flex-col overflow-hidden">
          <div className="xs:mt-32 max-xs:hidden mt-24 mb-24 text-center">
            <h2 className="text-gradient text-5xl font-semibold lg:text-7xl">
              iPhone
            </h2>
            <h3 className="text-gradient pb-2.5 text-4xl font-medium lg:text-6xl">
              Forged In Titanium.
            </h3>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <figure className="relative mb-4 flex h-[50vh] w-full items-center">
              <video
                playsInline
                id="exploreVideo"
                preload="metadata"
                muted
                poster={HIWposter}
                ref={videoRef}
                className="h-full w-full rounded-xl object-cover object-center"
              >
                <source src={exploreVideo} type="video/webm" />
              </video>
            </figure>

            <div className="fle-col relative flex w-full">
              <div className="feature-video-container">
                <figure className="h-[50vh] w-full flex-1 overflow-hidden rounded-xl">
                  <img
                    src={explore1Img}
                    alt="explore1Img"
                    loading="lazy"
                    className="feature-video g_grow"
                  />
                </figure>
                <figure className="h-[50vh] w-full flex-1 overflow-hidden rounded-lg">
                  <img
                    src={explore2Img}
                    alt="explore2Img"
                    loading="lazy"
                    className="feature-video g_grow"
                  />
                </figure>
              </div>
            </div>
            <article className="feature-text-container mt-10 md:mt-16">
              <div className="flex-center flex-1">
                <p className="feature-text g_text capitalize">
                  iPhone 15 Pro Is
                  <span className="mx-1.5 text-white">
                    the first iphone to feature an aerospace-grade titanium
                    design
                  </span>
                  using the same alloy that spacecrafts use for missions to
                  mars.
                </p>
              </div>
            </article>
            <article className="feature-text-container mt-4">
              <div className="flex-center flex-1">
                <p className="feature-text g_text capitalize">
                  Titanium has one of the best{' '}
                  <span className="mx-1 text-white"> strength-to-weight </span>{' '}
                  ratios of any metal, making these our
                  <span className="mx-1.5 text-white">
                    lightest pro models ever!
                  </span>
                  you'll notice the difference the moment you pick one up.
                </p>
              </div>
            </article>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Features;
