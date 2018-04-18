'use strict';

// This tests basic functionality but with drifting of
// week days. years/months are short so that it's easy
// to manually verify that timestamps are correct

// The calendar schema
exports.schema = {
	calendar: {
		year: {
			months: [
				{
					name: 'Month1',
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
const year = day * 5;

// The tests
exports.tests = [

	// Test week drifting
	{
		inputs: [
			[0],
			[1, 1, 1, 0, 0, 0]
		],
		expect: {
			dateIndex: 0,
			date: 1,
			dayIndex: 0
		}
	},
	{
		inputs: [
			[(day)],
			[1, 1, 2, 0, 0, 0]
		],
		expect: {
			dateIndex: 1,
			date: 2,
			dayIndex: 1
		}
	},
	{
		inputs: [
			[(day * 2)],
			[1, 1, 3, 0, 0, 0]
		],
		expect: {
			dateIndex: 2,
			date: 3,
			dayIndex: 2
		}
	},
	{
		inputs: [
			[(day * 3)],
			[1, 1, 4, 0, 0, 0]
		],
		expect: {
			dateIndex: 3,
			date: 4,
			dayIndex: 0
		}
	},
	{
		inputs: [
			[(day * 4)],
			[1, 1, 5, 0, 0, 0]
		],
		expect: {
			dateIndex: 4,
			date: 5,
			dayIndex: 1
		}
	},
	{
		inputs: [
			[(day * 5)],
			[2, 1, 1, 0, 0, 0]
		],
		expect: {
			dateIndex: 0,
			date: 1,
			dayIndex: 2
		}
	}

];
