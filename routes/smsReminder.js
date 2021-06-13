const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const smsReminderController = require("../controllers/smsReminder");

router.get("/", ensureAuth, smsReminderController.getsmsReminder);

module.exports = router;