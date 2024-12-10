import { isNumber, isString } from './globals.type';

const httpMethods = ['POST', 'PUT', 'GET', 'DELETE', 'PATCH'] as const;
export type THttpMethod = (typeof httpMethods)[number];

export type TMetadata = {
  uri: string;
  statusCode: number;
  method: THttpMethod;
  testName: string;
  testStatus: string;
};
type TStatusCode = number;

function isTStatusCode(arg: unknown): arg is TStatusCode {
  return isNumber(arg) && arg >= 100 && arg <= 599;
}

function isHttpMethod(arg: unknown): arg is THttpMethod {
  return httpMethods.includes(arg as THttpMethod);
}

/**
 * Type guard for TMetadata
 * All properties are required
 * @param arg
 */
export function isTMetadata(arg: unknown): arg is TMetadata {
  if (typeof arg !== 'object' || arg === null) return false;
  if (!('uri' in arg) || !('status' in arg) || !('method' in arg)) return false;
  if (!('testName' in arg) || !('testStatus' in arg)) return false;
  if (!isString(arg.uri)) return false;
  if (!isNumber(arg.status)) return false;
  if (!isTStatusCode(arg.status)) return false;
  if (!isHttpMethod(arg.method)) return false;
  if (!isString(arg.testName)) return false;
  if (!isString(arg.testStatus)) return false;
  return !!arg.uri && !!arg.status && !!arg.method;
}

export type TSwaggerRequest = {
  uri: string;
  method: string;
  statusCodes: TApiDetail[];
};
export type TCoverageSummary = {
  coverageRate: number;
  covered: number;
  total: number;
};
export type TCoverageData = {
  summary: TCoverageSummary;
  details: TSwaggerRequest[];
};

export type TApiDetail = {
  status: number;
  covered: boolean;
  tests: TTestDetail[];
};

export type TTestDetail = {
  path: string;
  passed: boolean;
};

/**
 * Parsed Swagger endpoint from swagger.json
 */
export type TSwaggerEndpoint = {
  method: string;
  path: string;
  responses: string[];
};
