'use strict';

const assert = require('proclaim');
const DateSystemOdreianDate = require('../../calendar/odreian');
const OdreianDate = require('odreian-date');

describe('OdreianDate compatibility', () => {

	// Defined timestamps
	const timestamps = [
		0,
		48848033583
	];

	// Random timestamps
	while (timestamps.length < 1000) {
		timestamps.push(Math.floor(Math.random() * 70000000000) + 1);
	}

	// Properties to test equality on
	const properties = [
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

	for (const timestamp of timestamps) {
		describe(`date created with timestamp ${timestamp}`, () => {
			const odreianDate = new OdreianDate(timestamp);
			const dateSystemDate = new DateSystemOdreianDate(timestamp);
			for (const property of properties) {
				it(`has a matching \`${property}\` property`, () => {

					// We have to remove some punctuation
					const odreianValue = `${odreianDate[property]}`.replace(/,/g, '');

					assert.strictEqual(odreianValue, dateSystemDate[property]);
				});
			}
		});
	}

});
