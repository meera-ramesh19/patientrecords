const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const appointmentsController = require("../controllers/appointments");

router.get("/", appointmentsController.getAppointments);
router.post("/bookAppointments", appointmentsController.bookReminders);
router.get("/:id", appointmentsController.getAppointments);

router.get("/:id/edit", appointmentsController.getReminders);
router.post("/:id/edit", appointmentsController.updateReminders);
router.post("/:id/delete", appointmentsController.removeReminders);

module.exports = router;