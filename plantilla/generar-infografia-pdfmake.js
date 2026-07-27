// ============================================================
// GENERADOR DE INFOGRAFIA COMPARATIVA (Matamoros vs Veomas)
// Devuelve el documentDefinition de PDFMake, listo para usar
// en una API. Recibe los mismos JSON que consume el dashboard
// React (data.json de Matamoros y veomas.json de Veomas).
//
//   const { generarInfografia } = require("./lib/generar-infografia-pdfmake")
//   const docDefinition = generarInfografia(dataMat, dataBeo)
//   pdfMake.createPdf(docDefinition).getBuffer(...)  // en tu API
//
// Cada seccion visual del proyecto React se arma con su propia
// funcion y ocupa una pagina diferente (A4 horizontal), en el
// mismo orden que la pagina /infografia.
// ============================================================

// ---------- PALETA (identica al dashboard) ----------
const ROJO = "#D71920" // Matamoros
const AZUL = "#005BBB" // Veomas
const AZUL_MARINO = "#263B6D"
const BLANCO = "#FFFFFF"
const GRIS_TEXTO = "#58595B"

// Colores del mapa comparativo
const COLOR_MAT = "#D71920"
const COLOR_BEO = "#005BBB"
const COLOR_AMBAS = "#7c3aed"
const COLOR_SIN = "#d1d5db"

// ============================================================
// UTILIDADES DE FORMATO Y CALCULO
// ============================================================
function num(v) {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
}

function money(v) {
    return "C$" + num(v).toLocaleString("es-NI", { maximumFractionDigits: 0 })
}

function moneyK(v) {
    return "C$" + Math.round(num(v) / 1000).toLocaleString("es-NI") + "K"
}

function moneyM(v) {
    return "C$" + (num(v) / 1000000).toFixed(1) + "M"
}

function pct(part, total) {
    return total > 0 ? Math.round((part / total) * 100) : 0
}

// Suma un campo sobre todo el arreglo
function sumBy(data, campo) {
    return data.reduce((acc, item) => acc + num(item[campo]), 0)
}

// Replica calcStats() del componente InfografiaOpticas
function calcStats(data) {
    const totalVentas = sumBy(data, "VENTA_TOTAL_KPI")
    const totalUnidades = sumBy(data, "CANT_TOTAL_KPI")
    const numSucursales = data.length

    const convencionales = sumBy(data, "CANT_CONVENSIONALES")
    const limpiadores = sumBy(data, "CANT_LIMPIADORES")
    const digitales = sumBy(data, "CANT_DIGITALES")
    const totalCant = convencionales + limpiadores + digitales

    const montoConvencionales = sumBy(data, "MONTO_CONVENSIONALES")
    const montoLimpiadores = sumBy(data, "MONTO_LIMPIADORES")
    const montoDigitales = sumBy(data, "MONTO_DIGITALES")
    const totalMonto = montoConvencionales + montoLimpiadores + montoDigitales

    return {
        totalVentas,
        totalUnidades,
        numSucursales,
        convencionales,
        limpiadores,
        digitales,
        pctConvencionales: pct(convencionales, totalCant),
        pctLimpiadores: pct(limpiadores, totalCant),
        pctDigitales: pct(digitales, totalCant),
        montoConvencionales,
        montoLimpiadores,
        montoDigitales,
        totalMonto,
        pctMontoConvencionales: pct(montoConvencionales, totalMonto),
        pctMontoLimpiadores: pct(montoLimpiadores, totalMonto),
        pctMontoDigitales: pct(montoDigitales, totalMonto),
        metaArosSol: sumBy(data, "META_AROS_SOL"),
        metaAudiologia: sumBy(data, "META_ASIS_SALUD"),
        metaConvencionales: sumBy(data, "META_CONVENSIONALES"),
        metaCredilentes: sumBy(data, "META_CREDIMAS"),
        metaDigitales: sumBy(data, "META_DIGITALES"),
        metaLentes: sumBy(data, "META_LC"),
        metaLimpiadores: sumBy(data, "META_LIMPIADORES"),
        metaAsisHogar: sumBy(data, "META_ASIS_HOGAR"),
        metaServComp: sumBy(data, "META_SERV_COMP"),
        metaServExpress: sumBy(data, "META_SERV_EXPRESS"),
        metaSolLC: sumBy(data, "META_SOL_LC"),
        sobreCumplimiento: sumBy(data, "CUMPLIMIENTO_SOBRE"),
    }
}

function top15(data) {
    return [...data]
        .filter((s) => num(s.VENTA_TOTAL_KPI) > 0)
        .sort((a, b) => num(b.VENTA_TOTAL_KPI) - num(a.VENTA_TOTAL_KPI))
        .slice(0, 15)
}

function sucursalesConMeta(data) {
    return [...data]
        .filter((s) => num(s.META_GLOBAL) > 0)
        .sort((a, b) => num(b.META_GLOBAL) - num(a.META_GLOBAL))
}

function limpiarNombre(s) {
    return String(s.NombreSucursal || "").replace(/^(VM|OC|M|V)/, "").trim()
}

// Mapeo de sucursal a departamento para métricas
const sucursalDepartamentoMetricas = {
    // VEOMAS
    "VMCHINANDEGA": "DEPARTAMENTO_CHINANDEGA",
    "VMPLAZA ESPANA": "DEPARTAMENTO_MANAGUA",
    "VMLEON": "DEPARTAMENTO_LEON",
    "VMIVANMT": "DEPARTAMENTO_MANAGUA",
    "VMRIVAS": "DEPARTAMENTO_RIVAS",
    "VMESTELI": "DEPARTAMENTO_ESTELI",
    "VMJUIGALPA": "DEPARTAMENTO_CHONTALES",
    "VMMAYOREO": "DEPARTAMENTO_MANAGUA",
    "VMMASAYA": "DEPARTAMENTO_MASAYA",
    "VMMATAGALPA": "DEPARTAMENTO_MATAGALPA",
    "VMJINOTEPE": "DEPARTAMENTO_CARAZO",
    "VMBOACO": "DEPARTAMENTO_BOACO",
    "VMOCOTAL": "DEPARTAMENTO_NUEVA_SEGOVIA",
    "VMBELLOHORIZONTE": "DEPARTAMENTO_MANAGUA",
    "VMGRANADA": "DEPARTAMENTO_GRANADA",
    "VMCARRETERA NORTE": "DEPARTAMENTO_MANAGUA",
    "VMALTAMIRA": "DEPARTAMENTO_MANAGUA",
    "VMCIUDADSANDINO": "DEPARTAMENTO_MANAGUA",
    "VMRIOBLANCO": "DEPARTAMENTO_MATAGALPA",
    "VMMATIGUAS": "DEPARTAMENTO_MATAGALPA",
    "VMTIPITAPA": "DEPARTAMENTO_MANAGUA",
    // OCENTRAL/MATAMOROS
    "MOVIL 1": "DEPARTAMENTO_MANAGUA",
    "MOVIL2": "DEPARTAMENTO_MANAGUA",
    "MOVIL4": "DEPARTAMENTO_MANAGUA",
    "MOVIL5": "DEPARTAMENTO_MANAGUA",
    "MOVIL6": "DEPARTAMENTO_MANAGUA",
    "MOVIL10": "DEPARTAMENTO_MANAGUA",
    "MOVIL11": "DEPARTAMENTO_MANAGUA",
    "MOVIL12": "DEPARTAMENTO_MANAGUA",
    "MOVIL13": "DEPARTAMENTO_MANAGUA",
    "BOLONIA": "DEPARTAMENTO_MANAGUA",
    "CARRETERA MASAYA": "DEPARTAMENTO_MANAGUA",
    "CIUDAD JARDIN": "DEPARTAMENTO_MANAGUA",
    "ESTELI": "DEPARTAMENTO_ESTELI",
    "MATAGALPA": "DEPARTAMENTO_MATAGALPA",
    "JUIGALPA": "DEPARTAMENTO_CHONTALES",
    "GRANADA": "DEPARTAMENTO_GRANADA",
    "MASAYA": "DEPARTAMENTO_MASAYA",
    "CHINANDEGA": "DEPARTAMENTO_CHINANDEGA",
    "RIVAS": "DEPARTAMENTO_RIVAS",
    "MULTI. LAS AMERICAS": "DEPARTAMENTO_MANAGUA",
    "JINOTEPE": "DEPARTAMENTO_CARAZO",
    "LINDA VISTA": "DEPARTAMENTO_MANAGUA",
    "METROCENTRO": "DEPARTAMENTO_MANAGUA",
    "SIUNA": "DEPARTAMENTO_RACCN",
    "LA SABANA": "DEPARTAMENTO_MANAGUA",
    "LEON": "DEPARTAMENTO_LEON",
    "BELLO HORIZONTE": "DEPARTAMENTO_MANAGUA",
    "SANTO TOMAS": "DEPARTAMENTO_CHONTALES",
    "PLAZA CHINANDEGA": "DEPARTAMENTO_CHINANDEGA",
    "BLUEFIELDS": "DEPARTAMENTO_RACCS",
    "SEBACO": "DEPARTAMENTO_MATAGALPA",
    "TIPITAPA": "DEPARTAMENTO_MANAGUA",
    "BOACO": "DEPARTAMENTO_BOACO",
    "EL ZUMEN": "DEPARTAMENTO_MANAGUA",
    "CIUDAD SANDINO": "DEPARTAMENTO_MANAGUA",
    "CARRETERA NORTE": "DEPARTAMENTO_MANAGUA",
    "PUERTO CABEZAS": "DEPARTAMENTO_RACCN",
    "GALERIA VIP": "DEPARTAMENTO_MANAGUA",
};

