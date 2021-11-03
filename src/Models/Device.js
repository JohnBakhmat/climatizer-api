const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  serialNumber: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  sensors: [{ type: Schema.Types.ObjectId, ref: 'Sensor' }]
})
const Device = model('Device', schema)

module.exports = Device
