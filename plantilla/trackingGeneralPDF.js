const getIniciales = (nombreEstacion) => {
    if (!nombreEstacion) return '';
    const palabras = nombreEstacion.split(/[\s-]+/);
    return palabras.map(p => p[0].toUpperCase()).join('');
};

const nvl = (val) => val == null ? '' : val;

const getOmologo = (estacion) => {
    switch (estacion) {
        case 'ORDENES GENERADAS EN SUCURSAL':
            return 'GEN. SUC.';
        default:
            return estacion;
    }
};

const getFillColorByEstado = (estado) => {
    let estadoStr = String(estado).toUpperCase();
    if (estadoStr === 'PENDIENTE') return '#d3d3d3';
    if (estadoStr === 'COMPLETADO') return '#4c9f38';
    if (estadoStr === 'NO REGISTRADA') return '#c5192d';
    if (estadoStr === 'OMITIDA POR SURTIDO EN SUCURSAL') return '#fcc30b';
    if (estadoStr === 'OMITIDA POR PATRON') return '#fcc30b';
    if (estadoStr === 'PATRON NO REGISTRADO') return '#fd6925';
    if (estadoStr.includes('OMITIDA POR SURTIDO EN BODEGA')) return '#fcc30b';
    if (estadoStr.includes('COMPLETADO (PATRON NO REGISTRADO)')) return '#dd1367';
    if (estadoStr === 'FALSO POSITIVO') return '#cce5ff';
    return '#f3f3f3';
};

const construirDataTracking = (rows) => {
    if (!rows || rows.length === 0) return [];

    const ordenes = {};

    rows.forEach(r => {
        if (!ordenes[r.id_orden]) {
            ordenes[r.id_orden] = {
                id_orden: r.id_orden,
                num_orden: r.num_orden,
                id_cliente: r.id_cliente,
                cliente: r.nombre,
                ruc: r.ruc,
                express: r.EXPRESS,
                aro_propio: r.ARO_PROPIO,
                tipo_orden: r.TIPO_ORDEN,
                num_caja: r.num_caja,
                color: r.COLOR,
                estado: r.estado_orden,
                tipo_surtido: r.TIPO_SURTIDO,
                tracking: []
            };
        }

        ordenes[r.id_orden].tracking.push({
            orden_logico: nvl(r.orden_logico),
            estacion: getOmologo(r.NOMBRE_FINAL),
            fecha: nvl(r.fecha_entrada),
            hora: nvl(r.hora_entrada),
            usuario: nvl(r.name_usr),
            patron: nvl(r.nombre_patron),
            estado: r.estado_estacion,
        });
    });

    return Object.values(ordenes);
};

const construirColumnasPorEstacion = (tracking) => {
    return tracking.map(t => {
        const fillColor = getFillColorByEstado(t.estado);

        return {
            table: {
                widths: ['*', '*', '*', '*', '*', '*'],
                body: [
                    [
                        { text: nvl(t.orden_logico), alignment: 'center', fillColor, colSpan: 6 },
                        {}, {}, {}, {}, {}
                    ],
                    [
                        { text: nvl(t.estacion), alignment: 'center', fillColor, colSpan: 6 },
                        {}, {}, {}, {}, {}
                    ],
                    [
                        { text: nvl(t.fecha), alignment: 'center', fillColor, colSpan: 6 },
                        {}, {}, {}, {}, {}
                    ],
                    [
                        { text: nvl(t.hora), alignment: 'center', fillColor, colSpan: 6 },
                        {}, {}, {}, {}, {}
                    ],
                    [
                        { text: nvl(t.usuario), alignment: 'center', fillColor, colSpan: 6 },
                        {}, {}, {}, {}, {}
                    ]
                ]
            },
            margin: [0, 0, 0, 0]
        };
    });
};

const getCellColors = (key, value) => {
    const cajaColors = {
        'NEGRO': '#000000',
        'ROJO': '#c5192d',
        'VERDE': '#4c9f38',
        'AMARILLO': '#fcc30b',
        'ROSADO': '#dd1367',
        'CREMA': '#c9b6a5',
        'BLANCO': '#f5f5dc',
    };

    const esquemaColors = {
        '10': '#204997',
        '40': '#aa0003'
    };

    switch (key) {
        case 'orden':
            return {
                fillColor: (String(value.express).toUpperCase() === 'SI' || value.express === true)
                    ? '#fcc30b'
                    : '#006666',
                color: '#000000',
                bold: true,
                alignment: 'center'
            };
        case 'caja':
            return {
                fillColor: cajaColors[value.color] ?? '#999999',
                color: '#ffffff',
                bold: true,
                alignment: 'center'
            };
        case 'id_cliente':
            return {
                fillColor: esquemaColors[value.id_cliente] ?? '#006666',
                color: '#ffffff',
                bold: true,
                alignment: 'center'
            };
        default:
            return {};
    }
};

/**
 * Construye el resumen de efectividad por estación
 * agrupando todas las órdenes.
 */
