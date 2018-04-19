'use strict';

const DreamDateFormatter = require('./dream-date-formatter');

class DreamDate extends DreamDateFormatter {

	constructor(...args) {
		super();
		if (this.constructor === DreamDate) {
			throw new Error('You cannot create an instance of DreamDate, it is designed to be extended');
		}
		this.timestamp = 0;
		if (args.length === 1 && typeof args[0] === 'number') {
			this.timestamp = args[0];
		} else if (args.length === 1 && typeof args[0] === 'string') {
			this.timestamp = this.constructor.calculateTimestampFromString(args[0]);
		} else {
			this.timestamp = this.constructor.calculateTimestampFromDateComponents(...args);
		}
	}

	add({year = 0, week = 0, day = 0, hour = 0, minute = 0, second = 0}) {
		let timestamp = this.timestamp;

		// Do the easy calculations
		timestamp += second;
		timestamp += (this.constructor.schema.conversions.secondsInMinute * minute);
		timestamp += (this.constructor.schema.conversions.secondsInHour * hour);
		timestamp += (this.constructor.schema.conversions.secondsInDay * day);
		timestamp += (this.constructor.schema.conversions.secondsInWeek * week);

		// Add the year
		if (year) {
			let currentYear = this.yearIndex;
			const targetYear = currentYear + year;
			if (targetYear >= currentYear) {
				while (currentYear < targetYear) {
					timestamp += this.constructor.secondsInYear(currentYear);
					currentYear += 1;
				}
			} else {
				while (currentYear > targetYear) {
					timestamp -= this.constructor.secondsInYear(currentYear);
					currentYear -= 1;
				}
			}
		}

		return new this.constructor(timestamp);
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
			counter -= this.constructor.secondsInYear(yearIndex + 1);
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
		const leapYearCount = this.constructor.countLeapYears(this.yearIndex);
		return (this.isLeapYear ? leapYearCount - 1 : leapYearCount);
	}

	get fullyElapsedNonLeapYears() {
		return this.fullyElapsedYears - this.fullyElapsedLeapYears;
	}

	get timestampMinusYears() {
		const fullyElapsedNonLeapYears = this.fullyElapsedNonLeapYears;
		const fullyElapsedLeapYears = this.fullyElapsedLeapYears;
		const yearSeconds = this.constructor.schema.conversions.secondsInYear * fullyElapsedNonLeapYears;
		const leapYearSeconds = this.constructor.schema.conversions.secondsInLeapYear * fullyElapsedLeapYears;
		return this.timestamp - yearSeconds - leapYearSeconds;
	}

