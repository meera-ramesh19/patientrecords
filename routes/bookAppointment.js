const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const bookAppointmentsController = require("../controllers/bookAppointments");


router.post("/bookAppointments", bookAppointmentsController.bookReminders);
module.exports = router;