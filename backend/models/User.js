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
      required: true,
    },

    role: {
      type: String,
      enum: ["tenant", "secretary"],
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    flatNumber: {
      type: String,
      default: "",
    },

    members: {
      type: Number,
      default: 0,
    },

    apartmentName: {
      type: String,
      default: "",
    },

    accessCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);