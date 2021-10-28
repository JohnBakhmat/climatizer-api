const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  serialNumber: String,
  sensors: [{ type: Schema.Types.ObjectId, ref: 'Sensor' }],
})
const Device = model('Device', schema)

module.exports = Device
