import { Model, ProductEntity, WorldBound } from '@/types/model';

import { CATEGORY, MODEL_POSITION } from '@/configs/constant';
import { productStore } from '@/store';
import { use3DEnvironmentStore } from '@/store/use3DEnviromentStore';
import { useBrandStore } from '@/store/useBrandStore';
import { useDimensionStore } from '@/store/useDimensionStore';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { Environment, OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { delay, isEmpty } from 'lodash';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import * as THREE from 'three';
import ContextMenu from '../layout/components/ContextMenu';
import { Dimension } from './Dimension';
import ErrorGLTFBoundary from './ErrorGLTFBoundary';
import { KitchenModule } from './KitchenModule';
import { use3DScreenshot } from './hooks/use3DScreenshot';
import { useAddModule } from './hooks/useAddModule';
import { useOrbitControl } from './hooks/useOrbitControl';
import { useRemoveModule } from './hooks/useRemoveModule';
import { useMaterial } from './hooks/useMaterial';

export function KitchenWorld({}) {
  const { activeSeries } = useBrandStore();
  const orbitControlRef: any = useRef();
  const canvasRef: any = useRef();
  const kitchenModuleRefs: any = useRef([]);

  const [models, setModels] = useState<Model[]>([]);
  const modelsRef = useRef(models);

  const [kitchenSize, setKitchenSize] = useState<THREE.Vector3>(
    new THREE.Vector3()
  );
  const kitchenSizeRef = useRef(kitchenSize);
  useEffect(() => {
    kitchenSizeRef.current = kitchenSize;
  }, [kitchenSize]);

  const { activeProduct } = productStore();

  const [worldBound, setWorldBound] = useState<WorldBound>({
    xMin: 0,
    xMax: 0,
    yMin: 0,
    yMax: 0,
    zMin: 0,
    zMax: 0,
  });

  // BUG: When using EventEmitter3 in a React component and having trouble accessing the component's state within an event listener
  const worldBoundRef = useRef(worldBound);
  useEffect(() => {
    worldBoundRef.current = worldBound;
  }, [worldBound]);

  const [selectedModule, setSelectedModule] = useState<any>(null);
  const selectedModuleRef = useRef(selectedModule);

  const [greenBoxModule, setGreenBoxModule] = useState<any>(null);

  useEffect(() => {
    if (activeProduct != null && models.length >= 1) {
      delay(() => {
        setGreenBoxModule(renderGreenbox(activeProduct, selectedModule));
      }, 1);
    } else {
      setGreenBoxModule(null);
    }
  }, [activeProduct]);

  useEffect(() => {
    selectedModuleRef.current = selectedModule;
  }, [selectedModule]);

  const { showDimension, setShowDimension } = useDimensionStore();
  const { environmentState } = use3DEnvironmentStore();

  const { fullScreen, handleScreenshot } = use3DScreenshot(
    canvasRef,
    orbitControlRef
  );

  const {
    addRoot,
    addLeft,
    addRight,
    addTop,
    findModuleRefByPosition,
    findBBQModules,
    findRangeHoodModules,
    renderGreenbox,
    leftDirection,
    rightDirection,
  } = useAddModule(kitchenModuleRefs);

  const { changeMaterialForModules } = useMaterial();

  const { removeModule } = useRemoveModule(kitchenModuleRefs);

  const { zoomInOut, moveOrbitToCenter, cameraToFrontView } =
    useOrbitControl(orbitControlRef);

  useEffect(() => {
    if (activeSeries) {
      setSelectedModule(null);
      setModels([]);
    }
  }, [activeSeries]);

  // ComponentDidMount
  useEffect(() => {
    emitter.on(THREE_EVENTS.replaceModule, (payload: any) => {
      const { newModel, oldModel } = payload;

      console.log('Replace module', oldModel, newModel);

      setModels((prevModels) => {
        const index = prevModels.findIndex(
          (model: Model) => model.timestamp === oldModel.timestamp
        );

        prevModels[index] = newModel;

        return prevModels;
      });
    });

    emitter.on(THREE_EVENTS.onModelDidLoad, (payload: any) => {
      onHideContextMenu();
      onModelDidLoad(payload);
    });

    emitter.on(THREE_EVENTS.onModelClicked, (ref: any) => {
      onModelClicked(ref);
    });

    emitter.on(THREE_EVENTS.addLeft, (item: ProductEntity) => {
      onHideContextMenu();

      let model = null;
      if (kitchenModuleRefs.current.length == 0) {
        model = addRoot(item);
      } else {
        model = addLeft(item);
      }

      if (model) setModels((prevModels) => [...prevModels, model]);
    });

    emitter.on(THREE_EVENTS.addRight, (item: ProductEntity) => {
      onHideContextMenu();

      let model = null;
      if (kitchenModuleRefs.current.length == 0) {
        model = addRoot(item);
      } else {
        model = addRight(item);
      }

      if (model) setModels((prevModels) => [...prevModels, model]);
    });

    emitter.on(THREE_EVENTS.addTop, (item: ProductEntity) => {
      let error = null;
      const bBQModules = findBBQModules();

      if (isEmpty(bBQModules)) error = 'Please add a BBQ module first.';

      if (bBQModules.length > 1 && !selectedModuleRef.current)
        error = 'Please select a BBQ module to add Range Hood.';

      if (error) {
        toast.warn(error, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        return;
      }

      const bBQRef = selectedModuleRef.current ?? bBQModules[0];
      if (bBQRef.current.model.relatedModel) {
        toast.warn('This BBQ module already has a Range Hood.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        return;
      }

      const model = addTop(item, bBQRef);

      onHideContextMenu();
      setModels((prevModels) => [...prevModels, model]);
    });

    emitter.on(THREE_EVENTS.changeMaterial, (name: string, texture: string) => {
      changeMaterialForModules(kitchenModuleRefs, name, texture);
    });

    emitter.on(THREE_EVENTS.removeAllModel, () => {
      setModels([]);
    });

    emitter.on(THREE_EVENTS.zoom, (zoomStep: number) => {
      zoomInOut(zoomStep);
    });

    emitter.on(THREE_EVENTS.fullScreen, () => {
      fullScreen();
    });

    emitter.on(THREE_EVENTS.hideContextMenu, () => {
      onHideContextMenu();
    });

    emitter.on(THREE_EVENTS.frontView, () => {
      cameraToFrontView(worldBoundRef.current);
    });

    emitter.on(THREE_EVENTS.screenShot, () => {
      onHideContextMenu();
      setShowDimension(true);
      handleScreenshot(worldBoundRef.current, kitchenSizeRef.current);
    });

    return () => {
      emitter.removeAllListeners();
    };
  }, []);

  // Ensure the refs array matches the number of models
  useEffect(() => {
    modelsRef.current = models;
    kitchenModuleRefs.current = models.map(
      (_, idx) => kitchenModuleRefs.current[idx] || React.createRef()
    );

    if (models.length == 0) {
      _resetWorldState();
    }
  }, [models]);

  useEffect(() => {
    if (selectedModule) {
      selectedModule.current?.setHighlight(true);
    }
  }, [selectedModule]);

  const _resetWorldState = () => {
    setWorldBound({
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0,
      zMin: 0,
      zMax: 0,
    });

    setKitchenSize(new THREE.Vector3());
  };

  const _calculateWorldBound = () => {
    if (kitchenModuleRefs.current.length == 0)
      return {
        xMin: 0,
        xMax: 0,
        yMin: 0,
        yMax: 0,
        zMin: 0,
        zMax: 0,
        hasTopModule: false,
      };

    const left = leftDirection();
    const right = rightDirection();

    let yMax = 0;
    if (kitchenModuleRefs.current.length == 1) {
      yMax = kitchenModuleRefs.current[0].current.size.y;
    } else {
      yMax = kitchenModuleRefs.current
        .map((ref: any) => ref.current.size.y)
        .sort((a: any, b: any) => b - a)[0];
    }

    let sizeZ = kitchenModuleRefs.current[0].current.size.z;

    let zMax = Math.max(
      Math.max(left.position[2], right.position[2]),
      sizeZ / 2
    );

    const xMin = left.hasCorner ? left.position[0] - 0.5 : left.position[0];
    const xMax = right.hasCorner ? right.position[0] + 0.5 : right.position[0];

    const rangehoods = findRangeHoodModules() ?? [];
    return {
      xMin,
      xMax,
      yMin: 0,
      yMax,
      zMin: -sizeZ / 2,
      zMax,
      hasTopModule: rangehoods.length > 0,
    };
  };

  const _calculateDimensionSize = () => {
    if (kitchenModuleRefs.current.length == 0)
      return new THREE.Vector3(0, 0, 0);

    const left = leftDirection();
    const right = rightDirection();

    const models = kitchenModuleRefs.current.map(
      (moduleRef: any) => moduleRef.current?.model
    );

    // Calculate the kitchen size
    const w = models.reduce((total: number, model: any) => {
      const width = [
        THREE_EVENTS.addRoot,
        THREE_EVENTS.addLeft,
        THREE_EVENTS.addRight,
      ].includes(model.action)
        ? model.product.defaultSize.w
        : 0;
      return total + width;
    }, 0);

    const h = models.reduce((total: number, model: any) => {
      const height = model.product.defaultSize?.h
        ? parseFloat(model.product.defaultSize.h)
        : 0;
      return Math.max(total, height);
    }, 0);

    let d = models.reduce((total: number, model: any) => {
      const depth = model.product.defaultSize?.d
        ? parseFloat(model.product.defaultSize.d)
        : 0;
      return Math.max(total, depth);
    }, 0);

    let leftD = 0;
    if (left.hasCorner) {
      leftD =
        models.reduce((total: number, model: Model) => {
          const width =
            model.action == THREE_EVENTS.addLeftFront
              ? model.product.defaultSize.w
              : 0;
          return total + width;
        }, 0) + d;
    }

    let rightD = 0;
    if (right.hasCorner) {
      rightD =
        models.reduce((total: number, model: Model) => {
          const width =
            model.action == THREE_EVENTS.addRightFront
              ? model.product.defaultSize.w
              : 0;
          return total + width;
        }, 0) + d;
    }
    d = Math.max(leftD, rightD, d);

    return new THREE.Vector3(w, h, d);
  };

  const onHideContextMenu = () => {
    setSelectedModule((prev: any) => {
      if (prev) {
        prev.current?.setHighlight(false);
      }
      return null;
    });
  };

  const onModelDidLoad = (payload: any) => {
    if (payload.error) {
      setModels((prevModels) => [...prevModels.slice(0, -1)]);

      toast.warn(payload.error, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

    const { model } = payload;

    delay(() => {
      setWorldBound(_calculateWorldBound());
      setKitchenSize(_calculateDimensionSize());

      delay(() => {
        moveOrbitToCenter(worldBoundRef.current);
      }, 1);

      if (model.action == THREE_EVENTS.addRoot) {
        setShowDimension(true);
      }
    }, 300);

    // Return if just replace by another gltf.
    if (model.loaded) return;
    model.loaded = true;
  };

  const onModelClicked = (modelRef: any) => {
    onHideContextMenu();
    delay(() => {
      setSelectedModule(modelRef);
    }, 1);
  };

  const onRemoveModule = () => {
    if (isEmpty(selectedModule)) return;

    const model = selectedModule.current.model as Model;

    const leftModuleRef = findModuleRefByPosition(MODEL_POSITION.L);
    if (!leftModuleRef) return;

    let direction: string = '';

    if (model.product.categoryId === CATEGORY.RANGE_HOOD) {
      direction = MODEL_POSITION.T;
    } else if (leftModuleRef?.current) {
      const leftModel = leftModuleRef.current.model as Model;
      if (leftModel.timestamp == model.timestamp) {
        direction = MODEL_POSITION.L;
      } else {
        direction = MODEL_POSITION.R;
      }
    }

    removeModule(selectedModule, setModels);

    delay(() => {
      emitter.emit(THREE_EVENTS.onModelDidRemove, {
        models: modelsRef.current,
      });
      setWorldBound(_calculateWorldBound());
      setKitchenSize(_calculateDimensionSize());
      onHideContextMenu();

      delay(() => {
        moveOrbitToCenter(worldBoundRef.current);
      }, 1);
    }, 100);
  };

  const isRemovable = (): boolean => {
    if (isEmpty(selectedModule?.current) || isEmpty(kitchenModuleRefs.current))
      return false;

    const leftModuleRef = findModuleRefByPosition(MODEL_POSITION.L);
    if (!leftModuleRef) return false;

    const leftModel = leftModuleRef?.current.model as Model;
    const rightModuleRef = findModuleRefByPosition(MODEL_POSITION.R);
    const rightModel = rightModuleRef?.current.model as Model;

    const model = selectedModule.current.model as Model;
    if (model.product.categoryId === CATEGORY.RANGE_HOOD) return true;

    if (
      leftModel?.timestamp === model.timestamp ||
      rightModel?.timestamp == model.timestamp
    )
      return true;

    return false;
  };

  return (
    <>
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 30,
          near: 0.1,
          far: 10000,
          position: [0, 0, 15],
        }}
        ref={canvasRef}
        style={{ backgroundColor: '#f5f5f5', width: '100%', cursor: 'pointer' }}
        onClick={onHideContextMenu}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[0, 5, -2]}
          castShadow
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Stage environment={environmentState}>
          {/* <primitive object={new THREE.AxesHelper(5)} /> */}
          <group position={[0, 0, 0]}>
            {models.map((_model: Model, idx: number) => (
              <Suspense key={'suspense_' + _model.timestamp} fallback={null}>
                <ErrorGLTFBoundary>
                  <KitchenModule
                    ref={kitchenModuleRefs.current[idx]}
                    key={'KitchenModel_' + _model.timestamp}
                    model={_model}
                  />
                </ErrorGLTFBoundary>
              </Suspense>
            ))}
          </group>
          {greenBoxModule}
          {showDimension && models.length > 0 && (
            <Dimension bound={worldBound} size={kitchenSize} color="red" />
          )}
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2 + 0.003, 0, 0]}
            position={[0, 0, 0]}
          >
            <planeGeometry args={[7, 7]} />
            <shadowMaterial opacity={0.5} />
          </mesh>
        </Stage>
        <OrbitControls
          ref={orbitControlRef}
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 - 0.001}
          // minAzimuthAngle={-Math.PI / 3}
          // maxAzimuthAngle={Math.PI / 3}
          minDistance={Math.max(kitchenSize.x * 0.0001, 3.5)}
          maxDistance={5}
        />
        <Environment preset={environmentState} blur={1} />
      </Canvas>
      {selectedModule && (
        <ContextMenu
          removeModelFn={isRemovable() ? onRemoveModule : undefined}
          kitchenModelRef={selectedModule}
        />
      )}
    </>
  );
}
