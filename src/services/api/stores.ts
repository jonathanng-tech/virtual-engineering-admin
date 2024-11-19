import ApiService from '../axios/apiService';
import { PATHS } from '../axios/apiConfig';
import { StoreEntity } from '@/types/model';

export async function getListStore(
  tenantId?: string
): Promise<StoreEntity[] | undefined> {
  try {
    const response = await ApiService.get<{ data: StoreEntity[] }>(
      PATHS.store,
      {
        tenantId: tenantId || 'grill-king',
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error in query:', error);
  }
}

export async function getStoreDetail(
  storeId: string
): Promise<StoreEntity | undefined> {
  try {
    const response = await ApiService.get<{ data: StoreEntity }>(
      `${PATHS.store}/${storeId}`,
      {
        id: storeId,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error in query:', error);
  }
}
