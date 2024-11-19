import { Vector3 } from 'three';
import { create } from 'zustand/react';

interface DimensionState {
  showDimension: boolean;
  totalDimension: Vector3;
}
interface Action {
  setShowDimension: (value: boolean) => void;
  setTotalDimension: (totalDimension: Vector3) => void;
}

export const useDimensionStore = create<DimensionState & Action>((set) => ({
  showDimension: false,
  setShowDimension: (value) => {
    set({ showDimension: value });
  },
  totalDimension: new Vector3(),
  setTotalDimension: (totalDimension) => {
    set({ totalDimension });
  },
}));
