import Joi from "joi";

export const createUserSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .custom((value, helper) => {
      const containNumber = /\d/.test(value);
      if (containNumber) {
        return helper.message("The name cannot contain numbers");
      }
    })
    .messages({
      "string.empty": "First name cannot be empty",
      "any.required": "First name is required",
    }),
  lastName: Joi.string()
    .required()
    .custom((value, helper) => {
      const containNumber = /\d/.test(value);
      if (containNumber) {
        return helper.message("The name cannot contain numbers");
      }
    })
    .messages({
      "string.empty": "Last name cannot be empty",
      "any.required": "Last name is required",
    }),
  email_tel: Joi.string()
    .trim()
    .required()
    .custom((value, helper) => {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
      const isValidEmail = emailRegex.test(value);
      const isValidPhone = phoneRegex.test(value);
      const typeNumber = value.split("").every((char) => !isNaN(char));
      if (typeNumber) {
        if (String(value).length < 10 || String(value).length > 10)
          return helper.message("Only accepts 10-digit format");
        if (!isValidPhone) return helper.message("Invalid phone number");
      } else {
        if (!isValidEmail) return helper.message("Invalid email address");
      }
    })
    .messages({
      "string.trim": "Email or Phone number is required field",
      "string.empty": "Email or Phone number is required field",
    }),
  dateOfBirth: Joi.string().required().messages({
    "string.empty": "Date of birth must not be empty",
    "any.required": "Date of birth is a required field",
  }),
  gender: Joi.string().required().messages({
    "string.empty": "Gender must not be empty",
    "any.required": "Gender is a required field",
  }),
  avatar_url: Joi.any(),
  location: Joi.string().min(10).messages({
    "string.empty": "Country cannot be empty",
    "string.min": "Country must be at least {#limit} characters long",
    "any.required": "Country is a required field",
  }),
  province: Joi.string().min(10).messages({
    "string.empty": "Province cannot be empty",
    "string.min": "Province must be at least {#limit} characters long",
    "any.required": "Province is a required field",
  }),
  password: Joi.string().trim().min(6).required().messages({
    "string.trim": "Password must not contain spaces",
    "string.empty": "Password is required field",
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": "Password is required field",
  }),
});
export const userSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .custom((value, helper) => {
      const containNumber = /\d/.test(value);
      if (containNumber) {
        return helper.message("The name cannot contain numbers");
      }
    })
    .messages({
      "string.empty": "First name cannot be empty",
      "any.required": "First name is required",
    }),
  lastName: Joi.string()
    .required()
    .custom((value, helper) => {
      const containNumber = /\d/.test(value);
      if (containNumber) {
        return helper.message("The name cannot contain numbers");
      }
    })
    .messages({
      "string.empty": "Last name cannot be empty",
      "any.required": "Last name is required",
    }),
  email_tel: Joi.string()
    .trim()
    .required()
    .custom((value, helper) => {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
      const isValidEmail = emailRegex.test(value);
      const isValidPhone = phoneRegex.test(value);
      const typeNumber = value.split("").every((char) => !isNaN(char));
      if (typeNumber) {
        if (String(value).length < 10 || String(value).length > 10)
          return helper.message("Only accepts 10-digit format");
        if (!isValidPhone) return helper.message("Invalid phone number");
      } else {
        if (!isValidEmail) return helper.message("Invalid email address");
      }
    })
    .messages({
      "string.trim": "Email or Phone number is required field",
      "string.empty": "Email or Phone number is required field",
    }),
  dateOfBirth: Joi.string().required().messages({
    "string.empty": "Date of birth must not be empty",
    "any.required": "Date of birth is a required field",
  }),
  gender: Joi.string().required().messages({
    "string.empty": "Gender must not be empty",
    "any.required": "Gender is a required field",
  }),
  location: Joi.string().min(5).messages({
    "string.empty": "Country cannot be empty",
    "string.min": "Country must be at least {#limit} characters long",
    "any.required": "Country is a required field",
  }),
  province: Joi.string().min(5).messages({
    "string.empty": "Province cannot be empty",
    "string.min": "Province must be at least {#limit} characters long",
    "any.required": "Province is a required field",
  }),
  password: Joi.string().trim().min(6).required().messages({
    "string.trim": "Password must not contain spaces",
    "string.empty": "Password is required field",
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": "Password is required field",
  }),
});
