const Joi = require("joi");

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.required(),
    rating: Joi.required(),
  });
  return schema.validate(data);
};

module.exports = { validate };
