import { test, expect } from '../fixtures';
import { healthResponseData } from '../data/health-response.data';
import { METHOD, STATUS } from '../data/coverage-meta.data';

test.describe('Health Check', () => {
  test.afterAll(async ({ client }) => client.dispose());
  test('should return 200 status', async ({ client, metadata }) => {
    metadata.uri = '/';
    metadata.status = STATUS.OK;
    metadata.method = METHOD.GET;
    const { data } = await client.health().then(res => {
      expect(res.status()).toBe(200);
      return res;
    });
    expect(data).toStrictEqual(healthResponseData);
  });
});
