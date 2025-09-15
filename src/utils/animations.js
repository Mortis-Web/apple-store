// utils/animations.js

export const animateWithGsap = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  direction,
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
      duration:1.5,
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
