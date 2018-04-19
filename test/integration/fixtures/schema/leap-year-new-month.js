'use strict';

// This tests leap-year functionality where the leap
// days appear in a new month, with no offset and only
// two day added. It also doesn't test any drifting
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
					name: 'Special',
					days: 0,
					daysInLeapYear: 2
				}
			]
		},
		week: {
			days: [
				{
					name: 'Day1'
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
const leapMonth = day * 2;
const year = day * 5;
const leapYear = day * 7;

// The tests
exports.tests = [

	// Test basic year/month/date increments
	{
		inputs: [
			[0],
			[1, 1, 1, 0, 0, 0],
			['1-01-01 00:00:00']
		],
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
		inputs: [
			[(leapYear)],
			[2, 1, 1, 0, 0, 0],
			['2-01-01 00:00:00']
		],
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
		inputs: [
			[(leapYear + year)],
			[3, 1, 1, 0, 0, 0],
			['3-01-01 00:00:00']
		],
		expect: {
			yearIndex: 2,
			year: 3,
			isLeapYear: false,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1
		}
	},

	// Test specific days for leap year
	{
		inputs: [
			[(day * 4)],
			[1, 1, 5, 0, 0, 0],
			['1-01-05 00:00:00']
		],
		expect: {
			yearIndex: 0,
			year: 1,
			isLeapYear: true,
			monthIndex: 0,
			month: 1,
			dateIndex: 4,
			date: 5
		}
	},
	{
		inputs: [
			[(day * 5)],
			[1, 2, 1, 0, 0, 0]
		],
		expect: {
			yearIndex: 0,
			year: 1,
			isLeapYear: true,
			monthIndex: 1,
			month: 2,
			dateIndex: 0,
			date: 1
		}
	},

	// Test specific days for non leap year
	{
		inputs: [
			[(leapYear) + (day * 4)],
			[2, 1, 5, 0, 0, 0],
			['2-01-05 00:00:00']
		],
		expect: {
			yearIndex: 1,
			year: 2,
			isLeapYear: false,
			monthIndex: 0,
			month: 1,
			dateIndex: 4,
			date: 5
		}
	},
	{
		inputs: [
			[(leapYear) + (day * 5)],
			[3, 1, 1, 0, 0, 0],
			['3-01-01 00:00:00']
		],
		expect: {
			yearIndex: 2,
			year: 3,
			isLeapYear: false,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1
		}
	}
];
