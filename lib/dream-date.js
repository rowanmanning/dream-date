'use strict';

const DreamDateFormatter = require('./dream-date-formatter');

class DreamDate extends DreamDateFormatter {

	constructor(year, month, date, hours, minutes, seconds) {
		super();
		this.timestamp = 0;
		if (typeof year === 'number' && !month) {
			this.timestamp = year;
		} else if (typeof year === 'string' && !month) {
			this.timestamp = DreamDate.calculateTimestampFromString(year);
		} else {
			this.timestamp = DreamDate.calculateTimestampFromComponents(year, month, date, hours, minutes, seconds);
		}
	}

	get periodIndices() {
		const year = this.year;
		const periodIndices = [];
		for (const [index, period] of Object.entries(this.constructor.schema.periods)) {
			if (year >= period.startYear && year <= period.endYear) {
				periodIndices.push(index);
			}
		}
		return periodIndices;
	}

	get periodNames() {
		return this.periodIndices.map(periodIndex => this.constructor.schema.periods[periodIndex].name);
	}

	get periodAbbreviations() {
		return this.periodIndices.map(periodIndex => this.constructor.schema.periods[periodIndex].abbr);
	}

	get periodLongNames() {
		return this.periodIndices.map(periodIndex => this.constructor.schema.periods[periodIndex].long);
	}

	get periodYears() {
		const year = this.year;
		const periodYears = [];
		for (const period of this.constructor.schema.periods) {
			if (year >= period.startYear && year <= period.endYear) {
				periodYears.push((year - period.startYear) + 1);
			}
		}
		return periodYears;
	}

	get yearIndex() {
		let counter = this.timestamp;
		let yearIndex = 0;
		while (counter >= 0) {
			counter -= this.secondsInYear(yearIndex + 1);
			if (counter >= 0) {
				yearIndex += 1;
			}
		}
		return yearIndex;
	}

	get year() {
		return this.yearIndex + 1;
	}

	get fullyElapsedYears() {
		return this.yearIndex - 1;
	}

	get fullyElapsedLeapYears() {
		const leapYearCount = this._countLeapYears(this.yearIndex);
		return (this.isLeapYear ? leapYearCount - 1 : leapYearCount);
	}

	get fullyElapsedNonLeapYears() {
		return this.fullyElapsedYears - this.fullyElapsedLeapYears;
	}

	secondsInYear(absoluteYear) {
		if (this.yearIsLeapYear(absoluteYear)) {
			return this.constructor.schema.conversions.secondsInLeapYear;
		}
		return this.constructor.schema.conversions.secondsInYear;
	}

	yearIsLeapYear(absoluteYear) {
		if (!this.constructor.schema.calendar.year.leapYearFrequency) {
			return false;
		}
		absoluteYear -= this.constructor.schema.calendar.year.leapYearStart;
		return (Math.floor(absoluteYear % this.constructor.schema.calendar.year.leapYearFrequency) === 0);
	}

	_countLeapYears(absoluteYear) {
		if (!this.constructor.schema.calendar.year.leapYearFrequency) {
			return 0;
		}
		absoluteYear -= this.constructor.schema.calendar.year.leapYearStart;
		return Math.floor(absoluteYear / this.constructor.schema.calendar.year.leapYearFrequency) + 1;
	}

	get timestampMinusYears() {
		const fullyElapsedNonLeapYears = this.fullyElapsedNonLeapYears;
		const fullyElapsedLeapYears = this.fullyElapsedLeapYears;
		const yearSeconds = this.constructor.schema.conversions.secondsInYear * fullyElapsedNonLeapYears;
		const leapYearSeconds = this.constructor.schema.conversions.secondsInLeapYear * fullyElapsedLeapYears;
		return this.timestamp - yearSeconds - leapYearSeconds;
	}

	get isLeapYear() {
		return this.yearIsLeapYear(this.year);
	}

