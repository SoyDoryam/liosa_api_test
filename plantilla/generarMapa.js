const fs = require("fs");
const path = require("path");

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
    const svgTema = pintarMapaTema(resumenDepartamento, base);
    //   console.log(svgTema)
    const bloques = [
        {
            // Encabezado tipo banner
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
            layout: {
                defaultBorder: false,
                fillColor: () => base,
            },
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
                // Columna izquierda: cifras + leyenda
                {
                    width: "30%",
                    stack: [
                        tarjetaCifra(totalOrdenes.toLocaleString(), "Órdenes totales", base),
                        tarjetaCifra(depActivos.toString(), "Departamentos activos", oscuro),
                        tarjetaCifra(
                            lider[1].toString(),
                            "Líder: " + lider[0].replace("DEPARTAMENTO_", ""),
                            ROSA.grisTexto
                        ),
                        {
                            text: "Intensidad de órdenes",
                            fontSize: 8,
                            bold: true,
                            color: ROSA.grisTexto,
                            margin: [0, 6, 0, 0],
                        },
                        leyendaGradiente(base),
                        {
                            text: "Color oscuro = mayor cantidad de órdenes · Gris = sin actividad",
                            fontSize: 7,
                            color: ROSA.grisTexto,
                            margin: [0, 2, 0, 0],
                        },
                    ],
                },

                // Columna derecha: mapa del tema
                {
                    width: "70%",
                    svg: svgTema,
                    fit: [520, 300],
                    alignment: "center",
                },
            ],
            columnGap: 10,
        },

        {
            text: "Órdenes por departamento",
            color: ROSA.grisTexto,
            fontSize: 10,
            bold: true,
            margin: [2, 12, 0, 6],
        },

        graficoBarras(resumenDepartamento, base),
    ];

    // Salto de pagina antes, salvo la primera hoja del documento
    if (!primeraPagina) {
        bloques[0] = { ...bloques[0], pageBreak: "before" };
    }

    return bloques;
}

// ============================================================
// PAGINA 4: ÓRDENES EXPRES VS NORMALES
// Verde = Normal, Amarillo = Exprés
// ============================================================
const VERDE_NORMAL = "#2E7D32";
const AMARILLO_EXPRES = "#F9A825";

