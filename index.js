'use strict'

const https = require('https')
const debug = require('debug')('unhash')

const HOSTS = [
  'unhash.link'
]

const base64url = buffer => (
  buffer.toString('base64')
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
)

module.exports = hash => {
  if (typeof hash === 'string') {
    if (hash.length === 64) {
      hash = Buffer.from(hash, 'hex')
    } else if (hash.length === 43 || hash.length === 44) {
      hash = Buffer.from(hash, 'base64')
    } else {
      throw new Error(`Not a valid hex/base64/base64url encoded hash "${hash}"`)
    }
  } else if (Buffer.isBuffer(hash)) {
    if (hash.length !== 32) {
      throw new Error(`Hash is invalid length: ${hash.length} (should be: 32 bytes)`)
    }
  } else {
    throw new Error('Hash is invalid type: ' + typeof hash)
  }

  const base64Hash = base64url(hash)

  debug('requesting %s from %d hosts', base64Hash, HOSTS.length)
  return Promise.race(HOSTS.map(host => {
    return new Promise((resolve, reject) => {
      https.get(`https://${host}/${base64Hash}`, res => {
        const data = []

        debug('received reply from %s', host)
        res.on('data', chunk => data.push(chunk) )
        res.on('end', () => resolve(Buffer.concat(data)))
      })
    })
  }))
}
