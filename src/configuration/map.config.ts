/*import { TEnvironment } from '../types/config.type';
import { TRequestOptions } from '../types/http-client.type';

export const httpMapConfig: Map<TEnvironment, TRequestOptions> = new Map();


const baseUrlHQ = process.env.URL_HQ;
const baseUrlEH = process.env.URL_EH;*/
// Load the environment file dynamically based on ENV

dotenv.config({ path: `.env.${process.env.ENV || 'development'}` });

type TEnvironment = 'stage' | 'prod' | 'dev';
type TRequestOptions = { baseURL: string; headers?: Record<string, string> };

export const httpMapConfig: Map<TEnvironment, TRequestOptions> = new Map([
  ['stage', { baseURL: process.env.URL_1 || '', headers: { Authorization: 'Bearer token1' } }],
  ['prod', { baseURL: process.env.URL_2 || '', headers: { Authorization: 'Bearer token2' } }],
]);

// Log for debugging (optional)
console.log('httpMapConfig:', httpMapConfig);