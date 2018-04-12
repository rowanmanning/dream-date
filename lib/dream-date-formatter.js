'use strict';

const ordinal = require('@quarterto/ordinal');

class DreamDateFormatter {

	format(strings, ...vars) {
		return this.template(strings, ...vars);
	}

	template(strings, ...vars) {
		return strings.reduce((cat, string, i) => {
			return cat + string + this.resolveTemplateVar(vars[i]);
		}, '');
	}

	resolveTemplateVar(templateVar) {
		return (templateVar in this ? this[templateVar] : '');
	}

	get Y() {
		return `${this.year}`;
	}

	get YY() {
		const periodAbbreviations = this.periodAbbreviations;
		if (periodAbbreviations.length) {
			return this.periodYears.map((year, index) => `${year}${periodAbbreviations[index]}`).join('/');
		}
		return this.Y;
	}

	get YYY() {
		const periodNames = this.periodNames;
		if (periodNames.length) {
			return this.periodYears.map((year, index) => `${year} ${periodNames[index]}`).join('/');
		}
		return this.Y;
	}

	get YYYY() {
		const periodLongNames = this.periodLongNames;
		if (periodLongNames.length) {
			return this.periodYears.map((year, index) => `${year} ${periodLongNames[index]}`).join('/');
		}
		return this.Y;
	}

	get M() {
		return `${this.month}`;
	}

	get Mo() {
		return this.month + ordinal(this.month);
	}

	get MM() {
		return this.monthAbbreviation;
	}

	get MMM() {
		return this.monthName;
	}

	get MMMM() {
		return this.monthLongName;
	}

	get D() {
		return `${this.date}`;
	}

	get Do() {
		return this.date + ordinal(this.date);
	}

	get d() {
		return `${this.dayIndex}`;
	}

	get dd() {
		return this.dayAbbreviation;
	}

	get ddd() {
		return this.dayName;
	}

	get dddd() {
		return this.dayLongName;
	}

	get H() {
		return `${this.hour}`;
	}

	get HH() {
		return (this.hour < 10 ? '0' : '') + this.hour;
	}

	get h() {
		return `${this.hourInMeridiem}`;
	}

	get a() {
		return this.meridiem;
	}

	get mm() {
		return (this.minute < 10 ? '0' : '') + this.minute;
	}

	get ss() {
		return (this.second < 10 ? '0' : '') + this.second;
	}

}

module.exports = DreamDateFormatter;
