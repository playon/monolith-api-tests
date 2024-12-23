import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { httpClientConfig } from '../configuration';
import { authRequestData } from '../data/auth-request.data';
import { TApiResponse, TRequestOptions } from '../types/http-client.type';
import { TAuthResponse } from '../types/auth-response.type';
import { EventEmitter } from 'events';
import * as fs from 'fs';

export class BaseHTTPClient {
  private context: APIRequestContext;
  private headers: Record<string, string>;
  private eventEmitter: EventEmitter;
  private requestCounter = 0;

  protected constructor(context: APIRequestContext, headers: Record<string, string>, eventEmitter: EventEmitter) {
    this.context = context;
    this.headers = headers;
    this.eventEmitter = eventEmitter;
  }

  public getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  public getContext(): APIRequestContext {
    return this.context;
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


  async GET<T>(url: string, body?: any, headers?: Record<string, string>): Promise<TApiResponse<T>> {
    const options: TRequestOptions = {
      extraHTTPHeaders: headers || this.headers, 
      failOnStatusCode: false, 
    };
  
    if (body) {
           const serializedBody = JSON.stringify(body);
      
      options.params = { body: encodeURIComponent(serializedBody) };
    }
  
    const response = await this.context.get(url, options);
  
    this.eventEmitter.emit('response', {
      url: response.url(),
      status: response.status(),
      method: 'GET',
    });
  
    return this.coerceBodyType<T>(response);
  }
  

  async POST<T>(
    url: string, 
    body: unknown, 
    customHeaders?: Record<string, string>  
  ): Promise<TApiResponse<T>> {

    this.requestCounter += 1;
    const filename = `./request-data-${this.requestCounter}.json`;

    fs.writeFileSync(filename, JSON.stringify(body, null, 2), 'utf8');
    console.log('JSON-request is saved to request-data.json');    
    const response = await this.context.post(url, {
      headers: customHeaders,  
      data: body,  
    });
    

    this.eventEmitter.emit('response', {
      url: response.url(),
      status: response.status(),
      method: 'POST',
    });
  
    return this.coerceBodyType<T>(response);
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

  async PUT<T>(url: string, data: any, customHeaders?: Record<string, string> ): Promise<TApiResponse<T>> {
    const response = await this.context.put(url, {
      data,
      headers: customHeaders,
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
