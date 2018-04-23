'use strict';

const ordinal = require('@quarterto/ordinal');

/**
 * Class representing a date formatter.
 *
 * @example <caption>Extend and create a date formatter</caption>
 * class ExampleFormatter extends DreamDateFormatter {};
 * const dreamDateFormatter = new ExampleFormatter();
 */
class DreamDateFormatter {

	/**
	 * Create a date formatter.
	 * @throws {TypeError} Will throw if the date formatter is constructed without extending.
	 */
	constructor() {
		if (this.constructor === DreamDateFormatter) {
			throw new Error('You cannot create an instance of DreamDateFormatter, it is designed to be extended');
		}
	}

	/**
	 * Format a template string. This method should be used as a template tag.
	 * @param {Array} strings - The strings from the template.
	 * @param {...String} vars - The values of variables in the template.
	 * @returns {String} The formatted string.
	 *
	 * @example <caption>Format a template string</caption>
	 * dreamDateFormatter.format`${'YY'}-${'Mz'}-${'Dz'}`;
	 */
	format(strings, ...vars) {
		return this.template(strings, ...vars);
	}

	/**
	 * Format a template string. This method should be used as a template tag.
	 * @access private
	 * @param {Array} strings - The strings from the template.
	 * @param {...String} vars - The values of variables in the template.
	 * @returns {String} The formatted string.
	 */
	template(strings, ...vars) {
		return strings.reduce((cat, string, i) => {
			return cat + string + this.resolveTemplateVar(vars[i]);
		}, '');
	}

	/**
	 * Resolve a template variable, using it to return an instance property value.
	 * @access private
	 * @param {String} templateVar - The name of the property to return.
	 * @returns {String} The value of the property or an empty string if it's not found.
	 */
	resolveTemplateVar(templateVar) {
		return (templateVar in this ? this[templateVar] : '');
	}

	/**
	 * The absolute year with no period offsetting.
	 * @type {String}
	 * @readonly
	 */
	get Y() {
		return `${this.year}`;
	}

	/**
	 * The years and periods, separated by a slash and with period names abbreviated.
	 * @type {String}
	 * @readonly
	 */
	get YY() {
		const periodAbbreviations = this.periodAbbreviations;
		if (periodAbbreviations.length) {
			return this.periodYears.map((year, index) => `${year}${periodAbbreviations[index]}`).join('/');
		}
		return this.Y;
	}

	/**
	 * The years and periods, separated by a slash.
	 * @type {String}
	 * @readonly
	 */
	get YYY() {
		const periodNames = this.periodNames;
		if (periodNames.length) {
			return this.periodYears.map((year, index) => `${year} ${periodNames[index]}`).join('/');
		}
		return this.Y;
	}

	/**
	 * The years and periods, separated by a slash and with long-form period names.
	 * @type {String}
	 * @readonly
	 */
	get YYYY() {
		const periodLongNames = this.periodLongNames;
		if (periodLongNames.length) {
			return this.periodYears.map((year, index) => `${year} ${periodLongNames[index]}`).join('/');
		}
		return this.Y;
	}

	/**
	 * The month.
	 * @type {String}
	 * @readonly
	 */
	get M() {
		return `${this.month}`;
	}

	/**
	 * The month padded with zeros.
	 * @type {String}
	 * @readonly
	 */
	get Mz() {
		return `${this.monthPadded}`;
	}

	/**
	 * The month appended with an ordinal suffix.
	 * @type {String}
	 * @readonly
	 */
	get Mo() {
		return this.month + ordinal(this.month);
	}

	/**
	 * The name of the month abbreviated.
	 * @type {String}
	 * @readonly
	 */
	get MM() {
		return this.monthAbbreviation;
	}

	/**
	 * The name of the month.
	 * @type {String}
	 * @readonly
	 */
	get MMM() {
		return this.monthName;
	}

	/**
	 * The name of the month in long-form.
	 * @type {String}
	 * @readonly
	 */
	get MMMM() {
		return this.monthLongName;
	}

	/**
	 * The date.
	 * @type {String}
	 * @readonly
	 */
	get D() {
		return `${this.date}`;
	}

	/**
	 * The date padded with zeros.
	 * @type {String}
	 * @readonly
	 */
	get Dz() {
		return `${this.datePadded}`;
	}

	/**
	 * The date appended with an ordinal suffix.
	 * @type {String}
	 * @readonly
	 */
	get Do() {
		return this.date + ordinal(this.date);
	}

	/**
	 * The week day.
	 * @type {String}
	 * @readonly
	 */
	get d() {
		return `${this.dayIndex}`;
	}

	/**
	 * The name of the day of the week abbreviated.
	 * @type {String}
	 * @readonly
	 */
	get dd() {
		return this.dayAbbreviation;
	}

	/**
	 * The name of the day of the week.
	 * @type {String}
	 * @readonly
	 */
	get ddd() {
		return this.dayName;
	}

	/**
	 * The name of the day of the week in long-form.
	 * @type {String}
	 * @readonly
	 */
	get dddd() {
		return this.dayLongName;
	}

	/**
	 * The hour.
	 * @type {String}
	 * @readonly
	 */
	get H() {
		return `${this.hour}`;
	}

	/**
	 * The hour padded with zeros.
	 * @type {String}
	 * @readonly
	 */
	get Hz() {
		return `${this.hourPadded}`;
	}

	/**
	 * The hour padded with zeros (alias of `.Hz`).
	 * @type {String}
	 * @readonly
	 */
	get HH() {
		return this.Hz;
	}

	/**
	 * The hour when split into two meridiems.
	 * @type {String}
	 * @readonly
	 */
	get h() {
		return `${this.hourInMeridiem}`;
	}

	/**
	 * The meridiem that the hour belongs to.
	 * @type {String}
	 * @readonly
	 */
	get a() {
		return this.meridiem;
	}

	/**
	 * The minute.
	 * @type {String}
	 * @readonly
	 */
	get m() {
		return `${this.minute}`;
	}

	/**
	 * The minute padded with zeros.
	 * @type {String}
	 * @readonly
	 */
	get mz() {
		return `${this.minutePadded}`;
	}

	/**
	 * The minute padded with zeros (alias of `.mz`).
	 * @type {String}
	 * @readonly
	 */
	get mm() {
		return this.mz;
	}

	/**
	 * The second.
	 * @type {String}
	 * @readonly
	 */
	get s() {
		return `${this.second}`;
	}

	/**
	 * The second padded with zeros.
	 * @type {String}
	 * @readonly
	 */
	get sz() {
		return `${this.secondPadded}`;
	}

	/**
	 * The minute padded with zeros (alias of `.sz`).
	 * @type {String}
	 * @readonly
	 */
	get ss() {
		return this.sz;
	}

	/**
	 * The date in a parsable format.
	 * @type {String}
	 * @readonly
	 */
	get PD() {
		return this.format`${'YY'}-${'Mz'}-${'Dz'}`;
	}

	/**
	 * The time in a parsable format.
	 * @type {String}
	 * @readonly
	 */
	get PT() {
		return this.format`${'Hz'}:${'mz'}:${'sz'}`;
	}

	/**
	 * The date and time in a parsable format.
	 * @type {String}
	 * @readonly
	 */
	get P() {
		return this.format`${'PD'} ${'PT'}`;
	}

}

module.exports = DreamDateFormatter;
