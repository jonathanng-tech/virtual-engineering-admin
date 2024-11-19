import ApiService from '../axios/apiService';
import { PATHS } from '../axios/apiConfig';
import { InputCustomerInfo } from '@/types/model';

export async function createCustomerInfo(data: InputCustomerInfo) {
  try {
    const response = await ApiService.post(PATHS.send_estimate, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
