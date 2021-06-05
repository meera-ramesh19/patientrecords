const Patient = require('../models/Patient')

module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs', {
            user: null,
            leaflet: false
        });
    }
}