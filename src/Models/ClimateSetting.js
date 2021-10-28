const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  expression: String,
  value: Number,
  units: String
})
const ClimateSetting = model('ClimateSetting', schema)

module.exports = ClimateSetting
