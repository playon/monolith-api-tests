import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { httpClientConfig } from '../configuration';
import { authRequestData } from '../data/auth-request.data';
import { TApiResponse, TRequestOptions } from '../types/http-client.type';
import { TAuthResponse } from '../types/auth-response.type';
import { EventEmitter } from 'events';
import * as fs from 'fs';

export class BaseHTTPClient {
  private context: APIRequestContext;
  private readonly headers: Record<string, string>;
  private eventEmitter: EventEmitter;

  protected constructor(context: APIRequestContext, headers: Record<string, string>, eventEmitter: EventEmitter) {
    this.context = context;
    this.headers = headers;
    this.eventEmitter = eventEmitter;
  }
  
  static async create<T extends BaseHTTPClient>(
    this: new (context: APIRequestContext) => T,
  ): Promise<T> {
    const context = await request.newContext({
      baseURL: httpClientConfig.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
    return new this(context);
  }

  async GET<T>(url: string, data: unknown): Promise<TApiResponse<T>> {
    const response = await this.context.get(url, { headers: this.headers });
    this.eventEmitter.emit('response', {
      url: response.url(),
      status: response.status(),
      method: 'GET',
    });
    return this.coerceBodyType<T>(response);
  }

  async POST<T>(
    url: string,
    data: unknown,
    options?: TRequestOptions,
    isEmitted = true,
    httpCredentials?: { username: string; password: string }
  ): Promise<TApiResponse<T>> {

    const filename = `./request-data.json`;
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');

    console.log('URL:', url);
    console.log('username: ' + httpCredentials.username);
    console.log('password: ' + httpCredentials.password);
    const response = await this.context
      .post(url, { data, params: options?.params, headers: this.headers })
      .then(this.coerceBodyType<T>);
    if (isEmitted) {
      this.eventEmitter.emit('response', {
        method: 'POST',
        url: response.url(),
        status: response.status(),
      });
    }
    return response;
  }

  async DELETE<T>(url: string): Promise<TApiResponse<T>> {
    const response = await this.context.delete(url, { headers: this.headers });
    this.eventEmitter.emit('response', {
      method: 'DELETE',
      url: response.url(),
      status: response.status(),
    });
    return this.coerceBodyType<T>(response);
  }

  async PUT<T>(url: string, data: any): Promise<TApiResponse<T>> {
    const response = await this.context.put(url, {
      data,
      headers: this.headers,
    });
    this.eventEmitter.emit('response', {
      method: 'PUT',
      url: response.url(),
      status: response.status(),
    });
    return this.coerceBodyType<T>(response);
  }

  dispose(): Promise<void> {
    return this.context.dispose();
  }

  on(event: string, listener: (response: any) => void) {
    this.eventEmitter.on(event, listener);
  }

  private async coerceBodyType<T>(
    response: APIResponse,
  ): Promise<TApiResponse<T>> {
    try {
      (response as TApiResponse<T>).data = (await response.json()) as T;
      return response as TApiResponse<T>;
    } catch (e) {
      const data = await response.text();
      return { status: () => response.status(), data } as TApiResponse<T>;
    }
  }
}
