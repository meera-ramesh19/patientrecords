const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment')
const cloudinary = require('../middleware/cloudinary')
const axios = require('axios');


module.exports = {
    getPatientsPage: async(req, res) => {
        try {
            const patient = await Patient.findById(req.params.id)
            const userN = await User.findById(patient.userId)

            res.render('patientsPage.ejs', { patients: patient, lat: patient.lat, lon: patient.lon, moment: moment, user: req.user, creator: userN })
        } catch (err) { console.log(err) }
    }
}