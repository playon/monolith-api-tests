import { TSwaggerEndpoint } from '../../types/coverage-report.type';
import { isString } from '../../types/globals.type';

const SERVICE_NAME = '';

if (!isString(SERVICE_NAME)) {
  throw new Error('SERVICE_NAME is not defined');
}

const swaggerURL = `https://k8s-dashbirds-${SERVICE_NAME}-staging.playonsharedstage.playonsports.com/v1/docs/swagger.json`;

export function fetchSwagger(): Promise<TSwaggerEndpoint[]> {
  return fetch(swaggerURL, {
    headers: {
      accept: 'application/json,*/*',
    },
    body: null,
    method: 'GET',
  })
    .then(data => data.json())
    .then(parseSwagger);
}

function parseSwagger(swaggerData: any): TSwaggerEndpoint[] {
  const endpoints: TSwaggerEndpoint[] = [];
  Object.keys(swaggerData.paths).forEach(path => {
    const methods = swaggerData.paths[path];
    Object.keys(methods).forEach(method => {
      const responses = Object.keys(methods[method].responses);
      endpoints.push({
        method: method.toUpperCase(),
        path,
        responses,
      });
    });
  });
  return endpoints as TSwaggerEndpoint[];
}
