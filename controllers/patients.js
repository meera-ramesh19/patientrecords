const Patient = require('../models/Patient')
const path = require("path");
const User = require('../models/User')
const cloudinary = require('../middleware/cloudinary')
const moment = require('moment')
const upload = require("../middleware/multer");

module.exports = {
    getProfile: async(req, res) => {
        // console.log(req.user)
        try {
            const patientItems = await Patient.find({ userId: req.user.id });

            res.render("profile.ejs", { patient: patientItems, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    createPatient: async(req, res) => {
        //creating new record in db
        console.log(req.file)
        console.log(req.body.docVisitDate)
        const fileErrors = [];
        var yesterday = moment().subtract(0, "day").format("YYYY-MM-DD");
        var birthToDate = req.body.patDob
        var appDate = req.body.docVisitDate
        var followDate = req.docFollowUpDate
        if (moment(birthToDate, "YYYY-MM-DD", true).isAfter(yesterday)) {
            // alert("date is today or in future");
            // console.log("date is today or in future");
            fileErrors.push({ msg: "Date of birth cannot be later than today" })
        }
        if (moment(appDate, "YYYY-MM-DD", true).isBefore(yesterday)) {
            // alert("date is today or in future");
            // console.log("date is today or in future");
            fileErrors.push({ msg: "Visit date cannot be earlier than today" })

        }
        if (moment(followDate, "YYYY-MM-DD", true).isBefore(appDate)) {

            // alert("date is today or in future");
            // console.log("date is today or in future");
            fileErrors.push({ msg: "FollowUpDate cannot be earlier than VisitDate" })

        }



        try {


            const result = await cloudinary.uploader.upload(req.file.path);
            const patient = await Patient.create({
                postTitle: req.body.postTitle,
                patName: req.body.patName,
                patDob: req.body.patDob,
                patComments: req.body.patComments,
                patAilment: req.body.patAilment,
                // patReviews: req.body.patReviews,
                patDocAdd: req.body.patDocAdd,
                // phStreet: req.body.phStreet,
                // phCity: req.body.phCity,
                // phState: req.body.phState,
                // phCountry: req.body.phCountry,
                // phPincode: req.body.phpinCode,
                patPharmacyName: req.body.patPharmacyName,
                docName: req.body.docName,
                address: req.body.address,
                // docStreet: req.body.docStreet,
                // docCity: req.body.docCity,
                // docState: req.body.docState,
                // docCountry: req.body.docCountry,
                // docPincode: req.body.docPincode,
                docPracticeName: req.body.docPracticeName,
                docSpecialization: req.body.docSpecialization,
                docGender: req.body.docGender,
                docVisitDate: req.body.docVisitDate,
                docCopay: req.body.docCopay,
                docInNetwork: req.body.docInNetwork,
                docInstructions: req.body.docInstructions,
                docFollowUp: req.body.docFollowup,
                docFollowUpDate: req.body.docFollowUpDate,
                docPills: req.body.docPills,
                docCream: req.body.docCream,
                docDrops: req.body.docDrops,
                image: result.secure_url,
                // lat: req.body.lat,
                // lon: req.body.lon,
                user: req.user,
                cloudinary_id: result.public_id,
                files: req.files,
                //const urls = []
                // for (const file of files) {
                //     const { path } = file;
                //     const newPath = await uploader(path)
                //     urls.push(newPath)
                //     fs.unlinkSync(path)
                // }
            });
            await patient.save();
            console.log('Patient has been added!');
            res.redirect(`/patients`)
        } catch (err) {
            console.error(err)
        }
    },


    getPatient: async(req, res) => {
        try {
            //Find function without any argument will return all
            //the records from the 'Patiet' collection.
            const PatientsAllVisits = await Patient.find()
            res.render('index.ejs', { patients: PatientsAllVisits, reviews: patReviews, user: req.user, leaflet: false })
        } catch (err) {
            console.error(err)
        }
    },


    UpdatePatient: async(req, res) => {
        const { id } = req.params
        try {
            const patient = await Patient.findById(id).populate('user')
            res.render('updatepat.ejs', { patient, user: req.user, leaflet: true })
        } catch (e) {
            console.error(e)
        }
    },

    deletePatient: async(req, res) => {
        try {
            const patient = await Patient.findById({ _id: req.params.id })
            await cloudinary.uploader.destroy(patient.cloudinaryId)
            await Patient.remove({ _id: req.params.id })
            res.redirect('/patient')
        } catch (err) {
            console.error(err)
            res.redirect('/profile')
        }
    },

    getUserProfile: async(request, response) => {
        try {
            const userPatients = await Patient.find({ userId: request.params.id }).sort({ date: 'desc' })
            response.render('user.ejs', { patients: userPatients, user: request.user })
        } catch (error) {
            console.error(error)
        }
    }



}