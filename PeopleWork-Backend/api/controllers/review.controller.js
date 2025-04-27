const Review = require("../models/reviews.model");
const Appointment = require("../models/appointment.model");

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { seller, appointment, rating, comment } = req.body;
        const customer = req.user._id; // assuming auth middleware

        // Check if the appointment exists and belongs to the customer
        const appointmentDoc = await Appointment.findOne({
            _id: appointment,
            customer: customer,
            seller: seller,
            status: "completed",
            isDeleted: false,
        });

        if (!appointmentDoc) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment or appointment not completed.",
            });
        }

        // Check if review already exists for this appointment (optional check)
        const existingReview = await Review.findOne({ appointment, customer });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this appointment.",
            });
        }

        const review = await Review.create({
            customer,
            seller,
            appointment,
            rating,
            comment,
        });

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        // Extract pagination parameters from query string
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get total count for pagination meta data
        const totalReviews = await Review.countDocuments({ isDeleted: false });

        // Fetch paginated reviews
        const reviews = await Review.find({ isDeleted: false })
            .populate("customer", "name email phone")
            .populate("seller", "name speciality email phone")
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: { reviews },
            pagination: {
                totalReviews,
                totalPages: Math.ceil(totalReviews / limit),
                currentPage: page,
                limit,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findOne({
            _id: req.params.id,
            isDeleted: false,
        })
            .populate("customer", "name email phone")
            .populate("seller", "name speciality email phone");

        if (!review) {
            return res
                .status(404)
                .json({ success: false, message: "Review not found" });
        }

        res.status(200).json({
            success: true,
            message: "Review fetched successfully",
            data: review,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a review (only customer who created can update)
exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findOne({
            _id: req.params.id,
            customer: req.user._id,
            isDeleted: false,
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found or unauthorized",
            });
        }

        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save();

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete (Soft Delete) a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, customer: req.user._id },
            { isDeleted: true },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
