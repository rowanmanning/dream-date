'use strict';

const assert = require('proclaim');
const HarptosDate = require('../../../calendar/harptos-common');

describe('included harptos-common calendar', () => {

	const tests = [
		{
			input: 0,
			expect: {
				isLeapYear: true,
				YY: '1DR',
				M: '1',
				D: '1'
			}
		}
	];

	for (const [index, test] of Object.entries(tests)) {
		describe(`date #${index} (input ${test.input})`, () => {
			let date;

			before(() => {
				date = new HarptosDate(test.input);
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
