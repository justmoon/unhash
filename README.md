# What this module does

This module exports a function which accepts a SHA-256 hash as a hex-, base64- or base64url-encoded string and returns a promise for a `Buffer`. If `unhash` can find the source for the hash, it will fulfill the promise with the preimage, otherwise it will reject the promise.

``` js
const unhash = require('unhash')

unhash('13550350a8681c84c861aac2e5b440161c2b33a3e4f302ac680ca5b686de48de')
  .then(
    preimage => console.log(preimage.toString('utf8')),
    err => console.error(err)
  )
```
