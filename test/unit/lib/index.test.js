'use strict';

const assert = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/index', () => {
	let applyCalendarSchemaDefaults;
	let assertCalendarSchemaValidity;
	let DreamDate;
	let takeMeOnMyDreamDate;

	beforeEach(() => {
		applyCalendarSchemaDefaults = sinon.stub().returns({});
		assertCalendarSchemaValidity = sinon.stub();
		DreamDate = class MockDreamDate {};

		mockery.registerMock('./validation/apply-calendar-schema-defaults', applyCalendarSchemaDefaults);
		mockery.registerMock('./validation/assert-calendar-schema-validity', assertCalendarSchemaValidity);
		mockery.registerMock('./dream-date', DreamDate);

		takeMeOnMyDreamDate = require('../../../lib/index');
	});

	it('exports a function', () => {
		assert.isFunction(takeMeOnMyDreamDate);
	});

	describe('takeMeOnMyDreamDate(calendarSchema)', () => {
		let mockDefaultSchema;
		let mockSchema;
		let TestDate;

		beforeEach(() => {
			mockDefaultSchema = {
				isMockDefaultSchema: true
			};
			mockSchema = {
				isMockSchema: true
			};
			applyCalendarSchemaDefaults.returns(mockDefaultSchema);
			TestDate = takeMeOnMyDreamDate(mockSchema);
		});

		it('asserts that the calendar schema is valid', () => {
			assert.calledOnce(assertCalendarSchemaValidity);
			assert.calledWithExactly(assertCalendarSchemaValidity, mockSchema);
		});

		it('applies defaults to the calendar schema', () => {
			assert.calledOnce(applyCalendarSchemaDefaults);
			assert.calledWithExactly(applyCalendarSchemaDefaults, mockSchema);
		});

		it('returns a class constructor', () => {
			assert.isFunction(TestDate);
			assert.throws(() => TestDate(), /cannot be invoked without/);
			assert.doesNotThrow(() => new TestDate());
		});

		describe('new TestDate()', () => {
			let calendar;

			beforeEach(() => {
				calendar = new TestDate();
			});

			it('extends Calendar', () => {
				assert.instanceOf(calendar, DreamDate);
			});

		});

		describe('TestDate.schema', () => {

			it('is set to the defaulted schema', () => {
				assert.strictEqual(TestDate.schema, mockDefaultSchema);
			});

		});

	});

});
