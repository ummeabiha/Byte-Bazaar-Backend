const Joi = require("joi");

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
    image: Joi.binary().required().encoding("base64").max(31457280).messages({
      "binary.base": "Image must be a valid image file.",
      "any.required": "Image is required.",
      "binary.max": "Image size must not exceed 5MB.",
      "binary.encoding": "Image must be provided in base64 format.",
    }),
    price: Joi.number().required().positive().precision(2).messages({
      "any.required": "Product Price is required.",
      "number.positive": "Product Price must be a positive number.",
      "number.precision": "Product Price must have at most 2 decimal places.",
    }),
    quantity: Joi.number().required().positive().messages({
      "any.required": "Quantity is required.",
      "number.positive": "Quantity must be a positive number.",
    }),
    rating: Joi.number().required().min(1).max(5).messages({
      "any.required": "Product Rating is required.",
      "number.min": "Product Rating must be at least 1.",
      "number.max": "Product Rating must not exceed 5.",
    }),
  });
  return schema.validate(data);
};

module.exports = { validate };
