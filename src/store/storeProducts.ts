import { CATEGORY, DEFAULT_SORT_TYPE } from '@/configs/constant';
import { getProducts } from '@/services';
import { ProductEntity, StyleEntity } from '@/types/model';

import { create } from 'zustand/react';

export interface ProductState {
  openDrawerMobile: 'STYLE' | 'PRODUCT' | '';
  isLoadingFetchProduct: boolean;
  isLoading: boolean;
  search: string;
  cabinetColor: StyleEntity | null;
  benchtopColor: StyleEntity | null;
  categoryId: string;
  orderType: string;
  listCart: ProductEntity[];
  listProducts: ProductEntity[];
  listFilteredProducts: ProductEntity[];
  activeProduct: ProductEntity | null;
  fetchProducts: (storeId: string, seriesId?: string) => Promise<void>;
  changeOrderType: (type: string, isMobile?: boolean) => void;
  updateListCart: (item: ProductEntity) => void;
  removeListCart: (item: ProductEntity) => void;
  reloadListCart: (items: ProductEntity[]) => void;
  clearListCart: () => void;
  filterProductsByKeyword: (keyword: string, seriesId?: string) => void;
  filterProductsByCategory: (categoryId: string, seriesId?: string) => void;
  setActiveProduct: (activeProduct: ProductEntity | null) => void;
  setLoading: (status: boolean) => void;
  setCabinetColor: (item: StyleEntity | null) => void;
  setBenchtopColor: (item: StyleEntity | null) => void;
  setOpenDrawerMobile: (value: 'STYLE' | 'PRODUCT' | '') => void;
  resetCategoryAndStyle: () => void;
  // filterProductsBySeries: (props: string) => void;
}

const sortProducts = (
  products: ProductEntity[],
  orderType: string
): ProductEntity[] => {
  switch (orderType) {
    case 'PriceUp':
      return products.sort(
        (a, b) =>
          parseFloat(a.price.toString() || '0') -
          parseFloat(b.price.toString() || '0')
      );
    case 'PriceDown':
      return products.sort(
        (a, b) =>
          parseFloat(b.price.toString() || '0') -
          parseFloat(a.price.toString() || '0')
      );
    case 'Alphabet':
    default:
      return products.sort((a, b) => a.name?.localeCompare(b.name || '') || 0);
  }
};

const filterByCategory = (
  products: ProductEntity[],
  category: string
): ProductEntity[] => {
  return products.filter((product) => product.category?.id === category);
};

// const filterBySeries = (
//   products: ProductEntity[],
//   seriesId?: string
// ): ProductEntity[] => {
//   return products.filter((product) => {
//     return product.serieIds.includes(seriesId ?? '');
//   });
// };

const filterBySearch = (
  products: ProductEntity[],
  search: string
): ProductEntity[] => {
  const searchTerm = search.toLowerCase();

  return products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm)
  );
};

export const productStore = create<ProductState>((set) => ({
  openDrawerMobile: 'PRODUCT',
  cabinetColor: null,
  benchtopColor: null,
  isLoadingFetchProduct: false,
  isLoading: false,
  activeProduct: null,
  listCart: [],
  listProducts: [],
  listFilteredProducts: [],
  orderType: DEFAULT_SORT_TYPE,
  search: '',
  categoryId: CATEGORY.BBQ,
  cabinet: null,

  setOpenDrawerMobile: (value) =>
    set((state) => {
      return {
        openDrawerMobile: state.openDrawerMobile === value ? '' : value,
      };
    }),
  setActiveProduct: (activeProduct) => set({ activeProduct }),
  setCabinetColor: (cabinetColor) => set({ cabinetColor: cabinetColor }),
  setBenchtopColor: (benchtopColor) => set({ benchtopColor: benchtopColor }),

  fetchProducts: async (storeId: string, serieId?: string) => {
    set({ isLoadingFetchProduct: true });
    const data = await getProducts(storeId, serieId);
    set((state) => {
      // Step 1: Sort products
      const sortedProducts = sortProducts(data ?? [], state.orderType);
      // Step 2: Filter products by category
      const filteredByCategory = filterByCategory(
        sortedProducts,
        state.categoryId
      );
      return {
        listProducts: data,
        listFilteredProducts: filteredByCategory,
        isLoadingFetchProduct: false,
        isBbqAvalable: false,
      };
    });
    // set();
  },

  changeOrderType: (type) => {
    set((state) => {
      const sortedProducts = sortProducts(state.listFilteredProducts, type);
      return { listFilteredProducts: sortedProducts, orderType: type };
    });
  },

  updateListCart: (item) =>
    set((state) => ({
      listCart: [...state.listCart, item],
      activeProduct: null,
    })),

  reloadListCart: (items) => set({ listCart: items }),

  removeListCart: (item) =>
    set((state) => {
      const index = state.listCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (index !== -1) {
        const updatedCart = [...state.listCart];
        updatedCart.splice(index, 1);
        return { listCart: updatedCart };
      }
      return state;
    }),

  // clear list cart when switch store
  clearListCart: () =>
    set({
      listCart: [],
      activeProduct: null,
    }),

  resetCategoryAndStyle: () => {
    set({
      categoryId: CATEGORY.BBQ,
      cabinetColor: null,
      benchtopColor: null,
    });
  },

  filterProductsByKeyword: (keyword, seriesId) => {
    set((state) => {
      // Step 1: Sort products
      const sortedProducts = sortProducts(state.listProducts, state.orderType);

      // Step 2: Filter products by category
      const filteredByCategory = filterByCategory(
        sortedProducts,
        state.categoryId
      );

      // Step 3: Filter products by series
      // const filteredBySeries = filterBySeries(filteredByCategory, seriesId);

      // Step 4: Filter products by series
      const filteredByKeyword = filterBySearch(filteredByCategory, keyword);

      // Return the updated filtered products
      return { listFilteredProducts: filteredByKeyword, search: keyword };
    });
  },

  filterProductsByCategory: (categoryId, seriesId) => {
    set((state) => {
      // Step 1: Sort products
      const sortedProducts = sortProducts(state.listProducts, state.orderType);

      // Step 2: Filter products by category
      const filteredByCategory = filterByCategory(sortedProducts, categoryId);

      // Step 3: Filter products by series
      // const filteredBySeries = filterBySeries(filteredByCategory, seriesId);

      // Step 4: Filter products by series
      const filteredByKeyword = filterBySearch(
        filteredByCategory,
        state.search
      );

      // Return the updated filtered products
      return {
        listFilteredProducts: filteredByKeyword,
        categoryId: categoryId,
      };
    });
  },

  setLoading: (status) => set({ isLoading: status }),

  // filterProductsBySeries: (props) => {
  //   set((state) => {
  //     // Step 1: Sort products
  //     const sortedProducts = sortProducts(state.listProducts, state.orderType);

  //     // Step 2: Filter products by category
  //     const filteredByCategory = filterByCategory(
  //       sortedProducts,
  //       state.categoryId
  //     );

  //     // Step 3: Filter products by keyword
  //     const filteredByKeyword = filterBySearch(
  //       filteredByCategory,
  //       state.search
  //     );

  //     // Step 4: Filter products by series
  //     const filteredBySeries = filterBySeries(filteredByKeyword, props);

  //     // Return the updated filtered products
  //     return {
  //       listFilteredProducts: filteredBySeries,
  //     };
  //   });
  // },
}));
