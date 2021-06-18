const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const axios = require('axios');
const geoCoder = require('../utils/geocoder');


const PatientSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
    },
    patSSN: {
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999
    },
    patName: {
        type: String,
        required: true,
    },
    patDob: {
        type: Date,
        required: true,
        // default: 'Unknown',
    },
    patPhonenum: {
        type: String,
        required: true,
    },
    patAilment: {
        type: String,
        required: true,

    },
    patComments: [{
        type: String,
        ref: "User",
        // default: 'Unknown',
    }],
    postDate: {
        type: Date,
        default: Date.now()
    },


    docAdd: [{
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        pincode: {
            type: String,
        }

    }],


    patPharmacyName: {
        type: String,
        required: true,
        // default: 'Unknown',
    },
    docPracticeName: {
        type: String,
        required: true,
    },
    docName: {

        type: String,
        required: true,
    },

    docSpecialize: {
        type: String,
        required: true,
        enum: ['primary', 'eye', 'ent', 'foot', 'gastro', 'cardio',
            'gynecology', 'orthopedic', 'endocrine', 'other'
        ],
        default: 'primary',
    },
    docGender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        default: 'female',
    },
    docVisitDate: {
        type: Date,
        required: true,
    },
    docInNetwork: {
        type: String,
        required: true,
        enum: ['yes', 'no'],
        default: 'yes',
    },
    docCopay: {
        type: Number,
        min: 10,
        max: 1000,
        required: true,
    },
    docInstructions: {
        type: String,
        required: true,
    },
    docFollowUp: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no',
    },
    docFollowUpDate: {
        type: Date,
        required: false,
        default: Date,

    },
    docPills: {
        type: String,
        required: false,
        // default: 'Unknown',
    },
    docCream: {
        type: String,
        required: false,
        // default: 'Unknown',
    },
    docDrops: {
        type: String,
        required: false,
        // default: 'Unknown',
    },

    lat: {
        type: String
    },
    lon: {

        type: String
    },
    daddress: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    // likes: [{ type: ObjectId, ref: "User" }],

    // dislikes: [{ type: ObjectId, ref: "User" }],
    patReviews: {
        type: Number,
        min: 1,
        max: 5,
        ref: "User",
        validate: {
            // validator accepts a function definition which it uses for validation
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value."
        }
    },

    // postedBy: {
    //     // type: { user: User.UserSchema },
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    //     unique: false,
    //     sparse: true,
    // },

    image: {
        type: [String],
        required: false,
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

PatientSchema.pre('save', async function(next) {
    const loc = await geoCoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };

    // Do not save address
    this.address = undefined;
    next();
});


module.exports = mongoose.model('Patient', PatientSchema);