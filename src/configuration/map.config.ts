import { TEnvironment } from '../types/config.type';
import { TRequestOptions } from '../types/http-client.type';

// TODO: add here 'vnn'
type TSystem = 'hq' | 'eh' | 'nfhs';

type THttpMapConfig = Map<TEnvironment, Record<TSystem, TRequestOptions>>;


export const httpMapConfig: THttpMapConfig = new Map([
  ['stage',
  {
    hq: { 
      baseUrl: process.env.URL_HQ || '', 
      httpCredentials: {
      username: process.env.AUTH_EMAIL,
      password: process.env.AUTH_PASSWORD,
    },  
    },
    eh: { baseURL: process.env.URL_EH,
      headers: {}
    },
    nfhs: { baseURL: process.env.URL_NFHS,
      headers: {}
    },
  },
],
]);