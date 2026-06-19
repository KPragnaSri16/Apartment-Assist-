const express = require("express");

const router = express.Router();

const {
  addEvent,
  getEvents,
  deleteEvent,
} = require("../controllers/eventController");

router.post("/add", addEvent);

router.get("/", getEvents);

router.delete("/:id", deleteEvent);

module.exports = router;