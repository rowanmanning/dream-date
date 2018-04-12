'use strict';

const validateCalendarSchema = require('./validate-calendar-schema');

function assertCalendarSchemaValidity(calendar) {
	const issues = validateCalendarSchema(calendar);
	if (issues.length) {
		throw createValidityError(issues);
	}
}

function createValidityError(issues) {
	const error = new Error('Calendar schema is invalid');
	error.detail = issues.map(formatCalendarIssue).join(',\n');
	error.fullDetail = issues;
	return error;
}

function formatCalendarIssue(issue) {
	return `Property ${issue.dataPath}: ${issue.message}`;
}

module.exports = assertCalendarSchemaValidity;