	get monthIndex() {
		const isLeapYear = this.isLeapYear;
		const timestampMinusYears = this.timestampMinusYears;
		const secondsInYear = (isLeapYear ? this.constructor.schema.conversions.secondsInLeapYear : this.constructor.schema.conversions.secondsInYear);
		let days = Math.floor((timestampMinusYears % secondsInYear) / this.constructor.schema.conversions.secondsInDay);

		for (const [index, month] of Object.entries(this.constructor.schema.calendar.year.months)) {
			days -= (isLeapYear ? month.daysInLeapYear : month.days);
			if (days < 0) {
				return parseInt(index, 10);
			}
		}
		return 0;
	}

	get month() {
		return this.monthIndex + 1;
	}

	get monthName() {
		return this.constructor.schema.calendar.year.months[this.monthIndex].name;
	}

	get monthAbbreviation() {
		return this.constructor.schema.calendar.year.months[this.monthIndex].abbr;
	}

	get monthLongName() {
		return this.constructor.schema.calendar.year.months[this.monthIndex].long;
	}

	get dateIndex() {
		const isLeapYear = this.isLeapYear;
		const timestampMinusYears = this.timestampMinusYears;
		const secondsInYear = (isLeapYear ? this.constructor.schema.conversions.secondsInLeapYear : this.constructor.schema.conversions.secondsInYear);

		const days = Math.floor((timestampMinusYears % secondsInYear) / this.constructor.schema.conversions.secondsInDay);

		return days + this.constructor.schema.calendar.year.months.slice(0, this.monthIndex).reduce((total, month) => {
			return (total - (isLeapYear ? month.daysInLeapYear : month.days));
		}, 0);
	}

	get date() {
		return this.dateIndex + 1;
	}

	get dayIndex() {
		const days = Math.floor(this.timestamp / this.constructor.schema.conversions.secondsInDay);
		return days % this.constructor.schema.conversions.daysInWeek;
	}

	get day() {
		return this.dayIndex + 1;
	}

	get dayName() {
		return this.constructor.schema.calendar.week.days[this.dayIndex].name;
	}

	get dayAbbreviation() {
		return this.constructor.schema.calendar.week.days[this.dayIndex].abbr;
	}

	get dayLongName() {
		return this.constructor.schema.calendar.week.days[this.dayIndex].long;
	}

	get hour() {
		return Math.floor((this.timestamp % this.constructor.schema.conversions.secondsInDay) / this.constructor.schema.conversions.secondsInHour);
	}

	get hourInMeridiem() {
		return this.hour % this.constructor.schema.conversions.hoursInHalfDay || this.constructor.schema.conversions.hoursInHalfDay;
	}

	get meridiem() {
		return (
			this.hour >= this.constructor.schema.conversions.hoursInHalfDay ?
				this.constructor.schema.calendar.time.postMeridiemLabel :
				this.constructor.schema.calendar.time.anteMeridiemLabel
		);
	}

	get minute() {
		return Math.floor((this.timestamp % this.constructor.schema.conversions.secondsInHour) / this.constructor.schema.conversions.secondsInMinute);
	}

	get second() {
		return this.timestamp % this.constructor.schema.conversions.secondsInMinute;
	}

	get moonPhaseIndices() {
		return this.constructor.schema.moons
			.map(moon => {
				const secondsInPhase = Math.floor(moon.secondsInCycle / moon.phases.length);
				return {
					name: moon.name,
					phase: Math.floor((this.timestamp / secondsInPhase) % moon.phases.length)
				};
			})
			.reduce((map, moon) => {
				map[moon.name] = moon.phase;
				return map;
			}, {});
	}

	get moonPhases() {
		return Object.entries(this.moonPhaseIndices)
			.reduce((map, [name, phase]) => {
				map[name] = phase + 1;
				return map;
			}, {});
	}

	get moonPhaseNames() {
		return Object.entries(this.moonPhaseIndices)
			.reduce((map, [name, phase], index) => {
				map[name] = this.constructor.schema.moons[index].phases[phase];
				return map;
			}, {});
	}

	static calculateTimestampFromString(/* string */) {
		console.log('TODO: add string parsing');
		return 0;
	}

	static calculateTimestampFromComponents(/* year, month, date, hours, minutes, seconds */) {
		console.log('TODO: add timestamp calculation');
		return 0;
	}

}

module.exports = DreamDate;
