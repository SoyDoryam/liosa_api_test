
const DBTracking = require("../Data/ReporteMake.service");
const { createPrinter, sendPdfResponse } = require("../plantilla/pdfBase");
const { buildPdfDD: buildTrackingDD } = require("../plantilla/trackingGeneralPDF");
const { contruirDataInfoTrackTime } = require("../plantilla/InfoTrackTimeJSON");
const { buildDispositivosDD } = require("../plantilla/dispositivosPDF");
const { generarPDF } = require("../plantilla/trackingGeneralV3");
const { generarMapa } = require("../plantilla/generarMapa");



const getTrackingGeneralV2 = async (request, response, next) => {
    try {
        const data = await DBTracking.getTrackingGeneralV2(request);
        response.json(data);
    } catch (ex) {
        next(ex);
    }
};

const getTrackingGeneralV2PDF = async (request, response, next) => {
    try {
        const data = await DBTracking.getTrackingGeneralV2(request);

        const printer = createPrinter();
        const dd = buildTrackingDD(data);
        const pdfDoc = printer.createPdfKitDocument(dd);
        sendPdfResponse(response, pdfDoc, "ProcesosPorOrden.pdf");
    } catch (ex) {
        next(ex);
    }
};

const getTrackingOrdenV2 = async (request, response, next) => {
    try {
        const data = await DBTracking.getTrackingOrdenV2(request);
        response.json(data);
    } catch (ex) {
        next(ex);
    }
};

const getTrackingOrdenV2PDF = async (request, response, next) => {
    try {
        const data = await DBTracking.getTrackingOrdenV2(request);
        const printer = createPrinter();
        const dd = buildTrackingDD(data);
        const pdfDoc = printer.createPdfKitDocument(dd);
        sendPdfResponse(response, pdfDoc, "OrdenLaboratorio.pdf");
    } catch (ex) {
        next(ex);
    }
};

const getTrackingOrdenV3PDF = async (request, response, next) => {
    try {
        const data = await DBTracking.getTrackingGeneralV2(request);
        const printer = createPrinter();
        const dd = generarPDF(data);
        const pdfDoc = printer.createPdfKitDocument(dd);
        sendPdfResponse(response, pdfDoc, "OrdenLaboratorio.pdf");
    } catch (ex) {
        next(ex);
    }
};

const getNI = async (request,response,next)=>{

    try{
        const data = await DBTracking.getListadoOrdenes(request);
        const printer=createPrinter();
        const dd = generarMapa(data);
        const pdfDoc = printer.createPdfKitDocument(dd);



        sendPdfResponse(
            response,
            pdfDoc,
            "MapaNicaragua.pdf"
        );


    }
    catch(ex){

        next(ex);

    }

};

const getinfoTrackTime = async (request, response, next) => {
    try {
        const data = await DBTracking.getinfoTrackTime(request);
        response.json(data);
    } catch (ex) {
        next(ex);
    }
};

const getinfoTrackTimePDF = async (request, response, next) => {
    try {
        const data = await DBTracking.getinfoTrackTime(request);
        const printer = createPrinter();
        const dd = contruirDataInfoTrackTime(data);
        const pdfDoc = printer.createPdfKitDocument(dd);
        sendPdfResponse(response, pdfDoc, "InfoTrackTime.pdf");
    } catch (ex) {
        next(ex);
    }
};

const getDispositivos = async (request, response) => {
    const { descripcion, ip } = request.query;
    DBTracking.getDispositivos(descripcion || null, ip || null).then((data) => {
        response.json(data);
    });
};

const getDispositivosPDF = async (request, response, next) => {
    try {
        const { descripcion, ip } = request.query;
        const dispositivo = await DBTracking.getDispositivos(descripcion || null, ip || null);
        const data = dispositivo.respuesta || [];

        const printer = createPrinter();
        const dd = buildDispositivosDD(data);
        const pdfDoc = printer.createPdfKitDocument(dd);
        sendPdfResponse(response, pdfDoc, "Dispositivos.pdf");
    } catch (ex) {
        console.error(ex);
        return response.status(500).json({ error: "Error al generar reporte" });
    }
};

module.exports = {
    getTrackingGeneralV2,
    getTrackingGeneralV2PDF,
    getTrackingOrdenV2,
    getTrackingOrdenV2PDF,
    getTrackingOrdenV3PDF,
    getNI,
    getinfoTrackTime,
    getinfoTrackTimePDF,
    getDispositivos,
    getDispositivosPDF
};