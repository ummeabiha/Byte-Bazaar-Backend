const router = require("express").Router();
const { user_model } = require("../../models/userInfo");
const bcrypt = require("bcrypt");
const { validate } = require("../../validations/signupValidation");

module.exports = router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { error } = validate(req.body);

    // if there is an error in input data, then generate a message
    if (error)
      // console.log("Received error:", error);
      return res.status(400).send({ message: error.details[0].message });

    // Check if the password & confirm password are same
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    // Check if the user email already exists in db
    const user = await user_model.findOne({ email: req.body.email });
    if (user && user.isActiveUser == true)
      return res
        .status(409)
        .send({ message: "User with given email already exists" });

    // Encrypting the user password using salt (adds a random value to the input string)
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // If all checks were successful, then add the user to the db
    if (user) {
      if (user.isActiveUser === false) {
        await user_model.findOneAndUpdate(
          { email: req.body.email },
          { $set: { password: hashPassword, isActiveUser: true } }
        );
        return res.status(200).send({ message: "User created successfully" });
      } else {
        return res.status(409).send({
          message: "User with given email already exists and is active",
        });
      }
    } else {
      // Create a new user if no user with the given email exists
      await new user_model({
        ...req.body,
        password: hashPassword,
        isActiveUser: true,
      }).save();
      return res.status(201).send({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
