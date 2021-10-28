const { model, Schema } = require('mongoose')

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  climateSettings: [{ type: Schema.Types.ObjectId, ref: 'ClimateSetting' }]
})
const Preset = model('Preset', schema)

module.exports = Preset
