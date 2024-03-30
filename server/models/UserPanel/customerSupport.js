const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { collection: "customerSupport" }
);

const support_model = mongoose.model("customerSupport", supportSchema);
module.exports = { support_model };
