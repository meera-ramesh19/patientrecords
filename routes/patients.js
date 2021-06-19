const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const patientsController = require("../controllers/patients");
const upload = require("../middleware/multer");

//Patient Routes - simplified for now

router.get("/", ensureAuth, patientsController.getProfile);
router.post("/createPatient", upload.array('photos', 10), patientsController.createPatient);
// router.get("/:id", patientsController.getPatient);


module.exports = router;