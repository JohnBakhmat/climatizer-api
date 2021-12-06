const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  type: String,
  dateTime: Date,
  deviceType: String
})
const StatEvent = model('StatEvent', schema)

module.exports = StatEvent
