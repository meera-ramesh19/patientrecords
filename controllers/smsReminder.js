const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    getsmsReminder: async(req, res) => {

        // try {
        //     const patient = await Patient.findById(req.params.id)
        //     const userN = await User.findById(patient.userId)
        //         // console.log(userN)
        //     res.render('patientsPage.ejs', { patients: patient, moment: moment, user: req.user, creator: userN })
        // } catch (err) { console.log(err) }
    }
}