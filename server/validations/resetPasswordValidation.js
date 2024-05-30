const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().max(30).required().messages({
      "string.email": "Email must be a valid email address.",
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
