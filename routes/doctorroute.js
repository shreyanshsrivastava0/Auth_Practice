
const express = require("express");
const { Createdoctor, getdoctor, getsingledoctor, updateDoctor, StatusDoctor, getAllappointments } = require("../controllers/doctorcontroller");
const router= express.Router();


router.post("/", Createdoctor);
router.get("/", getdoctor);
router.get("/:id", getsingledoctor);
router.put("/:id", updateDoctor);
router.patch("/:id", StatusDoctor);
router.get("/:id/appointments", getAllappointments);

module.exports = router;


