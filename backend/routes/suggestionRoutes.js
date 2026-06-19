const express = require("express");

const router = express.Router();

const {
  addSuggestion,
  getSuggestions,
  getUserSuggestions,
} = require(
  "../controllers/suggestionController"
);

router.post(
  "/add",
  addSuggestion
);

router.get(
  "/",
  getSuggestions
);

router.get(
  "/user/:userId",
  getUserSuggestions
);

module.exports = router;