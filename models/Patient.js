const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const PatientSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
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
    // patReviews: [{
    //     type: Number,
    //     min: 1,
    //     max: 5,
    //     ref: "User",
    //     validate: {
    //         // validator accepts a function definition which it uses for validation
    //         validator: Number.isInteger,
    //         message: "{VALUE} is not an integer value."
    //     }
    // }],
    patDocAdd: {
        // phstreet: {
        //     type: String,
        // },
        // phcity: {
        //     type: String,
        // },
        // phstate: {
        //     type: String,
        // },
        // phcountry: {
        //     type: String,
        // },
        // phpincode: {
        //     type: String,
        // },
        type: String,
        required: true,
    },
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
    address: {
        type: String,
        required: true,
    },

    likes: [{ type: ObjectId, ref: "User" }],

    dislikes: [{ type: ObjectId, ref: "User" }],
    // lat: {
    //     type: String,
    //     required: true,
    // },
    // lon: {
    //     type: String,
    //     required: true,
    // },
    // postedBy: {
    //     // type: { user: User.UserSchema },
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    //     unique: false,
    //     sparse: true,
    // },
    image: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Patient', PatientSchema);