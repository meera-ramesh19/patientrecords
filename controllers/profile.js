const Patient = require('../models/Patient')

module.exports = {
    getIndex: async(req, res) => {
        try {
            const UsersPatients = await Patient.find({ user: req.user._id })
            res.render('profile.ejs', { patients: UsersPatients, user: req.user, leaflet: true })
        } catch (err) {
            console.error(err)
        }
    },
}