function getDepartamentoMetricas(sucursal) {
    const s = String(sucursal || "").toUpperCase().trim();
    if (sucursalDepartamentoMetricas[s]) return sucursalDepartamentoMetricas[s];
    // Intentar matching parcial
    for (const [key, dep] of Object.entries(sucursalDepartamentoMetricas)) {
        if (s.includes(key.toUpperCase()) || key.toUpperCase().includes(s)) {
            return dep;
        }
    }
    return null;
}

// ============================================================
// COMPONENTES REUTILIZABLES PDFMAKE
// ============================================================

// Banner rojo/azul de encabezado de pagina
function bannerComparativo(titulo, subtitulo, pageBreak) {
    const bloque = {
        table: {
            widths: ["50%", "50%"],
            body: [
                [
                    {
                        stack: [
                            { text: "MATAMOROS", color: BLANCO, bold: true, fontSize: 16 },
                            subtitulo ? { text: subtitulo, color: BLANCO, fontSize: 9, margin: [0, 2, 0, 0] } : {},
                        ],
                        fillColor: ROJO,
                        margin: [16, 12, 16, 12],
                    },
                    {
                        stack: [
                            { text: "VEOMAS", color: BLANCO, bold: true, fontSize: 16, alignment: "right" },
                            subtitulo
                                ? { text: subtitulo, color: BLANCO, fontSize: 9, alignment: "right", margin: [0, 2, 0, 0] }
                                : {},
                        ],
                        fillColor: AZUL,
                        margin: [16, 12, 16, 12],
                    },
                ],
            ],
        },
        layout: { defaultBorder: false },
        margin: [0, 0, 0, 6],
    }
    if (pageBreak) bloque.pageBreak = "before"
    return [
        bloque,
        {
            text: titulo,
            fontSize: 13,
            bold: true,
            color: AZUL_MARINO,
            alignment: "center",
            margin: [0, 0, 0, 10],
        },
    ]
}

// Barra horizontal (pista + relleno) al estilo "Monto por categoria"
function barra(valorPct, color, ancho) {
    const w = ancho || 240
    const relleno = Math.max(1, (valorPct / 100) * w)
    return {
        canvas: [
            { type: "rect", x: 0, y: 0, w, h: 8, r: 4, color: "#FFFFFF" },
            { type: "rect", x: 0, y: 0, w, h: 8, r: 4, color: color, fillOpacity: 0.3 },
            { type: "rect", x: 0, y: 0, w: relleno, h: 8, r: 4, color: "#FFFFFF" },
        ],
    }
}

// Fila de una categoria: etiqueta, valor, barra y porcentaje
function filaCategoria(etiqueta, valorTexto, porcentaje, color, alinDerecha) {
    return {
        stack: [
            {
                columns: [
                    { text: etiqueta, bold: true, color: BLANCO, fontSize: 9, alignment: alinDerecha ? "right" : "left" },
                    { text: valorTexto, color: BLANCO, fontSize: 9, alignment: alinDerecha ? "left" : "right" },
                ],
                margin: [0, 0, 0, 3],
            },
            barra(porcentaje, color, 240),
            { text: porcentaje + "%", color: BLANCO, fontSize: 8, alignment: "right", margin: [0, 2, 0, 6] },
        ],
    }
}

// Celda con fondo de color (mitad roja / mitad azul)
function celdaColor(stack, color) {
    return { stack, fillColor: color, margin: [16, 14, 16, 14] }
}

// Tabla comparativa de 2 columnas con fondos rojo/azul
function tablaComparativa(stackMat, stackBeo) {
    return {
        table: {
            widths: ["50%", "50%"],
            body: [[celdaColor(stackMat, ROJO), celdaColor(stackBeo, AZUL)]],
        },
        layout: { defaultBorder: false },
    }
}

// ============================================================
// PAGINAS (una por seccion visual, en el orden del dashboard)
// ============================================================

// 1. Portada + cuota de mercado
function paginaCuota(statsMat, statsBeo) {
    const totalGlobal = statsMat.totalVentas + statsBeo.totalVentas
    const cuotaMat = pct(statsMat.totalVentas, totalGlobal)
    const cuotaBeo = pct(statsBeo.totalVentas, totalGlobal)

    const lado = (nombre, cuota, stats) => [
        { text: "CUOTA DE MERCADO", color: BLANCO, bold: true, fontSize: 10, alignment: "center" },
        { text: cuota + "%", color: BLANCO, bold: true, fontSize: 54, alignment: "center", margin: [0, 4, 0, 4] },
        { text: "preferencia del consumidor", color: BLANCO, fontSize: 9, alignment: "center", margin: [0, 0, 0, 14] },
        {
            columns: [
                {
                    stack: [
                        { text: "SUCURSALES", color: BLANCO, fontSize: 8, alignment: "center" },
                        { text: String(stats.numSucursales), color: BLANCO, bold: true, fontSize: 22, alignment: "center" },
                    ],
                },
                {
                    stack: [
                        { text: "VENTA TOTAL", color: BLANCO, fontSize: 8, alignment: "center" },
                        { text: moneyM(stats.totalVentas), color: BLANCO, bold: true, fontSize: 22, alignment: "center" },
                    ],
                },
            ],
        },
    ]

    return [
        {
            text: "INFOGRAFIA COMPARATIVA · OPTICAS",
            fontSize: 18,
            bold: true,
            color: AZUL_MARINO,
            alignment: "center",
            margin: [0, 4, 0, 12],
        },
        tablaComparativa(lado("MATAMOROS", cuotaMat, statsMat), lado("VEOMAS", cuotaBeo, statsBeo)),
    ]
}

