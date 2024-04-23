import Joi from "joi";

export const createUserSchema = Joi.object({
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
        if (String(value).length !== 10)
          return helper.message("Phone number must have exactly 10 digits");
        if (!isValidPhone) return helper.message("Invalid phone number format");
      } else {
        if (!isValidEmail) return helper.message("Invalid email address");
      }
    })
    .messages({
      "string.trim": "Email or Phone number is required",
      "string.empty": "Email or Phone number is required",
    }),
  information: Joi.object({
    firstName: Joi.string()
      .required()
      .custom((value, helper) => {
        const containNumber = /\d/.test(value);
        if (containNumber) {
          return helper.message("First name cannot contain numbers");
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
          return helper.message("Last name cannot contain numbers");
        }
      })
      .messages({
        "string.empty": "Last name cannot be empty",
        "any.required": "Last name is required",
      }),
    dateOfBirth: Joi.string().required().messages({
      "string.empty": "Date of birth must not be empty",
      "any.required": "Date of birth is required",
    }),
    gender: Joi.string().required().messages({
      "string.empty": "Gender must not be empty",
      "any.required": "Gender is required",
    }),
    avatar_url: Joi.array().items(Joi.string()), // assuming avatar_url is an array of strings
  }),
  password: Joi.string().trim().min(6).required().messages({
    "string.trim": "Password must not contain spaces",
    "string.empty": "Password is required",
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password does not match",
    "any.required": "Confirm password is required",
  }),
});
export const userSchema = Joi.object({
  email_tel: Joi.string().trim().required().messages({
    "string.trim": "Email or Phone number is required field",
    "string.empty": "Email or Phone number is required field",
  }),
  active_status: Joi.string(),
  role: Joi.string(),
  information: Joi.object({
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
    dateOfBirth: Joi.date().required().messages({
      "date.base": "Date of birth must be a valid date",
      "date.empty": "Date of birth must not be empty",
      "any.required": "Date of birth is a required field",
    }),
    gender: Joi.string().valid("male", "female").required(),
    province: Joi.string().trim().min(2).max(32).messages({
      "string.trim": "Province must not contain spaces",
      "string.empty": "Province is required",
      "string.min": "Province must be at least {#limit} characters long",
      "string.max": "Province must be at most {#limit} characters long",
      "any.required": "Province is required",
    }),
    district: Joi.string().trim().min(2).max(32).messages({
      "string.trim": "District must not contain spaces",
      "string.empty": "District is required",
      "string.min": "District must be at least {#limit} characters long",
      "string.max": "District must be at most {#limit} characters long",
      "any.required": "District is required",
    }),
    avatar_url: Joi.array().items(Joi.string()), // Giả sử là một mảng các URL avatar
  }).required(),
  password: Joi.string().trim().min(6).required().messages({
    "string.trim": "Password must not contain spaces",
    "string.empty": "Password is required field",
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": "Password is required field",
  }),
});
