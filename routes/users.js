const express = require('express')
const router = express.Router()
const patientController = require('../controllers/paitent')
const upload = require("../middleware/multer")
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get("/:id", ensureAuth, patientController.getUserProfile)

module.exports = router;