const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//Schema for User Info, to be stored in the database
const adminInfo = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    isActiveAdmin: { type: Boolean, required: true },
  },
  { collection: "adminInfo" }
);

// generating a unique auth token for each admin
adminInfo.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const admin_model = mongoose.model("adminInfo", adminInfo);
module.exports = { admin_model };
