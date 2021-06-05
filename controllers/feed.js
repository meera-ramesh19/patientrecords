const Feed = require('../models/Patient')
const moment = require('moment')
module.exports = {
    getFeed: async(req, res) => {
        try {
            // console.log(req.user)
            const patients = await Feed.find()
                .sort({ createdAt: 'desc' })
                .lean()
                // console.log(patients)
            res.render('feed.ejs', { patients: patients, moment: moment, user: req.user })
        } catch (err) {
            console.log(err)
        }
    }

}