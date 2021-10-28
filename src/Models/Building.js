const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  address: String,
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
})
const Building = model('Building', schema)

module.exports = Building
