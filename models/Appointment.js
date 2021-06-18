const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const axios = require('axios');
var moment = require('moment');
var twilio = require('twilio');

const AppointmentSchema = new mongoose.Schema({
    name: {
        type: ObjectId,
        ref: "Patient"
    },
    phoneNumber: {
        type: ObjectId,
        ref: "Patient"
    },
    doctorName: {
        type: ObjectId,
        ref: "Patient"
    },
    notification: {
        type: Number
    },
    timeZone: {
        type: String
    },
    time: {
        type: ObjectId,
        index: true,
        ref: "Patient"
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