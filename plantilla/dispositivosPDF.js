const nvl = (val) => val == null ? '' : val;

const getColorLinea = (h) => {
    if (h.departamento && h.departamento.toString().toUpperCase().trim() === "LIOSA CENTRAL") {
        return "#006666";
    }
    const tieneBodega = h.BODEGA != null && h.BODEGA !== "" && h.BODEGA !== "ND";
    const tieneBodegaCP = h.BODEGA_CP != null && h.BODEGA_CP !== "" && h.BODEGA_CP !== "ND";
    if (tieneBodega && tieneBodegaCP) return "#800080";
    if (tieneBodega) return "#B30000";
    if (tieneBodegaCP) return "#006EC4";
    return "#999999";
};

const buildDispositivosDD = (data) => {
    const grupos = {};
    data.forEach(d => {
        const key = [d.departamento, d.siglas, d.BODEGA || "ND", d.BODEGA_CP || "ND"].join("|");
        if (!grupos[key]) {
            grupos[key] = { header: d, items: [] };
        }
        grupos[key].items.push(d);
    });

    const content = [];
    Object.keys(grupos).forEach(key => {
        const grupo = grupos[key];
        const h = grupo.header;

        const subTableBody = [
            [
                { text: "Equipo", bold: true },
                { text: "Dirección IP", bold: true },
                { text: "Activo", bold: true }
            ]
        ];
        grupo.items.forEach(d => {
            subTableBody.push([
                nvl(d.Equipo),
                nvl(d.DireccionIp),
                d.Activo ? "Sí" : "No"
            ]);
        });

        const esLiosa = h.departamento && h.departamento.toString().toUpperCase().trim() === "LIOSA CENTRAL";
        const colorLinea = getColorLinea(h);

        content.push({
            table: {
                widths: ["*", 50, 60, 70],
                body: [
                    [
                        { text: "Departamento", bold: true, color: esLiosa ? "#006666" : "#000000" },
                        { text: "Siglas", bold: true, color: esLiosa ? "#006666" : "#000000" },
                        { text: "Bodega", bold: true, color: esLiosa ? "#006666" : "#000000" },
                        { text: "Bodega CP", bold: true, color: esLiosa ? "#006666" : "#000000" }
                    ],
                    [
                        { text: nvl(h.departamento), color: esLiosa ? "#006666" : "#000000" },
                        { text: nvl(h.siglas), color: esLiosa ? "#006666" : "#000000" },
                        { text: h.BODEGA || "ND", color: esLiosa ? "#006666" : "#000000" },
                        { text: h.BODEGA_CP || "ND", color: esLiosa ? "#006666" : "#000000" }
                    ],
                    [
                        {
                            colSpan: 4,
                            table: {
                                widths: ["*", 120, 50],
                                body: subTableBody.map(row => row.map(cell => ({ text: cell.text || cell, color: esLiosa ? "#006666" : "#000000" })))
                            },
                            layout: { hLineColor: () => colorLinea, vLineColor: () => colorLinea },
                            fillColor: esLiosa ? "#87D3D3" : null
                        },
                        {}, {}, {}
                    ]
                ]
            },
            layout: { hLineColor: () => colorLinea, vLineColor: () => colorLinea },
            fillColor: esLiosa ? "#87D3D3" : null,
            margin: [0, 0, 0, 10]
        });
    });

    return {
        pageSize: "A4",
        pageMargins: [20, 40, 20, 40],
        content: [
            { text: "Listado de Dispositivos", fontSize: 16, bold: true, alignment: "center" },
            { text: "\n" },
            ...content
        ],
        defaultStyle: { fontSize: 9 }
    };
};

module.exports = { buildDispositivosDD };