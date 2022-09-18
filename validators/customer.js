import Joi from 'joi';

export function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(2).required(),
      isGold: Joi.boolean().required(),
      phone: Joi.string().min(10).required(),
    };
    return Joi.validate(customer, schema);
}