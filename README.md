
# Dream Date 💝🍾📅

Create calendar systems for your role playing games.

:warning: **Currently in alpha**. Use at your peril – if timestamps change and your stuff breaks then I won't be held responsible.

```js
const createCalendar = require('dream-date');
const MyExcellentDate = createCalendar({
    // Calendar schema goes here
});

const date = new MyExcellentDate(1234567);
console.log(date.year);
console.log(date.month);
console.log(date.date);
// etc
```


## Table of Contents

  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)


## Requirements

Dream Date requires one of the following environments to run:

  * [Node.js] 8+
  * Probably Chrome (I haven't tested yet, because alpha)
  * Probably Firefox (I haven't tested yet either)


## Usage

Install Dream Date with [npm]:

```sh
npm install dream-date
```

Then you can load the module into your code with a `require` call:

```js
const createCalendar = require('dream-date');
```

### Creating a calendar

The `createCalendar` function accepts a single argument which is a calendar schema object. I don't have time to document that _right_ now (ahem it's in alpha) but it written as [JSON Schema] so maybe you can look in [`lib/schema/calendar.json`](lib/schema/calendar.json) (or the `calendar/schema` folder).

```js
const MyExcellentDate = createCalendar({
    // Calendar schema goes here
});
```

### Using one of the included calendars

If you'd rather not create your own calendar, the library ships with a few. Just use the following:

```js
const HarptosDate = require('dream-date/calendar/harptos');
const OdreianDate = require('dream-date/calendar/odreian');
const TideDate = require('dream-date/calendar/tide');
```

### Creating a date

```js
// Create a date with a timestamp.
// More input formats coming soon – did I mention this is alpha?
const date = new MyExcellentDate(12345);
```

### Getting date info

```js
// Get the indices of periods/ages your date is in
date.periodIndices; // Array<Number>

// Get the names of periods/ages your date is in
date.periodNames; // Array<String>

// Get the abbreviations of periods/ages your date is in
date.periodAbbreviations; // Array<String>

// Get the long names of periods/ages your date is in
date.periodLongNames; // Array<String>

// Get the period-capped years of periods/ages your date is in
date.periodYears; // Array<Number>

// Get the current absolute year, ignoring periods/ages, zero-indexed
date.yearIndex; // Number

// Get the current absolute year, ignoring periods/ages
date.year; // Number

// Get whether the current absolute year is a leap year
date.isLeapYear; // Boolean

// Get the current month of the year, zero-indexed
date.monthIndex; // Number

// Get the current month of the year
date.month; // Number

// Get the current month name
date.monthName; // String

// Get the current month name abbreviated (defaults to `monthName`)
date.monthAbbreviation; // String

// Get the current long-form month name (defaults to `monthName`)
date.monthLongName; // String

// Get the current day of the month, zero-indexed
date.dateIndex; // Number

// Get the current day of the month
date.date; // Number

// Get the current day of the week, zero-indexed
date.dayIndex; // Number

// Get the current day of the week
date.day; // Number

// Get the current weekday name
date.dayName; // String

// Get the current weekday name abbreviated (defaults to `dayName`)
date.dayAbbreviation; // String

// Get the current long-form weekday name (defaults to `dayName`)
date.dayLongName; // String

// Get the current hour of the day
date.hour; // Number

// Get the current hour of the day with the day divided between two meridiems
date.hourInMeridiem; // Number

// Get the current meridiem label
date.meridiem; // String

// Get the minute of the hour
date.minute; // Number

// Get the current second of the minute
date.second; // Number
```

### Formatting dates

You can format dates with the `date.format` method. It uses template strings and works like this (thanks to [@quarterto] and [odreian-date] for this):

```js
date.format`${'Do'} ${'MMM'}, ${YY}`;
```

There are loads of available formats you can use:

  * `Y`: The current absolute year, ignoring periods/ages
  * `YY`: A list of current years and periods/ages in short form
  * `YYY`: A list of current years and periods/ages
  * `YYYY`: A list of current periods/ages in long form
  * `M`: The current month
  * `Mo`: The current month with an ordinal suffix
  * `MM`: The current month name abbreviated
  * `MMM`: The current month name
  * `MMMM`: The current month name in long form
  * `D`: The current date
  * `Do`: The current date with an ordinal suffix
  * `d`: The current day of the week
  * `dd`: The current day of the week name abbreviated
  * `ddd`: The current day of the week name
  * `dddd`: The current day of the week name in long form
  * `H`: The current hour of the day
  * `HH`: The current hour of the day (padded with zero)
  * `h`: The current hour of the day (divided between two meridiems)
  * `a`: The current meridiem label
  * `mm`: The current minute of the hour (padded with zero)
  * `ss`: The current minute of the minute (padded with zero)


## Contributing

To contribute to Dream Date, clone this repo locally and commit your code on a separate branch. Please write unit tests for your code, and run the linter before opening a pull-request:

```sh
make test    # run all tests
make verify  # run all linters
```


## License

Dream Date is licensed under the [MIT] license.  
Copyright &copy; 2018, Rowan Manning



[@quarterto]: https://github.com/quarterto
[mit]: LICENSE
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[odreian-date]: https://github.com/quarterto/odreian-date
[json schema]: http://json-schema.org/
