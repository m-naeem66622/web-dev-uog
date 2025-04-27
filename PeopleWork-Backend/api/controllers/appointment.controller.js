const Appointment = require("../models/appointment.model");

// Create Appointment
exports.createAppointment = async (req, res) => {
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
exports.getAllAppointments = async (req, res) => {
    try {
        // Extract pagination parameters from query string
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get total count for pagination metadata
        const totalAppointments = await Appointment.countDocuments({
            isDeleted: false,
        });

        // Get appointments with pagination
        const appointments = await Appointment.find({ isDeleted: false })
            .populate("customer", "name email phone")
            .populate("seller", "name speciality email phone")
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: appointments,
            pagination: {
                totalAppointments,
                totalPages: Math.ceil(totalAppointments / limit),
                currentPage: page,
                limit,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Appointment by ID
exports.getAppointmentById = async (req, res) => {
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
exports.updateAppointment = async (req, res) => {
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
exports.deleteAppointment = async (req, res) => {
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
