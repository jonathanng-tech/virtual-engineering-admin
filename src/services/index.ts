import ApiService from './axios/apiService';
import Logger from './axios/serverLogger';
import { getProducts } from './api/products';
import { getListStore, getStoreDetail } from './api/stores';
import { getListStyle } from './api/styles';
import { getListCategory } from './api/categories';

export {
  ApiService,
  Logger,
  getProducts,
  getListStore,
  getStoreDetail,
  getListStyle,
  getListCategory,
};
