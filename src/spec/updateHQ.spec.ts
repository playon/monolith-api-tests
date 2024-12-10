import { test, expect } from '../fixtures';
import { EventData } from '../data/eh/ehEventDataResponse.data';
import { EventResponseHQ } from 'src/data/hq/hqEventResponse.data';
import { EventResponseNFHS } from 'src/data/nfhs/nfhsEventResponse.data'
import { STATUS } from '../data/coverage-meta.data';
import { gender } from 'src/api/monolith.data';

test.describe('Create Event in HQ, Update in HQ and check in other systems', () => {
 test.afterAll(async ({ client }) => client.dispose());
  test('should create an event in HQ, update it in HQ and verify its current state in other systems', async ({ client, metadata }) => {

    const response = await client.createEventHQ(gender.boys).then(res => {
      expect(res.status()).toBe(STATUS.CREATED);
      return res;
    });

    const data = response.data as EventResponseHQ<gender.boys>;

    expect(data.archived === false);
    expect(data.eventIntegrationDetails[0].gender === 'Boys');
    expect(data.accountId === 'WI18284');

    const id = data.id;
    console.log(id);
    const updResponse = await client.updateEventHQ(id.toString(), gender.girls).then(res=> {
      expect(res.status()).toBe(STATUS.OK);
      return res;
    });

    const updData = updResponse.data as EventResponseHQ<gender.girls>;

    expect(updData.archived === false);
    expect(updData.eventIntegrationDetails[0].gender === 'Girls');
    expect(updData.accountId === 'WI18284');


    const ehResponse = await client
    .checkEventEH('gofan-event-id', id.toString())
    .then(res => {
      expect(res.status()).toBe(STATUS.OK);
      return res;
    });

    const ehData = ehResponse.data as EventData[];
    expect(ehData[0].source_system === 'HQ');
    expect(ehData[0].originating_system === 'HQ');
    expect(ehData[0].system_mapping[0].name === 'gofan-event-id');
    expect(ehData[0].system_mapping[0].id === id.toString());

    await new Promise(resolve => setTimeout(resolve, 10000));

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
