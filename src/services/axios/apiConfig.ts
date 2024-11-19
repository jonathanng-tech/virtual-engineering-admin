const ENV_BASE = {
  BASE_URL: import.meta.env.VITE_API_URL,
};

const ENV = {
  TYPE: import.meta.env.MODE,
  ...ENV_BASE,
};

const PATHS = {
  authenticate: {},
  tenant: 'tenant',
  store: 'store',
  product: 'product',
  style: 'style',
  category: 'category',
  customer: 'customer-info',
  send_estimate: 'customer-info/send-estimate',
};

/**
 * Return API url paths
 *
 * @param path is PATHS
 * @returns full API URL
 */

export { ENV, PATHS };
