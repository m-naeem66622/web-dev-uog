const User = require("../models/user.model");

// Controller for getting user profile
exports.getUserProfile = async (req, res, next) => {
    try {
        console.log("Fetching user profile...");
        const userId = req.user._id;
        console.log("User ID:", userId);
        const user = await User.findOne({ _id: userId, isDeleted: false });
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
        const userId = req.user._id;
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
        const { page = 1, limit = 10, speciality, keyword, role } = req.query;

        // Convert page and limit to integers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * limitNumber;

        // Build the query filter - always exclude admin users
        const filter = { 
            isDeleted: false,
            role: { $ne: 'admin' } // Exclude admin users in all cases
        };

        // Add role filter if provided
        if (role) {
            filter.role = role;
        }

        // Add speciality filter if provided
        if (speciality) {
            filter.speciality = speciality;
        }

        // Add keyword search across name, email, and address if provided
        if (keyword) {
            filter.$or = [
                { name: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
                { address: { $regex: keyword, $options: "i" } },
            ];
        }

        // Fetch users with filters and pagination
        const users = await User.find(filter).skip(skip).limit(limitNumber);

        // Get the total count of users matching the filter
        const totalUsers = await User.countDocuments(filter);

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
        const user = await User.findOne({ _id: userId });
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
        const user = await User.findByIdAndUpdate(userId, { isDeleted: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Controller for searching user
