import { test, expect } from '../fixtures';
import { healthResponseData } from '../data/health-response.data';
import { METHOD, STATUS } from '../data/coverage-meta.data';

test.describe('Create Event in HQ and check in other systems', () => {
  test.afterAll(async ({ client }) => client.dispose());
  test('should create an event in HQ and verify its presence in other systems', async ({ client, metadata }) => {

    const response = await client.createEventHQ().then(res => {
      expect(res.status()).toBe(200);
      return res;
    });

    const data =response.data as 
    expect(data).toStrictEqual(healthResponseData);
  });
});
