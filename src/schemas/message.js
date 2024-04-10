import Joi from "joi";

export const createMessageSchema = Joi.object({
  chatId: Joi.string().trim().required().messages({
    "string.trim": "chatId content cannot be left blank",
    "string.empty": "chatId is required",
    "any.required": "chatId is required",
  }),
  senderId: Joi.string().trim().required().messages({
    "string.trim": "senderId content cannot be left blank",
    "string.empty": "senderId is required",
    "any.required": "senderId is required",
  }),
  text: Joi.string().trim().required().messages({
    "string.trim": "Message content cannot be left blank",
    "string.empty": "Message is required",
    "any.required": "Message is required",
  }),
});
