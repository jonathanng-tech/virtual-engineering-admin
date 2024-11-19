import { CATEGORY, MODEL_POSITION, MODULE_TYPE } from '@/configs/constant';
import { Model, ProductEntity, WorldBound } from '@/types/model';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { buildGlftPath } from '@/utils/helper';
import { Bounce, toast } from 'react-toastify';
import { Box, BOX_SIZE } from '../Box';
import { isEmpty } from 'lodash';

export const useAddModule = (
  kitchenModuleRefs: React.MutableRefObject<never[]>
) => {
  const addRoot = (item: ProductEntity) => {
    if ([CATEGORY.CORNER, CATEGORY.RANGE_HOOD].includes(item.categoryId)) {
      toast.warn('This module cannot be a root module.', {
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
      return null;
    }

    const newModel: Model = {
      product: item,
      path: buildGlftPath(item.path),
      action: THREE_EVENTS.addRoot,
      position: [0, 0, 0],
      timestamp: Date.now(),
    };

    return newModel;
  };

  const addLeft = (item: ProductEntity) => {
    const leftModuleRef = findModuleRefByPosition(MODEL_POSITION.L) as any;
    if (!leftModuleRef) return null;

    const leftModule = leftModuleRef.current;
    const leftModel = leftModule.model as Model;

    if (item.categoryId === CATEGORY.CORNER) {
      const error = invalidateCornerModule(item, leftModel);
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
        return null;
      }
    }

    // Check if the last left module is dynamic, replace it by middle module
    if (item.moduleType != MODULE_TYPE.SINGLE) {
      if (leftModel.product.moduleType == MODULE_TYPE.DYNAMIC) {
        const newModel: Model = {
          ...leftModel,
          path: buildGlftPath(leftModel.product.path),
          timestamp: Date.now(),
        };

        emitter.emit(THREE_EVENTS.replaceModule, {
          newModel,
          oldModel: leftModel,
        });
      }
    }

    let gltfPath = item.path;
    if (item.moduleType == MODULE_TYPE.DYNAMIC) {
      gltfPath = `${item.path}_left`;
    }

    const { action, position } = leftDirection();
    if (!action) return null;

    const newModel: Model = {
      product: item,
      path: buildGlftPath(gltfPath),
      action: action,
      position: position as [number, number, number],
      timestamp: Date.now(),
    };

    return newModel;
  };

  const addRight = (item: ProductEntity) => {
    const rightModuleRef = findModuleRefByPosition(MODEL_POSITION.R) as any;
    if (!rightModuleRef) return null;

    const rightModule = rightModuleRef.current;
    const rightModel = rightModule.model as Model;

    if (item.categoryId === CATEGORY.CORNER) {
      const error = invalidateCornerModule(item, rightModel);
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
        return null;
      }
    }

    // Check if the last right module is dynamic, replace it by middle module
    if (item.moduleType != MODULE_TYPE.SINGLE) {
      if (rightModel.product.moduleType == MODULE_TYPE.DYNAMIC) {
        //TODO replace module right by module middle
        console.log('Replace the current last right module by middle');
        const newModel: Model = {
          ...rightModel,
          path: buildGlftPath(rightModel.product.path),
          timestamp: Date.now(),
        };

        emitter.emit(THREE_EVENTS.replaceModule, {
          newModel,
          oldModel: rightModel,
        });
      }
    }

    let gltfPath = item.path;
    if (item.moduleType == MODULE_TYPE.DYNAMIC) {
      gltfPath = `${item.path}_right`;
    }

    const { action, position } = rightDirection();
    if (!action) return null;

    const newModel: Model = {
      product: item,
      path: buildGlftPath(gltfPath),
      action: action,
      position: position as [number, number, number],
      timestamp: Date.now(),
    };

    return newModel;
  };

  const addTop = (item: ProductEntity, bbqModuleRef: any) => {
    const newModel: Model = {
      product: item,
      path: buildGlftPath(item.path!),

      action: THREE_EVENTS.addTop,
      position: bbqModuleRef.current.position,
      relatedModel: bbqModuleRef.current.model,
      timestamp: Date.now(),
    };

    bbqModuleRef.current.model.relatedModel = newModel;

    return newModel;
  };

  const findModuleRefByPosition = (position: string) => {
    if (kitchenModuleRefs.current.length == 0) return null;

    try {
      const refs = kitchenModuleRefs.current.filter(
        (ref: any) =>
          ref.current.model.product.categoryId !== CATEGORY.RANGE_HOOD
      );

      if (refs.length == 1) return refs[0];

      const leftRefs = kitchenModuleRefs.current.filter(
        (ref: any) =>
          ref.current.model.action.includes(THREE_EVENTS.addLeft) ||
          ref.current.model.action == THREE_EVENTS.addRoot
      );
      if (leftRefs.length >= 2) {
        leftRefs.sort(
          (a: any, b: any) =>
            a.current.model.timestamp - b.current.model.timestamp
        );
      }
      const rightRefs = kitchenModuleRefs.current.filter(
        (ref: any) =>
          ref.current.model.action.includes(THREE_EVENTS.addRight) ||
          ref.current.model.action == THREE_EVENTS.addRoot
      );
      if (rightRefs.length >= 2) {
        rightRefs.sort(
          (a: any, b: any) =>
            a.current.model.timestamp - b.current.model.timestamp
        );
      }

      if (position == MODEL_POSITION.L) {
        if (leftRefs.length >= 1) {
          return leftRefs[leftRefs.length - 1];
        } else {
          return rightRefs[0];
        }
      }

      if (position == MODEL_POSITION.R) {
        if (rightRefs.length >= 1) {
          return rightRefs[rightRefs.length - 1];
        } else {
          return leftRefs[0];
        }
      }
    } catch (error) {
      return null;
    }

    return null;
  };

  const findRangeHoodModules = () => {
    return kitchenModuleRefs.current.filter(
      (ref: any) =>
        ref.current &&
        ref.current.model.product.categoryId === CATEGORY.RANGE_HOOD
    );
  };

  const findBBQModules = () => {
    return kitchenModuleRefs.current.filter(
      (ref: any) =>
        ref.current && ref.current.model.product.categoryId === CATEGORY.BBQ
    );
  };

  // THREE bug: Need to clone the scene of the model if it's already loaded
  // const cloneScene = (models: Model[], model: Model, index: number) => {
  //   const findIdx = models.findIndex((m: any) => m.path === model.path);
  //   if (findIdx == index) return null;

  //   if (kitchenModuleRefs.current[findIdx]) {
  //     return kitchenModuleRefs.current[findIdx].current?.scene.clone(true);
  //   }

  //   return null;
  // };

  const invalidateCornerModule = (
    cornerItem: ProductEntity,
    lastModel?: Model
  ) => {
    const posText = cornerItem.position === MODEL_POSITION.L ? 'Left' : 'Right';
    const errorMultipleCorner = `Multiple ${posText} Corner modules are not supported.`;

    if (lastModel?.product?.categoryId === CATEGORY.CORNER) {
      return errorMultipleCorner;
    }

    const cornerModules = kitchenModuleRefs.current.filter(
      (ref: any) =>
        ref?.current && ref.current.model.product.categoryId === CATEGORY.CORNER
    );

    if (!isEmpty(cornerModules)) {
      if (cornerModules.length > 1) {
        return errorMultipleCorner;
      }

      const item = cornerModules[0].current.model.product;
      if (item.position === cornerItem.position) {
        return errorMultipleCorner;
      }
    }

    return null;
  };

  const rightDirection = () => {
    if (kitchenModuleRefs.current.length == 0)
      return {
        action: THREE_EVENTS.addRoot,
        position: [0, 0, 0],
      };

    const rightModuleRef = findModuleRefByPosition(MODEL_POSITION.R) as any;
    if (!rightModuleRef) return {};

    const rightModule = rightModuleRef.current;
    const rightModel = rightModule.model as Model;
    const rightPosition = rightModule.position;
    const size = rightModule.size.clone();

    if (rightModel.product.categoryId === CATEGORY.CORNER) {
      size.z += 0.05;

      const maxZ = rightPosition[2] + size.z / 2;
      return {
        hasCorner: true,
        action: THREE_EVENTS.addRightFront,
        position: [rightPosition[0] + 0.03, rightPosition[1], maxZ],
      };
    }

    if (rightModel.action === THREE_EVENTS.addRightFront) {
      const maxZ = rightPosition[2] + size.x / 2;
      return {
        hasCorner: true,
        action: THREE_EVENTS.addRightFront,
        position: [rightPosition[0], rightPosition[1], maxZ],
      };
    }

    const rightX = rightPosition[0] + size.x / 2;
    return {
      action: THREE_EVENTS.addRight,
      position: [rightX, rightPosition[1], rightPosition[2]],
    };
  };

  const leftDirection = () => {
    if (kitchenModuleRefs.current.length == 0)
      return {
        action: THREE_EVENTS.addRoot,
        position: [0, 0, 0],
      };

    const leftModuleRef = findModuleRefByPosition(MODEL_POSITION.L) as any;
    if (!leftModuleRef) return {};

    const leftModule = leftModuleRef.current;
    const leftModel = leftModule.model as Model;
    const leftPosition = leftModule.position;
    const size = leftModule.size.clone();

    // Hot-fix: CORNER model issue, Increase the size of the corner module
    if (leftModel.product.categoryId === CATEGORY.CORNER) {
      size.z += 0.05;
      size.x += 0.04;
      const maxZ = leftPosition[2] + size.z / 2;
      return {
        hasCorner: true,
        action: THREE_EVENTS.addLeftFront,
        position: [leftPosition[0] - 0.03, leftPosition[1], maxZ],
      };
    }

    if (leftModel.action === THREE_EVENTS.addLeftFront) {
      const maxZ = leftPosition[2] + size.x / 2;
      return {
        hasCorner: true,
        action: THREE_EVENTS.addLeftFront,
        position: [leftPosition[0], leftPosition[1], maxZ],
      };
    }

    const leftX = leftPosition[0] - size.x / 2;
    return {
      action: THREE_EVENTS.addLeft,
      position: [leftX, leftPosition[1], leftPosition[2]],
    };
  };

  const renderGreenbox = (
    activeProduct: ProductEntity,
    selectedModule: any
  ) => {
    if (kitchenModuleRefs.current.length == 0) return null;

    const left = leftDirection();
    if (!left.action) return null;

    const leftPosition =
      left.action == THREE_EVENTS.addLeft
        ? [
            left.position[0] - BOX_SIZE[0] / 2,
            BOX_SIZE[1] / 2,
            left.position[2],
          ]
        : [
            left.position[0],
            BOX_SIZE[1] / 2,
            left.position[2] + BOX_SIZE[2] / 2,
          ];

    const right = rightDirection();
    if (!right.action) return null;

    const rightPosition =
      right.action == THREE_EVENTS.addRight
        ? [
            right.position[0] + BOX_SIZE[0] / 2,
            BOX_SIZE[1] / 2,
            right.position[2],
          ]
        : [
            right.position[0],
            BOX_SIZE[1] / 2,
            right.position[2] + BOX_SIZE[2] / 2,
          ];

    if (activeProduct.position === MODEL_POSITION.LR) {
      return (
        <>
          <Box position={leftPosition as [number, number, number]} />
          <Box position={rightPosition as [number, number, number]} />
        </>
      );
    } else if (activeProduct.position === MODEL_POSITION.L) {
      return <Box position={leftPosition as [number, number, number]} />;
    } else if (activeProduct.position === MODEL_POSITION.R) {
      return <Box position={rightPosition as [number, number, number]} />;
    } else if (activeProduct.position === MODEL_POSITION.T) {
      const bBQModules = findBBQModules();
      if (bBQModules.length == 0) return null;

      let bBQRef;
      if (bBQModules.length == 1) {
        bBQRef = bBQModules[0];
      } else {
        bBQRef = selectedModule;
      }
      if (bBQRef) {
        if (bBQRef.current.model.relatedModel) {
          return null;
        }
        return (
          <Box
            position={[
              bBQRef.current.position[0],
              3.6,
              bBQRef.current.position[2],
            ]}
          />
        );
      }
    }

    return null; // Ensure a return value for all code paths
  };

  return {
    addRoot,
    addLeft,
    addRight,
    addTop,
    findModuleRefByPosition,
    findBBQModules,
    findRangeHoodModules,
    leftDirection,
    rightDirection,
    renderGreenbox,
  };
};
