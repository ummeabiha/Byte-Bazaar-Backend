const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//Schema for User Info, to be stored in the database
const UserInfo = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// generating a unique auth token for each user
UserInfo.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const user_model = mongoose.model("UserInfo", UserInfo);
module.exports = { user_model };

