const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const locationOnMapController = require("../controllers/locationOnMap");

router.get("/", ensureAuth, locationOnMapController.showLocation);

module.exports = router;