// 2. Tipos de productos
function paginaTiposProductos(statsMat, statsBeo) {
    const lado = (stats, alinDerecha) => [
        filaCategoria("CONVENCIONALES", stats.convencionales + " u", stats.pctConvencionales, BLANCO, alinDerecha),
        filaCategoria("LIMPIADORES", stats.limpiadores + " u", stats.pctLimpiadores, BLANCO, alinDerecha),
        filaCategoria("DIGITALES", stats.digitales + " u", stats.pctDigitales, BLANCO, alinDerecha),
    ]
    return [
        ...bannerComparativo("TIPOS DE PRODUCTOS", "Distribución por unidades vendidas", true),
        tablaComparativa(lado(statsMat, false), lado(statsBeo, true)),
    ]
}

// 3. Monto por categoria
function paginaMontoCategoria(statsMat, statsBeo) {
    const lado = (stats, alinDerecha) => [
        filaCategoria("CONVENCIONALES", moneyK(stats.montoConvencionales), stats.pctMontoConvencionales, BLANCO, alinDerecha),
        filaCategoria("LIMPIADORES", moneyK(stats.montoLimpiadores), stats.pctMontoLimpiadores, BLANCO, alinDerecha),
        filaCategoria("DIGITALES", moneyK(stats.montoDigitales), stats.pctMontoDigitales, BLANCO, alinDerecha),
    ]
    return [
        ...bannerComparativo("MONTO POR CATEGORÍA", "Distribución de venta por tipo de producto/servicio", true),
        tablaComparativa(lado(statsMat, false), lado(statsBeo, true)),
    ]
}

// 4. Distribucion del monto (dona -> tabla de porcentajes)
function paginaDistribucionMonto(statsMat, statsBeo) {
    const lado = (stats, alinDerecha) => {
        const filas = [
            ["Convencionales", moneyK(stats.montoConvencionales), stats.pctMontoConvencionales],
            ["Limpiadores", moneyK(stats.montoLimpiadores), stats.pctMontoLimpiadores],
            ["Digitales", moneyK(stats.montoDigitales), stats.pctMontoDigitales],
        ]
        return [
            { text: moneyK(stats.totalMonto), color: BLANCO, bold: true, fontSize: 24, alignment: "center", margin: [0, 0, 0, 2] },
            { text: "monto total", color: BLANCO, fontSize: 8, alignment: "center", margin: [0, 0, 0, 12] },
            {
                table: {
                    widths: ["*", "auto", "auto"],
                    body: filas.map((f) => [
                        { text: f[0], color: BLANCO, fontSize: 9, alignment: alinDerecha ? "right" : "left" },
                        { text: f[1], color: BLANCO, fontSize: 9 },
                        { text: f[2] + "%", color: BLANCO, bold: true, fontSize: 9, alignment: "right" },
                    ]),
                },
                layout: { defaultBorder: false },
            },
        ]
    }
    return [
        ...bannerComparativo("DISTRIBUCIÓN MONTO", "Participación de cada categoría en el monto total", true),
        tablaComparativa(lado(statsMat, false), lado(statsBeo, true)),
    ]
}

// 5. Top 15 sucursales por venta
function paginaTop15(dataMat, dataBeo) {
    const listaMat = top15(dataMat)
    const listaBeo = top15(dataBeo)
    const maxVenta = Math.max(
        Math.max(...listaMat.map((s) => num(s.VENTA_TOTAL_KPI)), 0),
        Math.max(...listaBeo.map((s) => num(s.VENTA_TOTAL_KPI)), 0),
    )

    const lado = (lista, alinDerecha) =>
        lista.map((s) => ({
            stack: [
                {
                    columns: [
                        {
                            text: alinDerecha ? moneyK(s.VENTA_TOTAL_KPI) + "  " + limpiarNombre(s) : limpiarNombre(s),
                            color: BLANCO,
                            bold: true,
                            fontSize: 8,
                            alignment: alinDerecha ? "right" : "left",
                        },
                        {
                            text: alinDerecha ? "" : moneyK(s.VENTA_TOTAL_KPI),
                            color: BLANCO,
                            fontSize: 8,
                            alignment: "right",
                        },
                    ],
                    margin: [0, 0, 0, 2],
                },
                barra(pct(num(s.VENTA_TOTAL_KPI), maxVenta), BLANCO, 240),
                { text: "", margin: [0, 0, 0, 4] },
            ],
        }))

    return [
        ...bannerComparativo("TOP 15 SUCURSALES POR VENTA", "Venta total acumulada (KPI)", true),
        tablaComparativa(lado(listaMat, false), lado(listaBeo, true)),
    ]
}

// 6. Venta vs Meta global
function paginaVentaVsMeta(dataMat, dataBeo) {
    const listaMat = sucursalesConMeta(dataMat).slice(0, 15)
    const listaBeo = sucursalesConMeta(dataBeo).slice(0, 15)
    const maxValor = Math.max(
        Math.max(...listaMat.map((s) => Math.max(num(s.META_GLOBAL), num(s.VENTA_TOTAL_KPI))), 0),
        Math.max(...listaBeo.map((s) => Math.max(num(s.META_GLOBAL), num(s.VENTA_TOTAL_KPI))), 0),
    )

    const lado = (lista, alinDerecha) =>
        lista.map((s) => {
            const cumpl = pct(num(s.VENTA_TOTAL_KPI), num(s.META_GLOBAL))
            return {
                stack: [
                    {
                        columns: [
                            { text: limpiarNombre(s), color: BLANCO, bold: true, fontSize: 8, alignment: alinDerecha ? "right" : "left" },
                            { text: cumpl + "%", color: BLANCO, fontSize: 8, alignment: alinDerecha ? "left" : "right" },
                        ],
                        margin: [0, 0, 0, 2],
                    },
                    // Meta (pista) y venta (relleno)
                    {
                        canvas: [
                            { type: "rect", x: 0, y: 0, w: 240, h: 8, r: 4, color: "#FFFFFF", fillOpacity: 0.3 },
                            {
                                type: "rect",
                                x: 0,
                                y: 0,
                                w: Math.max(1, (pct(num(s.VENTA_TOTAL_KPI), maxValor) / 100) * 240),
                                h: 8,
                                r: 4,
                                color: BLANCO,
                            },
                        ],
                    },
                    { text: "", margin: [0, 0, 0, 4] },
                ],
            }
        })

    return [
        ...bannerComparativo("VENTA VS META GLOBAL", "Sucursales con meta asignada, ordenadas por tamaño de meta", true),
        tablaComparativa(lado(listaMat, false), lado(listaBeo, true)),
    ]
}

// 7. Metas globales por categoria
function paginaMetasGlobales(statsMat, statsBeo) {
    const categorias = [
        ["Aros de sol", "metaArosSol"],
        ["Audiología", "metaAudiologia"],
        ["Convencionales", "metaConvencionales"],
        ["Credilentes", "metaCredilentes"],
        ["Digitales", "metaDigitales"],
        ["Lentes de contacto", "metaLentes"],
        ["Limpiadores", "metaLimpiadores"],
        ["Asistencia hogar", "metaAsisHogar"],
        ["Servicio completo", "metaServComp"],
        ["Servicio express", "metaServExpress"],
        ["Solución LC", "metaSolLC"],
    ]
    const lado = (stats, alinDerecha) => [
        {
            table: {
                widths: ["*", "auto"],
                body: categorias.map((c) => [
                    { text: c[0], color: BLANCO, fontSize: 9, alignment: alinDerecha ? "right" : "left" },
                    { text: money(stats[c[1]]), color: BLANCO, bold: true, fontSize: 9, alignment: "right" },
                ]),
            },
            layout: {
                defaultBorder: false,
                paddingTop: () => 3,
                paddingBottom: () => 3,
            },
        },
    ]
    return [
        ...bannerComparativo("METAS GLOBALES", "Meta acumulada por categoría", true),
        tablaComparativa(lado(statsMat, false), lado(statsBeo, true)),
    ]
}

