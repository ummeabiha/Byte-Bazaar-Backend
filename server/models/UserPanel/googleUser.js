const mongoose = require("mongoose");

//to store user's google id data in database
const googleUser = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: String,
    image: String,
  }, { collection: "googleUser" }, // to specify the mongoose collection
  { timestamps: true }
);

const google_user_model = new mongoose.model("googleUser", googleUser);

module.exports = google_user_model;