	get isLeapYear() {
		return this.constructor.yearIsLeapYear(this.year);
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

	get monthPadded() {
		const length = `${this.constructor.schema.calendar.year.months.length}`.length;
		return `${this.month}`.padStart(length, '0');
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

	get datePadded() {
		const length = Math.min(...this.constructor.schema.calendar.year.months.map(month => {
			return `${month.days}`.length;
		}));
		return `${this.date}`.padStart(length, '0');
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

	get hourPadded() {
		const length = `${this.constructor.schema.calendar.time.hoursInDay}`.length;
		return `${this.hour}`.padStart(length, '0');
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

	get minutePadded() {
		const length = `${this.constructor.schema.calendar.time.minutesInHour}`.length;
		return `${this.minute}`.padStart(length, '0');
	}

	get second() {
		return this.timestamp % this.constructor.schema.conversions.secondsInMinute;
	}

	get secondPadded() {
		const length = `${this.constructor.schema.calendar.time.secondsInMinute}`.length;
		return `${this.second}`.padStart(length, '0');
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

	get isDay() {
		const hour = this.hour;
		return (
			hour >= this.constructor.schema.calendar.time.sunriseHour &&
			hour < this.constructor.schema.calendar.time.sunsetHour
		);
	}

	get isNight() {
		return !this.isDay;
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

	static countLeapYears(absoluteYear) {
		if (!this.schema.calendar.year.leapYearFrequency) {
			return 0;
		}
		absoluteYear -= this.schema.calendar.year.leapYearStart;
		return Math.floor(absoluteYear / this.schema.calendar.year.leapYearFrequency) + 1;
	}

	static yearIsLeapYear(absoluteYear) {
		if (!this.schema.calendar.year.leapYearFrequency) {
			return false;
		}
		absoluteYear -= this.schema.calendar.year.leapYearStart;
		return (Math.floor(absoluteYear % this.schema.calendar.year.leapYearFrequency) === 0);
	}

	static secondsInYear(absoluteYear) {
		if (this.yearIsLeapYear(absoluteYear)) {
			return this.schema.conversions.secondsInLeapYear;
		}
		return this.schema.conversions.secondsInYear;
	}

	static get dateRegExp() {
		return /^((\d+)([^-/]*)(\/(\d+)([^-/]*))*)-(\d+)-(\d+)([ T](\d+)(:(\d+))?(:(\d+))?)?$/i;
	}

	static calculateTimestampFromString(string) {
		const match = string.match(this.dateRegExp);
		if (!match) {
			throw new Error('date string is malformed');
		}
		const period = match[3];
		const year = parseInt(match[2], 10);
		const month = parseInt(match[7], 10);
		const date = parseInt(match[8], 10);
		const hour = parseInt(match[10] || 0, 10);
		const minute = parseInt(match[12] || 0, 10);
		const second = parseInt(match[14] || 0, 10);
		return this.calculateTimestampFromDateComponents(period, year, month, date, hour, minute, second);
	}

	static calculateTimestampFromDateComponents(...args) {
		const periodAbbr = (args.length >= 7 ? args[0] : null) || null;
		let year = (args.length >= 7 ? args[1] : args[0]) || 1;
		const month = (args.length >= 7 ? args[2] : args[1]) || 1;
		const date = (args.length >= 7 ? args[3] : args[2]) || 1;
		const hour = (args.length >= 7 ? args[4] : args[3]) || 0;
		const minute = (args.length >= 7 ? args[5] : args[4]) || 0;
		const second = (args.length >= 7 ? args[6] : args[5]) || 0;
		this.assertValidDateComponents(periodAbbr, year, month, date, hour, minute, second);

		// Work out the period
		if (periodAbbr) {
			year += this.schema.periods.find(period => period.abbr === periodAbbr).startYear - 1;
		}

		const yearIndex = year - 1;
		const monthIndex = month - 1;
		const dateIndex = date - 1;

		// Do all the easy calculations
		let timestamp = (
			second +
			(minute * this.schema.conversions.secondsInMinute) +
			(hour * this.schema.conversions.secondsInHour)
		);

		// Add the year
		let currentYear = yearIndex;
		while (currentYear > 0) {
			timestamp += this.secondsInYear(currentYear);
			currentYear -= 1;
		}

		// Add the days
		const isLeapYear = this.yearIsLeapYear(year);
		const days = this.schema.calendar.year.months.slice(0, monthIndex).reduce((total, month) => {
			return (total += (isLeapYear ? month.daysInLeapYear : month.days));
		}, dateIndex);
		timestamp += this.schema.conversions.secondsInDay * days;

		return timestamp;
	}

	static assertValidDateComponents(periodAbbr, year, month, date, hour, minute, second) {
		if (periodAbbr) {
			const periodAbbreviations = this.schema.periods.map(period => period.abbr);
			if (!periodAbbreviations.includes(periodAbbr)) {
				throw new TypeError(`period is invalid, must be one of ${periodAbbreviations.join(', ')}`);
			}
		}
		if (year <= 0) {
			throw new TypeError('year is out of range, must be 1+');
		}
		if (month < 1 || month > this.schema.conversions.monthsInYear) {
			throw new TypeError(`month is out of range, must be 1–${this.schema.conversions.monthsInYear}`);
		}
		const monthDetail = this.schema.calendar.year.months[month - 1];
		const daysInMonth = (this.yearIsLeapYear(year) ? monthDetail.daysInLeapYear : monthDetail.days);
		if (date < 1 || date > daysInMonth) {
			throw new TypeError(`date is out of range, must be 1–${daysInMonth} for given month`);
		}
		if (hour < 0 || hour >= this.schema.conversions.hoursInDay) {
			throw new TypeError(`hour is out of range, must be 0–${this.schema.conversions.hoursInDay - 1}`);
		}
		if (minute < 0 || minute >= this.schema.conversions.minutesInHour) {
			throw new TypeError(`minute is out of range, must be 0–${this.schema.conversions.minutesInHour - 1}`);
		}
		if (second < 0 || second >= this.schema.conversions.secondsInMinute) {
			throw new TypeError(`second is out of range, must be 0–${this.schema.conversions.secondsInMinute - 1}`);
		}
	}

	/**
	 * Get the date as a string, for use in implicit type conversion.
	 * @access private
	 * @returns {String} The string representation.
	 */
	valueOf() {
		return this.P;
	}

	/**
	 * Get the date as a string, for use in JSON conversion.
	 * @access private
	 * @returns {String} The JSON-friendly representation.
	 */
	toJSON() {
		return this.P;
	}

	/**
	 * Get console-friendly representation of the date.
	 * @access private
	 * @returns {String} The console-friendly representation.
	 */
	inspect() {
		return `${this.constructor.name} { ${this.P} (${this.timestamp}) }`;
	}

}

module.exports = DreamDate;
