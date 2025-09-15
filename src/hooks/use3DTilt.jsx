import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const use3DTilt = (selector = '.tilt-wrapper') => {
  const location = useLocation();

  useEffect(() => {
    const wrappers = document.querySelectorAll(selector);
    const listeners = [];

    wrappers.forEach(wrapper => {
      const card = wrapper.querySelector('.tilt');
      if (!card) return;

      const handleMouseMove = e => {
        const { left, top, width, height } = wrapper.getBoundingClientRect();

        // Disable transition while moving
        card.style.transition = 'none';

        const x = e.clientX - left;
        const y = e.clientY - top;

        const centeredX = x / width - 0.5;
        const centeredY = y / height - 0.5;

        const rotateX = Math.max(Math.min(centeredY * -20, 20), -20);
        const rotateY = Math.max(Math.min(centeredX * -20, 20), -20);

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      const handleMouseLeave = () => {
        // Smooth reset to neutral
        card.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      };

      wrapper.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseleave', handleMouseLeave);

      listeners.push({ wrapper, handleMouseMove, handleMouseLeave });
    });

    return () => {
      listeners.forEach(({ wrapper, handleMouseMove, handleMouseLeave }) => {
        wrapper.removeEventListener('mousemove', handleMouseMove);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [selector, location.pathname]);
};

export default use3DTilt;
