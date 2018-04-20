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
					long: 'Month of Hammer',
					days: 30
				},
				{
					name: 'Midwinter',
					long: 'Festival of Midwinter',
					days: 1
				},
				{
					name: 'Alturiak',
					long: 'Month of Alturiak',
					days: 30
				},
				{
					name: 'Ches',
					long: 'Month of Ches',
					days: 30
				},
				{
					name: 'Tarsakh',
					long: 'Month of Tarsakh',
					days: 30
				},
				{
					name: 'Greengrass',
					long: 'Festival of Greengrass',
					days: 1
				},
				{
					name: 'Mirtul',
					long: 'Month of Mirtul',
					days: 30
				},
				{
					name: 'Kythorn',
					long: 'Month of Kythorn',
					days: 30
				},
				{
					name: 'Flamerule',
					long: 'Month of Flamerule',
					days: 30
				},
				{
					name: 'Midsummer',
					long: 'Festival of Midsummer',
					days: 1
				},
				{
					name: 'Shieldmeet',
					long: 'Shieldmeet',
					days: 0,
					daysInLeapYear: 1
				},
				{
					name: 'Eleasis',
					long: 'Month of Eleasis',
					days: 30
				},
				{
					name: 'Eleint',
					long: 'Month of Eleint',
					days: 30
				},
				{
					name: 'Highharvestide',
					long: 'Festival of Highharvestide',
					days: 1
				},
				{
					name: 'Marpenoth',
					long: 'Month of Marpenoth',
					days: 30
				},
				{
					name: 'Uktar',
					long: 'Month of Uktar',
					days: 30
				},
				{
					name: 'Feast of the Moon',
					long: 'The Feast of the Moon',
					days: 1
				},
				{
					name: 'Nightal',
					long: 'Month of Nightal',
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
