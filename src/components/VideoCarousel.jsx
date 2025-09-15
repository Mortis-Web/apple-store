import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { hightlightSlides } from '../constants';
import { pauseImg, playImg, replayImg } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = ({ isInView }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const containerRef = useRef(null);
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const tickerRef = useRef(null);
  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.killTweensOf('.slider');
    gsap.killTweensOf(`.videoTitle-${videoId}`);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const slideTimeline = gsap.timeline();

    slideTimeline.to('.slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });

    slideTimeline.to(
      `.videoTitle-${videoId}`,

      {
        opacity: 1,
        y: 0,
        scale: 1.2,
        ease: 'expo.inOut',
        duration: 1.5,
      },
      '-=0.75'
    );

    ScrollTrigger.create({
      trigger: `.video-${videoId}`,
      toggleActions: 'restart none none none',
      onEnter: () => {
        setVideo(prev => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });

    return () => {
      slideTimeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [videoId]);

  // Play/pause current video
  useEffect(() => {
    if (!isInView) {
      videoRef.current.forEach(video => video?.pause());
      return;
    }
    if (loadedData.length >= hightlightSlides.length) {
      videoRef.current.forEach((currentVideo, index) => {
        if (index === videoId) {
          if (isPlaying && startPlay) currentVideo.play();
          else currentVideo.pause();
        } else {
          currentVideo.pause();
        }
      });
    }
  }, [videoId, startPlay, isPlaying, loadedData, isInView]);

  const handleLoadedMetaData = e => {
    setLoadedData(prev => (prev.includes(e) ? prev : [...prev, e]));
  };

  // Progress bar animation
  useEffect(() => {
    if (!isInView) return;
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: isMobile ? '10vw' : '4vw',
              duration: 0.25,
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              background: 'white',
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
              background: '#afafaf',
            });
            gsap.to(span[videoId], { background: '#afafaf' });
          }
        },
      });

      const animUpdate = () => {
        if (videoRef.current[videoId]) {
          anim.progress(
            videoRef.current[videoId].currentTime /
              hightlightSlides[videoId].videoDuration
          );
        }
      };

      if (isPlaying) gsap.ticker.add(animUpdate);
      else gsap.ticker.remove(animUpdate);

      return () => {
        gsap.ticker.remove(animUpdate);
      };
    }
  }, [videoId, startPlay, isPlaying, isMobile, isInView]);

  const handleProcess = (type, index) => {
    switch (type) {
      case 'video-end':
        if (index < hightlightSlides.length - 1) {
          setVideo(prev => ({ ...prev, videoId: index + 1 }));
        } else {
          setVideo(prev => ({ ...prev, isLastVideo: true }));
        }
        break;
      case 'video-reset':
        setVideo({
          isEnd: false,
          startPlay: true,
          videoId: 0,
          isLastVideo: false,
          isPlaying: true,
        });
        break;
      case 'play':
      case 'pause':
        setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightSlides.map((slide, index) => (
          <div key={slide.id} className="slider pr-10 md:pr-20">
            <div className="video-carousel_container">
              <figure className="flex-center size-full overflow-hidden rounded-3xl bg-black">
                <video
                  autoPlay={index === 0}
                  playsInline
                  preload={index === 0 ? 'auto' : 'metadata'}
                  muted
                  ref={el => (videoRef.current[index] = el)}
                  onLoadedMetadata={handleLoadedMetaData}
                  onEnded={() => handleProcess('video-end', index)}
                  className={`video video-${index} ${
                    slide.id === 2 ? 'translate-x-44' : ''
                  } pointer-events-none`}
                >
                  <source src={slide.video} type="video/webm" />
                </video>
              </figure>
              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map(text => (
                  <p
                    key={text}
                    className={`videoTitle-${index} text-gradient translate-x-10 translate-y-20 py-1 text-xl font-medium capitalize opacity-0 md:text-3xl`}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <article className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur-2xl">
          {hightlightSlides.map((_, index) => (
            <span
              key={index}
              ref={el => (videoDivRef.current[index] = el)}
              className="relative mx-2 h-3 w-3 origin-right rounded-full bg-gray-200"
            >
              <span
                className="absolute size-full rounded-full"
                ref={el => (videoSpanRef.current[index] = el)}
              />
            </span>
          ))}
        </div>
        <button
          className="control-btn cursor-pointer"
          type="button"
          onClick={
            isLastVideo
              ? () => handleProcess('video-reset')
              : () => handleProcess(isPlaying ? 'pause' : 'play')
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
          />
        </button>
      </article>
    </>
  );
};

export default VideoCarousel;
