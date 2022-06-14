const joi = require('joi')

export const PostSchema = joi.object({
  title: joi.string().required(),
  body: joi.string().required(),
});
