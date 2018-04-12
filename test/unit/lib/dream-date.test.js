'use strict';

const assert = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/dream-date', () => {
	let DreamDate;
	let DreamDateFormatter;

	beforeEach(() => {
		DreamDateFormatter = class MockDreamDateFormatter {};
		mockery.registerMock('./dream-date-formatter', DreamDateFormatter);
		DreamDate = require('../../../lib/dream-date');
	});

	it('exports a class constructor', () => {
		assert.isFunction(DreamDate);
		assert.throws(() => DreamDate(0), /cannot be invoked without/);
		assert.doesNotThrow(() => new DreamDate(0));
	});

	describe('new DreamDate()', () => {
		let calendar;

		beforeEach(() => {
			calendar = new DreamDate(0);
		});

		it('extends DreamDateFormatter', () => {
			assert.instanceOf(calendar, DreamDateFormatter);
		});

		describe('.timestamp', () => {

			it('is set to `0`', () => {
				assert.strictEqual(calendar.timestamp, 0);
			});

		});

		describe('.hour', () => {

			it('is set to the number of minutes in the timestamp', () => {
				DreamDate.schema = {
					conversions: {
						secondsInDay: 86400,
						secondsInHour: 3600
					}
				};
				calendar.timestamp = 93725;
				assert.strictEqual(calendar.hour, 2);
			});

		});

		describe('.hourInMeridiem', () => {

			beforeEach(() => {
				DreamDate.schema = {
					conversions: {
						hoursInHalfDay: 12
					}
				};
			});

			describe('when `.hour` is before the meridiem', () => {

				it('is set to the correct hour', () => {
					sinon.stub(calendar, 'hour').get(() => 8);
					assert.strictEqual(calendar.hourInMeridiem, 8);
				});

			});

			describe('when `.hour` is after the meridiem', () => {

				it('is set to the correct meridiem label', () => {
					sinon.stub(calendar, 'hour').get(() => 18);
					assert.strictEqual(calendar.hourInMeridiem, 6);
				});

			});

		});

		describe('.meridiem', () => {

			beforeEach(() => {
				DreamDate.schema = {
					calendar: {
						time: {
							anteMeridiemLabel: 'am',
							postMeridiemLabel: 'pm'
						}
					},
					conversions: {
						hoursInHalfDay: 12
					}
				};
			});

			describe('when `.hour` is before the meridiem', () => {

				it('is set to the correct meridiem label', () => {
					sinon.stub(calendar, 'hour').get(() => 8);
					assert.strictEqual(calendar.meridiem, 'am');
				});

			});

			describe('when `.hour` is after the meridiem', () => {

				it('is set to the correct meridiem label', () => {
					sinon.stub(calendar, 'hour').get(() => 18);
					assert.strictEqual(calendar.meridiem, 'pm');
				});

			});

		});

		describe('.minute', () => {

			it('is set to the number of minutes in the timestamp', () => {
				DreamDate.schema = {
					conversions: {
						secondsInHour: 3600,
						secondsInMinute: 60
					}
				};
				calendar.timestamp = 3725;
				assert.strictEqual(calendar.minute, 2);
			});

		});

		describe('.second', () => {

			it('is set to the number of seconds in the timestamp', () => {
				DreamDate.schema = {
					conversions: {
						secondsInMinute: 60
					}
				};
				calendar.timestamp = 65;
				assert.strictEqual(calendar.second, 5);
			});

		});

	});

});
