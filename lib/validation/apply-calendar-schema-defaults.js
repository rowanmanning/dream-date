'use strict';

// Assumes a valid calendar schema
function applyCalendarSchemaDefaults(calendar) {
	calendar = JSON.parse(JSON.stringify(calendar));

	// Default the top-level properties
	calendar = Object.assign({
		periods: [],
		yearNames: {},
		moons: []
	}, calendar);

	// Default calendar details
	calendar.calendar = Object.assign({
		time: {},
		timestampOffset: 0
	}, calendar.calendar);

	// Default calendar year details
	calendar.calendar.year = Object.assign({
		leapYearFrequency: 0,
		leapYearStart: 1
	}, calendar.calendar.year);
	calendar.calendar.year.months = calendar.calendar.year.months.map(month => {
		month.abbr = month.abbr || month.name;
		month.long = month.long || month.name;
		month.daysInLeapYear = (typeof month.daysInLeapYear === 'number' ? month.daysInLeapYear : month.days);
		return month;
	});

	// Default calendar week details
	calendar.calendar.week = Object.assign({
		offset: 0
	}, calendar.calendar.week);
	calendar.calendar.week.days = calendar.calendar.week.days.map(day => {
		day.abbr = day.abbr || day.name;
		day.long = day.long || day.name;
		return day;
	});

	// Default calendar time details
	calendar.calendar.time = Object.assign({
		hoursInDay: 24,
		minutesInHour: 60,
		secondsInMinute: 60,
		anteMeridiemLabel: 'am',
		postMeridiemLabel: 'pm'
	}, calendar.calendar.time);

	// Default calendar periods
	calendar.periods = calendar.periods.map(period => {
		period.abbr = period.abbr || period.name;
		period.long = period.long || period.name;
		period.startYear = (typeof period.startYear === 'number' ? period.startYear : -Infinity);
		period.endYear = (typeof period.endYear === 'number' ? period.endYear : Infinity);
		return period;
	});

	// Default calendar moons
	calendar.moons = calendar.moons.map(moon => {
		moon.abbr = moon.abbr || moon.name;
		moon.long = moon.long || moon.name;
		moon.phases = moon.phases || [
			'Full',
			'Waning Gibbous',
			'Last Quarter',
			'Waning Cresent',
			'New',
			'Waxing Cresent',
			'First Quarter',
			'Waxing Gibbous'
		];
		return moon;
	});

	// Add in useful conversions
	calendar.conversions = {
		hoursInDay: calendar.calendar.time.hoursInDay,
		hoursInHalfDay: calendar.calendar.time.hoursInDay / 2,
		minutesInHour: calendar.calendar.time.minutesInHour,
		secondsInMinute: calendar.calendar.time.secondsInMinute,
		daysInWeek: calendar.calendar.week.days.length,
		monthsInYear: calendar.calendar.year.months.length,
		daysInYear: calendar.calendar.year.months.reduce((total, month) => total + month.days, 0),
		daysInLeapYear: calendar.calendar.year.months.reduce((total, month) => total + month.daysInLeapYear, 0)
	};
	calendar.conversions.secondsInHour = calendar.conversions.secondsInMinute * calendar.conversions.minutesInHour;
	calendar.conversions.secondsInDay = calendar.conversions.secondsInHour * calendar.conversions.hoursInDay;
	calendar.conversions.secondsInWeek = calendar.conversions.secondsInDay * calendar.conversions.daysInWeek;
	calendar.conversions.secondsInYear = calendar.conversions.secondsInDay * calendar.conversions.daysInYear;
	calendar.conversions.secondsInLeapYear = calendar.conversions.secondsInDay * calendar.conversions.daysInLeapYear;
	calendar.conversions.leapLearDayDifference = calendar.conversions.daysInYear - calendar.conversions.daysInYear;

	return calendar;

}

module.exports = applyCalendarSchemaDefaults;
