import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import VideoCarousel from '../components/VideoCarousel';
import useInView from './../hooks/useInView';
import { rightImg, watchImg } from './../utils/index';

const Highlight = () => {
  const [ref, isInView] = useInView();
  useGSAP(() => {
    if (!isInView) return;
    gsap.to('#title', {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power1.inOut',
    });

    gsap.to('.link', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.5,
      stagger: 0.25,
    });
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="highlight"
      className="common-padding bg-zinc h-full w-screen overflow-hidden"
    >
      <div className="screen-max-width container">
        <article className="mb-12 w-full items-center justify-between gap-6 md:flex">
          <h1
            id="title"
            className="section-heading text-gradient pb-2.5 capitalize"
          >
            get the highlights.
          </h1>

          <span className="flex flex-wrap items-end gap-2 xs:gap-5">
            <p className="link">
              Watch The Film{' '}
              <img src={watchImg} alt="watchImg" className="ml-2" />
            </p>
            <p className="link">
              Watch The Event{' '}
              <img src={rightImg} alt="rightImg" className="ml-2" />
            </p>
          </span>
        </article>
        <VideoCarousel isInView={isInView} />
      </div>
    </section>
  );
};

export default Highlight;
