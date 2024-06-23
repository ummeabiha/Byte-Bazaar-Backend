const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//to store user's google id data in database
const googleUser = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: String,
    image: String,
  },
  { collection: "googleUser" }, // to specify the mongoose collection
  { timestamps: true }
);

// generating a unique auth token for each user
googleUser.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const google_user_model = new mongoose.model("googleUser", googleUser);
module.exports = google_user_model;
