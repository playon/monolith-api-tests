#!/bin/bash

SLACK_REPORT_PAYLOAD=$(jq -n \
  --arg duration "$DURATION" \
  --arg total_tests "$TOTAL_TESTS" \
  --arg passed_tests "$PASSED_TESTS" \
  --arg failed_tests "$FAILED_TESTS" \
  --arg skipped_tests "$SKIPPED_TESTS" \
  --arg circle_workflow_job_id "$CIRCLE_WORKFLOW_JOB_ID" \
  --arg environment_name "$ENV_NAME" \
  --arg commit_message "$COMMIT_MESSAGE" \
  --arg commit_author "$COMMIT_AUTHOR" \
  '{
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": ":file_folder: API tests boilerplate :file_folder:",
				"emoji": true
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "plain_text",
					"text": "\($commit_message) | author: \($commit_author)"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "rich_text",
			"elements": [
				{
					"type": "rich_text_section",
					"elements": [
						{
							"type": "text",
							"text": "Environment: \($environment_name) | Duration: \($duration)",
							"style": {
								"italic": true
							}
						}
					]
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "rich_text",
			"elements": [
				{
					"type": "rich_text_section",
					"elements": [
						{
							"type": "text",
							"text": "Overall Test Results:",
							"style": {
								"bold": true,
								"italic": true
							}
						},
						{
							"type": "text",
							"text": "\n"
						},
						{
							"type": "emoji",
							"name": "testing"
						},
						{
							"type": "text",
							"text": " Total Tests: \($total_tests)"
						},
						{
							"type": "text",
							"text": "\n"
						},
						{
							"type": "emoji",
							"name": "pass"
						},
						{
							"type": "text",
							"text": " Passed: \($passed_tests)\n"
						},
						{
							"type": "emoji",
							"name": "fail"
						},
						{
							"type": "text",
							"text": " Failed: \($failed_tests)\n"
						},
						{
							"type": "emoji",
							"name": "black_right_pointing_double_triangle_with_vertical_bar",
							"unicode": "23ed-fe0f"
						},
						{
							"type": "text",
							"text": " Skipped: \($skipped_tests)"
						}
					]
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": ":playwri: Playwright Report",
						"emoji": true
					},
					"value": "click_me_456",
					"url": "https://output.circle-artifacts.com/output/job/\($circle_workflow_job_id)/artifacts/0/test-results/html/index.html#?",
					"action_id": "button-action-2"
				}
			]
		}
	]
}')
# send report to the #qa-automation-report slack channel
		curl --location 'https://hooks.slack.com/services/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' \
		--header 'Content-type: application/json' \
		--data "$SLACK_REPORT_PAYLOAD"
