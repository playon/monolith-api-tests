import { BaseHTTPClient } from './BaseHTTPClient';
import { APIRequestContext } from '@playwright/test';
import { TEnvironment } from 'src/types/config.type';
import { URI_HQ, URI_EH } from './uri';
import { httpMapConfig } from './../configuration/map.config'
import { monolith, gender } from './../api/monolith.data';
import { SystemMapping } from './../data/ehEventDataResponse.data';

const env = process.env.ENV as TEnvironment;
export class HttpClient extends BaseHTTPClient {
  constructor(context: APIRequestContext) {
    super(context);
  }



  createEventHQ(){
    return this.POST(process.env.URL_HQ + URI_HQ.EVENTS, monolith.createEvent(gender.boys, 6, 'WI18284'),);
  }

  getEventEH(sm_name: string, sm_id: string){
    return this.GET(process.env.URL_EH + URI_EH.EVENTS, SystemMapping.getSystemMapping(sm_name, sm_id))
  }

}
