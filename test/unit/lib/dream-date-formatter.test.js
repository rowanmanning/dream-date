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
		let calendar;

		beforeEach(() => {
			calendar = new DreamDateFormatter();
		});

		describe('.format`template`', () => {
			let returnValue;

			beforeEach(() => {
				calendar.template = sinon.stub().returns('mock-template');
				returnValue = calendar.format`the ${'D'} of ${'MMM'}`;
			});

			it('it calls the `template` method with the expected arguments', () => {
				assert.calledOnce(calendar.template);
				assert.calledWithExactly(calendar.template, ['the ', ' of ', ''], 'D', 'MMM');
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
				calendar.date = '1';
				calendar.monthName = 'Month1';
				assert.strictEqual(calendar.template`the ${'D'} of ${'MMM'}`, 'the 1 of Month1');
			});

		});

		describe('.Y', () => {

			it('is set to the absolute year', () => {
				calendar.year = 123;
				assert.strictEqual(calendar.Y, '123');
			});

		});

		describe('.YY', () => {

			it('is set to the year and period abbreviations', () => {
				calendar.periodAbbreviations = ['PA', 'PB'];
				calendar.periodYears = [1, 2];
				assert.strictEqual(calendar.YY, '1PA/2PB');

				calendar.periodAbbreviations = ['PA'];
				calendar.periodYears = [100];
				assert.strictEqual(calendar.YY, '100PA');

				calendar.year = 123;
				calendar.periodAbbreviations = [];
				calendar.periodYears = [];
				assert.strictEqual(calendar.YY, '123');
			});

		});

		describe('.YYY', () => {

			it('is set to the year and period names', () => {
				calendar.periodNames = ['PeriodA', 'PeriodB'];
				calendar.periodYears = [1, 2];
				assert.strictEqual(calendar.YYY, '1 PeriodA/2 PeriodB');

				calendar.periodNames = ['PeriodA'];
				calendar.periodYears = [100];
				assert.strictEqual(calendar.YYY, '100 PeriodA');

				calendar.year = 123;
				calendar.periodNames = [];
				calendar.periodYears = [];
				assert.strictEqual(calendar.YYY, '123');
			});

		});

		describe('.YYYY', () => {

			it('is set to the year and period long names', () => {
				calendar.periodLongNames = ['LongPeriodA', 'LongPeriodB'];
				calendar.periodYears = [1, 2];
				assert.strictEqual(calendar.YYYY, '1 LongPeriodA/2 LongPeriodB');

				calendar.periodLongNames = ['LongPeriodA'];
				calendar.periodYears = [100];
				assert.strictEqual(calendar.YYYY, '100 LongPeriodA');

				calendar.year = 123;
				calendar.periodLongNames = [];
				calendar.periodYears = [];
				assert.strictEqual(calendar.YYYY, '123');
			});

		});

		describe('.M', () => {

			it('is set to the numeric month', () => {
				calendar.month = 123;
				assert.strictEqual(calendar.M, '123');
			});

		});

		describe('.Mo', () => {

			it('is set to the the numeric month with an ordinal suffix', () => {
				calendar.month = 123;
				assert.strictEqual(calendar.Mo, '123mock-ordinal');
			});

		});

		describe('.MM', () => {

			it('is set to the month abbreviated name', () => {
				calendar.monthAbbreviation = 'mock-abbreviated-month';
				assert.strictEqual(calendar.MM, 'mock-abbreviated-month');
			});

		});

		describe('.MMM', () => {

			it('is set to the month name', () => {
				calendar.monthName = 'mock-month';
				assert.strictEqual(calendar.MMM, 'mock-month');
			});

		});

		describe('.MMMM', () => {

			it('is set to the month long name', () => {
				calendar.monthLongName = 'mock-long-month';
				assert.strictEqual(calendar.MMMM, 'mock-long-month');
			});

		});

		describe('.D', () => {

			it('is set to the numeric date', () => {
				calendar.date = 123;
				assert.strictEqual(calendar.D, '123');
			});

		});

		describe('.Do', () => {

			it('is set to the numeric date with an ordinal suffix', () => {
				calendar.date = 123;
				assert.strictEqual(calendar.Do, '123mock-ordinal');
			});

		});

		describe('.d', () => {

			it('is set to the current day of the week\'s index', () => {
				calendar.dayIndex = 123;
				assert.strictEqual(calendar.d, '123');
			});

		});

		describe('.dd', () => {

			it('is set to the day abbreviated name', () => {
				calendar.dayAbbreviation = 'mock-abbreviated-day';
				assert.strictEqual(calendar.dd, 'mock-abbreviated-day');
			});

		});

		describe('.ddd', () => {

			it('is set to the day name', () => {
				calendar.dayName = 'mock-day';
				assert.strictEqual(calendar.ddd, 'mock-day');
			});

		});

		describe('.dddd', () => {

			it('is set to the day long name', () => {
				calendar.dayLongName = 'mock-long-day';
				assert.strictEqual(calendar.dddd, 'mock-long-day');
			});

		});

		describe('.H', () => {

			it('is set to the numeric hour', () => {
				calendar.hour = 12;
				assert.strictEqual(calendar.H, '12');
			});

		});

		describe('.HH', () => {

			it('is set to the numeric hour with a leading zero', () => {
				calendar.hour = 8;
				assert.strictEqual(calendar.HH, '08');
				calendar.hour = 11;
				assert.strictEqual(calendar.HH, '11');
			});

		});

		describe('.h', () => {

			it('is set to the numeric hour in meridiem', () => {
				calendar.hourInMeridiem = 12;
				assert.strictEqual(calendar.h, '12');
			});

		});

		describe('.a', () => {

			it('is set to the meridiem name', () => {
				calendar.meridiem = 'mock-meridiem';
				assert.strictEqual(calendar.a, 'mock-meridiem');
			});

		});

		describe('.mm', () => {

			it('is set to the numeric minute with a leading zero', () => {
				calendar.minute = 8;
				assert.strictEqual(calendar.mm, '08');
				calendar.minute = 11;
				assert.strictEqual(calendar.mm, '11');
			});

		});

		describe('.ss', () => {

			it('is set to the numeric second with a leading zero', () => {
				calendar.second = 8;
				assert.strictEqual(calendar.ss, '08');
				calendar.second = 11;
				assert.strictEqual(calendar.ss, '11');
			});

		});


	});

});
