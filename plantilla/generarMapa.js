const fs = require("fs");
const path = require("path");

const coordsDepartamentos = JSON.parse(fs.readFileSync(path.join(__dirname, "coords_departamentos.json"), "utf8"));
const deptCentroidesFijos = {};
const deptLabelsNombres = {};
const deptLabelStyles = {};
coordsDepartamentos.departamentos.forEach(d => {
    deptCentroidesFijos[d.id] = { x: d.x, y: d.y };
    deptLabelsNombres[d.id] = d.nombre;
    deptLabelStyles[d.id] = { color: d.color_letra || "#333333", fontSize: d.tamano_fuente || 6 };
});

// Sucursal -> Departamento
const sucursalDepartamento = {
    // LEON
    VMLEON: "DEPARTAMENTO_LEON",
    LEON: "DEPARTAMENTO_LEON",
    "PLAZA LEON": "DEPARTAMENTO_LEON",

    // CHINANDEGA
    VMCHINANDEGA: "DEPARTAMENTO_CHINANDEGA",
    CHINANDEGA: "DEPARTAMENTO_CHINANDEGA",
    "PLAZA CHINANDEGA": "DEPARTAMENTO_CHINANDEGA",
    CHINANDEGA2: "DEPARTAMENTO_CHINANDEGA",

    // ESTELI
    VMESTELI: "DEPARTAMENTO_ESTELI",
    ESTELI: "DEPARTAMENTO_ESTELI",
    ESTELI2: "DEPARTAMENTO_ESTELI",
    "MULTICENTRO ESTELI": "DEPARTAMENTO_ESTELI",

    // MADRIZ
    VMMADRIZ: "DEPARTAMENTO_MADRIZ",
    SOMOTO: "DEPARTAMENTO_MADRIZ",

    // NUEVA SEGOVIA
    VMOCOTAL: "DEPARTAMENTO_NUEVA_SEGOVIA",
    OCOTAL: "DEPARTAMENTO_NUEVA_SEGOVIA",
    JALAPA: "DEPARTAMENTO_NUEVA_SEGOVIA",

    // MATAGALPA
    VMMATAGALPA: "DEPARTAMENTO_MATAGALPA",
    VMMATIGUAS: "DEPARTAMENTO_MATAGALPA",
    VMRIOBLANCO: "DEPARTAMENTO_MATAGALPA",
    MATAGALPA: "DEPARTAMENTO_MATAGALPA",
    "RIO BLANCO": "DEPARTAMENTO_MATAGALPA",
    SEBACO: "DEPARTAMENTO_MATAGALPA",

    // JINOTEGA
    "VMJINOTEGA": "DEPARTAMENTO_JINOTEGA",
    "JINOTEGA": "DEPARTAMENTO_JINOTEGA",
    "JINOTEGA2": "DEPARTAMENTO_JINOTEGA",

    // MASAYA
    "VMMASAYA": "DEPARTAMENTO_MASAYA",
    "MASAYA": "DEPARTAMENTO_MASAYA",
    "PLAZA MASAYA": "DEPARTAMENTO_MASAYA",

    // RIVAS
    "VMRIVAS": "DEPARTAMENTO_RIVAS",
    "RIVAS": "DEPARTAMENTO_RIVAS",
    "LA VIRGEN": "DEPARTAMENTO_RIVAS",

    // CHONTALES
    "VMJUIGALPA": "DEPARTAMENTO_CHONTALES",
    "JUIGALPA": "DEPARTAMENTO_CHONTALES",
    "JUIGALPA 2": "DEPARTAMENTO_CHONTALES",
    "SANTO TOMAS": "DEPARTAMENTO_CHONTALES",

    // BOACO
    "CAMOAPA": "DEPARTAMENTO_BOACO",
    "VMBOACO": "DEPARTAMENTO_BOACO",
    "BOACO": "DEPARTAMENTO_BOACO",

    // MANAGUA
    "ZUMEN": "DEPARTAMENTO_MANAGUA",
    "VMZUMEN": "DEPARTAMENTO_MANAGUA",
    "VMTIPITAPA": "DEPARTAMENTO_MANAGUA",
    "TIPITAPA": "DEPARTAMENTO_MANAGUA",
    "VMMAYOREO": "DEPARTAMENTO_MANAGUA",
    "VMPLAZA_ESPANA": "DEPARTAMENTO_MANAGUA",
    "VMPLAZA ESPANA": "DEPARTAMENTO_MANAGUA",

    "CIUDAD JARDIN": "DEPARTAMENTO_MANAGUA",
    "BOLONIA": "DEPARTAMENTO_MANAGUA",
    "CARRETERA MASAYA": "DEPARTAMENTO_MANAGUA",
    "CARRETERA NORTE": "DEPARTAMENTO_MANAGUA",
    "BELLO HORIZONTE": "DEPARTAMENTO_MANAGUA",
    "LINDA VISTA": "DEPARTAMENTO_MANAGUA",
    "ALTAMIRA": "DEPARTAMENTO_MANAGUA",
    "LAS BRISAS": "DEPARTAMENTO_MANAGUA",
    "GALERIA 2 ST. DOMINGO": "DEPARTAMENTO_MANAGUA",
    "GALERIA STO. DOMINGO": "DEPARTAMENTO_MANAGUA",
    "METRO CENTRO": "DEPARTAMENTO_MANAGUA",
    "METRO CENTRO2": "DEPARTAMENTO_MANAGUA",
    "MULTI CENTRO": "DEPARTAMENTO_MANAGUA",
    "PLAZA LA FE": "DEPARTAMENTO_MANAGUA",
    "LAS AMERICA2": "DEPARTAMENTO_MANAGUA",
    "EL ORIENTAL": "DEPARTAMENTO_MANAGUA",
    "ORIENTAL": "DEPARTAMENTO_MANAGUA",
    "PLAZA CALLI": "DEPARTAMENTO_MANAGUA",
    "VM ALTAMIRA": "DEPARTAMENTO_MANAGUA",
    "VMCIUDAD_SANDINO": "DEPARTAMENTO_MANAGUA",
    "VMCIUDAD SANDINO": "DEPARTAMENTO_MANAGUA",
    "LAS PRADERAS": "DEPARTAMENTO_MANAGUA",
    "PLAZA TONALLI": "DEPARTAMENTO_MANAGUA",
    "METRO PLAZA": "DEPARTAMENTO_MANAGUA",
    "CIUDAD SANDINO": "DEPARTAMENTO_MANAGUA",

    // GRANADA
    "GRANADA": "DEPARTAMENTO_GRANADA",
    "VMGRANADA": "DEPARTAMENTO_GRANADA",
    "NANDAIME": "DEPARTAMENTO_GRANADA",

    // CARAZO
    "JINOTEPE": "DEPARTAMENTO_CARAZO",
    "DIRIAMBA": "DEPARTAMENTO_CARAZO",

    // COSTA CARIBE
    "BLUEFIELDS": "DEPARTAMENTO_RACCS",
    "BONANZA": "DEPARTAMENTO_RACCN",
    "PUERTO CABEZA": "DEPARTAMENTO_RACCN",
    "SIUNA": "DEPARTAMENTO_RACCN",
    "NUEVA GUINEA": "DEPARTAMENTO_RACCS",
    "RAMA": "DEPARTAMENTO_RACCS",

    "SAN CARLOS": "DEPARTAMENTO_RIO_SAN_JUAN",

    // SIN MAPA (aparecen en tabla)
    "MOVIL1": "SIN_MAPA",
    "MOVIL2": "SIN_MAPA",
    "MOVIL3": "SIN_MAPA",
    "MOVIL4": "SIN_MAPA",
    "MOVIL5": "SIN_MAPA",
    "MOVIL6": "SIN_MAPA",
    "MOVIL7": "SIN_MAPA",
    "MOVIL8": "SIN_MAPA",
    "MOVIL9": "SIN_MAPA",
    "MOVIL10": "SIN_MAPA",
    "MOVIL11": "SIN_MAPA",
    "MOVIL12": "SIN_MAPA",
    "MOVIL13": "SIN_MAPA",
    "MOVIL14": "SIN_MAPA",

    "LIOSA CENTRAL": "SIN_MAPA",
    "OPTI LENS": "SIN_MAPA",
    "PRECISMART": "SIN_MAPA",
    "OPTIMAGEN": "SIN_MAPA",
    "OPTILENSMETRO": "SIN_MAPA",
    "UNIPLAZA": "SIN_MAPA",
    "POSNETM6": "SIN_MAPA",
    "CAPACITACION": "SIN_MAPA",
    "BODEGA OPO": "SIN_MAPA",
    "BODEGA-A": "SIN_MAPA",
    "VMCOMPROSA": "SIN_MAPA",
    "OCENTRAL": "SIN_MAPA",
    "VMIVANMT": "SIN_MAPA",
    "MOVILES DINAMICAS": "SIN_MAPA",
};