function paginaOrdenExpresVsNormal(data) {
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

    const generarMapaConPorcentaje = (resumen, color) => {
        let svg = fs.readFileSync(path.join(__dirname, "NI.svg"), "utf8");
        const max = Math.max(...Object.values(resumen), 1);

        Object.entries(resumen).forEach(([deptId, cantidad]) => {
            const pct = Math.round((cantidad / max) * 100);
            const colorPct = pct >= 50 ? color : mezclarColor(color, 0.4);
            svg = pintarDepartamento(svg, deptId, colorPct);
        });

        return { svg, resumen };
    };

    const { svg: svgNormal } = generarMapaConPorcentaje(depNormal, VERDE_NORMAL);
    const { svg: svgExpres } = generarMapaConPorcentaje(depExpress, AMARILLO_EXPRES);

    const totalNormal = Object.values(depNormal).reduce((a, b) => a + b, 0);
    const totalExpres = Object.values(depExpress).reduce((a, b) => a + b, 0);
    const total = totalNormal + totalExpres;

    const filas = departamentosMapa.map((dep) => {
        const nombre = dep.replace("DEPARTAMENTO_", "");
        const n = depNormal[dep];
        const e = depExpress[dep];
        const t = n + e;
        const pN = t > 0 ? Math.round((n / t) * 100) : 0;
        const pE = t > 0 ? Math.round((e / t) * 100) : 0;
        return [
            { text: nombre, fontSize: 7, color: ROSA.grisTexto },
            { text: t.toString(), fontSize: 7, alignment: "center", color: ROSA.grisTexto },
            { text: n.toString(), fontSize: 7, alignment: "center", color: VERDE_NORMAL, bold: true },
            { text: pN + "%", fontSize: 6, alignment: "center", color: ROSA.grisTexto },
            { text: e.toString(), fontSize: 7, alignment: "center", color: AMARILLO_EXPRES, bold: true },
            { text: pE + "%", fontSize: 6, alignment: "center", color: ROSA.grisTexto },
        ];
    });

    return [
        {
            table: {
                widths: ["*", "auto", "auto", 40, "auto", 40],
                body: [
                    [
                        { text: "DEPARTAMENTO", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: ROSA.grisTexto },
                        { text: "TOTAL", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: ROSA.grisTexto, alignment: "center" },
                        { text: "NORMAL", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: VERDE_NORMAL, alignment: "center" },
                        { text: "%", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: VERDE_NORMAL, alignment: "center" },
                        { text: "EXPRÉS", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: AMARILLO_EXPRES, alignment: "center" },
                        { text: "%", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: AMARILLO_EXPRES, alignment: "center" },
                    ],
                    ...filas,
                ],
            },
            layout: {
                defaultBorder: false,
                paddingTop: () => 2,
                paddingBottom: () => 2,
                paddingLeft: () => 3,
                paddingRight: () => 3,
                fillColor: (rowIndex) => (rowIndex > 0 && rowIndex % 2 === 0 ? ROSA.grisClaro : null),
            },
            margin: [0, 10, 0, 0],
        },
        {
            columns: [
                {
                    width: "50%",
                    stack: [
                        { text: "ÓRDENES NORMALES", bold: true, fontSize: 11, color: VERDE_NORMAL, alignment: "center", margin: [0, 0, 0, 6] },
                        { text: `${totalNormal.toLocaleString()} órdenes (${Math.round((totalNormal / total) * 100)}%)`, fontSize: 9, color: ROSA.grisTexto, alignment: "center", margin: [0, 0, 0, 4] },
                        { svg: svgNormal, fit: [320, 220], alignment: "center" },
                    ],
                },
                {
                    width: "50%",
                    stack: [
                        { text: "ÓRDENES EXPRÉS", bold: true, fontSize: 11, color: AMARILLO_EXPRES, alignment: "center", margin: [0, 0, 0, 6] },
                        { text: `${totalExpres.toLocaleString()} órdenes (${Math.round((totalExpres / total) * 100)}%)`, fontSize: 9, color: ROSA.grisTexto, alignment: "center", margin: [0, 0, 0, 4] },
                        { svg: svgExpres, fit: [320, 220], alignment: "center" },
                    ],
                },
            ],
            margin: [0, 10, 0, 0],
        },
    ];
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
                titulo: "OCENTRAL (CLIENTE 40) · ÓRDENES POR DEPARTAMENTO",
                subtitulo: "Infografía · Distribución del cliente",
                descripcion: "¿Dónde se concentran las órdenes de OCENTRAL?",
            }),

            // ==================== PAGINA 3: VEOMAS (azul) ====================
            ...paginaInfografia({
                resumenDepartamento: resumenVeomas,
                base: "#1A407F",
                titulo: "VEOMAS (CLIENTE 10) · ÓRDENES POR DEPARTAMENTO",
                subtitulo: "Infografía · Distribución del cliente",
                descripcion: "¿Dónde se concentran las órdenes de VEOMAS?",
            }),

            // ==================== PAGINA 4: EXPRES VS NORMAL ====================
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

                const generarSvgMapa = (resumen, color) => {
                    let svg = fs.readFileSync(path.join(__dirname, "NI.svg"), "utf8");
                    const max = Math.max(...Object.values(resumen), 1);
                    Object.entries(resumen).forEach(([deptId, cantidad]) => {
                        const pct = Math.round((cantidad / max) * 100);
                        const colorPct = pct >= 50 ? color : mezclarColor(color, 0.4);
                        svg = pintarDepartamento(svg, deptId, colorPct);
                    });
                    return svg;
                };

                const svgNormal = generarSvgMapa(depNormal, VERDE_NORMAL);
                const svgExpres = generarSvgMapa(depExpress, AMARILLO_EXPRES);

                const totalNormal = Object.values(depNormal).reduce((a, b) => a + b, 0);
                const totalExpres = Object.values(depExpress).reduce((a, b) => a + b, 0);
                const total = totalNormal + totalExpres;

                const filas = departamentosMapa.map((dep) => {
                    const nombre = dep.replace("DEPARTAMENTO_", "");
                    const n = depNormal[dep];
                    const e = depExpress[dep];
                    const t = n + e;
                    const pN = t > 0 ? Math.round((n / t) * 100) : 0;
                    const pE = t > 0 ? Math.round((e / t) * 100) : 0;
                    return [
                        { text: nombre, fontSize: 7, color: ROSA.grisTexto },
                        { text: t.toString(), fontSize: 7, alignment: "center", color: ROSA.grisTexto },
                        { text: n.toString(), fontSize: 7, alignment: "center", color: VERDE_NORMAL, bold: true },
                        { text: pN + "%", fontSize: 6, alignment: "center", color: ROSA.grisTexto },
                        { text: e.toString(), fontSize: 7, alignment: "center", color: AMARILLO_EXPRES, bold: true },
                        { text: pE + "%", fontSize: 6, alignment: "center", color: ROSA.grisTexto },
                    ];
                });

                return [
                    {
                        pageBreak: "before",
                        stack: [
                            {
                                table: {
                                    widths: ["*", "auto", "auto", 40, "auto", 40],
                                    body: [
                                        [
                                            { text: "DEPARTAMENTO", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: ROSA.grisTexto },
                                            { text: "TOTAL", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: ROSA.grisTexto, alignment: "center" },
                                            { text: "NORMAL", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: VERDE_NORMAL, alignment: "center" },
                                            { text: "%", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: VERDE_NORMAL, alignment: "center" },
                                            { text: "EXPRÉS", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: AMARILLO_EXPRES, alignment: "center" },
                                            { text: "%", color: "#FFFFFF", bold: true, fontSize: 7, fillColor: AMARILLO_EXPRES, alignment: "center" },
                                        ],
                                        ...filas,
                                    ],
                                },
                                layout: { defaultBorder: false, paddingTop: () => 2, paddingBottom: () => 2, paddingLeft: () => 3, paddingRight: () => 3 },
                            },
                            {
                                columns: [
                                    {
                                        width: "50%",
                                        stack: [
                                            { text: "ÓRDENES NORMALES", bold: true, fontSize: 11, color: VERDE_NORMAL, alignment: "center", margin: [0, 0, 0, 6] },
                                            { text: `${totalNormal.toLocaleString()} órdenes (${Math.round((totalNormal / total) * 100)}%)`, fontSize: 9, color: ROSA.grisTexto, alignment: "center", margin: [0, 0, 0, 4] },
                                            { svg: svgNormal, fit: [320, 220], alignment: "center" },
                                        ],
                                    },
                                    {
                                        width: "50%",
                                        stack: [
                                            { text: "ÓRDENES EXPRÉS", bold: true, fontSize: 11, color: AMARILLO_EXPRES, alignment: "center", margin: [0, 0, 0, 6] },
                                            { text: `${totalExpres.toLocaleString()} órdenes (${Math.round((totalExpres / total) * 100)}%)`, fontSize: 9, color: ROSA.grisTexto, alignment: "center", margin: [0, 0, 0, 4] },
                                            { svg: svgExpres, fit: [320, 220], alignment: "center" },
                                        ],
                                    },
                                ],
                                margin: [0, 10, 0, 0],
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
