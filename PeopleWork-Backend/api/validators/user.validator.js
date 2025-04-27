const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().trim().uppercase().required(),
    phone: Joi.string().trim().required(),
    email: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
        .required(),
    role: Joi.string().valid("seller", "customer").required(),
    address: Joi.string().trim(),
    password: Joi.string().required(),
    otp: Joi.number().required(),
});

const requestOTPSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
        .required(),
});

const verifyOTPSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
        .required(),
    otp: Joi.number().required(),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
        .required(),
    password: Joi.string().required(),
});

const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
        .required(),
    otp: Joi.number().required(),
    newPassword: Joi.string().required(),
});

const updateUserProfileSchema = Joi.object({
    name: Joi.string().trim().uppercase().optional(),
    phone: Joi.string().trim().optional(),
    address: Joi.string().trim().optional(),
    speciality: Joi.string().optional(),
    keywords: Joi.string().optional(),
    password: Joi.string().optional(),
    oldPassword: Joi.string()
        .when("password", {
            is: Joi.exist(),
            then: Joi.invalid(Joi.ref("password")),
        })
        .messages({
            "any.invalid": "password and oldPassword must not be same",
        }),
});

const updateUserSchema = Joi.object({
    name: Joi.string().trim().uppercase().optional(),
    phone: Joi.string().trim().optional(),
    address: Joi.string().trim().optional(),
    role: Joi.string().valid("seller", "customer").optional(),
});

const getAllUsersSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    speciality: Joi.string().optional(),
    keyword: Joi.string().optional(),
    role: Joi.string().valid("seller", "customer"),
});

module.exports = {
    registerSchema,
    loginSchema,
    requestOTPSchema,
    verifyOTPSchema,
    resetPasswordSchema,
    updateUserProfileSchema,
    updateUserSchema,
    getAllUsersSchema,
};
