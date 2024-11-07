#!/bin/bash

passed_tests=$(xmlstarlet sel -t -v 'count(//testcase[not(error) and not(failure) and not(skipped)])' test-results/junit-report.xml)
failed_tests=$(xmlstarlet sel -t -v 'count(//testcase/error | //testcase/failure)' test-results/junit-report.xml)
skipped_tests=$(xmlstarlet sel -t -v '//testsuites/@skipped' test-results/junit-report.xml)
total_tests=$(xmlstarlet sel -t -v '//testsuites/@tests' test-results/junit-report.xml)
junit_time=$(xmlstarlet sel -t -v '//testsuites/@time' test-results/junit-report.xml)
converted_junit_time=${junit_time%\.*}
duration="$(($converted_junit_time%3600/60))m:$(($converted_junit_time%60))s"

echo 'export TOTAL_TESTS='$total_tests >> $BASH_ENV
echo 'export PASSED_TESTS='$passed_tests >> $BASH_ENV
echo 'export FAILED_TESTS='$failed_tests >> $BASH_ENV
echo 'export SKIPPED_TESTS='$skipped_tests >> $BASH_ENV
echo 'export DURATION='$duration >> $BASH_ENV
