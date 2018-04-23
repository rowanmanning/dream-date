'use strict';

const ordinal = require('@quarterto/ordinal');

const propertyNames = `
	Y YY YYY YYYY
	M MM MMM MMMM Mz Mo
	D DD DDD DDDD Dz Do
	d dd ddd dddd
	H HH Hz h a
	m mm mz
	s ss sz
	PD PT P
	LT LTS
	L LL LLL LLLL
	l ll lll llll
`.trim().split(/\s+/);

const propertyCharacters = new Set(propertyNames.reduce((characters, name) => {
	return characters.concat(name.split(''));
}, []));

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
	 * Get a formatted date string.
	 * @param {(String|Array)} string - The string format or strings from a template tag.
	 * @param {...String} [vars] - The values of variables in the template if using a template tag.
	 * @returns {String} The formatted date string.
	 * @throws {TypeError} Will throw if arguments are invalid.
	 *
	 * @example <caption>Format using a template string</caption>
	 * dreamDateFormatter.format`${'YY'}-${'Mz'}-${'Dz'}`;
	 *
	 * @example <caption>Format using a regular string</caption>
	 * dreamDateFormatter.format('YY-Mz-Dz');
	 */
	format(string, ...vars) {
		if (Array.isArray(string) && vars.length) {
			return this.formatTemplate(string, ...vars);
		}
		if (typeof string === 'string') {
			return this.formatString(string);
		}
		throw new TypeError('Expected a string or an array');
	}

	/**
	 * Get a formatted date string using a template tag.
	 * @access private
	 * @param {Array} strings - The strings from the template tag.
	 * @param {...String} vars - The values of variables in the template.
	 * @returns {String} The formatted date string.
	 */
	formatTemplate(strings, ...vars) {
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
	 * Get a formatted date string.
	 * @access private
	 * @param {String} string - The string format.
	 * @returns {String} The formatted date string.
	 */
	formatString(string) {
		const tokens = this.tokenizeFormatString(string);
		return tokens.reduce((result, token) => {
			if (token.type === 'string') {
				return result + token.value;
			} else {
				return result + (this.resolveTemplateVar(token.value) || token.value);
			}
		}, '');
	}

	tokenizeFormatString(string) {
		const state = {};
		const tokens = [];
		let token = {
			value: ''
		};

		for (const char of string) {

			// Handle opening escape sequences
			if (char === '[' && !state.inEscapeSequence) {
				state.inEscapeSequence = true;
				tokens.push(token);
				token = {value: '', type: 'string'};
				continue;
			}

			// Handle closing escape sequences
			if (char === ']' && state.inEscapeSequence) {
				delete state.inEscapeSequence;
				tokens.push(token);
				token = {value: ''};
				continue;
			}

			if (propertyCharacters.has(char)) {

				if (state.inEscapeSequence) {
					token.value += char;
					continue;
				}
				if (token.type === 'string') {
					tokens.push(token);
					token = {value: ''};
				}

				if (propertyNames.includes(token.value + char)) {
					token.value += char;
				} else {
					tokens.push(token);
					token = {value: char};
				}

			} else {

				if (token.type !== 'string') {
					tokens.push(token);
					token = {value: char, type: 'string'};
				} else {
					token.value += char;
				}

			}

		}
		tokens.push(token);

		return tokens;
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

	/**
	 * The time.
	 * @type {String}
	 * @readonly
	 */
	get LT() {
		return this.format(this.constructor.schema.formats.LT);
	}

	/**
	 * The time with seconds.
	 * @type {String}
	 * @readonly
	 */
	get LTS() {
		return this.format(this.constructor.schema.formats.LTS);
	}

	/**
	 * The date, month, and year as numerals.
	 * @type {String}
	 * @readonly
	 */
	get L() {
		return this.format(this.constructor.schema.formats.L);
	}

	/**
	 * The short date, month, and year as numerals.
	 * @type {String}
	 * @readonly
	 */
	get l() {
		return this.format(this.constructor.schema.formats.l);
	}

	/**
	 * The date, month, and year as words.
	 * @type {String}
	 * @readonly
	 */
	get LL() {
		return this.format(this.constructor.schema.formats.LL);
	}

	/**
	 * The date, month, and year as words in abbreviated form.
	 * @type {String}
	 * @readonly
	 */
	get ll() {
		return this.format(this.constructor.schema.formats.ll);
	}

	/**
	 * The date, month, year, and time as words.
	 * @type {String}
	 * @readonly
	 */
	get LLL() {
		return this.format(this.constructor.schema.formats.LLL);
	}

	/**
	 * The date, month, year, and time as words in abbreviated form.
	 * @type {String}
	 * @readonly
	 */
	get lll() {
		return this.format(this.constructor.schema.formats.lll);
	}

	/**
	 * The day of the week, date, month, year, and time as words.
	 * @type {String}
	 * @readonly
	 */
	get LLLL() {
		return this.format(this.constructor.schema.formats.LLLL);
	}

	/**
	 * The day of the week, date, month, year, and time as words in abbreviated form.
	 * @type {String}
	 * @readonly
	 */
	get llll() {
		return this.format(this.constructor.schema.formats.llll);
	}


}

module.exports = DreamDateFormatter;
