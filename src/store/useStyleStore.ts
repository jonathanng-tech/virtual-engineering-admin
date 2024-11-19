import { create } from 'zustand/react';
import { StyleEntity } from '@/types/model';
import { getListStyle } from '@/services';

export interface StyleStoreState {
  isLoading: boolean;
  dataStyleTypes: string[] | null;
  dataStyle: StyleEntity[] | null;
  setDataStyle: (dataStyle: StyleEntity[] | null) => void;
  fetchStyles: (tenantId: string) => Promise<void>;
}

const extractUniqueStyles = (data: StyleEntity[] = []) => [
  ...new Set(data.map((s) => s.type as string)),
];

export const useStyleStore = create<StyleStoreState>((set) => ({
  isLoading: false,
  dataStyle: [],
  dataStyleTypes: [],
  setDataStyle: (state) => set({ dataStyle: state }),
  fetchStyles: async (tenantId: string) => {
    set({ isLoading: true });
    const data = await getListStyle(tenantId);
    set({
      dataStyle: data,
      dataStyleTypes: extractUniqueStyles(data ?? []),
      isLoading: false,
    });
  },
}));