// 8. Sobrecumplimiento
function paginaSobrecumplimiento(statsMat, statsBeo) {
    const lado = (stats) => [
        { text: "SOBRECUMPLIMIENTO", color: BLANCO, bold: true, fontSize: 11, alignment: "center" },
        {
            text: money(stats.sobreCumplimiento),
            color: BLANCO,
            bold: true,
            fontSize: 40,
            alignment: "center",
            margin: [0, 8, 0, 4],
        },
        { text: "monto por encima de la meta", color: BLANCO, fontSize: 9, alignment: "center" },
    ]
    return [
        ...bannerComparativo("SOBRECUMPLIMIENTO", "Venta acumulada por encima de la meta", true),
        tablaComparativa(lado(statsMat), lado(statsBeo)),
    ]
}

// 9. Resumen de sucursales que cumplieron por metrica (barras blancas)
function paginaMetricasCumplidas(dataMat, dataBeo) {
    const metricas = [
        ["Convencionales", "CANT_CONVENCIONALES", "META_CONVENCIONALES"],
        ["Digitales", "CANT_DIGITALES", "META_DIGITALES"],
        ["Limpiadores", "CANT_LIMPIADORES", "META_LIMPIADORES"],
        ["Aros de sol", "CANT_AROS_SOL", "META_AROS_SOL"],
        ["Credilentes", "CANT_CREDIMAS", "META_CREDIMAS"],
        ["Lentes de contacto", "CANT_LC", "META_LC"],
        ["Asistencia hogar", "CANT_ASIS_HOGAR", "META_ASIS_HOGAR"],
        ["Asistencia salud", "CANT_ASIS_SALUD", "META_ASIS_SALUD"],
        ["Servicio completo", "CANT_SERV_COMP", "META_SERV_COMP"],
        ["Servicio express", "CANT_SERV_EXPRESS", "META_SERV_EXPRESS"],
        ["Solucion LC", "CANT_SOL_LC", "META_SOL_LC"],
    ]

    const contar = (data, cantKey, metaKey) =>
        data.filter((s) => num(s[metaKey]) > 0 && num(s[cantKey]) >= num(s[metaKey])).length

    const resultados = metricas.map(([label, cantKey, metaKey]) => ({
        label,
        mat: contar(dataMat, cantKey, metaKey),
        beo: contar(dataBeo, cantKey, metaKey),
    }))
    const maximo = Math.max(...resultados.map((r) => Math.max(r.mat, r.beo)), 1)
    const totalMat = resultados.reduce((a, r) => a + r.mat, 0)
    const totalBeo = resultados.reduce((a, r) => a + r.beo, 0)

    const filas = resultados.map((r) => [
        {
            stack: [
                {
                    columns: [
                        { text: r.label, color: BLANCO, bold: true, fontSize: 8, alignment: "right" },
                        { text: String(r.mat), color: BLANCO, bold: true, fontSize: 9, width: 22, alignment: "right" },
                    ],
                    margin: [0, 0, 0, 2],
                },
                {
                    canvas: [
                        { type: "rect", x: 240 - Math.max(1, (r.mat / maximo) * 240), y: 0, w: Math.max(1, (r.mat / maximo) * 240), h: 8, r: 4, color: BLANCO },
                    ],
                },
            ],
            fillColor: ROJO,
            margin: [12, 8, 12, 8],
        },
        {
            stack: [
                {
                    columns: [
                        { text: String(r.beo), color: BLANCO, bold: true, fontSize: 9, width: 22 },
                        { text: r.label, color: BLANCO, bold: true, fontSize: 8 },
                    ],
                    margin: [0, 0, 0, 2],
                },
                {
                    canvas: [{ type: "rect", x: 0, y: 0, w: Math.max(1, (r.beo / maximo) * 240), h: 8, r: 4, color: BLANCO }],
                },
            ],
            fillColor: AZUL,
            margin: [12, 8, 12, 8],
        },
    ])

    return [
        ...bannerComparativo("SUCURSALES QUE CUMPLIERON", "Sucursales con meta asignada que alcanzaron o superaron el objetivo", true),
        tablaComparativa(
            [{ text: String(totalMat), color: BLANCO, bold: true, fontSize: 20, alignment: "center" }, { text: "cumplimientos", color: BLANCO, fontSize: 8, alignment: "center" }],
            [{ text: String(totalBeo), color: BLANCO, bold: true, fontSize: 20, alignment: "center" }, { text: "cumplimientos", color: BLANCO, fontSize: 8, alignment: "center" }],
        ),
        {
            table: { widths: ["50%", "50%"], body: filas },
            layout: { defaultBorder: false },
            margin: [0, 6, 0, 0],
        },
    ]
}

// 10-12. Cumplimiento por región (Matamoros, Veomas y combinado)
const REGIONES = [
    ["Chinandega", ["S010", "S030", "VM02"]],
    ["León", ["S025", "S058", "VM04"]],
    ["Madriz", ["S069"]],
    ["Nueva Segovia", ["S055", "S066", "VM17"]],
    ["Estelí", ["S005", "S062", "VM07"]],
    ["Jinotega", ["S070"]],
    ["Matagalpa", ["S006", "S032", "S050", "VM11", "VM27", "VM28"]],
    ["Managua", ["S002", "S003", "S004", "S012", "S015", "S016", "S027", "S033", "S036", "S038", "S039", "S045", "S046", "S057", "S061", "S065", "S067", "S074", "S077", "S079", "S024", "VM03", "VM05", "VM09", "VM18", "VM20", "VM21", "VM22", "VM29"]],
    ["Masaya", ["S009", "S051", "VM10"]],
    ["Granada", ["S008", "S072", "VM19"]],
    ["Carazo", ["S013", "S073", "VM12"]],
    ["Rivas", ["S011", "VM06"]],
    ["Boaco", ["S034", "S071", "VM13"]],
    ["Chontales", ["S007", "S029", "S078", "VM08"]],
    ["Río San Juan", ["S076"]],
    ["Caribe Norte", ["S020", "S040", "S052"]],
    ["Caribe Sur", ["S031", "S049", "S075"]],
]

function resumenCumplimientoRegion(data) {
    return REGIONES.map(([nombre, bodegas]) => {
        const items = data.filter((s) => bodegas.includes(String(s.BODEGA || "")))
        const venta = sumBy(items, "VENTA_TOTAL_KPI")
        const meta = sumBy(items, "META_GLOBAL")
        return { nombre, venta, meta, cumplimiento: pct(venta, meta), sucursales: items.length }
    })
}

