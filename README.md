# What this module does

This module exports a function which accepts a SHA-256 hash as a hex-, base64- or base64url-encoded string and returns a promise for a `Buffer`. If `unhash` can find the source for the hash, it will fulfill the promise with the preimage, otherwise it will reject the promise.

``` js
const unhash = require('unhash')

unhash('UNhY4JhezH9gQYqvDMWrWH9CwlcKiECVqejMrND2VFw')
  .then(
    preimage => console.log(preimage.toString('utf8')),
    err => console.error(err)
  )
```
