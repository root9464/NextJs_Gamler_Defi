import type { AxiosInstance } from 'axios';
import axios from 'axios';

const API_PROXY_CONFIG = {
  ton: 'https://tonapi.io/v2',
  web3: 'https://serv.gamler.online/web3/api',
  web2: 'https://serv.gamler.atma-dev.ru',
} as const;

const apiProxy: AxiosInstance = axios.create();

apiProxy.interceptors.request.use((config) => {
  if (!config.url) return config;

  const parts = config.url.split('/').filter(Boolean);
  if (parts.length < 2 || parts[0] !== 'api') return config;

  const apiPrefix = parts[1];
  const baseURL = API_PROXY_CONFIG[apiPrefix as keyof typeof API_PROXY_CONFIG];

  if (baseURL) {
    config.baseURL = baseURL;
    config.url = `/${parts.slice(2).join('/')}`;
  }

  return config;
});

export { apiProxy };
