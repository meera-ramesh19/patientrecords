 const Patient = require('../models/Patient');
 const User = require('../models/User');
 const moment = require('moment');
 const cloudinary = require('../middleware/cloudinary');
 const axios = require('axios');
 const Appointment = require('../models/Appointment');

 module.exports = {
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
 }