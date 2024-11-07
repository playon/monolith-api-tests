import { BaseHTTPClient } from './BaseHTTPClient';
import { healthCheck } from './uri';
import { APIRequestContext } from '@playwright/test';

export class HttpClient extends BaseHTTPClient {
  constructor(context: APIRequestContext) {
    super(context);
  }

  health() {
    return this.GET(healthCheck);
  }
}
