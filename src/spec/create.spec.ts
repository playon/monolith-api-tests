import { test, expect } from '../fixtures';
import { METHOD, STATUS } from '../data/coverage-meta.data';
import { EventResponseHQ } from 'src/data/hqEventResponse.data';

test.describe('Create Event in HQ and check in other systems', () => {
  test.afterAll(async ({ client }) => client.dispose());
  test('should create an event in HQ and verify its presence in other systems', async ({ client, metadata }) => {

    const response = await client.createEventHQ().then(res => {
      expect(res.status()).toBe(200);
      return res;
    });

    const data = response.data as EventResponseHQ;

    expect(data.archived === false);
    expect(data.eventIntegrationDetails[0].gender === 'Boys');
    expect(data.accountId === 'WI18284');

    const id = data.id;
    console.log(id);

    const ehResponse = await client
    .getEventEH('gofan-event-id', id)
    .then(res => {
      expect(res.status()).toBe(200);
      return res;
    });

    const ehData = ehResponse.ehData as EventData;

  });
});
