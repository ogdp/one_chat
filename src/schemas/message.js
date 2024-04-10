import Joi from "joi";

export const createMessageSchema = Joi.object({
  sender: Joi.string().trim().required().messages({
    "string.trim": "sender cannot be left blank",
    "string.empty": "sender is required",
    "any.required": "sender is required",
  }),
  content: Joi.string().trim().required().messages({
    "string.trim": "content content cannot be left blank",
    "string.empty": "content is required",
    "any.required": "content is required",
  }),
  chat: Joi.string().trim().required().messages({
    "string.trim": "chat content cannot be left blank",
    "string.empty": "chat is required",
    "any.required": "chat is required",
  }),
});
