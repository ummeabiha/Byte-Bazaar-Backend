const Joi = require("joi"); // library for data validation

// function to validate the input data
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { validate };
