'use strict';

const Ajv = require('ajv');

const ajv = new Ajv({
	allErrors: true
});
const validate = ajv.compile(require('../schema/calendar.json'));

function validateCalendarSchema(calendar) {
	return (validate(calendar) ? [] : validate.errors);
}

module.exports = validateCalendarSchema;
