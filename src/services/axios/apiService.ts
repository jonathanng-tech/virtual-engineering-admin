import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from 'axios';
import { ENV } from './apiConfig';
import Logger from './serverLogger';
import { KEY_CAPTCHA } from '@/configs/constant';

// Base URL configuration
const API_BASE_URL = ENV.BASE_URL; // API base URL

// Define types for requests and responses (optional, can be expanded as per your API schema)
interface ApiResponse<T = any> {
  data: T;
  status: number;
}

interface ApiError extends AxiosError {
  response?: AxiosResponse;
}

// Create an Axios instance with default settings
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 40000, // Optional: Set a request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (Optional: For adding auth tokens or logging)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // You can add authorization tokens here
    const token = localStorage.getItem('token'); // Example: retrieving token from local storage
    const recaptcha = localStorage.getItem(KEY_CAPTCHA);
    if (token) {
      // Properly merge the existing headers with the new Authorization header
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders; // Ensure we cast to the correct type
    }
    if (recaptcha) {
      config.headers = {
        ...config.headers,
        Recaptcha: recaptcha,
      } as any;
    }
    Logger.describeRequest(config); // Log the request
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    Logger.describeErrorResponse(error); // Log the error in request
    return Promise.reject(error);
  }
);

// Add a response interceptor (Optional: For handling responses globally)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    Logger.describeSuccessResponse(response); // Log the success response
    return response;
  },
  (error: ApiError): Promise<ApiError> => {
    // Handle errors globally here
    if (error.response && error.response.status === 401) {
      // Redirect to login or handle token expiration
      console.log(
        'Unauthorized access - redirecting to login or refresh token'
      );
    }
    Logger.describeErrorResponse(error); // Log the error in request
    return Promise.reject(error);
  }
);

// Service methods for different API calls
const ApiService = {
  // GET request
  get: <T = any>(
    url: string,
    params: Record<string, any> = {}
  ): Promise<ApiResponse<T>> => {
    return axiosInstance.get(url, { params });
  },

  // POST request
  post: <T = any>(
    url: string,
    data: Record<string, any>
  ): Promise<ApiResponse<T>> => {
    return axiosInstance.post(url, data);
  },

  // PATCH request
  patch: <T = any>(
    url: string,
    data: Record<string, any>
  ): Promise<ApiResponse<T>> => {
    return axiosInstance.patch(url, data);
  },

  // DELETE request
  delete: <T = any>(url: string): Promise<ApiResponse<T>> => {
    return axiosInstance.delete(url);
  },
};

export default ApiService;
