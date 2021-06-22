const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const axios = require('axios');
var moment = require('moment');
var twilio = require('twilio');

const AppointmentSchema = new mongoose.Schema({
    personName: {
        type: String,
        required: true
    },
    phoneNumber: {

        type: String,
        required: true
    },
    doctorName: {

        type: String,
        required: true
    },

    notification: {
        type: Number,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        index: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cloudinary_id: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);





AppointmentSchema.methods.requiresNotification = function(date) {
    return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
        .diff(moment(date).utc())
    ).asMinutes()) === this.notification;
};


AppointmentSchema.statics.sendNotifications = function sendNotifications(callback) {

    // now
    var searchDate = new Date();
    Appointment
        .find()
        .then(function(appointments) {
            appointments = appointments.filter(function(appointment) {
                return appointment.requiresNotification(searchDate);
            });
            if (appointments.length > 0) {
                sendNotifications(appointments);
            }
        });

    // Send messages to all appoinment owners via Twilio
    function sendNotifications(docs) {
        var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        docs.forEach(function(appointment) {
            // Create options to send the message
            var options = {
                to: `+1${appointment.phoneNumber}`,
                from: TWILIO_PHONE_NUMBER,
                body: `Hi $ { appointment.name }.Just a reminder that you have an appointment coming up ${ moment(appointment.time).calendar() }.`

            };

            // Send the message!
            client.sendMessage(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    var masked = appointment.phoneNumber.substr(0,
                        appointment.phoneNumber.length - 5);
                    masked += '*****';
                    console.log('Message sent to ' + masked);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
            callback.call(this);
        }
    }
};