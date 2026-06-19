const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Suggestion",
  suggestionSchema
);