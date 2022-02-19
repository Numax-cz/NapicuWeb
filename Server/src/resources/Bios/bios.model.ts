import joi from "joi";


export const EmailSchema = joi.object({
  email: joi.string().required().email(),
});
