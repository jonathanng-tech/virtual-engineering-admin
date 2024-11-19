import { CATEGORY, STYLE } from '@/configs/constant';
import { create } from 'zustand/react';

export interface DrawerState {
  openDrawer: boolean;
  openModalProduct: boolean;
  setShowHideModal: (status: boolean) => void;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  openHandleDrawer: () => void;
  activeTab: number;
  changeActiveTab: (item: number) => void;
  activeTypeProduct: string;
  changeTypeProduct: (item: string) => void;
  activeTypeStyle: string;
  changeTypeStyle: (item: string) => void;
  viewType: string;
  changeViewType: (type: string) => void;
  openDrawerMobile: 'STYLE' | 'PRODUCT' | '';
  setOpenDrawerMobile: (value: 'STYLE' | 'PRODUCT' | '') => void;
}

export const drawerStore = create<DrawerState>((set) => ({
  openDrawerMobile: 'PRODUCT',
  setOpenDrawerMobile: (value) =>
    set((state) => {
      return {
        openDrawerMobile: state.openDrawerMobile === value ? '' : value,
      };
    }),
  openModalProduct: false,
  setShowHideModal: (status) => set({ openModalProduct: status }),
  openDrawer: true,
  toggleDrawer: () => {
    set((state) => {
      return {
        openDrawer: !state.openDrawer,
      };
    });
    set((state) => {
      return {
        activeTab: state.openDrawer == false ? 0 : state.activeTab,
      };
    });
  },
  closeDrawer: () => {
    set((state) => {
      return {
        openDrawer: false,
      };
    });
  },
  openHandleDrawer: () => {
    set((state) => {
      return {
        openDrawer: true,
      };
    });
  },

  activeTab: 0, // 0 default //1 products //2 colors style
  changeActiveTab: (item: number) => {
    set({ activeTab: item });
  },

  activeTypeProduct: CATEGORY.BBQ,
  changeTypeProduct: (item: string) => {
    set({ activeTypeProduct: item });
  },

  activeTypeStyle: STYLE.CABINET,
  changeTypeStyle: (item: string) => {
    set({ activeTypeStyle: item });
  },

  viewType: 'grid',
  changeViewType: (type: string) => {
    set({ viewType: type });
  },
}));
