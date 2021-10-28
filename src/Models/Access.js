const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  isAllowed: Boolean,
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})
const Access = model('Access', schema)

module.exports = Access
