'use strict';

// Lunar cycle length
// http://forgottenrealms.wikia.com/wiki/Sel%C3%BBne_(moon)
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const lunarCycleLength = (day * 30) + (hour * 10) + (minute * 30);

module.exports = {
	calendar: {
		year: {
			leapYearFrequency: 4,
			months: [
				{
					name: 'Hammer',
					days: 30
				},
				{
					name: 'Midwinter',
					days: 1
				},
				{
					name: 'Alturiak',
					days: 30
				},
				{
					name: 'Ches',
					days: 30
				},
				{
					name: 'Tarsakh',
					days: 30
				},
				{
					name: 'Greengrass',
					days: 1
				},
				{
					name: 'Mirtul',
					days: 30
				},
				{
					name: 'Kythorn',
					days: 30
				},
				{
					name: 'Flamerule',
					days: 30
				},
				{
					name: 'Midsummer',
					days: 1
				},
				{
					name: 'Shieldmeet',
					days: 0,
					daysInLeapYear: 1
				},
				{
					name: 'Eleasis',
					days: 30
				},
				{
					name: 'Eleint',
					days: 30
				},
				{
					name: 'Highharvestide',
					days: 1
				},
				{
					name: 'Marpenoth',
					days: 30
				},
				{
					name: 'Uktar',
					days: 30
				},
				{
					name: 'Feast of the Moon',
					days: 1
				},
				{
					name: 'Nightal',
					days: 30
				}
			]
		},
		week: {
			days: []
		}
	},
	periods: [
		{
			name: 'Dale Reckoning',
			abbr: 'DR',
			startYear: 1
		}
	],
	moons: [
		{
			name: 'Selune',
			secondsInCycle: lunarCycleLength
		}
	]
};
