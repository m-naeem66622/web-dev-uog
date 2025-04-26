const Appointment = require("../models/Appointment");

// Create Appointment
const createAppointment = async (req, res) => {
    try {
        const { seller, serviceType, appointmentDate, notes } = req.body;
        const customer = req.user._id; // Assuming user info is added by auth middleware

        const appointment = await Appointment.create({
            customer,
            seller,
            serviceType,
            appointmentDate,
            notes,
        });

        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Appointments (Admin use - optional)
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ isDeleted: false })
            .populate("customer", "name email phone")
            .populate("seller", "name speciality email phone");

        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findOne({
            _id: req.params.id,
            isDeleted: false,
        })
            .populate("customer", "name email phone")
            .populate("seller", "name speciality email phone");

        if (!appointment) {
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        }

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Appointment (Only status and notes usually allowed)
const updateAppointment = async (req, res) => {
    try {
        const { status, notes } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status, notes },
            { new: true }
        );

        if (!appointment) {
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        }

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Soft Delete Appointment
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );

        if (!appointment) {
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        }

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};
