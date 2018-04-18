'use strict';

// This tests basic functionality with lunar cycles.
// There are no leap years, no drifting of week days,
// and years/months are short so that it's easy to
// manually verify that timestamps are correct

// The calendar schema
exports.schema = {
	calendar: {
		year: {
			months: [
				{
					name: 'Month1',
					days: 40
				}
			]
		},
		week: {
			days: []
		}
	},
	moons: [
		{
			name: 'Moon1',
			secondsInCycle: (60 * 60 * 24 * 40)
		},
		{
			name: 'Moon2',
			secondsInCycle: (60 * 60 * 24 * 20)
		}
	]
};

// Helpers
const second = 1;
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 40;
const year = month;

// The tests
exports.tests = [

	// Test moon phases
	{
		inputs: [
			[0],
			[1, 1, 1, 0, 0, 0]
		],
		expect: {
			moonPhaseIndices: {
				Moon1: 0,
				Moon2: 0
			},
			moonPhases: {
				Moon1: 1,
				Moon2: 1
			},
			moonPhaseNames: {
				Moon1: 'Full',
				Moon2: 'Full'
			}
		}
	},
	{
		inputs: [
			[(day * 5)],
			[1, 1, 6, 0, 0, 0]
		],
		expect: {
			moonPhaseIndices: {
				Moon1: 1,
				Moon2: 2
			},
			moonPhases: {
				Moon1: 2,
				Moon2: 3
			},
			moonPhaseNames: {
				Moon1: 'Waning Gibbous',
				Moon2: 'Last Quarter'
			}
		}
	},
	{
		inputs: [
			[(day * 10)],
			[1, 1, 11, 0, 0, 0]
		],
		expect: {
			moonPhaseIndices: {
				Moon1: 2,
				Moon2: 4
			},
			moonPhases: {
				Moon1: 3,
				Moon2: 5
			},
			moonPhaseNames: {
				Moon1: 'Last Quarter',
				Moon2: 'New'
			}
		}
	},
	{
		inputs: [
			[(day * 15)],
			[1, 1, 16, 0, 0, 0]
		],
		expect: {
			moonPhaseIndices: {
				Moon1: 3,
				Moon2: 6
			},
			moonPhases: {
				Moon1: 4,
				Moon2: 7
			},
			moonPhaseNames: {
				Moon1: 'Waning Cresent',
				Moon2: 'First Quarter'
			}
		}
	},
	{
		inputs: [
			[(day * 20)],
			[1, 1, 21, 0, 0, 0]
		],
		expect: {
			moonPhaseIndices: {
				Moon1: 4,
				Moon2: 0
			},
			moonPhases: {
				Moon1: 5,
				Moon2: 1
			},
			moonPhaseNames: {
				Moon1: 'New',
				Moon2: 'Full'
			}
		}
	}

];
