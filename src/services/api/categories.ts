import ApiService from '../axios/apiService';
import { PATHS } from '../axios/apiConfig';
import { CategoryEntity } from '@/types/model';

export async function getListCategory(
  tenantId?: string
): Promise<CategoryEntity[] | undefined> {
  try {
    const response = await ApiService.get<{ data: CategoryEntity[] }>(
      PATHS.category,
      {
        tenantId: tenantId || 'grill-king',
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error in query:', error);
  }
}
