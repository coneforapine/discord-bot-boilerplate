const { Client } = require('./lib/index');
const { token } = require('./conf.json');

const client = new Client();

client.login(token);
