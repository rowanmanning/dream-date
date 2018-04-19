'use strict';

// This tests that periods are calculated correctly. It
// has overlapping periods, gaps in time which no period
// covers, and a period with no end


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
	},
	periods: [
		{
			name: 'Period1',
			abbr: 'PR1',
			startYear: 1,
			endYear: 3
		},
		{
			name: 'Period2',
			abbr: 'PR2',
			startYear: 3,
			endYear: 7
		},
		{
			name: 'Period3',
			abbr: 'PR3',
			startYear: 5,
			endYear: 7
		},
		{
			name: 'Period4',
			abbr: 'PR4',
			startYear: 10,
			endYear: 12
		},
		{
			name: 'Period5',
			abbr: 'PR5',
			startYear: 13
		}
	]
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
		inputs: [
			[0],
			[1, 1, 1, 0, 0, 0],
			['1-01-01 00:00:00'],
			['1PR1-01-01 00:00:00']
		],
		expect: {
			yearIndex: 0,
			year: 1,
			periodIndices: [0],
			periodNames: ['Period1'],
			periodAbbreviations: ['PR1'],
			periodYears: [1]
		}
	},
	{
		inputs: [
			[(year * 2)],
			[3, 1, 1, 0, 0, 0],
			['3-01-01 00:00:00'],
			['3PR1-01-01 00:00:00'],
			['1PR2-01-01 00:00:00'],
			['3PR1/1PR2-01-01 00:00:00'],
			['1PR2/3PR1-01-01 00:00:00']
		],
		expect: {
			yearIndex: 2,
			year: 3,
			periodIndices: [0, 1],
			periodNames: ['Period1', 'Period2'],
			periodAbbreviations: ['PR1', 'PR2'],
			periodYears: [3, 1]
		}
	},
	{
		inputs: [
			[(year * 3)],
			[4, 1, 1, 0, 0, 0],
			['4-01-01 00:00:00'],
			['2PR2-01-01 00:00:00']
		],
		expect: {
			yearIndex: 3,
			year: 4,
			periodIndices: [1],
			periodNames: ['Period2'],
			periodAbbreviations: ['PR2'],
			periodYears: [2]
		}
	},
	{
		inputs: [
			[(year * 4)],
			[5, 1, 1, 0, 0, 0],
			['5-01-01 00:00:00'],
			['3PR2-01-01 00:00:00'],
			['1PR3-01-01 00:00:00'],
			['3PR2/1PR3-01-01 00:00:00'],
			['1PR3/3PR2-01-01 00:00:00']
		],
		expect: {
			yearIndex: 4,
			year: 5,
			periodIndices: [1, 2],
			periodNames: ['Period2', 'Period3'],
			periodAbbreviations: ['PR2', 'PR3'],
			periodYears: [3, 1]
		}
	},
	{
		inputs: [
			[(year * 8)],
			[9, 1, 1, 0, 0, 0],
			['9-01-01 00:00:00']
		],
		expect: {
			yearIndex: 8,
			year: 9,
			periodIndices: [],
			periodNames: [],
			periodAbbreviations: [],
			periodYears: []
		}
	},
	{
		inputs: [
			[(year * 11)],
			[12, 1, 1, 0, 0, 0],
			['12-01-01 00:00:00'],
			['3PR4-01-01 00:00:00']
		],
		expect: {
			yearIndex: 11,
			year: 12,
			periodIndices: [3],
			periodNames: ['Period4'],
			periodAbbreviations: ['PR4'],
			periodYears: [3]
		}
	},
	{
		inputs: [
			[(year * 12)],
			[13, 1, 1, 0, 0, 0],
			['13-01-01 00:00:00'],
			['1PR5-01-01 00:00:00']
		],
		expect: {
			yearIndex: 12,
			year: 13,
			periodIndices: [4],
			periodNames: ['Period5'],
			periodAbbreviations: ['PR5'],
			periodYears: [1]
		}
	}
];
