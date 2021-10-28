const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  model: String,
  status: String,
  data: [{ type: Schema.Types.ObjectId, ref: 'SensorData' }]
})
const Sensor = model('Sensor', schema)

module.exports = Sensor
