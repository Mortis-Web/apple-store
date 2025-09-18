// utils/animations.js

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export const animateWithGsap = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  direction
) => {
  // rotate the active model
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut',
  });

  timeline.to(
    firstTarget,
    {
      x: direction === 'left' ? '-100%' : '100%',
      ease: 'power3.inOut',
      duration: 1.5,
    },
    '<'
  );

  timeline.to(
    secondTarget,
    {
      x: '0%',
      ease: 'power3.inOut',
      duration: 1.5,
    },
    '<'
  );
};

export const animateWithGsapScrollTrigger = (
  target,
  animProps,
  scrollProps
) => {
  gsap.to(target, {
    ...animProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    },
  });
};
