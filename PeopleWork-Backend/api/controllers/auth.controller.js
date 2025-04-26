// authController.js

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.util");
const nodemailer = require("nodemailer");

const otpStore = new Map(); // Temporary OTP storage

// Setup Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "dedrick.ward50@ethereal.email",
        pass: "39kHnQjbkTjzX4xUf3",
    },
});

// Helper to generate OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// 1. Send OTP
exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        }

        const otp = generateOtp();
        otpStore.set(email, otp);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Registration",
            text: `Your OTP is: ${otp}`,
        });

        res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send OTP." });
    }
};

// 2. Verify OTP & Register
exports.verifyOtpAndRegister = async (req, res) => {
    const { name, phone, email, address, password, otp } = req.body;

    try {
        const storedOtp = otpStore.get(email);

        if (!storedOtp) {
            return res
                .status(400)
                .json({ message: "OTP expired or not found." });
        }

        if (storedOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        const newUser = await User.create({
            name,
            phone,
            email,
            address,
            password,
        });

        otpStore.delete(email);

        res.status(201).json({
            message: "User registered successfully!",
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed." });
    }
};

// 3. Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, isDeleted: false });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // JWT Token generation
        const token = generateToken(user._id, user.role);

        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed." });
    }
};

// Forgot Password - Send OTP
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email, isDeleted: false });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const otp = generateOtp();
        otpStore.set(email, otp);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}`,
        });

        res.status(200).json({
            message: "OTP sent to email for password reset.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send reset OTP." });
    }
};

// Reset Password - Verify OTP and Update Password
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const storedOtp = otpStore.get(email);

        if (!storedOtp) {
            return res
                .status(400)
                .json({ message: "OTP expired or not found." });
        }

        if (storedOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        await User.findOneAndUpdate(
            { email },
            { password: newPassword },
            { new: true }
        );

        otpStore.delete(email);

        res.status(200).json({ message: "Password reset successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Password reset failed." });
    }
};
