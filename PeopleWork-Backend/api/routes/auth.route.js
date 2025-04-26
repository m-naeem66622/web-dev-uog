const express = require("express");
const router = express.Router();

const Controller = require("../controllers/auth.controller");
const validate = require("../middlewares/validateReq.middleware");
const UserValidation = require("../validators/user.validator");

// Route for requesting OTP
router.post(
    "/send-otp",
    validate(UserValidation.requestOTPSchema, "BODY"),
    Controller.sendOtp
);

// Route for logging in user
router.post(
    "/login",
    validate(UserValidation.loginSchema, "BODY"),
    Controller.loginUser
);

// Route for registering user
router.post(
    "/register",
    validate(UserValidation.registerSchema, "BODY"),
    Controller.verifyOtpAndRegister
);

// Route for forgot password
router.post(
    "/forgot",
    validate(UserValidation.requestOTPSchema, "BODY"),
    Controller.forgotPassword
);

// Route for reset password
router.post(
    "/reset",
    validate(UserValidation.resetPasswordSchema, "BODY"),
    Controller.resetPassword
);

module.exports = router;
