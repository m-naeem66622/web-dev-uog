const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, uppercase: true },
        phone: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        address: { type: String, trim: true, default: null },
        role: {
            type: String,
            required: true,
            default: "customer",
            enum: ["customer", "seller", "admin"],
        },
        password: { type: String, required: true },
        status: {
            type: String,
            required: true,
            default: "active",
            enum: ["active", "inactive"],
        },
        speciality: { type: String, required: false },
        keywords: { type: String, required: false },
        isVerified: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();

    if (update.password) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
    }

    next();
});

const UserSchema = mongoose.model("User", userSchema);

module.exports = UserSchema;
