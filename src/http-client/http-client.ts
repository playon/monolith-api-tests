import { BaseHTTPClient } from './BaseHTTPClient';
import { APIRequestContext } from '@playwright/test';
import { TEnvironment } from 'src/types/config.type';
import { URI_HQ, URI_EH, URI_NFHS } from './uri';
import { EventEmitter } from 'stream';
import { httpMapConfig } from './../configuration/map.config';
import { monolith, gender } from './../api/monolith.data';
import { SystemMapping } from '../data/eh/ehEventDataResponse.data';

const env = process.env.ENV as TEnvironment;
export class HttpClient extends BaseHTTPClient {
  constructor(context: APIRequestContext) {
    const defaultHeaders: Record<string, string> = {};
    const defaultEventEmitter = new EventEmitter();  
    super(context, defaultHeaders, defaultEventEmitter);
  }
  
  createEventHQ(){
    const hqConfig = httpMapConfig.get('stage')?.hq;
    if (!hqConfig) {
      throw new Error('HQ configuration not found!');
    }
    const eventData = monolith.createEvent(gender.boys, 6, 'WI18284');
    const url = process.env.URL_HQ + URI_HQ.EVENTS;
    const encodedCredentials = Buffer.from(`${hqConfig.httpCredentials.username}:${hqConfig.httpCredentials.password}`).toString('base64');
    const myHeaders = {
  'Authorization': `Basic ${encodedCredentials}`,
  'Content-Type': 'application/json',
};
console.log(JSON.stringify(myHeaders));
return this.POST(url, eventData, myHeaders);
    
  }

  getEventEH(sm_name: string, sm_id: string){
    const ehConfig = httpMapConfig.get('stage')?.eh;
    if (!ehConfig) {
      throw new Error('Event-Hub configuration not found!');
    }
    return this.GET(process.env.URL_EH + URI_EH.EVENTS + '?system_mapping[0].name=' + sm_name + 'gofan-event-id&mapping[0].id=' + sm_id);
  }

  getEventNFHS(id: string){
  const nfhsConfig = httpMapConfig.get('stage')?.nfhs;
  if (!nfhsConfig) {
    throw new Error('NFHS configuration not found!');
  }
  return this.GET(process.env.URL_NFHS + URI_NFHS.SEARCH_EVENTS + '?gofan_event_id=' + id);
  }

}
