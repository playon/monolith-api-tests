import { BaseHTTPClient } from './BaseHTTPClient';
import { APIRequestContext } from '@playwright/test';
import { URI } from './uri'

export class HttpClient extends BaseHTTPClient {
  constructor(context: APIRequestContext) {
    super(context);
  }

  createEventHQ(){
    //hq event body
return this.POST(URI.EVENTS, monolith.createEvent(),);
  }

}
