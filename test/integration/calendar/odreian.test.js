'use strict';

const assert = require('proclaim');
const OdreianDate = require('../../../calendar/odreian');
const OriginalOdreianDate = require('odreian-date');

// Note: these tests are different to the others
// as we have an already-existing date library to
// compare against
describe('included odreian calendar', () => {

	const testTimestamps = [
		0,
		48848033583
	];
	while (testTimestamps.length < 100) {
		// Magic number which is a fair few years later than the
		// current date in The Broken Crown
		testTimestamps.push(Math.floor(Math.random() * 70000000000) + 1);
	}

	const testProperties = [
		'YY',
		'YYYY',
		'M',
		'Mo',
		'MM',
		'MMMM',
		'D',
		'Do',
		'd',
		'dddd',
		'H',
		'h',
		'a',
		'mm',
		'ss'
	];

	for (const [index, input] of Object.entries(testTimestamps)) {
		describe(`date #${index} (input ${input})`, () => {
			let date;
			let originalDate;

			before(() => {
				date = new OdreianDate(input);
				originalDate = new OriginalOdreianDate(input);
			});

			for (const property of testProperties) {
				it(`has the correct \`${property}\` property`, () => {
					// Punctuation doesn't match exactly, so we strip it
					// (we also drop the "the")
					const odreianValue = `${originalDate[property]}`.replace(/(,|the )/ig, '')
					assert.strictEqual(odreianValue, date[property]);
				});
			}

		});
	}

});
