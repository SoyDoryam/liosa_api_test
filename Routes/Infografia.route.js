const express = require("express");
const router = express.Router();
const { getInfografiaPDF, getInfografiaData } = require("../Controller/Infografia.controller");

router.get("/infografia/pdf", getInfografiaPDF);
router.get("/infografia/data", getInfografiaData);

module.exports = router;
