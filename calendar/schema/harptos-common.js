'use strict';

// Clone from Harptos but change the month names
const schema = module.exports = JSON.parse(JSON.stringify(require('./harptos')));
const months = schema.calendar.year.months;

months[0].name = 'Deepwinter';
months[0].long = 'The Month of Deepwinter';

months[2].name = months[2].long = 'The Claw of Winter';

months[3].name = months[3].long = 'The Claw of the Sunsets';

months[4].name = months[4].long = 'The Claw of the Storms';

months[6].name = months[6].long = 'The Melting';

months[7].name = months[7].long = 'The Time of Flowers';

months[8].name = 'Summertide';
months[8].long = 'The Month of Summertide';

months[11].name = 'Highsun';
months[11].long = 'The Month of Highsun';

months[12].name = months[12].long = 'The Fading';

months[14].name = 'Leaffall';
months[14].long = 'The Month of Leaffall';

months[15].name = months[15].long = 'The Rotting';

months[17].name = months[17].long = 'The Drawing Down';
