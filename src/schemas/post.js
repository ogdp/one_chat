import Joi from "joi";

export const createPostSchema = Joi.object({
  contents: Joi.string().max(3000).messages({
    "string.max": "contents length must be max 3000 characters",
  }),
  images: Joi.array().items(Joi.string()),
});
export const updatePostSchema = Joi.object({
  contents: Joi.string().max(3000).messages({
    "string.max": "contents length must be max 3000 characters",
  }),
  images: Joi.array().items(Joi.string()),
  status: Joi.boolean(),
});
