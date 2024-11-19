import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StateShowGuideLine {
  showOnce: boolean;
  showGuideLine: boolean;
  showOnceModels: boolean;
  showGuideLineModels: boolean;
}
interface Action {
  setShowGuideLine: (value: boolean) => void;
  setShowOne: (value: boolean) => void;
  setShowGuideLineModels: (value: boolean) => void;
  setShowOneModels: (value: boolean) => void;
}

export const GuideLineStore = create<StateShowGuideLine & Action>()(
  persist(
    (set) => ({
      showGuideLine: false,
      showOnce: false,
      setShowGuideLine: (value) => set({ showGuideLine: value }),
      setShowOne: (value) => set({ showOnce: value }),
      // models 3d
      showGuideLineModels: false,
      showOnceModels: false,
      setShowGuideLineModels: (value) => set({ showGuideLineModels: value }),
      setShowOneModels: (value) => set({ showOnceModels: value }),
    }),
    {
      name: 'guide-line-storage',
    }
  )
);
