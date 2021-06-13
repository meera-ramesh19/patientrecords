const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment')

module.exports = {
    showLocation: async(req, res) => {
        // try {
        //     const patient = await Patient.findById(req.params.id)
        //     const userN = await User.findById(patient.userId)
        //         // console.log(userN)
        //     res.render('patientsPage.ejs', { patients: patient, moment: moment, user: req.user, creator: userN })
        // } catch (err) { console.log(err) }
    }
}