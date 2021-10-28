const { model, Schema } = require("mongoose");

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String,
  access: [{ type: Schema.Types.ObjectId, ref: "Access" }],
  presets: [{ type: Schema.Types.ObjectId, ref: "Presets" }],
});
const User = model("User", schema);

module.exports = User;
