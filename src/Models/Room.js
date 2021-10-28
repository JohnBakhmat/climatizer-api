const { model, Schema } = require("mongoose");

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  devices: [{ type: Schema.Types.ObjectId, ref: "Device" }],
  access: [{ type: Schema.Types.ObjectId, ref: "Access" }],
});
const Room = model("Room", schema);

module.exports =  Room;
