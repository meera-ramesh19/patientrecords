const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const axios = require('axios');
var $ = require('jQuery');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const patientRoutes = require('./routes/patients');
const feedRoutes = require('./routes/feed');
var messagebird = require('messagebird');
const patientPageRoutes = require('./routes/patientsPage');
const appointmentRoutes = require('./routes/appointments');
const locationOnMapRoutes = require("./routes/locationOnMap");
// const scheduler = require('./src/scheduler');
var MESSAGEAPI = process.env.MESSAGEBIRD_API_KEY;
var ACCOUNTSID = process.env.TWILIO_ACCOUNT_ID;
var AUTHTOKEN = process.env.TWILIO_AUTH_TOKEN;

const app = express();
//const cors = require('cors');

//Use .env file in config folder
require('dotenv').config({
    path: './.env '
})

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

// Load and initialize MesageBird SDK
var AppointmentDatabase = []

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));
app.use(express.static(__dirname + '/public/imgs'))

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening

app.use("/", mainRoutes);
app.use("/patients", patientRoutes);
app.use("/patientsPage", patientPageRoutes);
app.use("/feed", feedRoutes);
app.use("/appointmentPage", apppointmentRoutes);
app.use("/allAppointments", appointmentRoutes);
app.use("/createAppointments", appointmentRoutes);
app.use("/:id/edit", appointmentRoutes);
app.use("/:id/delete", appointmentRoutes);
app.use("/locationOnMap", locationOnMapRoutes);

//start the scheduler
// scheduler.start()

//Server Running

app.listen(process.env.PORT || 5000, function() {

    console.log("Server is running, you better catch it!");
});