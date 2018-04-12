'use strict';

const assert = require('proclaim');
const fs = require('fs');
const validateCalendarSchema = require('../../lib/validation/validate-calendar-schema');

describe('bundled calendars', () => {
	const calendarDirectory = `${__dirname}/../../calendar/schema`;
	for (const calendar of fs.readdirSync(calendarDirectory)) {

		describe(calendar.replace('.js', ''), () => {
			it('passes validation', () => {
				assert.deepEqual(validateCalendarSchema(require(`${calendarDirectory}/${calendar}`)), []);
			});
		});

	}
});
