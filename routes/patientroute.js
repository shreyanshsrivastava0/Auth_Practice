const express = require("express");
const { getPatients, getSinglepatient, getpatientsAppointments } = require("../controllers/patientcontroller");

const router = express.Router();

router.get("/",getPatients);
router.get("/:id", getSinglepatient);
router.get("/:id/appointment", getpatientsAppointments);

module.exports = router;