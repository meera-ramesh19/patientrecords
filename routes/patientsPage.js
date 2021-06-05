const express = require("express");
const router = express.Router();
const patientsPageController = require("../controllers/patientsPage");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, patientsPageController.getPatientsPage);

module.exports = router;