function paginaCumplimientoRegion(data, cadena, color) {
    const regiones = resumenCumplimientoRegion(data)
    const filas = regiones.map((r) => [
        { text: r.nombre, color: GRIS_TEXTO, fontSize: 8 },
        { text: String(r.sucursales), color: GRIS_TEXTO, fontSize: 8, alignment: "center" },
        { text: moneyK(r.venta), color, bold: true, fontSize: 8, alignment: "right" },
        { text: moneyK(r.meta), color: GRIS_TEXTO, fontSize: 8, alignment: "right" },
        {
            stack: [
                { text: r.cumplimiento + "%", color, bold: true, fontSize: 8, alignment: "right", margin: [0, 0, 0, 2] },
                {
                    canvas: [
                        { type: "rect", x: 0, y: 0, w: 110, h: 6, r: 3, color: "#E5E7EB" },
                        { type: "rect", x: 0, y: 0, w: Math.min(110, (r.cumplimiento / 100) * 110), h: 6, r: 3, color },
                    ],
                },
            ],
        },
    ])

    // Generar mapa de cumplimiento por departamento
    const deptCumplimiento = {}
    deptCumplimiento["DEPARTAMENTO_CHINANDEGA"] = 0
    deptCumplimiento["DEPARTAMENTO_LEON"] = 0
    deptCumplimiento["DEPARTAMENTO_MADRIZ"] = 0
    deptCumplimiento["DEPARTAMENTO_NUEVA_SEGOVIA"] = 0
    deptCumplimiento["DEPARTAMENTO_ESTELI"] = 0
    deptCumplimiento["DEPARTAMENTO_JINOTEGA"] = 0
    deptCumplimiento["DEPARTAMENTO_MATAGALPA"] = 0
    deptCumplimiento["DEPARTAMENTO_MANAGUA"] = 0
    deptCumplimiento["DEPARTAMENTO_MASAYA"] = 0
    deptCumplimiento["DEPARTAMENTO_GRANADA"] = 0
    deptCumplimiento["DEPARTAMENTO_CARAZO"] = 0
    deptCumplimiento["DEPARTAMENTO_RIVAS"] = 0
    deptCumplimiento["DEPARTAMENTO_BOACO"] = 0
    deptCumplimiento["DEPARTAMENTO_CHONTALES"] = 0
    deptCumplimiento["DEPARTAMENTO_RIO_SAN_JUAN"] = 0
    deptCumplimiento["DEPARTAMENTO_RACCN"] = 0
    deptCumplimiento["DEPARTAMENTO_RACCS"] = 0

    // Calcular cumplimiento por departamento
    const deptData = {}
    data.forEach((s) => {
        const bodega = String(s.BODEGA || "")
        let dept = null
        for (const [key, value] of Object.entries(sucursalDepartamentoMetricas)) {
            if (bodega.includes(key) || key.includes(bodega)) {
                dept = value
                break
            }
        }
        if (!dept) {
            // Intentar por nombre de sucursal
            const nombre = String(s.NombreSucursal || "").toUpperCase()
            if (nombre.includes("MANAGUA") || nombre.includes("BOLONIA") || nombre.includes("METRO")) dept = "DEPARTAMENTO_MANAGUA"
            else if (nombre.includes("LEON")) dept = "DEPARTAMENTO_LEON"
            else if (nombre.includes("CHINANDEGA")) dept = "DEPARTAMENTO_CHINANDEGA"
            else if (nombre.includes("ESTELI")) dept = "DEPARTAMENTO_ESTELI"
            else if (nombre.includes("GRANADA")) dept = "DEPARTAMENTO_GRANADA"
            else if (nombre.includes("MASAYA")) dept = "DEPARTAMENTO_MASAYA"
            else if (nombre.includes("MATAGALPA")) dept = "DEPARTAMENTO_MATAGALPA"
            else if (nombre.includes("RIVAS")) dept = "DEPARTAMENTO_RIVAS"
            else if (nombre.includes("JINOTEPE") || nombre.includes("CARAZO")) dept = "DEPARTAMENTO_CARAZO"
            else if (nombre.includes("BOACO")) dept = "DEPARTAMENTO_BOACO"
            else if (nombre.includes("JUIGALPA") || nombre.includes("CHONTALES")) dept = "DEPARTAMENTO_CHONTALES"
            else if (nombre.includes("SIUNA") || nombre.includes("PUERTO CABEZAS")) dept = "DEPARTAMENTO_RACCN"
            else if (nombre.includes("BLUEFIELDS")) dept = "DEPARTAMENTO_RACCS"
        }
        if (dept && dept !== "SIN_MAPA") {
            if (!deptData[dept]) deptData[dept] = { venta: 0, meta: 0 }
            deptData[dept].venta += num(s.VENTA_TOTAL_KPI)
            deptData[dept].meta += num(s.META_GLOBAL)
        }
    })

    Object.keys(deptData).forEach((dept) => {
        deptCumplimiento[dept] = deptData[dept].meta > 0 ? Math.round((deptData[dept].venta / deptData[dept].meta) * 100) : 0
    })

    // Generar SVG del mapa con colores por cumplimiento
    const fs = require("fs")
    const path = require("path")
    let svg = fs.readFileSync(path.join(__dirname, "NI.svg"), "utf8")

    const maxCump = Math.max(...Object.values(deptCumplimiento), 1)
    const getColorCumplimiento = (pct) => {
        if (pct === 0) return COLOR_SIN
        if (pct >= 100) return "#fadbdd"
        if (pct >= 80) return "#f19da1"
        if (pct >= 60) return "#e75a61"
        if (pct >= 40) return "#d61f28"
        return "#98161c"
    }

    Object.entries(deptCumplimiento).forEach(([deptId, cumplimiento]) => {
        const color = getColorCumplimiento(cumplimiento)
        const regexGrupo = new RegExp(`<g([^>]*)id="${deptId}"([^>]*)>([\\s\\S]*?)</g>`, "i")
        if (regexGrupo.test(svg)) {
            svg = svg.replace(regexGrupo, (match, antes, despues, contenido) => {
                contenido = contenido.replace(/<(path|polygon|rect|circle)([^>]*)\/?>/gi, (tag, tipo, atributos) => {
                    atributos = atributos.replace(/class="[^"]*"/g, "").replace(/fill="[^"]*"/g, "").replace(/stroke="[^"]*"/g, "").replace(/\/$/, "").trim()
                    return `<${tipo} ${atributos} fill="${color}" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>`
                })
                return `<g id="${deptId}">${contenido}</g>`
            })
        }
    })

    // Leyenda de colores
    const leyendaColor = [
        { color: "#98161c", label: "<40%" },
        { color: "#d61f28", label: "40-59%" },
        { color: "#e75a61", label: "60-79%" },
        { color: "#f19da1", label: "80-99%" },
        { color: "#fadbdd", label: "100%+" },
        { color: COLOR_SIN, label: "Sin datos" },
    ]

    return [
        ...bannerComparativo("CUMPLIMIENTO POR DEPARTAMENTO", "Venta sobre meta por departamento"),
        {
            columns: [
                {
                    width: "50%",
                    stack: [
                        { text: "MATAMOROS", bold: true, fontSize: 11, color: ROJO, alignment: "center", margin: [0, 0, 0, 6] },
                        { svg: svg, fit: [320, 220], alignment: "center" },
                        {
                            columns: leyendaColor.map((l) => ({
                                width: "auto",
                                stack: [
                                    { canvas: [{ type: "rect", x: 0, y: 0, w: 12, h: 8, color: l.color }], margin: [2, 0, 2, 0] },
                                    { text: l.label, fontSize: 6, color: GRIS_TEXTO, alignment: "center" },
                                ],
                            })),
                            margin: [0, 6, 0, 0],
                        },
                    ],
                },
                {
                    width: "50%",
                    stack: [
                        { text: "VEOMAS", bold: true, fontSize: 11, color: AZUL, alignment: "center", margin: [0, 0, 0, 6] },
                        { svg: svg, fit: [320, 220], alignment: "center" },
                        {
                            columns: leyendaColor.map((l) => ({
                                width: "auto",
                                stack: [
                                    { canvas: [{ type: "rect", x: 0, y: 0, w: 12, h: 8, color: l.color }], margin: [2, 0, 2, 0] },
                                    { text: l.label, fontSize: 6, color: GRIS_TEXTO, alignment: "center" },
                                ],
                            })),
                            margin: [0, 6, 0, 0],
                        },
                    ],
                },
            ],
        },
        {
            table: {
                widths: ["*", "auto", "auto", "auto", 80, 80],
                body: [
                    [
                        { text: "REGIÓN", color: BLANCO, bold: true, fontSize: 7, fillColor: AZUL_MARINO },
                        { text: "SUC", color: BLANCO, bold: true, fontSize: 7, fillColor: AZUL_MARINO, alignment: "center" },
                        { text: "MAT", color: BLANCO, bold: true, fontSize: 7, fillColor: ROJO, alignment: "center" },
                        { text: "BEO", color: BLANCO, bold: true, fontSize: 7, fillColor: AZUL, alignment: "center" },
                        { text: "CUMP MAT", color: BLANCO, bold: true, fontSize: 7, fillColor: ROJO, alignment: "right" },
                        { text: "CUMP BEO", color: BLANCO, bold: true, fontSize: 7, fillColor: AZUL, alignment: "right" },
                    ],
                    ...regiones.map((r, i) => [
                        { text: r.nombre, color: GRIS_TEXTO, fontSize: 7 },
                        { text: String(r.sucursales), color: GRIS_TEXTO, fontSize: 7, alignment: "center" },
                        { text: moneyK(r.venta), color: ROJO, bold: true, fontSize: 7, alignment: "right" },
                        { text: moneyK(r.venta), color: AZUL, bold: true, fontSize: 7, alignment: "right" },
                        { text: r.cumplimiento + "%", color: ROJO, bold: true, fontSize: 7, alignment: "right" },
                        { text: r.cumplimiento + "%", color: AZUL, bold: true, fontSize: 7, alignment: "right" },
                    ]),
                ],
            },
            layout: {
                defaultBorder: false,
                paddingTop: () => 3,
                paddingBottom: () => 3,
                paddingLeft: () => 5,
                paddingRight: () => 5,
                fillColor: (rowIndex) => (rowIndex > 0 && rowIndex % 2 === 0 ? "#F3F4F6" : null),
            },
            margin: [0, 10, 0, 0],
        },
    ]
}

    // Version comparativa: mitad MATAMOROS (izquierda/rojo) y mitad VEOMAS (derecha/azul)
