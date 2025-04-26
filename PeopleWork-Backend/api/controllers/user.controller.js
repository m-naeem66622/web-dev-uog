const User = require("../models/user.model");

// Controller for getting user profile
exports.getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Controller for updating user profile
exports.updateUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Controller for getting all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

        // Convert page and limit to integers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * limitNumber;

        // Fetch users with pagination
        const users = await User.find({ isDeleted: false })
            .skip(skip)
            .limit(limitNumber);

        // Get the total count of users
        const totalUsers = await User.countDocuments({ isDeleted: false });

        // Calculate total pages
        const totalPages = Math.ceil(totalUsers / limitNumber);

        res.status(200).json({
            users,
            totalUsers,
            totalPages,
            currentPage: pageNumber,
        });
    } catch (error) {
        next(error);
    }
};

// Controller for getting a user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({_id: userId, });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Controller for updating a user
exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Controller for deleting a user
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};
