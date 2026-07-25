const PdfPrinter = require("pdfmake");
const path = require("path");

const fonts = {
    Roboto: {
        normal: path.join(__dirname, "../fonts/Roboto-Regular.ttf"),
        bold: path.join(__dirname, "../fonts/Roboto-Bold.ttf"),
        italics: path.join(__dirname, "../fonts/Roboto-Italic.ttf"),
        bolditalics: path.join(__dirname, "../fonts/Roboto-BoldItalic.ttf"),
    },
};

const printer = new PdfPrinter(fonts);

const createPrinter = () => printer;

const generateReport = (docDefinition) => {
    return printer.createPdfKitDocument(docDefinition);
};

const buildTableDefinition = (body, widths = ["*"]) => ({
    table: {
        headerRows: 1,
        widths,
        body,
    },
    layout: "lightHorizontalLines",
});

const getReportHeader = (title, subtitle = "") => [
    {
        text: title,
        style: "header",
        alignment: "center",
    },
    ...(subtitle
        ? [{
              text: subtitle,
              style: "subheader",
              alignment: "center",
          }]
        : []),
    {
        text: "",
        margin: [0, 10],
    },
];

const sendPdfResponse = (response, pdfDoc, filename) => {
    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", `inline; filename=${filename}`);
    pdfDoc.pipe(response);
    pdfDoc.end();
};

module.exports = {
    createPrinter,
    sendPdfResponse,
    generateReport,
    buildTableDefinition,
    getReportHeader,
};
