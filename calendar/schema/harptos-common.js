'use strict';

// Clone from Harptos but change the month names
const schema = module.exports = JSON.parse(JSON.stringify(require('./harptos')));
const months = schema.calendar.year.months;

months[0].name = 'Deepwinter';
months[0].long = 'The Month of Deepwinter';

months[2].name = 'The Claw of Winter';

months[3].name = 'The Claw of the Sunsets';

months[4].name = 'The Claw of the Storms';

months[6].name = 'The Melting';

months[7].name = 'The Time of Flowers';

months[8].name = 'Summertide';
months[8].long = 'The Month of Summertide';

months[11].name = 'Highsun';
months[11].long = 'The Month of Highsun';

months[12].name = 'The Fading';

months[14].name = 'Leaffall';
months[14].long = 'The Month of Leaffall';

months[15].name = 'The Rotting';

months[17].name = 'The Drawing Down';
