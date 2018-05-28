const { Client } = require('./lib/index');
const { token } = require('./config.json');

const client = new Client();

client.login(token);
