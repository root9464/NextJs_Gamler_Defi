import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import type { z } from 'zod/v4';
import type { Extend } from '../types/utils';
import { validateResult } from '../utils/zod.utils';

type ProxyInstance = 'ton' | 'web3' | 'web2' | 'coffee_server' | 'coffee_client';

type ProxyConfig = {
  prefix: string;
  instance: AxiosRequestConfig;
};

type FetchDataOptions<T> = Extend<
  AxiosRequestConfig,
  {
    schema?: z.ZodSchema<T>;
  }
>;

class ApiProxy {
  private readonly proxyConfigs: Record<ProxyInstance, ProxyConfig>;

  constructor() {
    this.proxyConfigs = {
      ton: {
        prefix: '/api/ton',
        instance: {
          baseURL: 'https://tonapi.io/v2',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TON_API_KEY}`,
          },
        },
      },
      web3: {
        prefix: '/api/web3',
        instance: { baseURL: 'https://serv.gamler.online/web3/api' },
        // baseURL: 'http://127.0.0.1:6069/api',
        // instance: { baseURL: 'http://127.0.0.1:6069/api' }),
      },
      web2: {
        prefix: '/api/web2',
        instance: { baseURL: 'https://serv.gamler.online' },
      },
      coffee_server: {
        prefix: '/api/coffee_server',
        instance: { baseURL: 'https://backend.swap.coffee/v1' },
      },
      coffee_client: {
        prefix: '/api/coffee_client',
        instance: { baseURL: 'https://tokens.swap.coffee/api/v2' },
      },
    };
  }

  private normalizeUrl(url: string, providedInstance?: AxiosInstance): [string, AxiosInstance] {
    for (const [, config] of Object.entries(this.proxyConfigs) as [ProxyInstance, ProxyConfig][]) {
      if (url.startsWith(config.prefix)) {
        return [url.replace(config.prefix, ''), providedInstance ?? axios.create(config.instance)];
      }
    }
    return [url, providedInstance ?? axios.create()];
  }

  private async request<T>({ schema, ...config }: FetchDataOptions<T>, providedInstance?: AxiosInstance): Promise<T> {
    const [normalizedUrl, instance] = this.normalizeUrl(config.url || '', providedInstance);
    const response: AxiosResponse = await instance.request({
      ...config,
      url: normalizedUrl,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText || `Request failed with status ${response.status}`);
    }

    return schema ? validateResult(response.data, schema) : (response.data as T);
  }

  get instance(): Record<ProxyInstance, AxiosInstance> {
    return Object.fromEntries(Object.entries(this.proxyConfigs).map(([key, config]) => [key, config.instance])) as Record<
      ProxyInstance,
      AxiosInstance
    >;
  }

  async get<T>(url: string, options: FetchDataOptions<T> = {}, instance?: AxiosInstance): Promise<T> {
    return this.request({ ...options, method: 'GET', url }, instance);
  }

  async post<T>(url: string, body?: unknown, options: FetchDataOptions<T> = {}, instance?: AxiosInstance): Promise<T> {
    return this.request({ ...options, method: 'POST', url, data: body }, instance);
  }

  async put<T>(url: string, body?: unknown, options: FetchDataOptions<T> = {}, instance?: AxiosInstance): Promise<T> {
    return this.request({ ...options, method: 'PUT', url, data: body }, instance);
  }

  async delete<T>(url: string, options: FetchDataOptions<T> = {}, instance?: AxiosInstance): Promise<T> {
    return this.request({ ...options, method: 'DELETE', url }, instance);
  }

  async patch<T>(url: string, body?: unknown, options: FetchDataOptions<T> = {}, instance?: AxiosInstance): Promise<T> {
    return this.request({ ...options, method: 'PATCH', url, data: body }, instance);
  }
}

const proxy = new ApiProxy();

export { proxy, type FetchDataOptions };
