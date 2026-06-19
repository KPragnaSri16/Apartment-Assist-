const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    tenantName: {
      type: String,
      required: true,
    },

    flatNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Not Started",
        "In Progress",
        "Resolved",
      ],
      default: "Not Started",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Complaint",
  complaintSchema
);