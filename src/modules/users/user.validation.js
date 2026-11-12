
const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .lowercase()
    .max(254)
    .required(),

  phone: Joi.string()
    .trim()
    .min(7)
    .max(20)
    .optional(),

  password: Joi.string()
    .min(8)
    .max(72)
    .required()
}).options({
  abortEarly: false,
  stripUnknown: true
});

module.exports = {
  registerSchema
};
