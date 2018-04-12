'use strict';

const config = module.exports = JSON.parse(JSON.stringify(require('../../.eslintrc')));

config.rules['no-unused-vars'] = 'off';
