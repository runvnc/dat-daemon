const level = require('level')
const config = require('@dat-daemon/config')()
const {List} = require('@dat-daemon/protocol')

const KEY = 'list'
let db

function getDb () {
  if (!db) {
    db = level(config.database)
  }

  return db
}

async function put (item) {
  const list = await get()
  list.list.push(item)

  return getDb().put(KEY, list, {valueEncoding: List})
}

async function get () {
  return new Promise(function (resolve, reject) {
    getDb().get(KEY, {valueEncoding: List}, function (err, list) {
      if (err) {
        if (err.notFound) {
          resolve({list: []})
          return
        }

        reject(err)
        return
      }

      resolve(list)
    })
  })
}

async function remove (key) {
  const list = await get()

  const index = list.list.findIndex(function (e) {
    return e.key === key
  })

  if (!~index) {
    return false
  }

  list.list.splice(index, 1)

  return getDb().put(KEY, list, {valueEncoding: List})
}

async function getItem (key) {
  const list = await get()

  const index = list.list.findIndex(function (e) {
    return e.key === key
  })

  if (!~index) {
    return false
  }

  return list.list[index]
}

module.exports = {put, get, remove, getItem}
