import { useEffect, useRef, useState } from 'react';
import { heroVideo, smallHeroVideo } from '../utils';

const SmoothVideo = ({ IsMobile, isInView }) => {
  const HeroVideoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(
    IsMobile ? smallHeroVideo : heroVideo
  );
  useEffect(() => {
    if (!isInView) return;
    setVideoSrc(IsMobile ? smallHeroVideo : heroVideo);
  }, [IsMobile]);

  useEffect(() => {
    const video = HeroVideoRef.current;
    if (!video || IsMobile) return;

    const loopSeconds = 2.7; // last N seconds to loop

    const handleEnded = () => {
      video.currentTime = Math.max(0, video.duration - loopSeconds);
      video.play();
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [IsMobile]);

  return (
    <video
      muted
      playsInline
      autoPlay
      key={videoSrc}
      preload="auto"
      poster={`${import.meta.env.BASE_URL}assets/images/poster.webp`}
      ref={HeroVideoRef}
      className="tilt"
      crossOrigin="anonymous"
      fetchPriority="high"
    >
      <source src={videoSrc} type="video/webm" />
    </video>
  );
};

export default SmoothVideo;
