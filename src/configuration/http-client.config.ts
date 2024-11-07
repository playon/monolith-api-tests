import { httpMapConfig } from './map.config';
import { getEnv } from './utils';
import { baseClientOptions } from './base.config';
import { TRequestOptions } from '../types/http-client.type';

let httpClientConfig: Partial<TRequestOptions> | null = null;
function initializeHttpClientConfig(): Partial<TRequestOptions> {
  if (httpClientConfig) {
    return httpClientConfig;
  }
  const env = getEnv();
  const config = httpMapConfig.get(env);
  if (!config) {
    throw new Error(`No configuration found for environment: ${env}`);
  }
  return {
    ...config,
    ...baseClientOptions,
  };
}
if (!httpClientConfig) {
  httpClientConfig = initializeHttpClientConfig();
}
export { httpClientConfig };