function paginaCumplimientoRegionComparativo(dataMat, dataBeo) {
    // Mapeo completo de bodega/nombre a departamento
    const getDeptoFromData = (s) => {
        const bodega = String(s.BODEGA || "").toUpperCase()
        const nombre = String(s.NombreSucursal || "").toUpperCase()

        // Primero intentar por bodega completa
        const fullMatch = Object.entries(sucursalDepartamentoMetricas).find(([key]) =>
            bodega === key.toUpperCase()
        )
        if (fullMatch) return fullMatch[1]

        // Por nombre de sucursal
        const nomMatch = Object.entries(sucursalDepartamentoMetricas).find(([key]) =>
            nombre.includes(key.toUpperCase()) || key.toUpperCase().includes(nombre)
        )
        if (nomMatch) return nomMatch[1]

        // Fallback por keywords
        if (nombre.includes("MANAGUA") || nombre.includes("BOLONIA") || nombre.includes("METRO") ||
            nombre.includes("CARRETERA") || nombre.includes("LINDA VISTA") || nombre.includes("BELLO HORIZONTE") ||
            nombre.includes("ALTAMIRA") || nombre.includes("LA SABANA") || nombre.includes("ZUMEN") ||
            bodega.startsWith("VM") && (bodega.includes("PLAZA") || bodega.includes("MAYOREO") || bodega.includes("IVAN")))
            return "DEPARTAMENTO_MANAGUA"
        if (nombre.includes("LEON") || bodega.includes("LEON")) return "DEPARTAMENTO_LEON"
        if (nombre.includes("CHINANDEGA") || bodega.includes("CHINANDEGA")) return "DEPARTAMENTO_CHINANDEGA"
        if (nombre.includes("ESTELI") || bodega.includes("ESTELI")) return "DEPARTAMENTO_ESTELI"
        if (nombre.includes("GRANADA") || bodega.includes("GRANADA")) return "DEPARTAMENTO_GRANADA"
        if (nombre.includes("MASAYA") || bodega.includes("MASAYA")) return "DEPARTAMENTO_MASAYA"
        if (nombre.includes("MATAGALPA") || bodega.includes("MATAGALPA") || bodega.includes("MATIGUAS") || bodega.includes("RIOBLANCO"))
            return "DEPARTAMENTO_MATAGALPA"
        if (nombre.includes("RIVAS") || bodega.includes("RIVAS")) return "DEPARTAMENTO_RIVAS"
        if (nombre.includes("JINOTEPE") || nombre.includes("CARAZO") || bodega.includes("JINOTEPE"))
            return "DEPARTAMENTO_CARAZO"
        if (nombre.includes("BOACO") || bodega.includes("BOACO")) return "DEPARTAMENTO_BOACO"
        if (nombre.includes("JUIGALPA") || nombre.includes("CHONTALES") || bodega.includes("JUIGALPA"))
            return "DEPARTAMENTO_CHONTALES"
        if (nombre.includes("SIUNA") || nombre.includes("PUERTO CABEZAS") || bodega.includes("SIUNA"))
            return "DEPARTAMENTO_RACCN"
        if (nombre.includes("BLUEFIELDS") || bodega.includes("BLUEFIELDS")) return "DEPARTAMENTO_RACCS"
        if (nombre.includes("OCOTAL") || bodega.includes("OCOTAL")) return "DEPARTAMENTO_NUEVA_SEGOVIA"

        return null
    }

    // Generar mapa para cada cadena
    const generarMapaCumplimiento = (data, colorBase) => {
        const fs = require("fs")
        const path = require("path")
        let svg = fs.readFileSync(path.join(__dirname, "NI.svg"), "utf8")

        const deptCumplimiento = {}
        const deptData = {}

        data.forEach((s) => {
            const dept = getDeptoFromData(s)
            if (dept && dept !== "SIN_MAPA") {
                if (!deptData[dept]) deptData[dept] = { venta: 0, meta: 0 }
                deptData[dept].venta += num(s.VENTA_TOTAL_KPI)
                deptData[dept].meta += num(s.META_GLOBAL)
            }
        })

        // Inicializar todos los departamentos
        Object.entries({
            "DEPARTAMENTO_CHINANDEGA": 1, "DEPARTAMENTO_LEON": 1, "DEPARTAMENTO_MADRIZ": 1,
            "DEPARTAMENTO_NUEVA_SEGOVIA": 1, "DEPARTAMENTO_ESTELI": 1, "DEPARTAMENTO_JINOTEGA": 1,
            "DEPARTAMENTO_MATAGALPA": 1, "DEPARTAMENTO_MANAGUA": 1, "DEPARTAMENTO_MASAYA": 1,
            "DEPARTAMENTO_GRANADA": 1, "DEPARTAMENTO_CARAZO": 1, "DEPARTAMENTO_RIVAS": 1,
            "DEPARTAMENTO_BOACO": 1, "DEPARTAMENTO_CHONTALES": 1, "DEPARTAMENTO_RIO_SAN_JUAN": 1,
            "DEPARTAMENTO_RACCN": 1, "DEPARTAMENTO_RACCS": 1,
        }).forEach(([k]) => (deptCumplimiento[k] = 0))

        Object.keys(deptData).forEach((dept) => {
            deptCumplimiento[dept] = deptData[dept].meta > 0 ? Math.round((deptData[dept].venta / deptData[dept].meta) * 100) : 0
        })

        Object.keys(deptData).forEach((dept) => {
            deptCumplimiento[dept] = deptData[dept].meta > 0 ? Math.round((deptData[dept].venta / deptData[dept].meta) * 100) : 0
        })

        const getColorCumplimientoLocal = (pct) => {
            if (pct === 0) return COLOR_SIN
            if (pct >= 100) return colorBase === ROJO ? "#fadbdd" : "#b3d9ff"
            if (pct >= 80) return colorBase === ROJO ? "#f19da1" : "#87ceeb"
            if (pct >= 60) return colorBase === ROJO ? "#e75a61" : "#1e90ff"
            if (pct >= 40) return colorBase === ROJO ? "#d61f28" : "#005bbb"
            return colorBase === ROJO ? "#98161c" : "#003366"
        }

        Object.entries(deptCumplimiento).forEach(([deptId, cumplimiento]) => {
            const color = getColorCumplimientoLocal(cumplimiento)

            // Buscar y reemplazar en <g> tags
            const regexGrupo = new RegExp(`<g([^>]*)id="${deptId}"([^>]*)>([\\s\\S]*?)</g>`, "i")
            if (regexGrupo.test(svg)) {
                svg = svg.replace(regexGrupo, (match, antes, despues, contenido) => {
                    contenido = contenido.replace(/<(path|polygon|rect|circle)([^>]*)\/?>/gi, (tag, tipo, atributos) => {
                        atributos = atributos.replace(/class="[^"]*"/g, "").replace(/fill="[^"]*"/g, "").replace(/stroke="[^"]*"/g, "").replace(/\/$/, "").trim()
                        return `<${tipo} ${atributos} fill="${color}" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>`
                    })
                    return `<g id="${deptId}">${contenido}</g>`
                })
            }

            // Buscar y reemplazar en <path> tags solos
            const regexPath = new RegExp(`<path([^>]*)id="${deptId}"([^>]*)/>`, "i")
            if (regexPath.test(svg)) {
                svg = svg.replace(regexPath, (match, antes, despues) => {
                    let atributos = (antes + despues)
                        .replace(/class="[^"]*"/g, "")
                        .replace(/fill="[^"]*"/g, "")
                        .replace(/stroke="[^"]*"/g, "")
                        .replace(/\/$/, "")
                        .trim()
                    return `<path id="${deptId}" ${atributos} fill="${color}" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>`
                })
            }
        })

        return svg
    }

    const svgMat = generarMapaCumplimiento(dataMat, ROJO)
    const svgBeo = generarMapaCumplimiento(dataBeo, AZUL)

    const leyendaColorMat = [
        { color: "#98161c", label: "<40%" },
        { color: "#d61f28", label: "40-59%" },
        { color: "#e75a61", label: "60-79%" },
        { color: "#f19da1", label: "80-99%" },
        { color: "#fadbdd", label: "100%+" },
        { color: COLOR_SIN, label: "Sin datos" },
    ]

    const leyendaColorBeo = [
        { color: "#003366", label: "<40%" },
        { color: "#005bbb", label: "40-59%" },
        { color: "#1e90ff", label: "60-79%" },
        { color: "#87ceeb", label: "80-99%" },
        { color: "#b3d9ff", label: "100%+" },
        { color: COLOR_SIN, label: "Sin datos" },
    ]

    // Generar filas combinadas para ambas cadenas
    const regionesMat = resumenCumplimientoRegion(dataMat)
    const regionesBeo = resumenCumplimientoRegion(dataBeo)

    // Combinar datos
    const combined = {}
    regionesMat.forEach((r) => {
        combined[r.nombre] = { mat: r, beo: null }
    })
    regionesBeo.forEach((r) => {
        if (combined[r.nombre]) combined[r.nombre].beo = r
        else combined[r.nombre] = { mat: null, beo: r }
    })

    const filas = Object.entries(combined).map(([nombre, data]) => {
        const mat = data.mat || { sucursales: 0, venta: 0, meta: 0, cumplimiento: 0 }
        const beo = data.beo || { sucursales: 0, venta: 0, meta: 0, cumplimiento: 0 }
        return [
            { text: nombre, color: GRIS_TEXTO, fontSize: 7 },
            { text: String(mat.sucursales + beo.sucursales), color: GRIS_TEXTO, fontSize: 7, alignment: "center" },
            { text: moneyK(mat.venta), color: ROJO, bold: true, fontSize: 7, alignment: "right" },
            { text: moneyK(beo.venta), color: AZUL, bold: true, fontSize: 7, alignment: "right" },
            { text: mat.cumplimiento + "%", color: ROJO, bold: true, fontSize: 7, alignment: "right" },
            { text: beo.cumplimiento + "%", color: AZUL, bold: true, fontSize: 7, alignment: "right" },
        ]
    })

    return [
        ...bannerComparativo("CUMPLIMIENTO POR DEPARTAMENTO", "Venta sobre meta"),
        {
            columns: [
                {
                    width: "50%",
                    stack: [
                        { text: "MATAMOROS", bold: true, fontSize: 12, color: ROJO, alignment: "center", margin: [0, 0, 0, 6] },
                        { svg: svgMat, fit: [340, 240], alignment: "center" },
                        {
                            columns: leyendaColorMat.map((l) => ({
                                width: "auto",
                                stack: [
                                    { canvas: [{ type: "rect", x: 0, y: 0, w: 10, h: 6, color: l.color }], margin: [1, 0, 1, 0] },
                                    { text: l.label, fontSize: 5, color: GRIS_TEXTO, alignment: "center" },
                                ],
                            })),
                            margin: [0, 4, 0, 0],
                        },
                    ],
                },
                {
                    width: "50%",
                    stack: [
                        { text: "VEOMAS", bold: true, fontSize: 12, color: AZUL, alignment: "center", margin: [0, 0, 0, 6] },
                        { svg: svgBeo, fit: [340, 240], alignment: "center" },
                        {
                            columns: leyendaColorBeo.map((l) => ({
                                width: "auto",
                                stack: [
                                    { canvas: [{ type: "rect", x: 0, y: 0, w: 10, h: 6, color: l.color }], margin: [1, 0, 1, 0] },
                                    { text: l.label, fontSize: 5, color: GRIS_TEXTO, alignment: "center" },
                                ],
                            })),
                            margin: [0, 4, 0, 0],
                        },
                    ],
                },
            ],
        },
        {
            table: {
                widths: ["*", "auto", "auto", "auto", 60, 60],
                body: [
                    [
                        { text: "REGIÓN", color: BLANCO, bold: true, fontSize: 7, fillColor: AZUL_MARINO },
                        { text: "SUC", color: BLANCO, bold: true, fontSize: 7, fillColor: AZUL_MARINO, alignment: "center" },
                        { text: "MAT", color: BLANCO, bold: true, fontSize: 7, fillColor: ROJO, alignment: "center" },
                        { text: "BEO", color: BLANCO, bold: true, fontSize: 7, fillColor: AZUL, alignment: "center" },
                        { text: "CMP MAT", color: BLANCO, bold: true, fontSize: 7, fillColor: ROJO, alignment: "right" },
                        { text: "CMP BEO", color: BLANCO, bold: true, fontSize: 7, fillColor: AZUL, alignment: "right" },
                    ],
                    ...filas,
                ],
            },
            layout: {
                defaultBorder: false,
                paddingTop: () => 3,
                paddingBottom: () => 3,
                paddingLeft: () => 5,
                paddingRight: () => 5,
                fillColor: (rowIndex) => (rowIndex > 0 && rowIndex % 2 === 0 ? "#F3F4F6" : null),
            },
            margin: [0, 10, 0, 0],
        },
    ]
}

