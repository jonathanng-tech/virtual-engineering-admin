import { WorldBound } from '@/types/model';
import { Line, Text } from '@react-three/drei';
import React from 'react';
import { Vector3, ArrowHelper } from 'three';

interface AxisProps {
  start: Vector3;
  end: Vector3;
  label?: string;
}

export interface DimensionProps {
  bound: WorldBound;
  size: Vector3;
  color?: string;
}

const addMarginToStartPoint = (
  start: Vector3,
  end: Vector3,
  margin: number
) => {
  const direction = new Vector3().subVectors(end, start).normalize();
  const offsetStart = new Vector3().addVectors(
    start,
    direction.clone().multiplyScalar(margin)
  );

  return { offsetStart };
};

export const Dimension: React.FC<DimensionProps> = ({
  bound,
  size,
  color = 'red',
}) => {
  const SPACE = 0.1;

  const x: AxisProps = {
    start: new Vector3(bound.xMin, 0, bound.zMax + SPACE),
    end: new Vector3(bound.xMax, 0, bound.zMax + SPACE),
    label: `${size.x}mm`,
  };

  const y: AxisProps = {
    start: new Vector3(bound.xMin - SPACE, 0, bound.zMax + SPACE),
    end: new Vector3(bound.xMin - SPACE, bound.yMax, bound.zMax + SPACE),
    label: `${size.y}mm`,
  };

  const z: AxisProps = {
    start: new Vector3(bound.xMax + SPACE, 0, bound.zMin),
    end: new Vector3(bound.xMax + SPACE, 0, bound.zMax),
    label: `${size.z}mm`,
  };

  const midPoint = (start: Vector3, end: Vector3) =>
    new Vector3().lerpVectors(start, end, 0.5);

  const renderArrow = (start: Vector3, end: Vector3, margin: number) => {
    const direction = new Vector3().subVectors(end, start).normalize();
    const totalLength = start.distanceTo(end);

    const startOffset = new Vector3().addVectors(
      start,
      direction.clone().multiplyScalar(margin)
    );
    const endOffset = new Vector3().addVectors(
      end,
      direction.clone().multiplyScalar(-margin)
    );

    const arrowHeadLength = 0.05;
    const arrowHeadWidth = 0.05;

    const startArrow = new ArrowHelper(
      direction,
      startOffset,
      startOffset.distanceTo(end),
      color,
      arrowHeadLength,
      arrowHeadWidth
    );

    const endArrow = new ArrowHelper(
      direction.clone().negate(),
      endOffset,
      startOffset.distanceTo(end),
      color,
      arrowHeadLength,
      arrowHeadWidth
    );

    return (
      <>
        <primitive object={startArrow} />
        <primitive object={endArrow} />
      </>
    );
  };

  const renderLabelWithBackground = (
    label: string,
    position: Vector3,
    backgroundColor: string = 'white',
    textColor: string = 'black'
  ) => (
    <group position={[position.x, position.y, position.z]}>
      {/* Background Plane */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[0.7, 0.2]} />
        <meshBasicMaterial color={backgroundColor} opacity={1} transparent />
      </mesh>

      {/* Text Label */}
      <Text color={textColor} fontSize={0.15} anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
  const xPos = midPoint(x.start, x.end);
  xPos.y += 0.1;
  const yPos = midPoint(y.start, y.end);
  yPos.z += 0.1;
  const zPos = midPoint(z.start, z.end);
  zPos.y += 0.1;
  zPos.x += 0.3;

  return (
    <group>
      {/* X Dimension */}
      {x && (
        <>
          {renderArrow(x.start, x.end, 0.1)}
          {x.label && renderLabelWithBackground(x.label, xPos)}
        </>
      )}

      {/* Y Dimension */}
      {y && (
        <>
          {renderArrow(y.start, y.end, 0.1)}
          {y.label && renderLabelWithBackground(y.label, yPos)}
        </>
      )}

      {/* Z Dimension */}
      {z && (
        <>
          {renderArrow(z.start, z.end, 0.1)}
          {z.label && renderLabelWithBackground(z.label, zPos)}
        </>
      )}
    </group>
  );
};
