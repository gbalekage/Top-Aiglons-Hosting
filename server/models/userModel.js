const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: function () {
        return this.provider !== "google"; // Password is not required for Google OAuth users
      },
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users without Google IDs
    },

    avatar: {
      type: String, // URL to the user's profile picture from Google
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    domainCount: {
      type: Number,
      default: 0,
    },

    hosting: {
      type: Number,
      default: 0,
    },

    resetPassword: String,
    resetPasswordTokenExpiresAt: Date,
    verificationCode: String,
    verificationCodeExpiresAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
