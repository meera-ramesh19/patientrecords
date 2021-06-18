const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const appointmentsController = require("../controllers/appointments");

router.get("/apptHome", ensureAuth, appointmentsController.getAppointmentshome);

router.post("/makeAppt", appointmentsController.makeAppointments);
router.get(":id/edit", appointmentsController.displayAppointments);
router.post(":id/edit", appointmentsController.changeAppointments);
router.post(":id/delete", appointmentsController.deleteAppointments);

module.exports = router;