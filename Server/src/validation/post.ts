import joi from "joi";

export const creatPost = joi.object({
  title: joi.string().required()
})

