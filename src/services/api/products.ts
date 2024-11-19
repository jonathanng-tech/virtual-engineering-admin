import ApiService from '../axios/apiService';
import { PATHS } from '../axios/apiConfig';
import { ProductEntity } from '@/types/model';

export async function getProducts(
  storeId?: string,
  serieId?: string
): Promise<ProductEntity[] | undefined> {
  try {
    const response = await ApiService.get<{ data: ProductEntity[] }>(
      PATHS.product,
      {
        storeId: storeId,
        serieId: serieId,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error in query:', error);
  }
}
