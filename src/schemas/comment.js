import Joi from "joi";

export const createCommentSchema = Joi.object({
  contents: Joi.string().trim().max(3000).messages({
    "string.trim": "contents is required",
    "string.max": "contents length must be max 3000 characters",
  }),
  image: Joi.string(),
  post: Joi.string().required().messages({
    "string.required": "IdPost is required",
  }),
});
export const updateCommentSchema = Joi.object({
  contents: Joi.string().trim().max(3000).messages({
    "string.trim": "contents is required",
    "string.max": "contents length must be max 3000 characters",
  }),
  image: Joi.string(),
  post: Joi.string().required().messages({
    "string.required": "IdPost is required",
  }),
});
