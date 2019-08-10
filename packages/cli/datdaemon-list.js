const Client = require('@dat-daemon/client')
const log = require('./lib/log')

async function list(client) {
  try {
    console.log('client is', client);
    const list = await client.list()
    if (list.length) {
      list.forEach((e) => {
        log.info(`${e.path} ${e.key}`)
      })
    } else {
      log.info('Nothing there.')
    }
  } catch (err) {
    require('./lib/error')(err)
  }
}

module.exports = list;
