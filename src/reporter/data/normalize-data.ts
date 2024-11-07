import {
  TApiDetail,
  TSwaggerRequest,
  TCoverageData,
  TCoverageSummary,
  TMetadata,
  TTestDetail,
} from '../../types/coverage-report.type';
import { fetchSwagger } from './download-swagger';

export async function generateCoverageData(
  capturedRequests: TMetadata[],
): Promise<TCoverageData> {
  const coverageDetails: TSwaggerRequest[] = [];
  let coveredEndpoints = 0;
  let totalEndpoints = 0;
  const swaggerEndpoints = await fetchSwagger();

  for (const endpoint of swaggerEndpoints) {
    const statusCodes: TApiDetail[] = endpoint.responses.map(response => {
      const capturedMatches = capturedRequests.filter(
        request =>
          request.uri === endpoint.path &&
          request.method === endpoint.method &&
          request.status === parseInt(response),
      );

      const covered = capturedMatches.length > 0;
      if (covered) {
        coveredEndpoints++;
      }

      const tests: TTestDetail[] = matchedTests(capturedMatches);

      return {
        status: parseInt(response),
        covered,
        tests,
      };
    });

    coverageDetails.push({
      uri: endpoint.path,
      method: endpoint.method,
      statusCodes,
    });

    totalEndpoints += endpoint.responses.length;
  }

  const summary = collectSummary(coveredEndpoints, totalEndpoints);

  return {
    summary,
    details: coverageDetails,
  };
}

function collectSummary(
  coveredEndpoints: number,
  totalEndpoints: number,
): TCoverageSummary {
  const rate = (coveredEndpoints / totalEndpoints) * 100;
  const coverageRate = isNaN(rate) ? 0 : Number.parseFloat(rate.toFixed(2));
  return {
    coverageRate,
    covered: coveredEndpoints,
    total: totalEndpoints,
  };
}

function matchedTests(capturedMatches: TMetadata[]): TTestDetail[] {
  return capturedMatches.map(match => ({
    path: match.testName,
    passed: match.testStatus === 'passed',
  }));
}
