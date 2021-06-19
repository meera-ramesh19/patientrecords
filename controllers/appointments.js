const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment');
const cloudinary = require('../middleware/cloudinary');
const axios = require('axios');
const Appointment = require('../models/Appointment');

module.exports = {
    getAppointments: async(req, res) => {

        //const patientItems = await Patient.find({ userId: req.user.id })

        const apptItems = await Appointment.find({ _id: req.params.id });
        //.sort({ createdAt: 'desc' }).lean();
        res.render("appointments.ejs", { appointments: apptItems });

        // patient: patientItems,
        // user: req.user

    },

    bookReminders: async(req, res) => {
        const getTimeZones = function() {
            return momentTimeZone.tz.names();
        };
        timeZones = getTimeZones();
        try {

            // Check if user has provided input for all form fields
            // const name = req.body.name;
            // const doctorName = req.body.doctorName;
            // const phoneNumber = req.body.phoneNumber;
            // const notification = req.body.notification;
            // const timeZone = req.body.timeZone;
            const time = moment(req.body.time, 'YYYY-MM-DD hh:mma');

            const appointment = await Appointment.create({
                name: req.body.name,
                phoneNumber: req.body.doctorName,
                notification: Number(req.body.notification),
                timeZone: req.body.timeZone,
                time: time,
            });
            await appointment.save()
            console.log('Appointment has been created!');
            res.redirect(`book.ejs`)

        } catch (err) {
            console.error(err)
        }

    },

    getReminders: async(req, res) => {
        const id = req.params.id;
        try {
            const appointment = await Appointment.findById(id).populate('user')
                // .populate('patient')

            res.render('book.ejs', {
                timeZones: getTimeZones(),
                appointment: appointment,
                user: req.user,
                // patient: req.patient
            });
        } catch (err) {
            console.error(err)
        }
    },
    updateReminders: async(req, res) => {
        // const id = req.params.id;
        // const appointment = await Appointment.findOne({ _id: id })

        // res.render('appointments.ejs', {
        //     timeZones: getTimeZones(),
        //     appointment: appointment,
        // }); 

        const id = req.params.id;
        let modifications = {};
        modifications.name = req.body.name;
        modifications.doctorName = req.body.doctorName;
        modifications.phoneNumber = req.body.phoneNumber;
        modifications.notification = req.body.notification;
        modifications.timeZone = req.body.timeZone;
        modifications.time = moment(req.body.time, 'YYYY-MM-DD hh:mma');
        const names = req.body.name;
        // const docName = req.body.doctorName;
        // const phNumber = req.body.phoneNumber;
        // const notify = req.body.notification;
        // const tZone = req.body.timeZone;
        // const times = moment(req.body.time, 'YYYY-MM-DD hh:mma');
        try {
            // const appointment = await Appointment.findOneByIdandUpdate({ id, { $set: modifications }, { new: true } })
            const appointment = await Appointment.findOneByIdandUpdate({ id }, {
                    // let name = names,
                    //     let doctorName = docName,
                    //         let phoneNumber = phNumber,
                    //             let notification = Number(notify),
                    //                 let timeZone = tZone,
                    //                     let time = times
                    $set: modifications
                }, { upsert: true, new: true }

            );
            res.redirect('appointments.ejs', { timeZones: getTimeZones(), appointment: appointment });

        } catch (err) {
            console.error(err)
        }
    },
    removeReminders: async(req, res) => {

        try {
            const id = req.params.id;
            let appointment = await Appointment.findById({ _id: req.params.id });

            await Appointment.remove({ _id: id })
            console.log("Deleted Post");
            res.redirect('/appointments');
        } catch (err) {
            console.error(err)
            res.redirect("/appointments");
        }
    },

}