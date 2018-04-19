'use strict';

const assert = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/dream-date-formatter', () => {
	let DreamDateFormatter;
	let ordinal;

	beforeEach(() => {
		ordinal = sinon.stub().returns('mock-ordinal');
		mockery.registerMock('@quarterto/ordinal', ordinal);
		DreamDateFormatter = require('../../../lib/dream-date-formatter');
	});

	it('exports a class constructor', () => {
		assert.isFunction(DreamDateFormatter);
		assert.throws(() => DreamDateFormatter(), /cannot be invoked without/);
		assert.doesNotThrow(() => new DreamDateFormatter());
	});

	describe('new DreamDateFormatter()', () => {
		let date;

		beforeEach(() => {
			date = new DreamDateFormatter();
		});

		describe('.format`template`', () => {
			let returnValue;

			beforeEach(() => {
				date.template = sinon.stub().returns('mock-template');
				returnValue = date.format`the ${'D'} of ${'MMM'}`;
			});

			it('it calls the `template` method with the expected arguments', () => {
				assert.calledOnce(date.template);
				assert.calledWithExactly(date.template, ['the ', ' of ', ''], 'D', 'MMM');
			});

			it('returns the templated string', () => {
				assert.strictEqual(returnValue, 'mock-template');
			});

		});

		describe('.format(string)', () => {
			it('exists');
		});

		describe('.template`template`', () => {

			it('returns the requested properties as a string', () => {
				date.date = '1';
				date.monthName = 'Month1';
				assert.strictEqual(date.template`the ${'D'} of ${'MMM'}`, 'the 1 of Month1');
			});

		});

		describe('.Y', () => {

			it('is set to the absolute year', () => {
				date.year = 123;
				assert.strictEqual(date.Y, '123');
			});

		});

		describe('.YY', () => {

			it('is set to the year and period abbreviations', () => {
				date.periodAbbreviations = ['PA', 'PB'];
				date.periodYears = [1, 2];
				assert.strictEqual(date.YY, '1PA/2PB');

				date.periodAbbreviations = ['PA'];
				date.periodYears = [100];
				assert.strictEqual(date.YY, '100PA');

				date.year = 123;
				date.periodAbbreviations = [];
				date.periodYears = [];
				assert.strictEqual(date.YY, '123');
			});

		});

		describe('.YYY', () => {

			it('is set to the year and period names', () => {
				date.periodNames = ['PeriodA', 'PeriodB'];
				date.periodYears = [1, 2];
				assert.strictEqual(date.YYY, '1 PeriodA/2 PeriodB');

				date.periodNames = ['PeriodA'];
				date.periodYears = [100];
				assert.strictEqual(date.YYY, '100 PeriodA');

				date.year = 123;
				date.periodNames = [];
				date.periodYears = [];
				assert.strictEqual(date.YYY, '123');
			});

		});

		describe('.YYYY', () => {

			it('is set to the year and period long names', () => {
				date.periodLongNames = ['LongPeriodA', 'LongPeriodB'];
				date.periodYears = [1, 2];
				assert.strictEqual(date.YYYY, '1 LongPeriodA/2 LongPeriodB');

				date.periodLongNames = ['LongPeriodA'];
				date.periodYears = [100];
				assert.strictEqual(date.YYYY, '100 LongPeriodA');

				date.year = 123;
				date.periodLongNames = [];
				date.periodYears = [];
				assert.strictEqual(date.YYYY, '123');
			});

		});

		describe('.M', () => {

			it('is set to the numeric month', () => {
				date.month = 123;
				assert.strictEqual(date.M, '123');
			});

		});

		describe('.Mz', () => {

			it('is set to the padded month', () => {
				date.monthPadded = '01';
				assert.strictEqual(date.Mz, '01');
			});

		});

		describe('.Mo', () => {

			it('is set to the the numeric month with an ordinal suffix', () => {
				date.month = 123;
				assert.strictEqual(date.Mo, '123mock-ordinal');
			});

		});

		describe('.MM', () => {

			it('is set to the month abbreviated name', () => {
				date.monthAbbreviation = 'mock-abbreviated-month';
				assert.strictEqual(date.MM, 'mock-abbreviated-month');
			});

		});

		describe('.MMM', () => {

			it('is set to the month name', () => {
				date.monthName = 'mock-month';
				assert.strictEqual(date.MMM, 'mock-month');
			});

		});

		describe('.MMMM', () => {

			it('is set to the month long name', () => {
				date.monthLongName = 'mock-long-month';
				assert.strictEqual(date.MMMM, 'mock-long-month');
			});

		});

		describe('.D', () => {

			it('is set to the numeric date', () => {
				date.date = 123;
				assert.strictEqual(date.D, '123');
			});

		});

		describe('.Dz', () => {

			it('is set to the padded date', () => {
				date.datePadded = '01';
				assert.strictEqual(date.Dz, '01');
			});

		});

		describe('.Do', () => {

			it('is set to the numeric date with an ordinal suffix', () => {
				date.date = 123;
				assert.strictEqual(date.Do, '123mock-ordinal');
			});

		});

		describe('.d', () => {

			it('is set to the current day of the week\'s index', () => {
				date.dayIndex = 123;
				assert.strictEqual(date.d, '123');
			});

		});

		describe('.dd', () => {

			it('is set to the day abbreviated name', () => {
				date.dayAbbreviation = 'mock-abbreviated-day';
				assert.strictEqual(date.dd, 'mock-abbreviated-day');
			});

		});

		describe('.ddd', () => {

			it('is set to the day name', () => {
				date.dayName = 'mock-day';
				assert.strictEqual(date.ddd, 'mock-day');
			});

		});

		describe('.dddd', () => {

			it('is set to the day long name', () => {
				date.dayLongName = 'mock-long-day';
				assert.strictEqual(date.dddd, 'mock-long-day');
			});

		});

		describe('.H', () => {

			it('is set to the numeric hour', () => {
				date.hour = 12;
				assert.strictEqual(date.H, '12');
			});

		});

		describe('.Hz', () => {

			it('is set to the padded hour', () => {
				date.hourPadded = '01';
				assert.strictEqual(date.Hz, '01');
			});

		});

		describe('.HH', () => {

			it('is an alias for `Hz`', () => {
				sinon.stub(date, 'Hz').get(() => '01');
				assert.strictEqual(date.HH, '01');
			});

		});

		describe('.h', () => {

			it('is set to the numeric hour in meridiem', () => {
				date.hourInMeridiem = 12;
				assert.strictEqual(date.h, '12');
			});

		});

		describe('.a', () => {

			it('is set to the meridiem name', () => {
				date.meridiem = 'mock-meridiem';
				assert.strictEqual(date.a, 'mock-meridiem');
			});

		});

		describe('.m', () => {

			it('is set to the numeric minute', () => {
				date.minute = 123;
				assert.strictEqual(date.m, '123');
			});

		});

		describe('.mz', () => {

			it('is set to the padded minute', () => {
				date.minutePadded = '01';
				assert.strictEqual(date.mz, '01');
			});

		});

		describe('.mm', () => {

			it('is an alias for `mz`', () => {
				sinon.stub(date, 'mz').get(() => '01');
				assert.strictEqual(date.mm, '01');
			});

		});

		describe('.s', () => {

			it('is set to the numeric second', () => {
				date.second = 123;
				assert.strictEqual(date.s, '123');
			});

		});

		describe('.sz', () => {

			it('is set to the padded second', () => {
				date.secondPadded = '01';
				assert.strictEqual(date.sz, '01');
			});

		});

		describe('.ss', () => {

			it('is an alias for `sz`', () => {
				sinon.stub(date, 'sz').get(() => '01');
				assert.strictEqual(date.ss, '01');
			});

		});

		describe('.PD', () => {

			it('is set to a parsable date string', () => {
				sinon.stub(date, 'YY').get(() => '1PA/2PB');
				sinon.stub(date, 'Mz').get(() => '05');
				sinon.stub(date, 'Dz').get(() => '07');
				assert.strictEqual(date.PD, '1PA/2PB-05-07');
			});

		});

		describe('.PT', () => {

			it('is set to a parsable time string', () => {
				sinon.stub(date, 'Hz').get(() => '08');
				sinon.stub(date, 'mz').get(() => '09');
				sinon.stub(date, 'sz').get(() => '10');
				assert.strictEqual(date.PT, '08:09:10');
			});

		});

		describe('.P', () => {

			it('is set to a parsable date/time string', () => {
				sinon.stub(date, 'PD').get(() => '1PA/2PB-05-07');
				sinon.stub(date, 'PT').get(() => '08:09:10');
				assert.strictEqual(date.P, '1PA/2PB-05-07 08:09:10');
			});

		});

	});

});
