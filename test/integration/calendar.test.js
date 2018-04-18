'use strict';

const assert = require('proclaim');
const fs = require('fs');
const takeMeOnMyDreamDate = require('../..');

describe('calendar', () => {

	for (const filePath of fs.readdirSync(`${__dirname}/fixtures/schema`)) {
		const fileName = filePath.replace('.js', '');
		const {schema, tests} = require(`./fixtures/schema/${fileName}`);
		const CustomDate = takeMeOnMyDreamDate(schema);

		describe(`${fileName} schema`, () => {
			for (const [index, test] of Object.entries(tests)) {
				describe(`date #${index} (input ${test.input})`, () => {
					let date;

					before(() => {
						date = new CustomDate(test.input);
					});

					for (const [property, expectedValue] of Object.entries(test.expect)) {
						it(`has the correct \`${property}\` property`, () => {
							if (typeof expectedValue === 'object' && expectedValue !== null) {
								assert.deepEqual(date[property], expectedValue);
							} else {
								assert.strictEqual(date[property], expectedValue);
							}
						});
					}

				});
			}
		});
	}

});
