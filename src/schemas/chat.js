import Joi from "joi";

export const createChatSchema = Joi.object({
  chatName: Joi.string().trim().required().messages({
    "string.trim": "chatName content cannot be left blank",
    "string.empty": "chatName is required",
    "any.required": "chatName is required",
  }),
  isGroupChat: Joi.boolean(),
  users: Joi.any(),
  latestMessage: Joi.string().trim().required().messages({
    "string.trim": "latestMessage id cannot be left blank",
    "string.empty": "latestMessage id is required",
    "any.required": "latestMessage id is required",
  }),
  groupAdmin: Joi.string().trim().required().messages({
    "string.trim": "groupAdmin id cannot be left blank",
    "string.empty": "groupAdmin id is required",
    "any.required": "groupAdmin id is required",
  }),
});
