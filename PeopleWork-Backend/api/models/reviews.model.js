const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: false, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
