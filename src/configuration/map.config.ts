import { TEnvironment } from '../types/config.type';
import { TRequestOptions } from '../types/http-client.type';

export const httpMapConfig: Map<TEnvironment, TRequestOptions> = new Map();


const baseUrlHQ = process.env.URL_HQ;
const baseUrlEH = process.env.URL_EH;