// 13. Participacion por departamento (mapa + tabla)
function paginaParticipacionDepartamento(dataMat, dataBeo) {
    const norm = (t) =>
        String(t || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()

    const departamentos = [
        "Chinandega", "León", "Madriz", "Nueva Segovia", "Estelí", "Jinotega",
        "Matagalpa", "Managua", "Masaya", "Granada", "Carazo", "Rivas",
        "Boaco", "Chontales", "Río San Juan", "Caribe Norte", "Caribe Sur",
    ]

    const ventaPorDep = (data) => {
        const acc = {}
        departamentos.forEach((d) => (acc[norm(d)] = 0))
        data.forEach((s) => {
            const key = norm(s.NombreSucursal)
            const match = departamentos.find((d) => key.includes(norm(d)))
            if (match) acc[norm(match)] += num(s.VENTA_TOTAL_KPI)
        })
        return acc
    }

    const ventaMat = ventaPorDep(dataMat)
    const ventaBeo = ventaPorDep(dataBeo)

    // Generar mapas SVG con colores según venta
    const generarMapaSvg = (ventaPorDep, colorBase) => {
        const fs = require("fs")
        const path = require("path")
        let svg = fs.readFileSync(path.join(__dirname, "NI.svg"), "utf8")

        const deptMap = {
            "CHINANDEGA": "DEPARTAMENTO_CHINANDEGA",
            "LEÓN": "DEPARTAMENTO_LEON",
            "MADRIZ": "DEPARTAMENTO_MADRIZ",
            "NUEVA SEGOVIA": "DEPARTAMENTO_NUEVA_SEGOVIA",
            "ESTELÍ": "DEPARTAMENTO_ESTELI",
            "JINOTEGA": "DEPARTAMENTO_JINOTEGA",
            "MATAGALPA": "DEPARTAMENTO_MATAGALPA",
            "MANAGUA": "DEPARTAMENTO_MANAGUA",
            "MASAYA": "DEPARTAMENTO_MASAYA",
            "GRANADA": "DEPARTAMENTO_GRANADA",
            "CARAZO": "DEPARTAMENTO_CARAZO",
            "RIVAS": "DEPARTAMENTO_RIVAS",
            "BOACO": "DEPARTAMENTO_BOACO",
            "CHONTALES": "DEPARTAMENTO_CHONTALES",
            "RÍO SAN JUAN": "DEPARTAMENTO_RIO_SAN_JUAN",
            "CARIBE NORTE": "DEPARTAMENTO_RACCN",
            "CARIBE SUR": "DEPARTAMENTO_RACCS",
        }

        const maxVenta = Math.max(...Object.values(ventaPorDep), 1)

        Object.entries(ventaPorDep).forEach(([dept, venta]) => {
            const deptId = deptMap[dept]
            if (!deptId) return

            const pct = (venta / maxVenta) * 100
            let color = COLOR_SIN
            if (venta > 0) {
                if (pct >= 75) color = colorBase
                else if (pct >= 50) color = colorBase + "AA"
                else if (pct >= 25) color = colorBase + "77"
                else color = colorBase + "44"
            }

            const regexGrupo = new RegExp(`<g([^>]*)id="${deptId}"([^>]*)>([\\s\\S]*?)</g>`, "i")
            if (regexGrupo.test(svg)) {
                svg = svg.replace(regexGrupo, (match, antes, despues, contenido) => {
                    contenido = contenido.replace(/<(path|polygon|rect|circle)([^>]*)\/?>/gi, (tag, tipo, atributos) => {
                        atributos = atributos.replace(/class="[^"]*"/g, "").replace(/fill="[^"]*"/g, "").replace(/stroke="[^"]*"/g, "").replace(/\/$/, "").trim()
                        return `<${tipo} ${atributos} fill="${color}" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>`
                    })
                    return `<g id="${deptId}">${contenido}</g>`
                })
            }
        })

        return svg
    }

    const svgMat = generarMapaSvg(ventaMat, ROJO)
    const svgBeo = generarMapaSvg(ventaBeo, AZUL)

    const body = [
        [
            { text: "DEPARTAMENTO", bold: true, fontSize: 8, color: BLANCO, fillColor: AZUL_MARINO },
            { text: "MATAMOROS", bold: true, fontSize: 8, color: BLANCO, fillColor: ROJO, alignment: "right" },
            { text: "VEOMAS", bold: true, fontSize: 8, color: BLANCO, fillColor: AZUL, alignment: "right" },
            { text: "LÍDER", bold: true, fontSize: 8, color: BLANCO, fillColor: AZUL_MARINO, alignment: "center" },
        ],
    ]
    departamentos.forEach((d) => {
        const m = ventaMat[norm(d)] || 0
        const b = ventaBeo[norm(d)] || 0
        const lider = m === 0 && b === 0 ? "-" : m >= b ? "MAT" : "BEO"
        body.push([
            { text: d, fontSize: 8, color: GRIS_TEXTO },
            { text: moneyK(m), fontSize: 8, color: ROJO, alignment: "right", bold: true },
            { text: moneyK(b), fontSize: 8, color: AZUL, alignment: "right", bold: true },
            { text: lider, fontSize: 8, alignment: "center", color: lider === "MAT" ? ROJO : lider === "BEO" ? AZUL : GRIS_TEXTO, bold: true },
        ])
    })

    return [
        ...bannerComparativo("PARTICIPACIÓN POR DEPARTAMENTO", "Venta combinada por departamento (no por municipio)", true),
        {
            columns: [
                {
                    width: "50%",
                    stack: [
                        { text: "MATAMOROS", bold: true, fontSize: 10, color: ROJO, alignment: "center", margin: [0, 0, 0, 4] },
                        { svg: svgMat, fit: [350, 250], alignment: "center" },
                    ],
                },
                {
                    width: "50%",
                    stack: [
                        { text: "VEOMAS", bold: true, fontSize: 10, color: AZUL, alignment: "center", margin: [0, 0, 0, 4] },
                        { svg: svgBeo, fit: [350, 250], alignment: "center" },
                    ],
                },
            ],
            margin: [0, 0, 0, 10],
        },
        {
            table: { widths: ["*", "auto", "auto", "auto"], body },
            layout: {
                defaultBorder: false,
                paddingTop: () => 4,
                paddingBottom: () => 4,
                paddingLeft: () => 8,
                paddingRight: () => 8,
                fillColor: (rowIndex) => (rowIndex > 0 && rowIndex % 2 === 0 ? "#F3F4F6" : null),
            },
        },
    ]
}

// ============================================================
// FUNCION PRINCIPAL (para conectar a la API)
// ============================================================
function generarInfografia(dataMat, dataBeo) {
    const mat = Array.isArray(dataMat) ? dataMat : []
    const beo = Array.isArray(dataBeo) ? dataBeo : []

    const statsMat = calcStats(mat)
    const statsBeo = calcStats(beo)

    return {
        pageSize: "A3",
        // pageOrientation: "landscape",
        pageMargins: [20, 20, 20, 24],
        defaultStyle: { fontSize: 9, color: GRIS_TEXTO },
        footer: (currentPage, pageCount) => ({
            columns: [
                { text: "Infografía comparativa · Ópticas", fontSize: 7, color: GRIS_TEXTO, margin: [24, 0, 0, 0] },
                { text: currentPage + " / " + pageCount, fontSize: 7, color: GRIS_TEXTO, alignment: "right", margin: [0, 0, 24, 0] },
            ],
        }),
        content: [
            ...paginaCuota(statsMat, statsBeo),
            ...paginaTiposProductos(statsMat, statsBeo),
            ...paginaMontoCategoria(statsMat, statsBeo),
            ...paginaDistribucionMonto(statsMat, statsBeo),
            ...paginaTop15(mat, beo),
            ...paginaVentaVsMeta(mat, beo),
            ...paginaMetasGlobales(statsMat, statsBeo),
            ...paginaSobrecumplimiento(statsMat, statsBeo),
            ...paginaMetricasCumplidas(mat, beo),
            ...paginaCumplimientoRegionComparativo(mat, beo),
            ...paginaParticipacionDepartamento(mat, beo),
        ],
    }
}

module.exports = {
    generarInfografia,
    // se exportan tambien las utilidades por si la API las necesita
    calcStats,
    top15,
    sucursalesConMeta,
}
