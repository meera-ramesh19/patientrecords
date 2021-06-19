const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment');
const cloudinary = require('../middleware/cloudinary');
const axios = require('axios');
const Appointment = require('../models/Appointment');

module.exports = {
    getAppointmentsPage: async(req, res) => {
        try {
            const id = req.params.id;
            const appointment = await Appointment.findById({ id })
            const patient = await Patient.findById(req.params.id)
            const userN = await User.findById(patient.userId)

            res.render('appointmentsPage.ejs', {
                timeZones: getTimeZones(),
                appointment: appointment,
                moment: moment,
                user: req.user,
                patient: req.patient,
                creator: userN
            });
        } catch (err) {
            console.error(err)
        }

    },
}