import Joi from "joi";

export const playgroundAddValidator = Joi.object({
  collection_name: Joi.string().required(),
  name: Joi.string().required(),
});

export const playgroundEditValidator = Joi.object({
  id: Joi.string().required(),
  collection_name: Joi.string().required(),
  encoded_string: Joi.string().required(),
});
