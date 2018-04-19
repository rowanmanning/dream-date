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
		let date;

		beforeEach(() => {
			date = new DreamDate(0);
		});

		it('extends DreamDateFormatter', () => {
			assert.instanceOf(date, DreamDateFormatter);
		});

		xdescribe('.add(components)', () => {

			beforeEach(() => {
				DreamDate.schema = {
					conversions: {
						secondsInWeek: 10000,
						secondsInDay: 1000,
						secondsInHour: 100,
						secondsInMinute: 10
					}
				};
				DreamDate.secondsInYear = sinon.stub().returns(100000);
				sinon.stub(date, 'yearIndex').get(() => 10);
				date.timestamp = 500000;
			});

			it('creates a new date object', () => {
				const added = date.add({});
				assert.instanceOf(added, DreamDate);
				assert.notStrictEqual(added, date);
			});

		});

		describe('.timestamp', () => {

			it('is set to `0`', () => {
				assert.strictEqual(date.timestamp, 0);
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
				date.timestamp = 93725;
				assert.strictEqual(date.hour, 2);
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
					sinon.stub(date, 'hour').get(() => 8);
					assert.strictEqual(date.hourInMeridiem, 8);
				});

			});

			describe('when `.hour` is after the meridiem', () => {

				it('is set to the correct meridiem label', () => {
					sinon.stub(date, 'hour').get(() => 18);
					assert.strictEqual(date.hourInMeridiem, 6);
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
					sinon.stub(date, 'hour').get(() => 8);
					assert.strictEqual(date.meridiem, 'am');
				});

			});

			describe('when `.hour` is after the meridiem', () => {

				it('is set to the correct meridiem label', () => {
					sinon.stub(date, 'hour').get(() => 18);
					assert.strictEqual(date.meridiem, 'pm');
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
				date.timestamp = 3725;
				assert.strictEqual(date.minute, 2);
			});

		});

		describe('.second', () => {

			it('is set to the number of seconds in the timestamp', () => {
				DreamDate.schema = {
					conversions: {
						secondsInMinute: 60
					}
				};
				date.timestamp = 65;
				assert.strictEqual(date.second, 5);
			});

		});

	});

});
