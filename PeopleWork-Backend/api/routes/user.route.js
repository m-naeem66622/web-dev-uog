const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user.controller");
const validate = require("../middlewares/validateReq.middleware");
const CommonValidation = require("../validators/common.validator");
const UserValidation = require("../validators/user.validator");
const authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

// ------------------------ PUBLIC ROUTES -------------------------
// Route for getting all users
router.get(
    "/",
    validate(UserValidation.getAllUsersSchema, "QUERY"),
    Controller.getAllUsers
);

// ------------------------ USER ROUTES -------------------------
// Route for getting user profile
router.get("/profile", authenticate, Controller.getUserProfile);

// Route for updating user profile
router.put(
    "/profile",
    authenticate,
    validate(UserValidation.updateUserProfileSchema, "BODY"),
    Controller.updateUserProfile
);

// ------------------------ ADMIN ROUTES ------------------------
// Route for getting a user by ID
router.get(
    "/:id",
    authenticate,
    Authorize.isAdmin,
    validate(CommonValidation.mongooseIdSchema, "PARAMS"),
    Controller.getUserById
);

// Route for updating a user
router.put(
    "/:id",
    authenticate,
    Authorize.isAdmin,
    validate(UserValidation.updateUserSchema, "BODY"),
    Controller.updateUser
);

// Route for deleting a user
router.delete(
    "/:id",
    authenticate,
    Authorize.isAdmin,
    validate(CommonValidation.mongooseIdSchema, "PARAMS"),
    Controller.deleteUser
);

module.exports = router;
