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

const loginSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
        .required(),
    password: Joi.string().required(),
});

const updateProfileSchema = Joi.object({
    name: Joi.string().trim().uppercase(),
    phone: Joi.string().trim().required(),
    address: Joi.string().trim(),
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

module.exports = {
    registerSchema,
    loginSchema,
    requestOTPSchema,
    resetPasswordSchema,
    updateProfileSchema,
    updateUserProfileSchema,
    updateUserSchema,
};