const construirResumenEstaciones = (rows) => {

    const estaciones = {};

    rows.forEach(r => {

        const id_estacion = Number(r.ID_ESTACION ?? 999999);
        const estacion = `${id_estacion} ${getOmologo(r.NOMBRE_FINAL)}`;

        // Crear agrupación
        if (!estaciones[estacion]) {

            estaciones[estacion] = {
                estacion,
                id_estacion,

                total: 0,
                completado: 0,
                pendiente: 0,
                noRegistrada: 0,
                omitida: 0,
                falsoPositivo: 0
            };
        }

        const estado = String(
            r.estado_estacion || ''
        ).toUpperCase();

        estaciones[estacion].total++;

        switch (estado) {

            case 'COMPLETADO':
                estaciones[estacion].completado++;
                break;

            case 'PENDIENTE':
                estaciones[estacion].pendiente++;
                break;

            case 'NO REGISTRADA':
                estaciones[estacion].noRegistrada++;
                break;

            case 'FALSO POSITIVO':
                estaciones[estacion].falsoPositivo++;
                break;

            default:
                if (estado.includes('OMITIDA')) {
                    estaciones[estacion].omitida++;
                }
                break;
        }
    });

    return Object.values(estaciones)
        .map(e => {

            const baseCalculo = Math.max(
                0,
                e.total - e.omitida
            );

            return {
                ...e,

                efectividad:
                    baseCalculo > 0
                        ? (e.completado * 100) / baseCalculo
                        : 0,

                pendientePorcentaje:
                    baseCalculo > 0
                        ? (e.pendiente * 100) / baseCalculo
                        : 0
            };
        })

        // Ordenar por ID_ESTACION
        .sort((a, b) => a.id_estacion - b.id_estacion);
};

const getColorEfectividad = (valor) => {

    if (valor >= 95)
        return '#4c9f38'; // Verde

    if (valor >= 80)
        return '#fcc30b'; // Amarillo

    return '#c5192d'; // Rojo
};


