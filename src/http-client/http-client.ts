import { BaseHTTPClient } from './BaseHTTPClient';
import { APIRequestContext } from '@playwright/test';
import { URI } from './uri';
import { monolith, gender } from './../api/monolith.data';

export class HttpClient extends BaseHTTPClient {
  constructor(context: APIRequestContext) {
    super(context);
  }

  createEventHQ(){
  return this.POST(URI.EVENTS, monolith.createEvent(gender.boys, 6, 'WI18284'),);
  }

  getEventEH(sm_name: string, sm_id: string){

    return this.GET(URI., sm_name, sm_id)
  }

}
