const EmergencyContact =
  require("../models/EmergencyContact");

const addContact = async (
  req,
  res
) => {
  try {

    const { name, phone } =
      req.body;

    const contact =
      await EmergencyContact.create({
        name,
        phone,
      });

    res.status(201).json({
      message:
        "Contact Added Successfully",
      contact,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getContacts = async (
  req,
  res
) => {
  try {

    const contacts =
      await EmergencyContact.find();

    res.status(200).json(
      contacts
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteContact = async (
  req,
  res
) => {
  try {

    const contact =
      await EmergencyContact.findByIdAndDelete(
        req.params.id
      );

    if (!contact) {
      return res.status(404).json({
        message:
          "Contact Not Found",
      });
    }

    res.status(200).json({
      message:
        "Contact Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addContact,
  getContacts,
  deleteContact,
};