const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const appointmentPageController = require("../controllers/appointmentPage");
const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment');
const cloudinary = require('../middleware/cloudinary');
const axios = require('axios');
const Appointment = require('../models/Appointment');

router.get("/:id", ensureAuth, appointmentPageController.getAppointmentsPage);

module.exports = router;