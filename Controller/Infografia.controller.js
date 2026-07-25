const { createPrinter, sendPdfResponse } = require("../plantilla/pdfBase");
const { generarInfografia } = require("../plantilla/generar-infografia-pdfmake");
const DBMetricas = require("../Data/Metricas.service");

const getInfografiaPDF = async (request, response, next) => {
    try {
        const data = await DBMetricas.getAllMetricas();
        const printer = createPrinter();
        const docDefinition = generarInfografia(data.ocentral, data.veomas);
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        sendPdfResponse(response, pdfDoc, "Infografia.pdf");
    } catch (ex) {
        next(ex);
    }
};

const getInfografiaData = async (request, response, next) => {
    try {
        const data = await DBMetricas.getAllMetricas();
        response.json(data);
    } catch (ex) {
        next(ex);
    }
};

module.exports = {
    getInfografiaPDF,
    getInfografiaData
};
