const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const cloudinary = require('../middleware/cloudinary');
const axios = require('axios');

module.exports = {
    getLandingPage: async(req, res) => {
        try {

            const patient = await Patient.find({ userId: req.user })
            console.log(patient)
            res.render('landingPage.ejs', { patient: patient, user: req.user, leaflet: false });

        } catch (err) {
            console.error(err)
        }
    },
}