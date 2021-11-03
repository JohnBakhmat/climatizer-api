const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  data: Number,
  units: String,
  fetchTime: Date
})
const SensorData = model('SensorData', schema)

module.exports = SensorData
