'use strict';
const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);;
const momentTimeZone = require('moment-timezone');
const Appointment = require('../models/Appointment');
//var scheduler = require('scheduler');

const getTimeZones = function() {
    return momentTimeZone.tz.names();
};
module.exports = {
    getAppointmentshome: async(req, res) => {

        try {
            Appointment.find()
                .then(function(appointments) {
                    res.render('/apptHome', { appointments: appointments });
                });
        } catch (err) { console.log(err) }
    },
    createAppointments: async(req, res) => {

        try {
            res.render('appointments/create', {
                timeZones: getTimeZones(),
                appointment: new Appointment({
                    name: '',
                    phoneNumber: '',
                    notification: '',
                    timeZone: '',
                    time: ''
                })
            });
        } catch (err) { console.log(err) }
    },

    makeAppointments: async(req, res) => {
        try {
            const name = req.body.name;
            const phoneNumber = req.body.phoneNumber;
            const notification = req.body.notification;
            const timeZone = req.body.timeZone;
            const appDate = moment(req.body.time, 'MM-DD-YYYY hh:mma');

            const appointment = new Appointment({
                name: name,
                phoneNumber: phoneNumber,
                notification: notification,
                timeZone: timeZone,
                appDate: appDate
            });
            appointment.save()
                .then(function() {
                    res.redirect('/apptHome');
                });
        } catch (err) { console.log(err) }
    },
    displayAppointments: async(req, res) => {
        const id = req.params.id;
        Appointment.findOne({ _id: id })
            .then(function(appointment) {
                res.render('appointments/edit', {
                    timeZones: getTimeZones(),
                    appointment: appointment
                });
            });
    },
    changeAppointments: async(req, res) => {
        const id = req.params.id;
        const name = req.body.name;
        const phoneNumber = req.body.phoneNumber;
        const notification = req.body.notification;
        const timeZone = req.body.timeZone;
        const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

        Appointment.findOne({ _id: id })
            .then(function(appointment) {
                appointment.name = name;
                appointment.phoneNumber = phoneNumber;
                appointment.notification = notification;
                appointment.timeZone = timeZone;
                appointment.time = time;

                appointment.save()
                    .then(function() {
                        res.redirect('/apptHome');
                    });
            })
    },
    deleteAppointments: async(req, res) => {

        const id = req.params.id;

        Appointment.remove({ _id: id })
            .then(function() {
                res.redirect('/apptHome');
            })
    }
}