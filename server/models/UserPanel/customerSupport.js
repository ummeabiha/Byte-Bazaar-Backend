const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    topic: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { collection: "contacts" }
);

const support_model = mongoose.model("contacts", supportSchema);
module.exports = { support_model };
