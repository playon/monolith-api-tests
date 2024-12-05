import { request } from '@playwright/test'; 
import { URI_HQ } from './../http-client/uri';
import { httpMapConfig } from './../configuration/map.config';
import { monolith, gender } from './../api/monolith.data';

export class EventService {
 static getBasicAuthHeaders(username: string, password: string) {
        const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        return {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json'
     };
}

  static async createEventHQ() {
    const hqConfig = httpMapConfig.get('stage')?.hq;
    const headers = EventService.getBasicAuthHeaders(hqConfig.httpCredentials.username, hqConfig.httpCredentials.password);
    const url = process.env.URL_HQ + URI_HQ.EVENTS;
    const apiRequestContext = await request.newContext();
    const eventData = monolith.createEvent(gender.boys, 6, 'WI18284')
    const response = await apiRequestContext.post(url, {
      headers,
      data: eventData,
    });

    return response;
  }
}