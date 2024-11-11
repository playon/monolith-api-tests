import { test, expect } from '../fixtures';
import { healthResponseData } from '../data/health-response.data';
import { METHOD, STATUS } from '../data/coverage-meta.data';

test.describe('Create Event in HQ and check in other systems', () => {
  test.afterAll(async ({ client }) => client.dispose());
  test('should return 200 status', async ({ client, metadata }) => {
    metadata.uri = '/';
    metadata.status = STATUS.OK;
    metadata.method = METHOD.POST;
    const { data } = await client.createEventHQ().then(res => {
      expect(res.status()).toBe(200);
      return res;
    });
    expect(data).toStrictEqual(healthResponseData);
  });
});
