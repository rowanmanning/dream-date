'use strict';

// This tests whether the time of day works correctly.
// It ignores pretty much everything else.

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
			days: []
		},
		time: {
			sunriseHour: 9,
			sunsetHour: 18
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

	// Test times of day
	{
		inputs: [
			[0],
			[1, 1, 1, 0, 0, 0],
			['1-01-01 00:00:00']
		],
		expect: {
			isDay: false,
			isNight: true
		}
	},
	{
		inputs: [
			[(hour * 8) + (minute * 59) + (second * 59)],
			[1, 1, 1, 8, 59, 59],
			['1-01-01 08:59:59']
		],
		expect: {
			isDay: false,
			isNight: true
		}
	},
	{
		inputs: [
			[(hour * 9)],
			[1, 1, 1, 9, 0, 0],
			['1-01-01 09:00:00']
		],
		expect: {
			isDay: true,
			isNight: false
		}
	},
	{
		inputs: [
			[(hour * 17) + (minute * 59) + (second * 59)],
			[1, 1, 1, 17, 59, 59],
			['1-01-01 17:59:59']
		],
		expect: {
			isDay: true,
			isNight: false
		}
	},
	{
		inputs: [
			[(hour * 18)],
			[1, 1, 1, 18, 0, 0],
			['1-01-01 18:00:00']
		],
		expect: {
			isDay: false,
			isNight: true
		}
	}
];
