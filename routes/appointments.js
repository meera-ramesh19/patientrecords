const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const appointmentsController = require("../controllers/appointments");

router.get("/allAppointments", ensureAuth, appointmentsController.displayAllReminders);
router.post("/createAppointments", appointmentsController.bookReminders);
router.get("/appointmentPage", appointmentsController.singleReminders);
router.get("/allAppointments/:id/edit", appointmentsController.editReminders);
router.post("/allAppointments/:id/edit", appointmentsController.changedReminders);
router.post("/allAppointments/:id/edit", appointmentsController.deleteReminders);

module.exports = router;