const Reminder = require("../models/Reminder");

const addReminder = async (req, res) => {
  try {

    const { title, date } = req.body;

    const reminder =
      await Reminder.create({
        title,
        date,
      });

    res.status(201).json({
      message: "Reminder Added",
      reminder,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getReminders = async (req, res) => {
  try {

    const reminders =
      await Reminder.find();

    res.status(200).json(reminders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteReminder = async (
  req,
  res
) => {
  try {

    const reminder =
      await Reminder.findByIdAndDelete(
        req.params.id
      );

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder Not Found",
      });
    }

    res.status(200).json({
      message:
        "Reminder Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addReminder,
  getReminders,
  deleteReminder,
};