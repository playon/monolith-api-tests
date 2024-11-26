import { BaseHTTPClient } from './BaseHTTPClient';
import { APIRequestContext } from '@playwright/test';
import { TEnvironment } from 'src/types/config.type';
import { URI_HQ, URI_EH } from './uri';
import { EventEmitter } from 'stream';
import { httpMapConfig } from './../configuration/map.config'
import { monolith, gender } from './../api/monolith.data';
import { SystemMapping } from './../data/ehEventDataResponse.data';

const env = process.env.ENV as TEnvironment;
export class HttpClient extends BaseHTTPClient {
  constructor(context: APIRequestContext) {
    const defaultHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
    const defaultEventEmitter = new EventEmitter();
    
    super(context, defaultHeaders, defaultEventEmitter);
  }

  createEventHQ(){
    const hqConfig = httpMapConfig.get('stage')?.hq;
    if (!hqConfig) {
      throw new Error('System1 configuration not found!');
    }
    const eventData = monolith.createEvent(gender.boys, 6, 'WI18284');
    return this.POST(process.env.URL_HQ + URI_HQ.EVENTS, eventData, { params: {} }, true, hqConfig.httpCredentials);
  }

  getEventEH(sm_name: string, sm_id: string){
    return this.GET(process.env.URL_EH + URI_EH.EVENTS, SystemMapping.getSystemMapping(sm_name, sm_id))
  }

}
