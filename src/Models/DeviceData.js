const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  temperature: Number,
  humidity: Number,
  co: Number,
  fetchTime: Date
})
const DeviceData = model('DeviceData', schema)

module.exports = DeviceData
