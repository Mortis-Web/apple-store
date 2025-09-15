import { OrbitControls, View } from '@react-three/drei';

import { useGLTF, useTexture } from '@react-three/drei';
import { Suspense, lazy, useMemo } from 'react';
import * as THREE from 'three';
import { models } from '../constants';
import CanvasLoader from './CanvasLoader';
import ColorLoader from './ColorLoader';
import Lights from './Lights';

// Preload once at app start
useGLTF.preload(`${import.meta.env.BASE_URL}models/scene.glb`);
useTexture.preload(`${import.meta.env.BASE_URL}assets/images/poster.webp`);

// ✅ preload all textures at module scope
models.forEach(item => {
  useTexture.preload(`${import.meta.env.BASE_URL}${item.img}`);
});
// ✅ Lazy import
const PhoneModel = lazy(() => import('./PhoneModel'));

const ModelView = ({
  index,
  groupRef,
  controlRef,
  gsapType,
  setRotation,
  size,
  model,
}) => {
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  return (
    <Suspense fallback={<CanvasLoader />}>
      <View
        index={index}
        id={gsapType}
        className={`absolute left-0 size-full ${index === 1 ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ambientLight intensity={0.3} />
        <perspectiveCamera makeDefault position={[0, 0, 4]} />
        <Lights />
        <OrbitControls
          makeDefault
          ref={controlRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          target={target}
          onEnd={() => setRotation(controlRef.current.getAzimuthalAngle())}
        />
        <group
          ref={groupRef}
          name={index === 1 ? 'small' : 'large'}
          position={[0, 0, 0]}
        >
          <ColorLoader />
          <PhoneModel
            scale={index === 1 ? [32, 32, 32] : [38, 38, 38]}
            model={model}
          />
        </group>
      </View>
    </Suspense>
  );
};

export default ModelView;
