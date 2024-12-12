import { test as baseTest, TestInfo } from '@playwright/test';
import { HttpClient } from '../http-client';
import { isTMetadata, TMetadata, THttpMethod } from '../types/coverage-report.type';
import { EventEmitter } from 'events';

type MyFixtures = {
  client: HttpClient;
  metadata: TMetadata;
};

const test = baseTest.extend<MyFixtures>({
  client: async ({}, use) => {
    const client = await HttpClient.create();
    await use(client);
  },
  metadata: async ({client}, use, testInfo: TestInfo) => {
    const metadata: TMetadata = {
      uri: null,
      statusCode: null,
      method: null,
      testName: testInfo.title,
      testStatus: testInfo.status,
    };
    if (isInHook()) {
      throw new Error('Metadata invoked in the hook');
    }
    /*
      const eventEmitter = client.getEventEmitter();
      eventEmitter.once('response', (data: { url: string, status: number, method: THttpMethod }) => {
      metadata.uri = data.url;
      metadata.statusCode = data.status;
      metadata.method = data.method;
    });*/
    await use(metadata);
/*
    await new Promise((resolve) => {
      eventEmitter.once('response', resolve);
    });
*/
    metadata.testStatus = testInfo.status;
   /* if (!isTMetadata(metadata))
      throw new Error(
        `Invalid metadata, missing one or more properties,
         \n metadata: ${JSON.stringify(metadata)}`,
      );*/
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
