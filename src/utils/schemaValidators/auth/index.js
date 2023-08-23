import Joi from "joi";

//login schema
export const loginWithEmailAndPasswordPayloadSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginWithEmailAndPasswordPayloadValidator = async (payload) => {
  await loginWithEmailAndPasswordPayloadSchema.validateAsync(payload);
};

//register schema
export const registerWithEmailAndPasswordPayloadSchema = Joi.object({
  name:Joi.string().required(),  
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const registerWithEmailAndPasswordValidator = async (payload) => {
  await registerWithEmailAndPasswordPayloadSchema.validateAsync(payload);
};