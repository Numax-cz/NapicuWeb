
import joi from 'joi'

const PostSchema = joi.object(
  {
    title: joi.string().required(),
    body: joi.string().required()
  }
)
