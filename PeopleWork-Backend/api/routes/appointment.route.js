const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");
const Controller = require("../controllers/appointment.controller");

// Create Appointment
router.post("/", authenticate, Controller.createAppointment);

// Get All Appointments (Admin use - optional)
router.get("/", authenticate, Controller.getAllAppointments);

// Get Single Appointment by ID
router.get("/:id", authenticate, Controller.getAppointmentById);

// Update Appointment
router.put("/:id", authenticate, Controller.updateAppointment);

// Soft Delete Appointment
router.delete("/:id", authenticate, Controller.deleteAppointment);

module.exports = router;
