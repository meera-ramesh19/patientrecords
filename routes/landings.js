const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const landingsController = require("../controllers/landings");
const { ModelBuildInstance } = require("twilio/lib/rest/autopilot/v1/assistant/modelBuild");

router.get('/', landingsController.getLandingPage)

module.exports = router;