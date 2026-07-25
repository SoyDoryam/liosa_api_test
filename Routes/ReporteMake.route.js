const router = require("express").Router();
const reporteMakeController = require("../Controller/ReporteMake.controller");


router.get('/TrackingGeneral/V2', reporteMakeController.getTrackingGeneralV2);
router.get('/TrackingGeneralPDF/V2', reporteMakeController.getTrackingGeneralV2PDF);
router.get("/TrackingOrden/V2", reporteMakeController.getTrackingOrdenV2);
router.get("/TrackingOrdenPDF/V2", reporteMakeController.getTrackingOrdenV2PDF);
router.get("/TrackingOrdenTiemposPDF/V3", reporteMakeController.getTrackingOrdenV3PDF);
router.get("/NI", reporteMakeController.getNI);
router.get("/InfoTrackTime/", reporteMakeController.getinfoTrackTime);
router.get("/InfoTrackTimePDF/", reporteMakeController.getinfoTrackTimePDF);
router.get("/getDispositivos/", reporteMakeController.getDispositivos);
router.get("/getDispositivosPDF/", reporteMakeController.getDispositivosPDF);

module.exports = router;
