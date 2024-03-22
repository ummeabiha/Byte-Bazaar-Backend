const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    confirmPassword: passwordComplexity().required(),
  });
  return schema.validate(data);
};

module.exports = { validate };