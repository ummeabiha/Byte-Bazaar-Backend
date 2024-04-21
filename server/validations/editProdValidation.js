const Joi = require("joi");

const validate = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    prodId: Joi.number().required(),
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
