const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    confirmPassword: passwordComplexity().required(),
  });
  return schema.validate(data);
};

module.exports = { validate };
