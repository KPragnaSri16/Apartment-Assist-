const Complaint = require("../models/Complaint");

const addComplaint = async (req, res) => {
  try {

    const {
      title,
      description,
      userId,
      tenantName,
      flatNumber,
    } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      userId,
      tenantName,
      flatNumber,
    });

    res.status(201).json({
      message: "Complaint Submitted",
      complaint,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getComplaints = async (req, res) => {
  try {

    const complaints =
      await Complaint.find();

    res.status(200).json(
      complaints
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getUserComplaints = async (
  req,
  res
) => {
  try {

    const complaints =
      await Complaint.find({
        userId: req.params.userId,
      });

    res.status(200).json(
      complaints
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateComplaintStatus = async (
  req,
  res
) => {
  try {

    const { status } = req.body;

    const complaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

    if (!complaint) {

      return res.status(404).json({
        message: "Complaint Not Found",
      });

    }

    res.status(200).json({
      message:
        "Complaint Status Updated",
      complaint,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addComplaint,
  getComplaints,
  getUserComplaints,
  updateComplaintStatus,
};