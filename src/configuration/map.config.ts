import { TEnvironment } from '../types/config.type';
import { TRequestOptions } from '../types/http-client.type';
import { isString } from '../types/globals.type';

//TODO: Add the service name
const SERVICE_NAME = '';
if (!isString(SERVICE_NAME)) {
  throw new Error('Service name is not defined');
}
export const httpMapConfig: Map<TEnvironment, TRequestOptions> = new Map();
const baseUrl = (env: string, envDomain: string) =>
  `https://k8s-dashbirds-${SERVICE_NAME}-${env}.playonshared${envDomain}.playonsports.com`;
httpMapConfig.set('QA1', {
  baseURL: `${baseUrl('qa1', 'qa')}`,
});

httpMapConfig.set('local', {
  baseURL: `http://localhost:8080`,
});
httpMapConfig.set('staging', {
  baseURL: baseUrl('staging', 'stage'),
});

httpMapConfig.set('QA1', {
  baseURL: baseUrl('QA1', 'qa'),
});

//TODO: Add the following configurations after the service is deployed
// httpMapConfig.set('DEV', {
//   baseURL: `${baseUrl('dev')}`,
// });

// httpMapConfig.set('PROD', {
//   baseURL: `${baseUrl('prod')}`,
// });