const buildPdfDD = (data) => {
    const dat = construirDataTracking(data.lista[1]);

    // Resumen de estaciones
    const resumenEstaciones =
        construirResumenEstaciones(data.lista[1]);

    // Totales generales
    const totalGeneral = resumenEstaciones.reduce(
        (a, b) => ({
            total: a.total + b.total,
            completado: a.completado + b.completado,
            pendiente: a.pendiente + b.pendiente,
            noRegistrada: a.noRegistrada + b.noRegistrada,
            omitida: a.omitida + b.omitida
        }),
        {
            total: 0,
            completado: 0,
            pendiente: 0,
            noRegistrada: 0,
            omitida: 0
        }
    );

    // KPI Global
    const efectividadGeneral =
        (totalGeneral.total - totalGeneral.omitida) > 0
            ? (
                totalGeneral.completado * 100 /
                (totalGeneral.total - totalGeneral.omitida)
            )
            : 0;




    return {
        pageOrientation: 'landscape',
        pageMargins: [10, 20, 10, 20],
        content: [


            {
                text: 'RESUMEN GENERAL POR ESTACIÓN',
                bold: true,
                fontSize: 13,
                color: '#006666',
                margin: [0, 0, 0, 5]
            },
            {
                table: {
                    headerRows: 1,
                    widths: [25, '*', 60, 60, 60, 60, 60, 60],
                    body: [

                        // ENCABEZADO
                        [
                            { text: '#', fillColor: '#006666', color: '#fff', bold: true, alignment: 'center' },
                            { text: 'Estación', fillColor: '#006666', color: '#fff', bold: true },
                            { text: 'Total', fillColor: '#006666', color: '#fff', bold: true, alignment: 'center' },
                            { text: 'Comp.', fillColor: '#006666', color: '#fff', bold: true, alignment: 'center' },
                            { text: 'Pend.', fillColor: '#006666', color: '#fff', bold: true, alignment: 'center' },
                            { text: 'No Reg.', fillColor: '#006666', color: '#fff', bold: true, alignment: 'center' },
                            { text: 'Omit.', fillColor: '#006666', color: '#fff', bold: true, alignment: 'center' },
                            { text: '% Efect.', fillColor: '#006666', color: '#fff', bold: true, alignment: 'center' }
                        ],

                        // DETALLE
                        ...resumenEstaciones
                            .sort((a, b) => a.orden_logico - b.orden_logico)
                            .map((e, i) => [
                                {
                                    text: `${i + 1}`,
                                    alignment: 'center'
                                },
                                {
                                    text: e.estacion,
                                    //fontSize: 8
                                },
                                {
                                    text: e.total,
                                    alignment: 'center'
                                },
                                {
                                    text: e.completado,
                                    alignment: 'center'
                                },
                                {
                                    text: e.pendiente,
                                    alignment: 'center'
                                },
                                {
                                    text: e.noRegistrada,
                                    alignment: 'center'
                                },
                                {
                                    text: e.omitida,
                                    alignment: 'center'
                                },
                                {
                                    text: `${e.efectividad.toFixed(1)}%`,
                                    alignment: 'center',
                                    bold: true,
                                    fillColor: getColorEfectividad(e.efectividad),
                                    color: '#FFFFFF'
                                }
                            ]),

                        // TOTAL GENERAL
                        [
                            {
                                text: '',
                                fillColor: '#004c4c'
                            },
                            {
                                text: 'TOTAL GENERAL',
                                bold: true,
                                color: '#FFFFFF',
                                fillColor: '#004c4c'
                            },
                            {
                                text: totalGeneral.total,
                                alignment: 'center',
                                bold: true,
                                color: '#FFFFFF',
                                fillColor: '#004c4c'
                            },
                            {
                                text: totalGeneral.completado,
                                alignment: 'center',
                                bold: true,
                                color: '#FFFFFF',
                                fillColor: '#004c4c'
                            },
                            {
                                text: totalGeneral.pendiente,
                                alignment: 'center',
                                bold: true,
                                color: '#FFFFFF',
                                fillColor: '#004c4c'
                            },
                            {
                                text: totalGeneral.noRegistrada,
                                alignment: 'center',
                                bold: true,
                                color: '#FFFFFF',
                                fillColor: '#004c4c'
                            },
                            {
                                text: totalGeneral.omitida,
                                alignment: 'center',
                                bold: true,
                                color: '#FFFFFF',
                                fillColor: '#004c4c'
                            },
                            {
                                text: `${efectividadGeneral.toFixed(1)}%`,
                                alignment: 'center',
                                bold: true,
                                fillColor: getColorEfectividad(efectividadGeneral),
                                color: '#FFFFFF'
                            }
                        ]
                    ]
                },
                layout: {
                    fillColor: function (rowIndex) {

                        if (rowIndex === 0)
                            return null;

                        if (rowIndex === resumenEstaciones.length + 1)
                            return null;

                        return rowIndex % 2 === 0
                            ? '#F7F9FA'
                            : null;
                    }
                },
                margin: [0, 0, 0, 15],
                fontSize: 15
            },


            {
                table: {
                    widths: ['*', '*', '*', '*'],
                    body: [

                        // Etiquetas
                        [
                            {
                                text: 'FECHA INICIO',
                                alignment: 'center',
                                bold: true,
                                fillColor: '#006666',
                                color: '#FFFFFF'
                            },
                            {
                                text: 'FECHA FIN',
                                alignment: 'center',
                                bold: true,
                                fillColor: '#006666',
                                color: '#FFFFFF'
                            },
                            {
                                text: 'ID ORDEN',
                                alignment: 'center',
                                bold: true,
                                fillColor: '#006666',
                                color: '#FFFFFF'
                            },
                            {
                                text: 'TOTAL ÓRDENES',
                                alignment: 'center',
                                bold: true,
                                fillColor: '#006666',
                                color: '#FFFFFF'
                            }
                        ],

                        // Valores
                        [
                            {
                                text: data.lista[0][0]?.fecha_inicio
                                    ? data.lista[0][0].fecha_inicio.substring(0, 10)
                                    : 'TODAS',
                                alignment: 'center',
                                fontSize: 11,
                                bold: true
                            },
                            {
                                text: data.lista[0][0]?.fecha_fin
                                    ? data.lista[0][0].fecha_fin.substring(0, 10)
                                    : 'TODAS',
                                alignment: 'center',
                                fontSize: 11,
                                bold: true
                            },
                            {
                                text: data.lista[0][0]?.id_orden || 'TODAS',
                                alignment: 'center',
                                fontSize: 11,
                                bold: true
                            },
                            {
                                text: dat.length,
                                alignment: 'center',
                                fontSize: 11,
                                bold: true
                            }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: () => 0.5,
                    vLineWidth: () => 0.5,
                    hLineColor: () => '#cccccc',
                    vLineColor: () => '#cccccc'
                },
                margin: [0, 0, 0, 10]
            },
            ...dat.map(o => ([
                {
                    table: {
                        widths: [100, 30, 65, 50, 50, 110, '*'],
                        body: [
                            [
                                { text: 'Orden ID/Numero', bold: true },
                                { text: 'Caja', bold: true },
                                { text: 'Estado Orden', bold: true },
                                { text: 'Aro propio', bold: true },
                                { text: 'Tipo orden', bold: true },
                                { text: 'Tipo surtido', bold: true },
                                { text: 'Cliente / RUC', bold: true }
                            ],
                            [
                                { text: `${o.id_orden ?? ''}: ${o.num_orden ?? ''}`, ...getCellColors('orden', o) },
                                { text: o.num_caja ?? '', ...getCellColors('caja', o) },
                                { text: o.estado ?? '' },
                                o.aro_propio ?? '',
                                o.tipo_orden ?? '',
                                o.tipo_surtido ?? '',
                                { text: `${o.cliente ?? ''} | ${o.ruc ?? ''}`, ...getCellColors('id_cliente', o) }
                            ]
                        ]
                    },
                    layout: 'lightGrid',
                    fontSize: 10,
                    margin: [0, 10, 0, 0]
                },
                {
                    columns: construirColumnasPorEstacion(o.tracking)
                }
            ]))
        ],
        defaultStyle: { fontSize: 7 }
    };
};

module.exports = { buildPdfDD };