const departamentosMapa = [
    "DEPARTAMENTO_CARAZO",
    "DEPARTAMENTO_CHINANDEGA",
    "DEPARTAMENTO_CHONTALES",
    "DEPARTAMENTO_ESTELI",
    "DEPARTAMENTO_GRANADA",
    "DEPARTAMENTO_JINOTEGA",
    "DEPARTAMENTO_LEON",
    "DEPARTAMENTO_MADRIZ",
    "DEPARTAMENTO_MANAGUA",
    "DEPARTAMENTO_MASAYA",
    "DEPARTAMENTO_MATAGALPA",
    "DEPARTAMENTO_NUEVA_SEGOVIA",
    "DEPARTAMENTO_RACCN",
    "DEPARTAMENTO_RACCS",
    "DEPARTAMENTO_RIO_SAN_JUAN",
    "DEPARTAMENTO_RIVAS",
    "DEPARTAMENTO_BOACO",
];

// ============================================================
// PALETA "INFOGRAFIA" (estilo de la imagen: rosa / magenta)
// ============================================================
const ROSA = {
    fuerte: "#E8266A", // magenta principal
    oscuro: "#B3104C", // magenta oscuro (mayor cantidad)
    gris: "#b8b9bb", // sin actividad
    grisTexto: "#58595B",
    grisClaro: "#EDEDED",
};

// Escala rosa por porcentaje (0-100)
function getColorRosa(p) {
    if (p === 0) return ROSA.gris; // sin actividad
    if (p >= 90) return "#B3104C";
    if (p >= 75) return "#D81B60";
    if (p >= 60) return "#E8266A";
    if (p >= 45) return "#EF5C8A";
    if (p >= 30) return "#F48FB1";
    if (p >= 20) return "#F8BBD0";
    if (p >= 10) return "#FBD5E2";
    return "#FDEAF1";
}

// Color por porcentaje - escala verde (paginas 1 y 2)
function getColorPorcentaje(p) {
    if (p === 0) return "#D9D9D9"; // sin actividad
    if (p >= 90) return "#004C4C";
    if (p >= 75) return "#006666";
    if (p >= 60) return "#0B7A75";
    if (p >= 45) return "#238B8B";
    if (p >= 30) return "#3FA6A6";
    if (p >= 20) return "#66B3B3";
    if (p >= 10) return "#99D6D6";
    return "#CCEEEE";
}

