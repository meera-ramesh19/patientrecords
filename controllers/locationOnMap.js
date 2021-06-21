const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment')

module.exports = {
    showLocation: async(req, res) => {
        try {
            const patient = await Patient.find()
              const userN = await User.findById(patient.userId)
        // //         // console.log(userN)
        res.render('locationOnMap.ejs' , { patients: patient, moment: moment, user: req.user,creator:userN });
        
         } catch (err) { console.log(err) }
    }
}