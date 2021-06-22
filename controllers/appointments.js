const Patient = require('../models/Patient');
const User = require('../models/User');
const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const cloudinary = require('../middleware/cloudinary');
const axios = require('axios');
const Appointment = require('../models/Appointment');

const getTimeZones = function() {
    return momentTimeZone.tz.names();
};
module.exports = {


    getAppointments: async(req, res) => {
        const apptItems = await Appointment.find();
        // const patientItems = await Patient.find({ userId: req.user.id });
        res.render("appointments/index", { appointments: apptItems, moment: moment });

    },
    createNewAppt: async(req, res) => {
        res.render('appointments/create', {
            moment: moment,
            timeZones: getTimeZones(),
            appointment: new Appointment({
                personnName: '',
                phoneNumber: '',
                notification: '',
                timeZone: '',
                time: '',
            }),
        });
    },
    bookReminders: async(req, res) => {
        // const getTimeZones = function() {
        //     return momentTimeZone.tz.names();
        // };
        timeZones = getTimeZones();
        try {

            // Check if user has provided input for all form fields
            const names = req.body.personName;
            const doctorNames = req.body.doctorName;
            const phoneNumbers = req.body.phoneNumber;
            const notifications = req.body.notification;
            const timeZones = req.body.timeZone;
            const times = moment(req.body.time, 'YYYY-MM-DD hh:mma');

            // const appointment = await Appointment.create({
            const appointment = await new Appointment({
                personName: names,
                phoneNumber: phoneNumbers,
                doctorName: doctorNames,
                notification: notifications,
                timeZone: timeZones,
                time: times,
            });
            await appointment.save()
                // appointment.save() then(function(){
            console.log('Appointment has been created!');
            res.redirect(`/appointments`)
                // });
        } catch (err) {
            console.error(err)
        }

    },

    getReminders: async(req, res) => {
        const id = req.params.id;
        try {
            const appointment = await Appointment.findById(id)
            console.log(appointment)
            res.render('./appointments/edit', {
                timeZones: getTimeZones(),
                appointment: appointment,
                moment: moment,
                user: req.user,
                patient: req.patient
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
        modifications.personName = req.body.personName;
        modifications.doctorName = req.body.doctorName;
        modifications.phoneNumber = req.body.phoneNumber;
        modifications.notification = req.body.notification;
        modifications.timeZone = req.body.timeZone;
        modifications.time = moment(req.body.time, 'YYYY-MM-DD hh:mma');
        // const names = req.body.name;
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
            res.redirect('./appointments/edit', { timeZones: getTimeZones(), appointment: appointment });

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