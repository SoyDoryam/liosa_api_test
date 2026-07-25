import PdfPrinter from "pdfmake";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fonts = {
    Roboto: {
        normal: path.join(__dirname, "../fonts/Roboto-Regular.ttf"),
        bold: path.join(__dirname, "../fonts/Roboto-Bold.ttf"),
        italics: path.join(__dirname, "../fonts/Roboto-Italic.ttf"),
        bolditalics: path.join(__dirname, "../fonts/Roboto-BoldItalic.ttf"),
    },
};

const printer = new PdfPrinter(fonts);

/**
 * Genera un documento PDFKit a partir de la definición de pdfmake.
 */
export const generateReport = (docDefinition) => {
    return printer.createPdfKitDocument(docDefinition);
};

export const buildTableDefinition = (body, widths = ["*"]) => ({
    table: {
        headerRows: 1,
        widths,
        body,
    },
    layout: "lightHorizontalLines",
});

export const getReportHeader = (title, subtitle = "") => [
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

export default {
    generateReport,
    buildTableDefinition,
    getReportHeader,
};