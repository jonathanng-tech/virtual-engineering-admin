import React from 'react';
import { MeshProps } from '@react-three/fiber';

export const BOX_SIZE = [
  1.117744356393814, 1.42608243227005, 1.117744356393814,
];

export const Box: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props}>
      {/* The BoxGeometry creates a box of 1x1x1 size */}

      <boxGeometry args={BOX_SIZE} />
      {/* Basic material for the box */}
      <meshStandardMaterial color="green" transparent opacity={0.4} />
    </mesh>
  );
};
