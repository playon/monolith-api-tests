import { TEnvironment } from '../types/config.type';
import { TRequestOptions } from '../types/http-client.type';

export const httpMapConfig: Map<TEnvironment, TRequestOptions> = new Map();
const baseUrl = (env: string) =>
  `https://api.${env}.gofan.co/`;


httpMapConfig.set('stage', {
  baseURL: baseUrl('stage'),
});

httpMapConfig.set('qa', {
  baseURL: baseUrl('qa'),
});


 httpMapConfig.set('dev', {
   baseURL: `${baseUrl('development')}`,
 });

// httpMapConfig.set('PROD', {
//   baseURL: `${baseUrl('prod')}`,
// });
