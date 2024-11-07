import * as fs from 'fs';
import * as path from 'path';
import {
  TApiDetail,
  TSwaggerRequest,
  TCoverageData,
  TCoverageSummary,
} from '../types/coverage-report.type';

function generateSummaryHtml(summary: TCoverageSummary): string {
  return `
    <div class="summary">
      Coverage Rate: <strong>${summary.coverageRate}%</strong><br>
      Covered Endpoints: <strong>${summary.covered}/${summary.total}</strong>
    </div>`;
}

function generateExpandableHtml(details: TSwaggerRequest[]): string {
  return details
    .map(api => {
      const coverageClass = getCoverageClass(api.statusCodes);
      return `
      <div class="expandable ${coverageClass} collapsed" onclick="toggleExpand(this)">
        ${api.method} ${api.uri}
      </div>
      <div class="status-group">
        ${generateStatusCodeHtml(api.statusCodes)}
      </div>
    `;
    })
    .join('\n');
}

function generateStatusCodeHtml(statusCodes: TApiDetail[]): string {
  return statusCodes
    .map(status => {
      const statusClass = status.covered ? 'covered' : 'not-covered';
      const testsHtml =
        status.tests.length > 0
          ? status.tests
              .map(
                test =>
                  `<div class="test-details ${test.passed ? 'test-pass' : 'test-fail'}">Test path - ${test.passed ? 'passed' : 'failed'}: ${test.path}</div>`,
              )
              .join('\n')
          : '';
      return `
      <div class="${statusClass}">
        ${status.status} ---- ${status.covered ? 'Covered' : 'Not Covered'}
        ${testsHtml}
      </div>
    `;
    })
    .join('\n');
}

function getCoverageClass(statusCodes: TApiDetail[]): string {
  const total = statusCodes.length;
  const covered = statusCodes.filter(status => status.covered).length;
  if (covered === total) return 'green';
  if (covered > 0) return 'yellow';
  return 'red';
}

export function generateCoverageHtml(
  coverageData: TCoverageData,
  outputFilePath: string = 'test-results/coverage.html',
) {
  const templatePath = path.join(__dirname, 'template.html');
  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  const summaryHtml = generateSummaryHtml(coverageData.summary);
  const detailsHtml = generateExpandableHtml(coverageData.details);

  const finalHtml = templateContent
    .replace('<div id="summary"></div>', summaryHtml)
    .replace('<div id="coverageDetails"></div>', detailsHtml);

  fs.writeFileSync(outputFilePath, finalHtml, 'utf-8');
  console.log(`Coverage report generated at ${outputFilePath}`);
}
