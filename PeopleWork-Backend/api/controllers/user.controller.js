const User = require("../models/user.model");

// Controller for getting user profile
exports.getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findOne({ _id: userId, isDeleted: false });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: user,
        });
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
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: user,
        });
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

        const filter = { isDeleted: false, role: { $ne: "admin" } };

        if (role) filter.role = role;
        if (speciality) filter.speciality = speciality;
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
            success: true,
            message: "Users fetched successfully",
            data: { users },
            pagination: {
                totalUsers,
                totalPages,
                currentPage: pageNumber,
                limit,
            },
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
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
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
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
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
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
