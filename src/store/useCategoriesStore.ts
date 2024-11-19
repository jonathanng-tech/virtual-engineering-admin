import { create } from 'zustand/react';
import { CategoryEntity } from '@/types/model';
import { getListCategory } from '@/services';

export interface StyleStoreState {
  isLoading: boolean;
  dataCategories: CategoryEntity[] | null;
  setDataCategories: (dataStyle: CategoryEntity[] | null) => void;
  fetchCategories: (tenantId: string) => Promise<void>;
}

export const useCategoriesStore = create<StyleStoreState>((set) => ({
  isLoading: false,
  dataCategories: [],
  setDataCategories: (state) => set({ dataCategories: state }),
  fetchCategories: async (tenantId: string) => {
    set({ isLoading: true });
    const data = await getListCategory(tenantId);
    set({
      dataCategories: data,
      isLoading: false,
    });
  },
}));
