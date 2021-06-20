const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
// const appointmentsController = require("../controllers/bookAppointments");


// router.post("/bookAppointments", appointmentsController.bookReminders);
module.exports = router;