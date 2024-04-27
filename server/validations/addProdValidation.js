const Joi = require("joi");

// const validate = (data) => {
//   const schema = Joi.object({
//     id: Joi.number().required(),
//     name: Joi.string().required(),
//     description: Joi.string().required(),
//     category: Joi.string().required(),
//     brand: Joi.string().required(),
//     image: Joi.string().required(),
//     price: Joi.required(),
//     rating: Joi.required(),
//   });
//   return schema.validate(data);
// };

const validate = (data) => {
  const schema = Joi.object({
    id: Joi.number().required().positive().messages({
      "any.required": "Product Id is required.",
      "number.positive": "Product Id must be a positive number.",
    }),
    name: Joi.string().max(30).required().messages({
      "string.max": "Product Name must not exceed 30 characters.",
      "any.required": "Product Name is required.",
    }),
    description: Joi.string().max(200).required().messages({
      "string.max": "Product Description must not exceed 200 characters.",
      "any.required": "Product Description is required.",
    }),
    category: Joi.string().max(20).required().messages({
      "string.max": "Product Category must not exceed 20 characters.",
      "any.required": "Product Category is required.",
    }),
    brand: Joi.string().max(20).required().messages({
      "string.max": "Product Brand must not exceed 20 characters.",
      "any.required": "Product Brand is required.",
    }),
    image: Joi.string().required().messages({
      "any.required": "Product Image is required.",
    }),
    price: Joi.number().required().positive().messages({
      "any.required": "Product Price is required.",
      "number.positive": "Product Price must be a positive number.",
    }),
    rating: Joi.number().required().positive().messages({
      "any.required": "Product Rating is required.",
      "number.positive": "Product Rating must be a positive number.",
    }),
  });
  return schema.validate(data);
};

module.exports = { validate };