// Pintar departamento SVG
function pintarDepartamento(svg, id, color) {
    // CASO 1: <g id="DEPARTAMENTO">
    const regexGrupo = new RegExp(
        `<g([^>]*)id="${id}"([^>]*)>([\\s\\S]*?)</g>`,
        "i"
    );

    if (regexGrupo.test(svg)) {
        return svg.replace(regexGrupo, (match, antes, despues, contenido) => {
            contenido = contenido.replace(
                /<(path|polygon|rect|circle)([^>]*)\/?>/gi,
                (tag, tipo, atributos) => {
                    atributos = atributos
                        .replace(/class="[^"]*"/g, "")
                        .replace(/fill="[^"]*"/g, "")
                        .replace(/stroke="[^"]*"/g, "")
                        .replace(/\/$/, "")
                        .trim();

                    return `
                <${tipo}
                ${atributos}
                fill="${color}"
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-linejoin="round"
                />
            `;
                }
            );

            return `
                <g id="${id}">
                    ${contenido}
                </g>
            `;
        });
    }

    // CASO 2: <path id="">
    const regexPath = new RegExp(`<path([^>]*)id="${id}"([^>]*)/>`, "i");
    const nuevoSvg = svg.replace(regexPath, (match, antes, despues) => {
        // console.log("PINTO:", id);

        let atributos = (antes + despues)
            .replace(/class="[^"]*"/g, "")
            .replace(/fill="[^"]*"/g, "")
            .replace(/stroke="[^"]*"/g, "")
            .replace(/\/$/, "")
            .trim();

        return `<path
        id="${id}"
        ${atributos}
        fill="${color}"
        stroke="#FFFFFF"
        stroke-width="2"/>`;
    });

    return nuevoSvg;


}

function resumenSucursales(data) {
    const resumen = {};

    data.forEach((item) => {
        const sucursal = item.sucursal;
        if (!resumen[sucursal]) resumen[sucursal] = 0;
        resumen[sucursal]++;
    });

    return Object.entries(resumen)
        .map(([sucursal, cantidad]) => ({ sucursal, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad);
}


function mezclarColor(hex, porcentaje) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    const nr = Math.round(r + (255 - r) * porcentaje);
    const ng = Math.round(g + (255 - g) * porcentaje);
    const nb = Math.round(b + (255 - b) * porcentaje);

    return (
        "#" +
        nr.toString(16).padStart(2, "0") +
        ng.toString(16).padStart(2, "0") +
        nb.toString(16).padStart(2, "0")
    );
}

// Oscurece un color (mezcla hacia negro)
function oscurecerColor(hex, porcentaje) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    const nr = Math.round(r * (1 - porcentaje));
    const ng = Math.round(g * (1 - porcentaje));
    const nb = Math.round(b * (1 - porcentaje));

    return (
        "#" +
        nr.toString(16).padStart(2, "0") +
        ng.toString(16).padStart(2, "0") +
        nb.toString(16).padStart(2, "0")
    );
}

function mezclarDosColores(color1, color2, ratio) {
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    return "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");
}

function pintarDepartamentoConGradiente(svg, id, color1, color2, ratio, intensidad) {
    const colorMix = mezclarDosColores(color1, color2, ratio);
    const pctIntensidad = intensidad / 100;
    const blended = oscurecerColor(colorMix, (1 - pctIntensidad) * 0.7);
    return pintarDepartamento(svg, id, blended);
}

function generarTonos(hex) {
    const tonos = [];
    for (let i = 0; i < 10; i++) {
        const porcentaje = i * 0.1;
        tonos.push(mezclarColor(hex, porcentaje));
    }
    return tonos;
}

function obtenerColorEscala(baseColor, porcentaje) {
    const tonos = generarTonos(baseColor);
    let indice = Math.floor((porcentaje / 100) * 9);
    indice = Math.max(0, Math.min(9, indice));
    return tonos[9 - indice];
}

function resumenCliente(data, idCliente) {
    const resumen = {};

    data.forEach((item) => {
        if (item.id_cliente !== idCliente) return;
        const departamento = sucursalDepartamento[item.sucursal];
        if (!departamento || departamento === "SIN_MAPA") return;
        const dep = departamento.replace("DEPARTAMENTO_", "");
        if (!resumen[dep]) resumen[dep] = 0;
        resumen[dep]++;
    });

    return Object.entries(resumen).sort((a, b) => b[1] - a[1]);
}

// ============================================================
// NUEVO: helpers para la 3ra hoja (estilo infografia)
// ============================================================

// Escala de color por tema: base oscuro = mayor cantidad, claro = menor,
// gris = sin actividad. Sirve para cualquier color base (verde, rojo, azul...).
function getColorTema(base, p) {
    if (p === 0) return ROSA.gris; // sin actividad
    if (p >= 90) return mezclarColor(base, 0);
    if (p >= 75) return mezclarColor(base, 0.12);
    if (p >= 60) return mezclarColor(base, 0.25);
    if (p >= 45) return mezclarColor(base, 0.4);
    if (p >= 30) return mezclarColor(base, 0.55);
    if (p >= 20) return mezclarColor(base, 0.68);
    if (p >= 10) return mezclarColor(base, 0.8);
    return mezclarColor(base, 0.9);
}

// Mapa pintado con la escala de un tema (color base) segun cantidad de ordenes
function pintarMapaTema(resumenDepartamento, base) {
    let svg = fs.readFileSync(path.join(__dirname, "NI.svg"), "utf8");

    const max = Math.max(...Object.values(resumenDepartamento), 1);

    Object.entries(resumenDepartamento).forEach(([departamento, cantidad]) => {
        const porcentaje = (cantidad * 100) / max;
        const color = getColorTema(base, porcentaje);
        svg = pintarDepartamento(svg, departamento, color);
    });

    // Carpeta dinámica (misma ubicación del proyecto)
    const carpeta = path.join(__dirname, "svggenerados");

    if (!fs.existsSync(carpeta)) {
        fs.mkdirSync(carpeta, { recursive: true });
    }

    // Nombre del archivo según el tema
    let nombreArchivo = "ni.svg";
    console.log("BASE:", base);
    switch ((base || "").toLowerCase()) {
        case "#1a407f":
            nombreArchivo = "ni_veomas.svg";
            break;

        case "#006666":
            nombreArchivo = "ni_liosa.svg";
            break;

        case "#b30000":
            nombreArchivo = "ni_ocentral.svg";
            break;

        default:
            nombreArchivo = `ni_${base.toLowerCase()}.svg`;
            break;
    }

    // Si ya existe lo reemplaza automáticamente
    fs.writeFileSync(
        path.join(carpeta, nombreArchivo),
        svg,
        "utf8"
    );

    return svg;
}
// Resumen de un cliente keyed por DEPARTAMENTO_ (para pintar el mapa)
function resumenClienteDepartamento(data, idCliente) {
    const resumen = {};
    departamentosMapa.forEach((dep) => {
        resumen[dep] = 0;
    });

    data.forEach((item) => {
        // console.log(item.sucursal, item.id_cliente);

        if (item.id_cliente !== idCliente) return;
        const departamento = sucursalDepartamento[item.sucursal];
        if (!departamento || departamento === "SIN_MAPA") return;
        resumen[departamento]++;
    });
    //   console.log("Resumen cliente", idCliente, resumen);
    return resumen;
}

