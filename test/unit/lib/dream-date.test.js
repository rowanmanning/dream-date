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

		describe('.add(components)', () => {

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
				sinon.stub(date, 'yearIndex').get(() => 4);
				date.timestamp = 500000;
			});

			it('creates a new date object', () => {
				const added = date.add({});
				assert.instanceOf(added, DreamDate);
				assert.notStrictEqual(added, date);
			});

			describe('when the year component is positive', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						year: 3
					}).timestamp;
					assert.calledThrice(DreamDate.secondsInYear);
					assert.calledWithExactly(DreamDate.secondsInYear, 4);
					assert.calledWithExactly(DreamDate.secondsInYear, 5);
					assert.calledWithExactly(DreamDate.secondsInYear, 6);
					assert.strictEqual(timestamp, 800000);
				});

			});

			describe('when the year component is negative', () => {

				it('decrements the timestamp by the correct amount', () => {
					const timestamp = date.add({
						year: -3
					}).timestamp;
					assert.calledThrice(DreamDate.secondsInYear);
					assert.calledWithExactly(DreamDate.secondsInYear, 4);
					assert.calledWithExactly(DreamDate.secondsInYear, 3);
					assert.calledWithExactly(DreamDate.secondsInYear, 2);
					assert.strictEqual(timestamp, 200000);
				});

			});

			describe('when the week component is positive', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						week: 1
					}).timestamp;
					assert.strictEqual(timestamp, 510000);
				});

			});

			describe('when the week component is negative', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						week: -1
					}).timestamp;
					assert.strictEqual(timestamp, 490000);
				});

			});

			describe('when the day component is positive', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						day: 1
					}).timestamp;
					assert.strictEqual(timestamp, 501000);
				});

			});

			describe('when the day component is negative', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						day: -1
					}).timestamp;
					assert.strictEqual(timestamp, 499000);
				});

			});

			describe('when the hour component is positive', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						hour: 1
					}).timestamp;
					assert.strictEqual(timestamp, 500100);
				});

			});

			describe('when the hour component is negative', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						hour: -1
					}).timestamp;
					assert.strictEqual(timestamp, 499900);
				});

			});

			describe('when the minute component is positive', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						minute: 1
					}).timestamp;
					assert.strictEqual(timestamp, 500010);
				});

			});

			describe('when the minute component is negative', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						minute: -1
					}).timestamp;
					assert.strictEqual(timestamp, 499990);
				});

			});

			describe('when the second component is positive', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						second: 1
					}).timestamp;
					assert.strictEqual(timestamp, 500001);
				});

			});

			describe('when the second component is negative', () => {

				it('increments the timestamp by the correct amount', () => {
					const timestamp = date.add({
						second: -1
					}).timestamp;
					assert.strictEqual(timestamp, 499999);
				});

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
