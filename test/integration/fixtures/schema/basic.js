'use strict';

// This tests the absolute basic functionality. It
// has no leap years, no drifting of week days, and
// years/months are short so that it's easy to manually
// verify that timestamps are correct

// The calendar schema
exports.schema = {
	calendar: {
		year: {
			months: [
				{
					name: 'Month1',
					days: 5
				},
				{
					name: 'Month2',
					days: 5
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
const year = day * 15;

// The tests
exports.tests = [

	// Test basic year/month/date increments
	{
		input: 0,
		expect: {
			yearIndex: 0,
			year: 1,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1,
			dayIndex: 0,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0
		}
	},
	{
		input: (year),
		expect: {
			yearIndex: 1,
			year: 2,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1,
			dayIndex: 0,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0
		}
	},
	{
		input: (year) + (month * 2),
		expect: {
			yearIndex: 1,
			year: 2,
			monthIndex: 2,
			month: 3,
			dateIndex: 0,
			date: 1,
			dayIndex: 0,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0
		}
	},
	{
		input: (year) + (month * 2) + (day * 3),
		expect: {
			yearIndex: 1,
			year: 2,
			monthIndex: 2,
			month: 3,
			dateIndex: 3,
			date: 4,
			dayIndex: 3,
			day: 4,
			hour: 0,
			minute: 0,
			second: 0
		}
	},

	// Test the last and first second of a day
	{
		input: (hour * 23) + (minute * 59) + (second * 59),
		expect: {
			dateIndex: 0,
			date: 1,
			dayIndex: 0,
			day: 1,
			hour: 23,
			minute: 59,
			second: 59
		}
	},
	{
		input: (hour * 24) + (minute * 0) + (second * 0),
		expect: {
			dateIndex: 1,
			date: 2,
			dayIndex: 1,
			day: 2,
			hour: 0,
			minute: 0,
			second: 0
		}
	},

	// Test the last and first second of a month
	{
		input: (day * 4) + (hour * 23) + (minute * 59) + (second * 59),
		expect: {
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
			monthIndex: 1,
			month: 2,
			hour: 0,
			minute: 0,
			second: 0
		}
	},

	// Test the last and first second of a year
	{
		input: (day * 14) + (hour * 23) + (minute * 59) + (second * 59),
		expect: {
			yearIndex: 0,
			year: 1,
			hour: 23,
			minute: 59,
			second: 59
		}
	},
	{
		input: (day * 14) + (hour * 24) + (minute * 0) + (second * 0),
		expect: {
			yearIndex: 1,
			year: 2,
			hour: 0,
			minute: 0,
			second: 0
		}
	}
];
