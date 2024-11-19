import { create } from 'zustand/react';

interface StatePDF {
  blobUrl: string;
}
interface Action {
  setBlobUrl: (blobUrl: StatePDF['blobUrl']) => void;
}

export const UsePDF = create<StatePDF & Action>((set) => ({
  blobUrl: '',
  setBlobUrl: (blobUrl) => {
    set(() => ({ blobUrl }));
  },
}));
