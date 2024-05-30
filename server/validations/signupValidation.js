const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().max(30).required().messages({
      "string.max": "First Name must not exceed 30 characters.",
      "any.required": "First Name is required.",
    }),
    lastName: Joi.string().max(20).required().messages({
      "string.max": "Last Name must not exceed 20 characters.",
      "any.required": "Last Name is required.",
    }),
    email: Joi.string().email().max(30).required().messages({
      "string.max": "Email must not exceed 30 characters.",
      "any.required": "Email is required.",
    }),
    password: passwordComplexity().min(8).max(20).required().messages({
      "string.min": "Password must contain 8 characters.",
      "string.max": "Password must not exceed 20 characters.",
      "any.required": "Password is required.",
    }),
    confirmPassword: passwordComplexity()
      .valid(Joi.ref("password"))
      .min(8)
      .max(20)
      .required()
      .messages({
        "any.only": "Passwords do not match.",
        "string.min": "Confirm Password must contain 8 characters.",
        "string.max": "Confirm Password must not exceed 20 characters.",
        "any.required": "Confirm Password is required.",
      }),
  });
  return schema.validate(data);
};

module.exports = { validate };
