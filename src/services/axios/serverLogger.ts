import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from './apiConfig';

/**
 * If SHOW_LOG = false, stop API logging
 */
const SHOW_LOG = true;

/**
 * Describe request API logging
 *
 * @param config AxiosRequestConfig
 */
function describeRequest(config: AxiosRequestConfig<any>) {
  if (!SHOW_LOG || ENV.TYPE !== 'dev') {
    return;
  }

  console.group('%c API Request', 'color: green; font-weight: bold;');
  console.log('%c URL:', 'color: blue;', config.url);
  console.log('%c Method:', 'color: blue;', config.method);

  if (config.params) {
    console.log('%c Params:', 'color: blue;', config.params);
  }

  if (config.data) {
    console.log('%c Data:', 'color: blue;', config.data);
  }

  console.log('%c Headers:', 'color: blue;', config.headers);
  console.groupEnd();
}

/**
 * Describe success response API logging
 *
 * @param response AxiosResponse
 */
function describeSuccessResponse(response: AxiosResponse<any, any>) {
  if (!SHOW_LOG || ENV.TYPE !== 'dev') {
    return;
  }

  console.group(
    '%c API Response - Success',
    'color: green; font-weight: bold;'
  );
  console.log('%c URL:', 'color: blue;', response.config.url);
  console.log('%c Status:', 'color: blue;', response.status);
  console.log('%c Response Data:', 'color: blue;', response.data);
  console.log('%c Headers:', 'color: blue;', response.headers);
  console.groupEnd();
}

/**
 * Describe error response API logging
 *
 * @param error any
 */
function describeErrorResponse(error: any) {
  if (!SHOW_LOG || ENV.TYPE !== 'dev') {
    return;
  }

  console.group('%c API Response - Error', 'color: red; font-weight: bold;');
  if (error.response) {
    // The request was made, and the server responded with a status code
    console.log('%c URL:', 'color: red;', error.response.config.url);
    console.log('%c Status:', 'color: red;', error.response.status);
    console.log('%c Error Data:', 'color: red;', error.response.data);
    console.log('%c Headers:', 'color: red;', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.log('%c No response received:', 'color: red;', error.request);
  } else {
    // Something happened in setting up the request that triggered an error
    console.log('%c Error Message:', 'color: red;', error.message);
  }
  console.groupEnd();
}

const Logger = {
  describeRequest,
  describeSuccessResponse,
  describeErrorResponse,
};

export default Logger;
