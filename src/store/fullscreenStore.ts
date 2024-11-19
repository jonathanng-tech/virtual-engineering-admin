import { create } from 'zustand/react';

interface StateFullScreen {
  showFullScreen: boolean;
}
interface Action {
  setShowFullScreen: (value: boolean) => void;
}

export const fullscreenStore = create<StateFullScreen & Action>((set) => ({
  showFullScreen: false,
  setShowFullScreen: (value) => {
    set({ showFullScreen: value });
  },
}));
