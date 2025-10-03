import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { products } from '../constants';
import useInView from './../hooks/useInView';

const AUTO_DELAY = 3000;
const isMobile =
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
  ('ontouchstart' in window && navigator.maxTouchPoints > 0);

const ProductCarousel = () => {
  const [ref, isInView] = useInView();
  const [positions, setPositions] = useState([0, 1, 2, 3, 4, 5]);
  const itemsRef = useRef([]);
  const [disabled, setDisabled] = useState(false);
  const [isDetailed, setIsDetailed] = useState(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const autoPlayRef = useRef(null);

  const indexStyles = {
    0: {
      x: '-100%',
      y: '-5%',
      scale: 1.5,
      filter: 'blur(20px)',
      opacity: 0,
      zIndex: 7,
    },
    1: {
      x: '0%',
      y: '0%',
      scale: 1,
      filter: 'blur(0px)',
      opacity: 1,
      zIndex: 10,
    },
    2: {
      x: '35%',
      y: '10%',
      scale: 0.7,
      filter: 'blur(8px)',
      opacity: 1,
      zIndex: 9,
    },
    3: {
      x: '60%',
      y: '20%',
      scale: 0.5,
      filter: 'blur(20px)',
      opacity: 1,
      zIndex: 8,
    },
    4: {
      x: '120%',
      y: '30%',
      scale: 0.3,
      filter: 'blur(20px)',
      opacity: 0,
      zIndex: 7,
    },
    5: {
      x: '150%',
      y: '30%',
      scale: 0.3,
      filter: 'blur(20px)',
      opacity: 0,
      zIndex: 6,
    },
  };

  // initial gsap set once
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      positions.forEach((slot, i) => {
        const el = itemsRef.current[i];
        if (el) gsap.set(el, indexStyles[slot]);
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slideItems = type => {
    let newPositions;
    if (type === 'prev') newPositions = [...positions.slice(1), positions[0]];
    else
      newPositions = [
        positions[positions.length - 1],
        ...positions.slice(0, -1),
      ];

    positions.forEach((slot, i) => {
      const el = itemsRef.current[i];
      if (!el) return;
      gsap.to(el, {
        ...indexStyles[newPositions[i]],
        duration: 1,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          // ensure pointer-events for visible slides
          el.style.pointerEvents = newPositions[i] === 1 ? 'auto' : 'auto';
        },
      });
    });

    setPositions(newPositions);
    setDisabled(true);
    setTimeout(() => setDisabled(false), 1000);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (isDetailed !== null) return; // pause while detail open
    autoPlayRef.current = setInterval(() => {
      slideItems('next');
    }, AUTO_DELAY);
  };

  // keyboard/mobile handler
  useEffect(() => {
    if (!isInView) return;

    if (isMobile) {
      // 📱 MOBILE → back button handling
      const handlePopState = () => {
        if (disabled) return;
        if (isDetailed !== null) {
          setIsDetailed(null);
          resetAutoPlay();
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    } else {
      // 💻 DESKTOP → keyboard handling
      const handleKeyDown = e => {
        if (disabled) return;

        if (isDetailed === null) {
          if (e.key === 'ArrowRight') slideItems('next');
          if (e.key === 'ArrowLeft') slideItems('prev');
        } else {
          if (e.key === 'Escape' || e.key === 'Backspace') {
            setIsDetailed(null);
            resetAutoPlay();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [disabled, isDetailed, isInView]);

  // start autoplay when positions change (initial + slide)
  useEffect(() => {
    if (!isInView || isDetailed !== null) return;
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [isInView, isDetailed, positions]);

  // --- Swipe Handlers ---
  const handleStart = x => {
    if (isDetailed !== null) return;
    startX.current = x;
    currentX.current = x;
    isDragging.current = true;
  };

  const handleMove = x => {
    if (isDetailed !== null) return;
    if (!isDragging.current) return;
    const delta = x - startX.current;
    currentX.current = x;
    const activeIndex = positions.indexOf(1);
    const el = itemsRef.current[activeIndex];
    if (el) gsap.to(el, { x: delta, duration: 0.35, ease: 'none' });
  };

  const handleEnd = x => {
    if (isDetailed !== null) return;
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = x - startX.current;
    const threshold = 80;
    if (Math.abs(delta) > threshold) {
      if (delta > 0) slideItems('prev');
      else slideItems('next');
    } else {
      const activeIndex = positions.indexOf(1);
      const el = itemsRef.current[activeIndex];
      if (el) {
        gsap.to(el, {
          ...indexStyles[1],
          x: '0%',
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    }
  };

  // show detail (stop autoplay)
  const handleSeeMore = id => {
    setIsDetailed(id);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // GSAP-driven show/hide when isDetailed changes
  useEffect(() => {
    if (!isInView) return;

    // nothing to do if refs empty
    if (!itemsRef.current.length) return;

    if (isDetailed !== null) {
      // OPEN: animate non-active slides out, active slide forward, reveal detail
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const isActive = positions[i] === 1;
        if (!isActive) {
          // push non-active off to the right and fade out
          gsap.to(el, {
            x: '120%',
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            overwrite: 'auto',
            onStart: () => (el.style.pointerEvents = 'none'),
          });
        } else {
          // active slide — bring forward and slightly scale
          gsap.to(el, {
            x: '0%',
            scale: 1.02,
            zIndex: 20,
            duration: 1,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => (el.style.pointerEvents = 'auto'),
          });

          // show the detail panel with a small entrance
        }
      });
    } else {
      // CLOSE: restore every slide to its indexStyles slot (handles current positions)
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const slot = positions[i];
        gsap.to(el, {
          ...indexStyles[slot],
          duration: 1.5,
          ease: 'power2.inOut',
          overwrite: 'auto',
          onStart: () => (el.style.pointerEvents = 'none'),
          onComplete: () => {
            // after layout restored, ensure visible items are interactive
            el.style.pointerEvents = positions[i] === 1 ? 'auto' : 'auto';
          },
        });
      });

      resetAutoPlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetailed, isInView]);

  return (
    <section
      ref={ref}
      className={`carousel ${isDetailed ? 'showDetails' : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Product Carousel"
      aria-live="polite"
      onTouchStart={e => handleStart(e.touches[0].clientX)}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
      onTouchEnd={e => handleEnd(e.changedTouches[0].clientX)}
      onMouseDown={e => handleStart(e.clientX)}
      onMouseMove={e => handleMove(e.clientX)}
      onMouseUp={e => handleEnd(e.clientX)}
      onMouseLeave={e => handleEnd(e.clientX)}
      tabIndex={0}
    >
      <div className="list">
        {products.map((p, i) => {
          const isActive = positions[i] === 1;
          return (
            <article
              key={p.id}
              ref={el => {
                itemsRef.current[i] = el;
                if (!el) return;

                const isActive = positions[i] === 1;

                if (isDetailed !== null) {
                  // In detail mode: only active item should be interactive
                  if (isActive) {
                    el.removeAttribute('inert');
                  } else {
                    el.setAttribute('inert', '');
                  }
                } else {
                  // Normal carousel: only active is interactive
                  if (isActive) {
                    el.removeAttribute('inert');
                  } else {
                    el.setAttribute('inert', '');
                  }
                }
              }}
              aria-hidden={!isActive}
              aria-label={`Slide ${i + 1} of ${products.length}`}
              className={`item ${isActive ? 'active' : ''}`}
              onMouseEnter={
                isActive ? () => clearInterval(autoPlayRef.current) : null
              }
              onMouseLeave={isActive ? () => resetAutoPlay() : null}
            >
              <img src={p.img} alt={p.topic} loading="lazy" />

              <div className="intro select-none">
                <div className="title text-gradient">{p.title}</div>
                <div className="topic text-gradient">{p.topic}</div>
                <div className="des">{p.shortDesc}</div>
                <button
                  className="seeMore btn"
                  onClick={() => handleSeeMore(p.id)}
                  aria-expanded={isDetailed === p.id}
                  aria-controls={`detail-${p.id}`}
                >
                  See More
                </button>
              </div>

              <div
                className="detail"
                id={`detail-${p.id}`}
                role="region"
                aria-label={`Details for ${p.title}`}
                hidden={isDetailed !== p.id}
              >
                <div className="dTitle text-gradient">{p.detailTitle}</div>
                <div className="dDes">{p.longDesc}</div>

                <div className="specifics">
                  <div>
                    <p>Used Time</p>
                    <p>{p.specifications.usedTime}</p>
                  </div>
                  <div>
                    <p>Charging Port</p>
                    <p>{p.specifications.chargingPort}</p>
                  </div>
                  <div>
                    <p>Compatibility</p>
                    <p>{p.specifications.compatible}</p>
                  </div>
                  <div>
                    <p>Bluetooth</p>
                    <p>{p.specifications.bluetooth}</p>
                  </div>
                  <div>
                    <p>Controlled</p>
                    <p>{p.specifications.controlled}</p>
                  </div>
                </div>

                <div className="checkout">
                  <button className="btn">ADD TO CART</button>
                  <button className="checkoutBtn btn">CHECKOUT</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {isDetailed ? (
        <button
          id="return"
          className="btn"
          onClick={() => {
            setIsDetailed(null);
            // resetAutoPlay will run inside the isDetailed effect's "close" branch
          }}
          aria-label="Return to carousel"
        >
          Return Back
        </button>
      ) : (
        <div className="arrows">
          <button
            id="prev"
            disabled={disabled}
            onClick={() => slideItems('prev')}
            aria-label="Previous slide"
          >
            <svg
              className="rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M8 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            id="next"
            disabled={disabled}
            onClick={() => slideItems('next')}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M8 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductCarousel;
