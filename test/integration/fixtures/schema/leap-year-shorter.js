'use strict';

// This tests basic leap-year functionality, with
// no offset and only one day removed in a month that
// already exists. It also doesn't test any drifting
// of weekdays

// The calendar schema
exports.schema = {
	calendar: {
		year: {
			leapYearFrequency: 4,
			months: [
				{
					name: 'Month1',
					days: 5
				},
				{
					name: 'Month2',
					days: 5,
					daysInLeapYear: 4
				},
				{
					name: 'Month3',
					days: 5
				}
			]
		},
		week: {
			days: [
				{
					name: 'Day1'
				},
				{
					name: 'Day2'
				},
				{
					name: 'Day3'
				},
				{
					name: 'Day4'
				},
				{
					name: 'Day5'
				}
			]
		}
	}
};

// Helpers
const second = 1;
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 5;
const leapMonth = month - day;
const year = day * 15;
const leapYear = year - day;

// The tests
exports.tests = [

	// Test basic year/month/date increments
	{
		input: 0,
		expect: {
			yearIndex: 0,
			year: 1,
			isLeapYear: true,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1
		}
	},
	{
		input: (leapYear),
		expect: {
			yearIndex: 1,
			year: 2,
			isLeapYear: false,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1
		}
	},
	{
		input: (leapYear) + (month * 2),
		expect: {
			yearIndex: 1,
			year: 2,
			isLeapYear: false,
			monthIndex: 2,
			month: 3,
			dateIndex: 0,
			date: 1
		}
	},
	{
		input: (leapYear) + (month * 2) + (day * 3),
		expect: {
			yearIndex: 1,
			year: 2,
			isLeapYear: false,
			monthIndex: 2,
			month: 3,
			dateIndex: 3,
			date: 4
		}
	},
	{
		input: (leapYear + (year * 3)),
		expect: {
			yearIndex: 4,
			year: 5,
			isLeapYear: true,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1
		}
	},

	// Test the first and last day of a month
	// with a missing day on a leap year
	{
		input: (month) + (day * 3),
		expect: {
			isLeapYear: true,
			monthIndex: 1,
			month: 2,
			dateIndex: 3,
			date: 4
		}
	},
	{
		input: (month) + (day * 4),
		expect: {
			isLeapYear: true,
			monthIndex: 2,
			month: 3,
			dateIndex: 0,
			date: 1
		}
	},

	// Test the first and last day of a month
	// without a missing day on a non-leap year
	{
		input: (leapYear) + (month) + (day * 4),
		expect: {
			isLeapYear: false,
			monthIndex: 1,
			month: 2,
			dateIndex: 4,
			date: 5
		}
	},
	{
		input: (leapYear) + (month) + (day * 5),
		expect: {
			isLeapYear: false,
			monthIndex: 2,
			month: 3,
			dateIndex: 0,
			date: 1
		}
	},

	// Test the last and first second of a day
	{
		input: (hour * 23) + (minute * 59) + (second * 59),
		expect: {
			isLeapYear: true,
			dateIndex: 0,
			date: 1,
			hour: 23,
			minute: 59,
			second: 59
		}
	},
	{
		input: (hour * 24) + (minute * 0) + (second * 0),
		expect: {
			isLeapYear: true,
			dateIndex: 1,
			date: 2,
			hour: 0,
			minute: 0,
			second: 0
		}
	},

	// Test the last and first second of a month
	{
		input: (day * 4) + (hour * 23) + (minute * 59) + (second * 59),
		expect: {
			isLeapYear: true,
			monthIndex: 0,
			month: 1,
			hour: 23,
			minute: 59,
			second: 59
		}
	},
	{
		input: (day * 4) + (hour * 24) + (minute * 0) + (second * 0),
		expect: {
			isLeapYear: true,
			monthIndex: 1,
			month: 2,
			hour: 0,
			minute: 0,
			second: 0
		}
	},

	// Test the last and first second across a leap year
	{
		input: (day * 13) + (hour * 23) + (minute * 59) + (second * 59),
		expect: {
			isLeapYear: true,
			yearIndex: 0,
			year: 1,
			hour: 23,
			minute: 59,
			second: 59
		}
	},
	{
		input: (day * 13) + (hour * 24) + (minute * 0) + (second * 0),
		expect: {
			isLeapYear: false,
			yearIndex: 1,
			year: 2,
			hour: 0,
			minute: 0,
			second: 0
		}
	}
];
