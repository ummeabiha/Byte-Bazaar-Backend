const router = require("express").Router();
// const { user_model, validate } = require("../models/userSchema");
const { user_model } = require("../models/userSchema");
const bcrypt = require("bcrypt");
const Joi = require("joi"); 

const passwordComplexity = require("joi-password-complexity");

module.exports= router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    // if there is an error in input data, then generate a message
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Check if the password & confirm password are same
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    // Check if the user email already exists in db
    const user = await user_model.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists" });

    // Encrypting the user password using salt (adds a random value to the input string)
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // If all checks were successful, then add the user to the db
    await new user_model({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// function to validate the input data
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    confirmPassword: passwordComplexity().required().label("Confirm Password"),
  });
  return schema.validate(data);
};

// module.exports = router;
