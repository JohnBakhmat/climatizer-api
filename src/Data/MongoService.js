const mongoose = require('mongoose')
const { MONGO_URI } = process.env
module.exports = (callback) => {
  mongoose.connect(MONGO_URI, (err) => {
    err && console.error(err)
    callback()
  })
}
