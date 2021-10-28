const { model, Schema } = require("mongoose");

const schema = new Schema({
  data: Number,
  units: String,
  fetchTime: Date,
});
const SensorData = model("SensorData", schema);

module.exports =  SensorData;
