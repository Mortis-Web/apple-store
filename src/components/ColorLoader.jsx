import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { models } from '../constants';

const ColorLoader = () => {
  useLoader(
    TextureLoader,
    models.map(item => item.img)
  );
  return null;
};

export default ColorLoader;
