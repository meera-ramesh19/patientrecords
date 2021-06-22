const fs = require('fs')
const Patient = require('../models/Patient')
const path = require("path");
const User = require('../models/User')
const { cloudinary } = require('../middleware/cloudinary')
const moment = require('moment')
const upload = require("../middleware/multer");
const axios = require('axios');
var $ = require('jQuery');

require("dotenv").config({ path: "./config/.env" });

module.exports = {
    getProfile: async(req, res) => {

        try {
            const patientItems = await Patient.find({ userId: req.user.id });

            res.render("profile.ejs", { patient: patientItems, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    createPatient: async(req, res) => {
        //creating new record in db

        console.log(req)

        const residence = []
        var address = {}
        residence.push({
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            pincode: req.body.pincode
        })
        var newaddress = Object.assign({}, ...residence);
        address = newaddress
        const fileErrors = [];
        // var address = req.body.docAdd

        var ssnNumber = req.body.patSSN
        var yesterday = moment().subtract(0, "day").format("YYYY-MM-DD");
        var birthToDate = req.body.patDob
        var appDate = req.body.docVisitDate
        var followDate = req.docFollowUpDate
            // var total = birthToDate.toString() + ssnNumber.toString()

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


        // if (!(/jpeg|jpg|png|gif/.test(
        //         path.extname(req.file.originalname).toLowerCase()
        //     ) && /jpeg|jpg|png|gif/.test(req.file.mimetype)))
        //     fileErrors.push({ msg: "Only jpeg, jpg, png and gif allowed" });

        // if (fileErrors.length) {
        //     req.flash("errors", fileErrors);
        //     return res.redirect("/login");
        // }

        // function formatSocialSecurity(ssnNumber) {
        //     val = val.replace(/\D/g, '');
        //     val = val.replace(/^(\d{3})/, '$1-');
        //     val = val.replace(/-(\d{2})/, '-$1-');
        //     val = val.replace(/(\d)-(\d{4}).*/, '$1-$2');
        //     return val;
        // }


        try {

            //const result = await cloudinary.uploader.upload(req.file.path)

            const urls = []
            const files = req.files
            for (const file of files) {
                const { path } = file
                console.log(path)
                const newPath = await cloudinary.uploader.upload(path, { folder: birthToDate })
                urls.push(newPath.secure_url)
                    // fs.unlinkSync(path)
            }

            // console.log(urls)

            const params = {
                text: newaddress,
                apikey: process.env.YOUR_API_KEY

            }
            console.log(params)

            var latitude = ""
            var longitude = ""
                // console.log(lat, lon)
            async function getlatlon() {
                const response = await axios.get('https://app.geocodeapi.io/api/v1/search', { params })
                latitude = response.data.features[0].geometry.coordinates[0]

                longitude = response.data.features[0].geometry.coordinates[1]
            }


            const rests = await getlatlon()
                .then(data => {
                    // console.log(data)
                    return data
                })
            console.log(latitude, longitude)


            // console.log(rests)
            // axios.get('https://app.geocodeapi.io/api/v1/search', { params })
            //     .then(response => {
            //         const apiResponse = response.data
            //         lat = apiResponse.features[0].geometry.coordinates[0]
            //         lon = apiResponse.features[0].geometry.coordinates[1]
            //         console.log(lat, lon)
            //     }).catch(error => {
            //         console.log(error);
            //     });


            // console.log(lat, lon)


            const patient = await Patient.create({

                postTitle: req.body.postTitle,
                patName: req.body.patName,
                patSSN: ssnNumber,
                patDob: req.body.patDob,
                patPhoneNum: req.body.patPhoneNum,
                patComments: req.body.patComments,
                patAilment: req.body.patAilment,
                patReviews: req.body.patReviews,
                docAdd: residence,
                // street: req.body.street,
                // city: req.body.city,
                // state: req.body.state,
                // country: req.body.country,
                // pincode: req.body.pincode,
                daddress: address,
                patPharmacyName: req.body.patPharmacyName,
                docName: req.body.docName,
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
                image: urls,
                lat: latitude,
                lon: longitude,
                user: req.user,
                cloudinary_id: birthToDate,
                files: req.files,


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
            //the records from the 'Patient' collection.
            const PatientsAllVisits = await Patient.find()
            res.render('index.ejs', { patients: PatientsAllVisits, user: req.user, leaflet: false })
        } catch (err) {
            console.error(err)
        }
    },


    UpdatePatient: async(req, res) => {
        const { id } = req.params
        try {
            const patient = await Patient.findById(id).populate('user')
            res.render('update.ejs', { patient, user: req.user, leaflet: true })
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