'use strict';

const assert = require('proclaim');
const GregorianDate = require('../../../calendar/gregorian');

describe('included gregorian calendar', () => {

	const tests = [
		{
			input: 0,
			expect: {
				isLeapYear: true,
				YY: '1AD',
				M: '1',
				D: '1'
			}
		}
	];

	for (const [index, test] of Object.entries(tests)) {
		describe(`date #${index} (input ${test.input})`, () => {
			let date;

			before(() => {
				date = new GregorianDate(test.input);
			});

			for (const [property, expectedValue] of Object.entries(test.expect)) {
				it(`has the correct \`${property}\` property`, () => {
					if (Array.isArray(expectedValue)) {
						assert.deepEqual(date[property], expectedValue);
					} else {
						assert.strictEqual(date[property], expectedValue);
					}
				});
			}

		});
	}

});
