const unhash = require('.')

unhash('UNhY4JhezH9gQYqvDMWrWH9CwlcKiECVqejMrND2VFw')
  .then(
    preimage => console.log(preimage.toString('utf8')),
    err => console.error(err)
  )
