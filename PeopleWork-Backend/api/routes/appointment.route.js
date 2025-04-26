const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");
const AppointmentController = require("../controllers/appointment.controller");

// Create Appointment
router.post("/", authenticate, AppointmentController.createAppointment);

// Get All Appointments (Admin use - optional)
router.get("/", authenticate, AppointmentController.getAllAppointments);

// Get Single Appointment by ID
router.get("/:id", authenticate, AppointmentController.getAppointmentById);

// Update Appointment
router.put("/:id", authenticate, AppointmentController.updateAppointment);

// Soft Delete Appointment
router.delete("/:id", authenticate, AppointmentController.deleteAppointment);

module.exports = router;