// Tarjeta con cifra grande (como los callouts de la imagen)
function tarjetaCifra(numero, etiqueta, color) {
    return {
        table: {
            widths: ["*"],
            body: [
                [
                    {
                        stack: [
                            {
                                text: numero,
                                fontSize: 26,
                                bold: true,
                                color: "#FFFFFF",
                                alignment: "center",
                            },
                            {
                                text: etiqueta,
                                fontSize: 9,
                                color: "#FFFFFF",
                                alignment: "center",
                                margin: [0, 2, 0, 0],
                            },
                        ],
                        margin: [4, 10, 4, 10],
                    },
                ],
            ],
        },
        layout: {
            defaultBorder: false,
            fillColor: () => color,
        },
        margin: [0, 0, 0, 8],
    };
}

// Leyenda de gradiente (barra de colores + rangos) como la imagen.
// Genera los tonos a partir del color base del tema.
function leyendaGradiente(base) {
    const pasos = [
        { color: getColorTema(base, 5), txt: "0%" },
        { color: getColorTema(base, 20), txt: "20%" },
        { color: getColorTema(base, 35), txt: "35%" },
        { color: getColorTema(base, 45), txt: "45%" },
        { color: getColorTema(base, 65), txt: "65%" },
        { color: getColorTema(base, 75), txt: "75%" },
        { color: getColorTema(base, 95), txt: "100%" },
    ];

    return {
        columns: pasos.map((p) => ({
            width: "auto",
            stack: [
                {
                    canvas: [
                        { type: "rect", x: 0, y: 0, w: 26, h: 10, color: p.color },
                    ],
                },
                {
                    text: p.txt,
                    fontSize: 6,
                    color: ROSA.grisTexto,
                    alignment: "left",
                    margin: [0, 2, 0, 0],
                },
            ],
        })),
        margin: [0, 6, 0, 6],
    };
}

// Grafico de barras verticales (estilo imagen) usando canvas + etiquetas
function graficoBarras(resumenDepartamento, base) {
    const entries = Object.entries(resumenDepartamento).sort(
        (a, b) => b[1] - a[1]
    );

    const max = Math.max(...entries.map((e) => e[1]), 1);

    const barW = 22;
    const gap = 8;
    const cell = barW + gap;
    const alto = 130;

    // Barras (canvas)
    const canvas = [];
    let x = 0;

    entries.forEach(([dep, val]) => {
        const bh = Math.max((val / max) * alto, 1);
        const porcentaje = (val / max) * 100;
        canvas.push({
            type: "rect",
            x,
            y: alto - bh,
            w: barW,
            h: bh,
            color: getColorTema(base, porcentaje),
        });
        x += cell;
    });

    // Etiquetas debajo de cada barra (departamento + cantidad)
    const columnasLabels = entries.map(([dep, val]) => ({
        width: cell,
        stack: [
            {
                text: val.toString(),
                fontSize: 6,
                bold: true,
                color: base,
                alignment: "center",
            },
            {
                text: dep.replace("DEPARTAMENTO_", "").substring(0, 6),
                fontSize: 5,
                color: ROSA.grisTexto,
                alignment: "center",
            },
        ],
    }));

    return {
        stack: [
            { canvas, margin: [0, 0, 0, 2] },
            { columns: columnasLabels, columnGap: 0 },
        ],
    };
}

const VERDE_NORMAL = "#006666";
const AMARILLO_EXPRES = "#F9A825";

function generarSvgGradiente(resumenTotales) {
    let svg = fs.readFileSync(path.join(__dirname, "NI.svg"), "utf8");
    const max = Math.max(...Object.values(resumenTotales), 1);

    Object.entries(resumenTotales).forEach(([deptId, total]) => {
        const pctTotal = Math.round((total / max) * 100);
        const intensidad = getColorTema(VERDE_NORMAL, pctTotal);
        svg = pintarDepartamento(svg, deptId, intensidad);
    });

    const carpeta = path.join(__dirname, "svggenerados");
    if (!fs.existsSync(carpeta)) {
        fs.mkdirSync(carpeta, { recursive: true });
    }
    fs.writeFileSync(path.join(carpeta, "ni_gradiente.svg"), svg, "utf8");
    return svg;
}

