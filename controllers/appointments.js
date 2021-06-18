const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment');
const cloudinary = require('../middleware/cloudinary');
const axios = require('axios');
const Appointment = require('../models/Appointment');

module.exports = {

    displayAllReminders: async(req, res) => {
        const getTimeZones = function() {
            return momentTimeZone.tz.names();
        };
        var timeZones = getTimeZones();
        try {
            const apptItems = await Appointment.find({ userId: req.user.id });
            const paitentItems = await Patient.find({ userId: req.user.id });
            res.render('appointments.ejs', { appointments: apptItems, patient: patientItems, user: req.user });
        } catch (err) {
            console.error(err)
        }
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
    singleReminders: async(req, res) => {
        try {
            const id = req.params.id;
            const appointment = await Appointment.findOne({ _id: id })

            res.render('appointmentsPage.ejs', {
                timeZones: getTimeZones(),
                appointment: appointment,
            });
        } catch (err) {
            console.error(err)
        }

    },

    editReminders: async(req, res) => {
        const id = req.params.id;
        const appointment = await Appointment.findOne({ _id: id })

        res.render('book.ejs', {
            timeZones: getTimeZones(),
            appointment: appointment,
        });
    },
    changedReminders: async(req, res) => {
        // const id = req.params.id;
        // const appointment = await Appointment.findOne({ _id: id })

        // res.render('appointments.ejs', {
        //     timeZones: getTimeZones(),
        //     appointment: appointment,
        // });  const id = req.params.id;
        const name = req.body.name;
        const doctorName = req.body.doctorName;
        const phoneNumber = req.body.phoneNumber;
        const notification = req.body.notification;
        const timeZone = req.body.timeZone;
        const time = moment(req.body.time, 'YYYY-MM-DD hh:mma');

        const appointment = await Appointment.findOne({ _id: id }) {
            name = name;
            doctorName = doctorName;
            phoneNumber = phoneNumber;
            notification = Number(notification);
            timeZone = timeZone;
            time = time;

            appointment.save()
            res.redirect('appointments.ejs');
        }
    },

    deleteReminders: async(req, res) => {

    }
}