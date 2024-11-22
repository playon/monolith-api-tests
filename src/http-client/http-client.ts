import { BaseHTTPClient } from './BaseHTTPClient';
import { APIRequestContext } from '@playwright/test';
import { URI_HQ, URI_EH } from './uri';
import { monolith, gender } from './../api/monolith.data';
import { SystemMapping } from './../data/ehEventDataResponse.data';

export class HttpClient extends BaseHTTPClient {
  constructor(context: APIRequestContext) {
    super(context);
  }

  createEventHQ(){
  return this.POST(URI_HQ.EVENTS, monolith.createEvent(gender.boys, 6, 'WI18284'),);
  }

  getEventEH(sm_name: string, sm_id: string){
    return this.GET(URI_EH.EVENTS, SystemMapping.getSystemMapping(sm_name, sm_id))
  }

}