// ============================================================
// HOJA INFOGRAFICA GENERICA (estilo imagen de referencia)
// Se aplica a cada mapa, uno por pagina, respetando su color.
// ============================================================
function paginaInfografia({
    resumenDepartamento,
    base,
    titulo,
    subtitulo,
    descripcion,
    primeraPagina = false,
    usarGradiente = false,
    dataExpress = null,
}) {
    const totalOrdenes = Object.values(resumenDepartamento).reduce(
        (a, b) => a + b,
        0
    );

    const activos = Object.entries(resumenDepartamento).filter(
        ([, c]) => c > 0
    );

    const depActivos = activos.length;

    const ordenados = [...activos].sort((a, b) => b[1] - a[1]);

    const lider = ordenados[0] || ["N/D", 0];

    const oscuro = oscurecerColor(base, 0.25);
    let svgTema = null;

    if (usarGradiente && dataExpress) {
        svgTema = generarSvgGradiente(resumenDepartamento, dataExpress);
    } else {
        svgTema = pintarMapaTema(resumenDepartamento, base);
    }

    const deptBarData = departamentosMapa.map((dep) => ({
        dep,
        nombre: dep.replace("DEPARTAMENTO_", ""),
        cantidad: resumenDepartamento[dep] || 0,
    })).filter(d => d.cantidad > 0).sort((a, b) => b.cantidad - a.cantidad);

    const filasTabla = deptBarData.map(({ nombre, cantidad }) => [
        { text: nombre, fontSize: 7, color: ROSA.grisTexto },
        { text: cantidad.toLocaleString(), fontSize: 7, alignment: "center", bold: true, color: base },
    ]);

    const filasTablaResumen = deptBarData.slice(0, 5).map(({ nombre, cantidad }) => {
        const pct = Math.round((cantidad / totalOrdenes) * 100);
        return [
            { text: nombre, fontSize: 7, color: ROSA.grisTexto },
            { text: cantidad.toLocaleString(), fontSize: 7, alignment: "center", bold: true, color: base },
            { text: pct + "%", fontSize: 6, alignment: "center", color: ROSA.grisTexto },
        ];
    });

    const bloques = [
        {
            table: {
                widths: ["*", "auto"],
                body: [
                    [
                        {
                            text: titulo,
                            color: "#FFFFFF",
                            bold: true,
                            fontSize: 15,
                            margin: [8, 8, 0, 8],
                        },
                        {
                            text: subtitulo,
                            color: "#FFFFFF",
                            fontSize: 9,
                            alignment: "right",
                            margin: [0, 12, 8, 8],
                        },
                    ],
                ],
            },
            layout: { defaultBorder: false, fillColor: () => base },
            margin: [0, 0, 0, 4],
        },

        {
            text: descripcion,
            color: ROSA.grisTexto,
            fontSize: 10,
            margin: [2, 4, 0, 10],
        },

        {
            columns: [
                {
                    width: "20%",
                    stack: [
                        {
                            text: "DEPARTAMENTOS",
                            bold: true,
                            fontSize: 8,
                            color: ROSA.grisTexto,
                            margin: [0, 0, 0, 4],
                        },
                        {
                            table: {
                                widths: ["*", 40],
                                body: [
                                    [
                                        { text: "DEP", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: base },
                                        { text: "CANT", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: base, alignment: "center" },
                                    ],
                                    ...filasTabla,
                                ],
                            },
                            layout: { defaultBorder: false, paddingTop: () => 1, paddingBottom: () => 1, paddingLeft: () => 2, paddingRight: () => 2 },
                        },
                    ],
                },
                {
                    width: "60%",
                    stack: [
                        { svg: svgTema, fit: [400, 280], alignment: "center" },
                        {
                            text: usarGradiente ? "■ Verde = Normal · Amarillo = Exprés" : "■ Intensidad según cantidad de órdenes",
                            fontSize: 7,
                            color: ROSA.grisTexto,
                            alignment: "center",
                            margin: [0, 4, 0, 0],
                        },
                    ],
                },
                {
                    width: "20%",
                    stack: [
                        {
                            text: "TOP 5",
                            bold: true,
                            fontSize: 8,
                            color: ROSA.grisTexto,
                            margin: [0, 0, 0, 4],
                        },
                        {
                            table: {
                                widths: ["*", 35, 30],
                                body: [
                                    [
                                        { text: "DEP", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: base },
                                        { text: "CANT", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: base, alignment: "center" },
                                        { text: "%", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: base, alignment: "center" },
                                    ],
                                    ...filasTablaResumen,
                                ],
                            },
                            layout: { defaultBorder: false, paddingTop: () => 1, paddingBottom: () => 1, paddingLeft: () => 2, paddingRight: () => 2 },
                        },
                        { text: "Total: " + totalOrdenes.toLocaleString(), fontSize: 7, bold: true, color: base, alignment: "center", margin: [0, 6, 0, 0] },
                    ],
                },
            ],
            columnGap: 5,
        },
    ];

    if (!primeraPagina) {
        bloques[0] = { ...bloques[0], pageBreak: "before" };
    }

    return bloques;
}

