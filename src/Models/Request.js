const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
  fetchTime: Date,
  status: String
})
const Request = model('Request', schema)

module.exports = Request
