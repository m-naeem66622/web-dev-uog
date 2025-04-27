// authController.js

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.util");
const nodemailer = require("nodemailer");

const otpStore = new Map(); // Temporary OTP storage

// Setup Nodemailer
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password or app password
    },
});

// Helper to generate OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Register User (create account)
exports.register = async (req, res) => {
    const { name, phone, email, address, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        }

        const newUser = await User.create({
            name,
            phone,
            email,
            address,
            password,
        });

        res.status(201).json({
            message: "User registered. Please verify your email with OTP.",
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed." });
    }
};

// Send OTP (after user exists)
exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const otp = generateOtp();
        otpStore.set(email, otp);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification OTP",
            text: `Your OTP for email verification is: ${otp}`,
        });

        res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send OTP." });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

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

        await User.findOneAndUpdate({ email }, { isVerified: true });

        otpStore.delete(email);

        res.status(200).json({ message: "Email verified successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "OTP verification failed." });
    }
};

// Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, isDeleted: false });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        if (!user.isVerified) {
            return res
                .status(400)
                .json({ message: "Please verify your email first." });
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
