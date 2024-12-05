import { test, expect } from '../fixtures';
import { EventData } from '../data/eh/ehEventDataResponse.data';
import { EventResponseHQ } from 'src/data/hq/hqEventResponse.data';
import { EventResponseNFHS } from 'src/data/nfhs/nfhsEventResponse.data';
import { STATUS } from '../data/coverage-meta.data';
import { EventService } from '../services/EventService';

test.describe('Create Event in HQ and check in other systems', () => {
  test.afterAll(async ({ client }) => client.dispose());
  test('should create an event in HQ and verify its presence in other systems', async ({ client, metadata }) => {
    const response = await EventService.createEventHQ().then(res => {
      expect(res.status()).toBe(STATUS.CREATED);
      console.log('Response Status:', res.status());
      return res;    
    });

    const data = await response.json();

   const eventData = data as EventResponseHQ; 

    expect(data.archived === false);
    expect(data.eventIntegrationDetails[0].gender === 'Boys');
    expect(data.accountId === 'WI18284');

    const id = data.id;
    console.log(id);

    const ehResponse = await client
    .getEventEH('gofan-event-id', id.toString())
    .then(res => {
      expect(res.status()).toBe(201);
      return res;
    });

    const ehData = ehResponse.data as EventData;
    expect(ehData.source_system === 'HQ');
    expect(ehData.originating_system === 'HQ');
    expect(ehData.system_mapping[0].name === 'gofan-event-id');
    expect(ehData.system_mapping[0].id === id.toString());

    const nfhsResponse = await client.getEventNFHS(id.toString()).then(res => {
      expect(res.status()).toBe(200);
      return res;
    });
    const nfhsData = nfhsResponse.data as EventResponseNFHS;
    expect(nfhsData.items[0].creator === 'gofan');
    expect(nfhsData.items[0].gender === 'Boys');
    expect(nfhsData.items[0].tickets[0].gofan_event_id === id.toString());
  });
  });