// Generar mapa
function generarMapa(data) {

    const resumenDepartamento = {};

    departamentosMapa.forEach((dep) => {
        resumenDepartamento[dep] = 0;
    });

    data.forEach((item) => {
        const departamento = sucursalDepartamento[item.sucursal];
        if (!departamento || departamento === "SIN_MAPA") return;
        resumenDepartamento[departamento]++;
    });


    // Resumenes por cliente (keyed por DEPARTAMENTO_) para pintar cada mapa
    const resumenOcentral = resumenClienteDepartamento(data, 40);
    const resumenVeomas = resumenClienteDepartamento(data, 10);

    return {
        pageSize: "A4",
        pageOrientation: "landscape",
        pageMargins: [10, 10, 10, 10],
        content: [
            // ==================== PAGINA 1: GENERAL (verde) ====================
            ...paginaInfografia({
                resumenDepartamento,
                base: "#006666",
                titulo: "NICARAGUA · ÓRDENES POR DEPARTAMENTO",
                subtitulo: "Infografía · Distribución nacional",
                descripcion: "¿Dónde se concentran las órdenes a nivel nacional?",
                primeraPagina: true,
            }),

            // ==================== PAGINA 2: OCENTRAL (rojo) ====================
            ...paginaInfografia({
                resumenDepartamento: resumenOcentral,
                base: "#B30000",
                titulo: "MATAMOROS · ÓRDENES POR DEPARTAMENTO",
                subtitulo: "Infografía · Distribución del cliente",
                descripcion: "¿Dónde se concentran las órdenes de MATAMOROS?",
            }),

            // ==================== PAGINA 3: VEOMAS (azul) ====================
            ...paginaInfografia({
                resumenDepartamento: resumenVeomas,
                base: "#1A407F",
                titulo: "VEOMAS · ÓRDENES POR DEPARTAMENTO",
                subtitulo: "Infografía · Distribución del cliente",
                descripcion: "¿Dónde se concentran las órdenes de VEOMAS?",
            }),

            // ==================== PAGINA 4: 50% NORMAL + 50% EXPRES ====================
            ...(() => {
                const depTotales = {};
                const depExpress = {};
                const depNormal = {};

                departamentosMapa.forEach((dep) => {
                    depTotales[dep] = 0;
                    depExpress[dep] = 0;
                    depNormal[dep] = 0;
                });

                data.forEach((item) => {
                    const departamento = sucursalDepartamento[item.sucursal];
                    if (!departamento || departamento === "SIN_MAPA") return;
                    depTotales[departamento]++;
                    if (item.express === 1) depExpress[departamento]++;
                    else depNormal[departamento]++;
                });

                let svg = fs.readFileSync(path.join(__dirname, "NI.svg"), "utf8");
                const max = Math.max(...Object.values(depTotales), 1);

                const deptBarData = departamentosMapa.map((dep) => {
                    const n = depNormal[dep];
                    const e = depExpress[dep];
                    const t = n + e;
                    const pE = t > 0 ? Math.round((e / t) * 100) : 50;
                    const pN = t > 0 ? 100 - pE : 50;
                    return { dep, nombre: dep.replace("DEPARTAMENTO_", ""), n, e, t, pN, pE };
                }).sort((a, b) => b.t - a.t);

                const filas = deptBarData.map(({ nombre, t, pN, pE }) => {
                    return [
                        { text: nombre, fontSize: 8, color: ROSA.grisTexto },
                        { text: t.toLocaleString(), fontSize: 8, alignment: "center", bold: true, color: ROSA.grisTexto },
                        {
                            columns: [
                                { text: pN + "%", fontSize: 7, alignment: "center", color: VERDE_NORMAL, width: "50%" },
                                { text: pE + "%", fontSize: 7, alignment: "center", color: AMARILLO_EXPRES, width: "50%" },
                            ]
                        },
                        {
                            canvas: [
                                { type: "rect", x: 0, y: 0, w: 60, h: 8, color: AMARILLO_EXPRES },
                                { type: "rect", x: 0, y: 0, w: (pN / 100) * 60, h: 8, color: VERDE_NORMAL },
                            ]
                        },
                    ];
                });

                function extraerPathDelDepto(svg, dep) {
                    const regexPath = new RegExp(`<path[^>]*id="${dep}"[^>]*d="([^"]+)"`);
                    const match = svg.match(regexPath);
                    if (match) return match[1];
                    const regexGrupo = new RegExp(`<g([^>]*)id="${dep}"([^>]*)>([\\s\\S]*?)</g>`, "i");
                    const matchG = svg.match(regexGrupo);
                    if (matchG) {
                        const contenido = matchG[3];
                        const pathMatch = contenido.match(/<(?:path|polygon)([^>]*)\/?>/i);
                        if (pathMatch) {
                            const allD = pathMatch[1].match(/d="([^"]+)"/g);
                            if (allD && allD.length > 0) {
                                const lastD = allD[allD.length - 1];
                                return lastD.substring(3, lastD.length - 1);
                            }
                            const dMatch = pathMatch[1].match(/points="([^"]*)"/);
                            return dMatch ? dMatch[1] : null;
                        }
                    }
                    return null;
                }

                const deptCentroides = {};
                deptBarData.forEach(({ dep }) => {
                    deptCentroides[dep] = deptCentroidesFijos[dep] || { x: 50, y: 50 };
                });

                deptBarData.forEach(({ dep, pN }) => {
                    const pctN = pN;
                    const gradId = `grad_${dep.replace(/[^a-zA-Z0-9]/g, '_')}`;
                    const gradDef = `<linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${VERDE_NORMAL};stop-opacity:1" /><stop offset="${pctN}%" style="stop-color:${VERDE_NORMAL};stop-opacity:1" /><stop offset="${pctN}%" style="stop-color:${AMARILLO_EXPRES};stop-opacity:1" /><stop offset="100%" style="stop-color:${AMARILLO_EXPRES};stop-opacity:1" /></linearGradient>`;
                    svg = svg.replace(/<defs>/i, '<defs>' + gradDef);
                    const regexGrupo = new RegExp(`<g([^>]*)id="${dep}"([^>]*)>([\\s\\S]*?)</g>`, "i");
                    if (regexGrupo.test(svg)) {
                        svg = svg.replace(regexGrupo, (match, antes, despues, contenido) => {
                            contenido = contenido.replace(/<(path|polygon|rect|circle)([^>]*)\/?>/gi, (tag, tipo, atributos) => {
                                atributos = atributos.replace(/class="[^"]*"/g, "").replace(/fill="[^"]*"/g, "").replace(/stroke="[^"]*"/g, "").replace(/\/$/, "").trim();
                                return `<${tipo} ${atributos} fill="url(#${gradId})" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>`;
                            });
                            return `<g id="${dep}">${contenido}</g>`;
                        });
                    }
                    const regexPath = new RegExp(`<path([^>]*)id="${dep}"([^>]*)/>`, "i");
                    if (regexPath.test(svg)) {
                        svg = svg.replace(regexPath, (match, antes, despues) => {
                            let atributos = (antes + despues).replace(/class="[^"]*"/g, "").replace(/fill="[^"]*"/g, "").replace(/stroke="[^"]*"/g, "").replace(/\/$/, "").trim();
                            return `<path id="${dep}" ${atributos} fill="url(#${gradId})" stroke="#FFFFFF" stroke-width="2"/>`;
                        });
                    }
                });

                const deptLabelsNombres = {
                    "DEPARTAMENTO_MANAGUA": "Managua", "DEPARTAMENTO_CHINANDEGA": "Chinandega",
                    "DEPARTAMENTO_LEON": "León", "DEPARTAMENTO_MASAYA": "Masaya",
                    "DEPARTAMENTO_GRANADA": "Granada", "DEPARTAMENTO_CARAZO": "Carazo",
                    "DEPARTAMENTO_RIVAS": "Rivas", "DEPARTAMENTO_ESTELI": "Estelí",
                    "DEPARTAMENTO_MATAGALPA": "Matagalpa", "DEPARTAMENTO_JINOTEGA": "Jinotega",
                    "DEPARTAMENTO_NUEVA_SEGOVIA": "Nva.Segovia", "DEPARTAMENTO_MADRIZ": "Madriz",
                    "DEPARTAMENTO_CHONTALES": "Chontales", "DEPARTAMENTO_BOACO": "Boaco",
                    "DEPARTAMENTO_RIO_SAN_JUAN": "Río San Juan", "DEPARTAMENTO_RACCN": "RACCN",
                    "DEPARTAMENTO_RACCS": "RACCS",
                };

                const labelSvg = deptBarData.map(({ dep }) => {
                    const centroide = deptCentroides[dep];
                    if (!centroide) return '';
                    const label = deptLabelsNombres[dep] || dep.replace("DEPARTAMENTO_", "");
                    const style = deptLabelStyles[dep] || { color: "#333333", fontSize: 6 };
                    return `<text x="${centroide.x.toFixed(1)}" y="${centroide.y.toFixed(1)}" font-family="Arial" font-size="${style.fontSize}" fill="${style.color}" text-anchor="middle" font-weight="bold">${label}</text>`;
                }).join('');

                const svgWithLabels = svg.replace('</svg>', `${labelSvg}</svg>`);

                const carpeta = path.join(__dirname, "svggenerados");
                if (!fs.existsSync(carpeta)) {
                    fs.mkdirSync(carpeta, { recursive: true });
                }
                fs.writeFileSync(path.join(carpeta, "ni_expres_normal.svg"), svgWithLabels, "utf8");

                return [
                    {
                        pageBreak: "before",
                        columns: [
                            {
                                width: "20%",
                                stack: [
                                    {
                                        table: {
                                            widths: ["*", 50, 60, 60],
                                            body: [
                                                [
                                                    { text: "DEP", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: ROSA.grisTexto },
                                                    { text: "TOT", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: ROSA.grisTexto, alignment: "center" },
                                                    { text: "N/E", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: ROSA.grisTexto, alignment: "center" },
                                                    { text: "DIST", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: ROSA.grisTexto, alignment: "center" },
                                                ],
                                                ...filas,
                                            ],
                                        },
                                        layout: { defaultBorder: false, paddingTop: () => 1, paddingBottom: () => 1, paddingLeft: () => 2, paddingRight: () => 2 },
                                    },
                                ],
                            },
                            {
                                width: "80%",
                                stack: [
                                    {
                                        text: "DISTRIBUCIÓN NORMAL vs EXPRÉS POR DEPARTAMENTO",
                                        bold: true,
                                        fontSize: 12,
                                        color: ROSA.grisTexto,
                                        alignment: "center",
                                        margin: [0, 0, 0, 8],
                                    },
                                    { svg: svgWithLabels, fit: [480, 320], alignment: "center" },
                                    {
                                        columns: [
                                            { text: "■ Verde = Normal", fontSize: 8, color: VERDE_NORMAL, alignment: "center", width: "25%" },
                                            { text: "■ Amarillo = Exprés", fontSize: 8, color: AMARILLO_EXPRES, alignment: "center", width: "25%" },
                                            { text: "■ Forma = Forma del departamento", fontSize: 8, color: ROSA.grisTexto, alignment: "center", width: "50%" },
                                        ],
                                        margin: [0, 6, 0, 0],
                                    },
                                ],
                            },
                        ],
                    },
                ];
            })(),

            // ==================== PAGINA 6: MATAMOROS vs VEOMAS ====================
            ...(() => {
                const depMatamoros = {};
                const depVeomas = {};
                const depTotales = {};

                departamentosMapa.forEach((dep) => {
                    depMatamoros[dep] = 0;
                    depVeomas[dep] = 0;
                    depTotales[dep] = 0;
                });

                data.forEach((item) => {
                    const departamento = sucursalDepartamento[item.sucursal];
                    if (!departamento || departamento === "SIN_MAPA") return;
                    depTotales[departamento]++;
                    if (item.id_cliente === 40) depMatamoros[departamento]++;
                    else if (item.id_cliente === 10) depVeomas[departamento]++;
                });

                let svg = fs.readFileSync(path.join(__dirname, "NI.svg"), "utf8");
                const max = Math.max(...Object.values(depTotales), 1);

                const deptBarData = departamentosMapa.map((dep) => {
                    const m = depMatamoros[dep];
                    const v = depVeomas[dep];
                    const t = m + v;
                    const pM = t > 0 ? Math.round((m / t) * 100) : 0;
                    const pV = t > 0 ? Math.round((v / t) * 100) : 0;
                    return { dep, nombre: dep.replace("DEPARTAMENTO_", ""), m, v, t, pM, pV };
                }).filter(d => d.t > 0).sort((a, b) => b.t - a.t);

                deptBarData.forEach(({ dep, t, v }) => {
                    const pctVeomas = t > 0 ? (v / t) * 100 : 50;
                    const pctTotal = Math.round((t / max) * 100);
                    const gradId = `grad_${dep.replace(/[^a-zA-Z0-9]/g, '_')}`;
                    const gradDef = `<linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#B30000;stop-opacity:1" /><stop offset="${100 - pctVeomas}%" style="stop-color:#B30000;stop-opacity:1" /><stop offset="${100 - pctVeomas}%" style="stop-color:#1A407F;stop-opacity:1" /><stop offset="100%" style="stop-color:#1A407F;stop-opacity:1" /></linearGradient>`;
                    svg = svg.replace(/<defs>/i, '<defs>' + gradDef);
                    const regexGrupo = new RegExp(`<g([^>]*)id="${dep}"([^>]*)>([\\s\\S]*?)</g>`, "i");
                    if (regexGrupo.test(svg)) {
                        svg = svg.replace(regexGrupo, (match, antes, despues, contenido) => {
                            contenido = contenido.replace(/<(path|polygon|rect|circle)([^>]*)\/?>/gi, (tag, tipo, atributos) => {
                                atributos = atributos.replace(/class="[^"]*"/g, "").replace(/fill="[^"]*"/g, "").replace(/stroke="[^"]*"/g, "").replace(/\/$/, "").trim();
                                return `<${tipo} ${atributos} fill="url(#${gradId})" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>`;
                            });
                            return `<g id="${dep}">${contenido}</g>`;
                        });
                    }
                    const regexPath = new RegExp(`<path([^>]*)id="${dep}"([^>]*)/>`, "i");
                    if (regexPath.test(svg)) {
                        svg = svg.replace(regexPath, (match, antes, despues) => {
                            let atributos = (antes + despues).replace(/class="[^"]*"/g, "").replace(/fill="[^"]*"/g, "").replace(/stroke="[^"]*"/g, "").replace(/\/$/, "").trim();
                            return `<path id="${dep}" ${atributos} fill="url(#${gradId})" stroke="#FFFFFF" stroke-width="2"/>`;
                        });
                    }
                });

                const filas = deptBarData.map(({ nombre, t, m, v }) => [
                    { text: nombre, fontSize: 7, color: ROSA.grisTexto },
                    { text: t.toString(), fontSize: 7, alignment: "center", color: ROSA.grisTexto },
                    { text: m.toLocaleString(), fontSize: 7, alignment: "center", color: "#B30000", bold: true },
                    { text: v.toLocaleString(), fontSize: 7, alignment: "center", color: "#1A407F", bold: true },
                ]);

                const labelSvg = deptBarData.map(({ dep }) => {
                    const centroide = deptCentroidesFijos[dep];
                    if (!centroide) return '';
                    const label = deptLabelsNombres[dep] || dep.replace("DEPARTAMENTO_", "");
                    const style = deptLabelStyles[dep] || { color: "#333333", fontSize: 6 };
                    return `<text x="${centroide.x.toFixed(1)}" y="${centroide.y.toFixed(1)}" font-family="Arial" font-size="${style.fontSize}" fill="${style.color}" text-anchor="middle" font-weight="bold">${label}</text>`;
                }).join('');

                const svgWithLabels = svg.replace('</svg>', `${labelSvg}</svg>`);

                fs.writeFileSync(path.join(__dirname, "svggenerados", "ni_matamoros_veomas.svg"), svgWithLabels, "utf8");

                const totalMat = Object.values(depMatamoros).reduce((a, b) => a + b, 0);
                const totalVeo = Object.values(depVeomas).reduce((a, b) => a + b, 0);
                const total = totalMat + totalVeo;

                return [
                    {
                        pageBreak: "before",
                        columns: [
                            {
                                width: "20%",
                                stack: [
                                    {
                                        table: {
                                            widths: ["*", 40, 45, 45],
                                            body: [
                                                [
                                                    { text: "DEP", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: ROSA.grisTexto },
                                                    { text: "TOT", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: ROSA.grisTexto, alignment: "center" },
                                                    { text: "MAT", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: "#B30000", alignment: "center" },
                                                    { text: "VEO", color: "#FFFFFF", bold: true, fontSize: 6, fillColor: "#1A407F", alignment: "center" },
                                                ],
                                                ...filas
                                            ],
                                        },
                                        layout: { defaultBorder: false, paddingTop: () => 1, paddingBottom: () => 1, paddingLeft: () => 2, paddingRight: () => 2 },
                                    },
                                ],
                            },
                            {
                                width: "60%",
                                stack: [
                                    {
                                        text: "MATAMOROS vs VEOMAS POR DEPARTAMENTO",
                                        bold: true,
                                        fontSize: 12,
                                        color: ROSA.grisTexto,
                                        alignment: "center",
                                        margin: [0, 0, 0, 8],
                                    },
                                    { svg: svgWithLabels, fit: [400, 280], alignment: "center" },
                                    {
                                        columns: [
                                            { text: "■ Rojo = Matamoros", fontSize: 7, color: "#B30000", alignment: "center", width: "30%" },
                                            { text: "■ Azul = Veomas", fontSize: 7, color: "#1A407F", alignment: "center", width: "30%" },
                                            { text: "■ Intensidad = Total órdenes", fontSize: 7, color: ROSA.grisTexto, alignment: "center", width: "40%" },
                                        ],
                                        margin: [0, 4, 0, 0],
                                    },
                                ],
                            },
                            {
                                width: "20%",
                                stack: [
                                    {
                                        text: "TOTALES",
                                        bold: true,
                                        fontSize: 8,
                                        color: ROSA.grisTexto,
                                        margin: [0, 0, 0, 4],
                                    },
                                    {
                                        table: {
                                            widths: ["*", 50],
                                            body: [
                                                [
                                                    { text: "MATAMOROS", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: "#B30000" },
                                                    { text: totalMat.toLocaleString(), color: "#FFFFFF", bold: true, fontSize: 8, fillColor: "#B30000", alignment: "center" }
                                                ],
                                                [
                                                    { text: "VEOMAS", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: "#1A407F" },
                                                    { text: totalVeo.toLocaleString(), color: "#FFFFFF", bold: true, fontSize: 8, fillColor: "#1A407F", alignment: "center" }
                                                ],
                                                [
                                                    { text: "TOTAL", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: ROSA.grisTexto },
                                                    { text: total.toLocaleString(), color: "#FFFFFF", bold: true, fontSize: 8, fillColor: ROSA.grisTexto, alignment: "center" }
                                                ],
                                            ],
                                        },
                                        layout: { defaultBorder: false, paddingTop: () => 2, paddingBottom: () => 2, paddingLeft: () => 3, paddingRight: () => 3 },
                                    },
                                    {
                                        text: `${Math.round((totalMat / total) * 100)}% vs ${Math.round((totalVeo / total) * 100)}%`,
                                        fontSize: 9,
                                        bold: true,
                                        color: ROSA.grisTexto,
                                        alignment: "center",
                                        margin: [0, 6, 0, 0],
                                    },
                                ],
                            },
                        ],
                    },
                ];
            })(),
        ],
    };
}

module.exports = {
    generarMapa,
};
