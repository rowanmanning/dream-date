'use strict';

const applyCalendarSchemaDefaults = require('./validation/apply-calendar-schema-defaults');
const assertCalendarSchemaValidity = require('./validation/assert-calendar-schema-validity');
const DreamDate = require('./dream-date');

function takeMeOnMyDreamDate(calendarSchema) {

	// Validate the input calendar schema
	assertCalendarSchemaValidity(calendarSchema);
	calendarSchema = applyCalendarSchemaDefaults(calendarSchema);

	// Create and return a custom calendar
	class CustomDate extends DreamDate {}
	CustomDate.schema = calendarSchema;
	return CustomDate;

}

module.exports = takeMeOnMyDreamDate;
