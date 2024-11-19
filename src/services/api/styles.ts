import ApiService from '../axios/apiService';
import { PATHS } from '../axios/apiConfig';
import { StyleEntity } from '@/types/model';

export async function getListStyle(
  tenantId?: string
): Promise<StyleEntity[] | undefined> {
  try {
    const response = await ApiService.get<{ data: StyleEntity[] }>(
      PATHS.style,
      {
        tenantId: tenantId || 'grill-king',
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error in query:', error);
  }
}
