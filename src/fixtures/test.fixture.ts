import { test as baseTest, TestInfo } from '@playwright/test';
import { HttpClient } from '../http-client';
import { isTMetadata, TMetadata } from '../types/coverage-report.type';

type MyFixtures = {
  client: HttpClient;
  metadata: TMetadata;
};

const test = baseTest.extend<MyFixtures>({
  client: async ({}, use) => {
    const client = await HttpClient.create();
    await use(client);
  },
  metadata: async ({}, use, testInfo: TestInfo) => {
    const metadata: TMetadata = {
      uri: null,
      status: null,
      method: null,
      testName: testInfo.title,
      testStatus: null,
    };
    if (isInHook()) {
      throw new Error('Metadata invoked in the hook');
    }
    await use(metadata);
    metadata.testStatus = testInfo.status;
    if (!isTMetadata(metadata))
      throw new Error(
        `Invalid metadata, missing one or more properties,
         \n metadata: ${JSON.stringify(metadata)}`,
      );
    testInfo.annotations.push({
      type: 'apiMetadata',
      description: JSON.stringify(metadata),
    });
  },
});

function isInHook(): boolean {
  const error = new Error();
  const stack = error.stack;
  return (
    stack.includes('BeforeAll') ||
    stack.includes('AfterAll') ||
    stack.includes('BeforeEach') ||
    stack.includes('AfterEach')
  );
}

export { test };
