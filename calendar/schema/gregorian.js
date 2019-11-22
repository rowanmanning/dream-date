'use strict';

module.exports = {
	calendar: {
		year: {
			leapYearFrequency: 4, // Ahem not quite
			months: [
				{
					name: 'Jan',
					long: 'January',
					days: 31
				},
				{
					name: 'Feb',
					long: 'February',
					days: 28,
					daysInLeapYear: 29
				},
				{
					name: 'Mar',
					long: 'March',
					days: 31
				},
				{
					name: 'Apr',
					long: 'April',
					days: 30
				},
				{
					name: 'May',
					long: 'May',
					days: 31
				},
				{
					name: 'Jun',
					long: 'June',
					days: 30
				},
				{
					name: 'Jul',
					long: 'July',
					days: 31
				},
				{
					name: 'Aug',
					long: 'August',
					days: 31
				},
				{
					name: 'Sep',
					long: 'September',
					days: 30
				},
				{
					name: 'Oct',
					long: 'October',
					days: 31
				},
				{
					name: 'Nov',
					long: 'November',
					days: 30
				},
				{
					name: 'Dec',
					long: 'December',
					days: 31
				}
			]
		},
		week: {
			days: [
				{
					name: 'Monday'
				},
				{
					name: 'Tuesday'
				},
				{
					name: 'Wednesday'
				},
				{
					name: 'Thursday'
				},
				{
					name: 'Friday'
				},
				{
					name: 'Saturday'
				},
				{
					name: 'Sunday'
				}
			]
		}
	},
	periods: [
		{
			name: 'Anno Domini',
			abbr: 'AD',
			startYear: 1
		}
	],
	moons: [
		{
			name: 'Moon',
			secondsInCycle: 60 * 60 * 24 * 29.53
		}
	]
};
