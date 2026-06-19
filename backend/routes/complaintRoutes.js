const express = require("express");

const router = express.Router();

const {
  addComplaint,
  getComplaints,
  getUserComplaints,
  updateComplaintStatus,
} = require(
  "../controllers/complaintController"
);

router.post(
  "/add",
  addComplaint
);

router.get(
  "/",
  getComplaints
);

router.get(
  "/user/:userId",
  getUserComplaints
);

router.put(
  "/:id",
  updateComplaintStatus
);

module.exports = router;