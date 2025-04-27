const express = require("express");
const router = express.Router();

const Controller = require("../controllers/review.controller");
const authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

// Create a new review
router.post(
    "/",
    authenticate,
    Authorize.isCustomer,
    Controller.createReview
);

// Get all reviews (admin/public)
router.get("/", Controller.getAllReviews);

// Get a single review by ID
router.get("/:id", Controller.getReviewById);

// Update a review (only the customer who posted can update)
router.patch("/:id", authenticate, Controller.updateReview);

// Soft delete a review (only the customer who posted can delete)
router.delete("/:id", authenticate, Controller.deleteReview);

module.exports = router;
