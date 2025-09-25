import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import useInView from '../hooks/useInView';
import { chipImg, frameImg, frameVideo } from '../utils';
import { animateWithGsapScrollTrigger } from '../utils/animations';

const HowItWorks = () => {
  const videoRef = useRef(null);
  const [ref, isInView] = useInView();
  useGSAP(() => {
    if (!isInView) return;
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom',
      },

      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut',
    });

    gsap.fromTo(
      '#hiwVideo',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#hiwVideo',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            if (videoRef.current) {
              videoRef.current.play();
            }
          },
        },
      }
    );

    animateWithGsapScrollTrigger('.g_fadeIn', {
      y: 0,
      opacity: 1,
      ease: 'power2.inOut',
      duration: 1,
      stagger: 0.1,
    });
  }, [isInView]);

  return (
    <section ref={ref} className="common-padding overflow-hidden">
      <div className="screen-max-width container">
        <div id="chip" className="flex-center my-20 w-full">
          <img
            src={chipImg}
            alt="chipImg"
            width={210}
            height={210}
            loading="lazy"
          />
        </div>

        <article className="flex flex-col items-center">
          <h2 className="hiw-title text-gradient pb-2.5 capitalize">
            A17 Pro Chip.
            <br /> A monster win for gaming
          </h2>

          <p className="text-gradient hiw-subtitle font-medium capitalize">
            It's here! The biggest re-design in the history of Apple GPUS
          </p>
        </article>

        <article className="mt-10 mb-14">
          <div className="flex-center relative h-full">
            <figure className="overflow-hidden">
              <img
                src={frameImg}
                alt="phone frame"
                className="relative z-10 bg-transparent"
                loading="lazy"
              />
            </figure>
            <figure className="hiw-video">
              <video
                id="hiwVideo"
                className="pointer-events-none"
                playsInline
                preload="metadata"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={frameVideo} type="video/webm" />
              </video>
            </figure>
          </div>
          <p className="text-gradient mt-3 text-center text-lg font-semibold sm:text-2xl">
            Honkai: Star Rail
          </p>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-x-10 gap-y-10">
            <article className="hiw-text-container flex min-w-full flex-2 flex-col gap-4 md:min-w-0">
              <p className="hiw-text g_fadeIn capitalize">
                A17 Pro is entirely new class of iPhone chip that delivers our
                space
                <span className="mx-1 text-white">
                  {' '}
                  best graphic performance by far.{' '}
                </span>{' '}
              </p>
              <article className="hiw-text-container">
                <div className="flex-center flex-1 flex-col">
                  <p className="hiw-text g_fadeIn capitalize">
                    any mobile game will
                    <span className="mx-1 text-white">
                      {' '}
                      look and feel so immersive,{' '}
                    </span>{' '}
                    with incredibly detailed environments and characters.
                  </p>
                </div>
              </article>
            </article>

            <div className="g_fadeIn flex min-w-full flex-1 flex-col justify-center md:min-w-0">
              <p className="hiw-text">New</p>
              <p className="hiw-bigtext text-gradient font-bold">
                Pro-Class GPU
              </p>
              <p className="hiw-text">With 6 Cores</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HowItWorks;
