import { create } from 'zustand/react';
import { StoreEntity, SeriesEntity } from '@/types/model';

export interface BrandStoreState {
  activeStore: StoreEntity | null;
  setActiveStore: (props: StoreEntity | null) => void;
  activeSeries: SeriesEntity | null;
  setActiveSeries: (props: SeriesEntity | null) => void;
  isVisibleModalSeries: boolean;
  setIsVisibleModalSeries: (props: boolean) => void;
}

export const useBrandStore = create<BrandStoreState>((set) => ({
  activeStore: null,
  activeSeries: null,
  isVisibleModalSeries: false,
  setActiveStore: (props) => set({ activeStore: props }),
  setActiveSeries: (props) => set({ activeSeries: props }),
  setIsVisibleModalSeries: (props) => set({ isVisibleModalSeries: props }),
}));
