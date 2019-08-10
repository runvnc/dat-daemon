const Client = require('@dat-daemon/client')
const program = require('commander')
const Table = require('cli-table')
const log = require('./lib/log')

let client;

async function setup() {
  console.log('Initializing..');
  client = await Client()
  console.log('ok');
  return client;
}

module.exports = { setup, client };

