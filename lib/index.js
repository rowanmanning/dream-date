'use strict';

const applyCalendarSchemaDefaults = require('./validation/apply-calendar-schema-defaults');
const assertCalendarSchemaValidity = require('./validation/assert-calendar-schema-validity');
const DreamDateBase = require('./dream-date');

function takeMeOnMyDreamDate(calendarSchema) {

	// Validate the input calendar schema
	assertCalendarSchemaValidity(calendarSchema);
	calendarSchema = applyCalendarSchemaDefaults(calendarSchema);

	// Create and return a custom calendar
	class DreamDate extends DreamDateBase {}
	DreamDate.schema = calendarSchema;
	return DreamDate;

}

module.exports = takeMeOnMyDreamDate;
