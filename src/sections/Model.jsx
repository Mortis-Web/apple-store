import { useGSAP } from '@gsap/react';
import { View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ModelView from '../components/ModelView';
import { yellowImg } from '../utils';
import { animateWithGsap } from '../utils/animations';
import { models, sizes } from './../constants/index';
import useInView from './../hooks/useInView';



const Model = () => {
  const [ref, isInView] = useInView();

  //  initial model
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  });

  //   size control
  const [size, setSize] = useState('small');

  // camera control
  const cameraControlSmall = useRef(null);
  const cameraControlLarge = useRef(null);

  // model control
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //   rotation control
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeline = gsap.timeline(); // recreate on each change

    if (size === 'large') {
      animateWithGsap(
        timeline,
        small,
        smallRotation,
        '#view1',
        '#view2',
        'left'
      );
    } else if (size === 'small') {
      animateWithGsap(
        timeline,
        large,
        largeRotation,
        '#view2',
        '#view1',
        'right'
      );
    }

    return () => {
      timeline.kill(); // cleanup old timeline
    };
  }, [size]); // include rotation states

  useGSAP(() => {
    if (!isInView) return;
    gsap.to('#heading', {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power1.inOut',
    });
  }, [isInView]);
  return (
    <section ref={ref} className="common-padding overflow-hidden">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading text-gradient">
          Take A Closer Look.
        </h1>
        <div className="mt-5 flex flex-col items-center">
          <figure className="relative h-[50vh] w-full overflow-hidden md:h-[75vh]">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotation={setSmallRotation}
              model={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotation={setLargeRotation}
              model={model}
              size={size}
            />
            <Canvas
              className="size-full"
              style={{
                position: 'fixed',
                inset: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </figure>

          <div className="mx-auto w-full">
            <p className="mb-5 text-center text-gradient text-sm font-medium">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, index) => (
                  <li
                    key={index}
                    className="mx-2 h-6 w-6 cursor-pointer rounded-full"
                    style={{ background: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              <button type="button" className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn cursor-pointer"
                    style={{
                      background: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
