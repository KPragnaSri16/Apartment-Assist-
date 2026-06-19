const Event = require("../models/Event");

const addEvent = async (req, res) => {
  try {

    const { title, date, description } = req.body;

    const event = await Event.create({
      title,
      date,
      description,
    });

    res.status(201).json({
      message: "Event Added Successfully",
      event,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getEvents = async (req, res) => {
  try {

    const events = await Event.find();

    res.status(200).json(events);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteEvent = async (req, res) => {
  try {

    const event = await Event.findByIdAndDelete(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    res.status(200).json({
      message: "Event Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addEvent,
  getEvents,
  deleteEvent,
};