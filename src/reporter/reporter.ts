import { Reporter, TestCase } from '@playwright/test/reporter';
import { TMetadata } from '../types/coverage-report.type';
import { generateCoverageData } from './data';
import { generateCoverageHtml } from './index';

class ApiCoverageReporter implements Reporter {
  private apiData: Array<TMetadata> = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTestEnd(test: TestCase) {
    const metadata = test.annotations.find(
      ann => ann.type === 'apiMetadata',
    )?.description;
    if (metadata) {
      const parsedMetadata = JSON.parse(metadata);
      this.apiData.push(parsedMetadata);
    }
  }

  async onEnd() {
    return generateCoverageData(this.apiData).then(generateCoverageHtml);
  }
}

export default ApiCoverageReporter;
