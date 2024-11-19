import { productStore } from '@/store';
import { Model } from '@/types/model';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { useAnimations, useGLTF } from '@react-three/drei';
import { delay } from 'lodash';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import * as THREE from 'three';
import { useMaterial } from './hooks/useMaterial';

interface KitchenModuleProps {
  model: Model;
}

export const KitchenModule = forwardRef(
  ({ model }: KitchenModuleProps, ref) => {
    const { scene, animations } = useGLTF(model.path);
    const { actions, mixer } = useAnimations(animations, scene);

    const [animationOpened, setAnimationOpened] = useState(false);
    const [showBackSplash, setShowBackSplash] = useState(false);
    const { cabinetColor, benchtopColor } = productStore();

    const [highlight, setHighlight] = useState(null);
    const [size, setSize] = useState({ x: 0, y: 0, z: 0 });

    const { highlightScene, changeMaterialForScene } = useMaterial();

    // Expose methods, props to parent component
    useImperativeHandle(ref, () => ({
      showHideBackSplash,
      model,
      scene,
      // animations,
      animationOpened,
      showBackSplash,
      position,
      rotation,
      setHighlight,
      size,
    }));

    const [position, setPosition] = useState<[number, number, number]>([
      0, 0, 0,
    ]);

    const [rotation, setRotation] = useState<[number, number, number]>([
      0, 0, 0,
    ]);

    useEffect(() => {
      if (!scene || highlight == null) return;

      highlightScene(scene, highlight);
    }, [highlight]);

    // scene is loaded
    useEffect(() => {
      if (!scene) return;

      // Create a bounding box around the scene
      const size = new THREE.Box3()
        .setFromObject(scene)
        .getSize(new THREE.Vector3());
      setSize(size);

      // Add root
      if (model.action === THREE_EVENTS.addRoot) {
        setPosition([0, 0, 0]);
      } else if (model.action === THREE_EVENTS.addLeft) {
        setPosition([model.position[0] - size.x / 2, 0, 0]);
      } else if (model.action === THREE_EVENTS.addRight) {
        setPosition([model.position[0] + size.x / 2, 0, 0]);
      } else if (model.action === THREE_EVENTS.addTop) {
        setPosition(model.position);

        const bbqModel = model.relatedModel as Model;
        if (bbqModel.action == THREE_EVENTS.addLeftFront) {
          setRotation([0, Math.PI / 2, 0]);
        } else if (bbqModel.action == THREE_EVENTS.addRightFront) {
          setRotation([0, -Math.PI / 2, 0]);
        }
      } else if (model.action === THREE_EVENTS.addLeftFront) {
        setPosition([
          model.position[0],
          model.position[1],
          model.position[2] + size.x / 2,
        ]);
        setRotation([0, Math.PI / 2, 0]);
      } else if (model.action === THREE_EVENTS.addRightFront) {
        setPosition([
          model.position[0],
          model.position[1],
          model.position[2] + size.x / 2,
        ]);
        setRotation([0, -Math.PI / 2, 0]);
      }

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      if (benchtopColor) {
        changeMaterialForScene(
          scene,
          benchtopColor.type.toLowerCase(),
          `${import.meta.env.VITE_S3_URL}/${benchtopColor?.path}`
        );
      }

      // load current style
      if (cabinetColor) {
        changeMaterialForScene(
          scene,
          cabinetColor.type.toLowerCase(),
          `${import.meta.env.VITE_S3_URL}/${cabinetColor?.path}`
        );
      }

      emitter.emit(THREE_EVENTS.onModelDidLoad, { scene, model });
    }, [scene]);

    const showHideBackSplash = () => {
      setShowBackSplash((prev) => !prev);
    };

    const onClicked = () => {
      emitter.emit(THREE_EVENTS.onModelClicked, ref);
    };

    return (
      <group>
        {scene && (
          <primitive
            object={scene}
            scale={1.5}
            position={position}
            rotation={rotation}
            onClick={() => {
              delay(() => {
                onClicked();
              }, 0);
            }}
          />
        )}
      </group>
    );
  }
);
