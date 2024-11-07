import { TRequestOptions } from '../types/http-client.type';

export const baseClientOptions: TRequestOptions = {
  extraHTTPHeaders: {
    'Content-Type': 'application/json',
  },
  ignoreHTTPSErrors: false,
  failOnStatusCode: false,

  timeout: 10000,
};
