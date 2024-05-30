const Joi = require("joi"); // library for data validation

// function to validate the input data
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().max(30).required().messages({
      "string.email": "Email must be a valid email address.",
      "string.max": "Email must not exceed 30 characters.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().required().messages({
      "any.only": "Password must be valid.",
      "any.required": "Password is required.",
    }),
  });
  return schema.validate(data);
};

module.exports = { validate };
