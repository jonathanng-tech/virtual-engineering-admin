import { CATEGORY, MODEL_POSITION, MODULE_TYPE } from '@/configs/constant';
import { Model, WorldBound } from '@/types/model';

import { delay, isEmpty } from 'lodash';
import { useAddModule } from './useAddModule';
import { buildGlftPath } from '@/utils/helper';
import { emitter, THREE_EVENTS } from '@/utils/events';

export const useRemoveModule = (
  kitchenModuleRefs: React.MutableRefObject<never[]>
) => {
  const { findModuleRefByPosition } = useAddModule(kitchenModuleRefs);

  const removeModule = (
    selectedModule: any,
    setModels: React.Dispatch<React.SetStateAction<Model[]>>
  ) => {
    if (!selectedModule) return;

    const selectedModel = selectedModule.current.model as Model;

    if (selectedModel.product.categoryId == CATEGORY.RANGE_HOOD) {
      // Remove Range Hood => Reset BBQ.relatedKitchenModelRef to null

      const bbqModel = selectedModel.relatedModel as Model;
      bbqModel.relatedModel = null;
    }

    // Check BBQ model has related Range Hood, remove it as well.
    let rangeHoodModel: Model | null = null;
    if (
      selectedModel.product.categoryId === CATEGORY.BBQ &&
      selectedModel.relatedModel != null
    ) {
      rangeHoodModel = selectedModel.relatedModel;
    }

    setModels((prevModels) => {
      const updatedModels = prevModels.filter(
        (item) =>
          item.timestamp !== selectedModel.timestamp &&
          item.timestamp !== rangeHoodModel?.timestamp
      );
      return updatedModels;
    });

    // if (selectedModel.product.moduleType != MODULE_TYPE.SINGLE) {
    //   if ([MODEL_POSITION.L, MODEL_POSITION.R].includes(direction)) {
    //     // Delay to make sure the model is removed completely before replacing
    //     delay(() => {
    //       _replaceLastModuleByMiddle(direction);
    //     }, 100);
    //   }
    // }
  };

  const _replaceLastModuleByMiddle = (position: string) => {
    const lastModuleRef = findModuleRefByPosition(position) as any;
    if (!lastModuleRef) return;

    const model = lastModuleRef.current.model as Model;

    if (model.product.moduleType == MODULE_TYPE.DYNAMIC) {
      const newModel: Model = {
        ...model,
        path: buildGlftPath(
          model.product.path +
            (position == MODEL_POSITION.L ? '_left' : '_right')
        ),
        timestamp: Date.now(),
      };

      emitter.emit(THREE_EVENTS.replaceModule, {
        newModel,
        oldModel: model,
      });
    }
  };

  return { removeModule };
};
