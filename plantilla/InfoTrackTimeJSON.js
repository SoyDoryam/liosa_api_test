const colorEstado = (estado) => {
    if (!estado) return '#FFFFFF';
    estado = estado.toUpperCase();
    if (estado.includes('ATRASADO'))
        return '#d32f2f';

    if (estado.includes('TIEMPO'))
        return '#2e7d32';

    if (estado.includes('CONFIGURAR'))
        return '#f57c00';
    
    if (estado.includes('PRÓXIMO A VENCER') || estado.includes('PRÓXIMO A VENCER'))
        return '#282828';


    return '#607d8b';
}

const colorServicio = (servicio) => {
    switch (servicio) {
        case 'Normal': return '#006666';
        case 'Express(G)': return '#fcc30b';
        default: return '#7f8790';
    }
}

const colorTextoServicio = (servicio) => {
    const bg = colorServicio(servicio);
    const r = parseInt(bg.substr(1, 2), 16);
    const g = parseInt(bg.substr(3, 2), 16);
    const b = parseInt(bg.substr(5, 2), 16);
    const brillo = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brillo > 150 ? '#000000' : '#FFFFFF';
}

const colorGestion = (gestion) => {
    switch (gestion) {
        case 'FERIA VISUAL': return '#5f4fd6';
        case 'FUNDACION 10': return '#2f6fd6';
        case 'CREDILENTES': return '#1f8f5f';
        case 'CREDIMAS': return '#1fb39a';
        case 'INSS': return '#d01f72';
        case 'PARTICULAR': return '#5f6770';
        case 'EMPRESA':
        case 'COMP. EMPRESA': return '#e08a2f';
        case 'MINSA': return '#d64545';
        case 'PRODUCTO OPTICO': return '#8a5a3a';
        case 'MINED': return '#244fa8';
        case 'COLABORADOR LIOSA': return '#006f68';
        case 'COLABORADOR COMPROSA': return '#203f7f';
        case 'OPTILOCURA': return '#d94f8f';
        case 'OPTICAS EXTERNAS T': return '#1f8fa8';
        case 'OPTICAS EXTERNAS ST': return '#1f6f88';
        case 'LICITACIONES': return '#2a2e33';
        default: return '#7f8790';
    }
}

const colorTextoGestion = (gestion) => {
    const bg = colorGestion(gestion);
    const r = parseInt(bg.substr(1, 2), 16);
    const g = parseInt(bg.substr(3, 2), 16);
    const b = parseInt(bg.substr(5, 2), 16);
    const brillo = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brillo > 150 ? '#000000' : '#FFFFFF';
}

const colorUbicacion = (tipo) => {
    switch ((tipo || '').toUpperCase()) {
        case 'DEPARTAMENTO': return '#1565C0';
        case 'MOVIL': return '#00897B';
        case 'MUNICIPIO': return '#EF6C00';
        case 'MANAGUA': return '#6A1B9A';
        default: return '#607D8B';
    }
}

const nvl = (val) => val == null ? '' : val;

const contruirDataInfoTrackTime = (data) => {
    if (!data || data.length === 0) return [];

    return {
        pageMargins: [10, 20, 10, 20],
        content: [
            {
                text: 'Reporte de Órdenes',
                style: 'header',
                margin: [0, 0, 0, 10]
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        ['N° Orden', 'Gestión', 'Servicio', 'Ubicación', 'Digitación', 'Laboratorio', 'Entrega'],
                        ...data.map(r => [
                            {
                                stack: [
                                    { text: nvl(r.num_orden), bold: true },
                                    { text: nvl(r.estado), fontSize: 8, color: '#666666' }
                                ]
                            },
                            {
                                text: `${nvl(r.id_tipo_gestion)}-${nvl(r.tipo_gestion)}`,
                                fillColor: colorGestion(r.tipo_gestion),
                                color: colorTextoGestion(r.tipo_gestion),
                                bold: true,
                                alignment: 'center'
                            },
                            {
                                text: `${nvl(r.id_tipo_servicio)}-${nvl(r.tipo_servicio)}`,
                                fillColor: colorServicio(r.tipo_servicio),
                                color: colorTextoServicio(r.tipo_servicio),
                                bold: true,
                                alignment: 'center'
                            },
                            {
                                stack: [
                                    { text: `${nvl(r.id_tipo_ubicacion)}-${nvl(r.municipio)}` },
                                    {
                                        text: nvl(r.UBICACION),
                                        bold: true,
                                        alignment: 'center'
                                    }
                                ],
                                fillColor: colorUbicacion(r.UBICACION),
                            },
                            {
                                stack: [
                                    { text: nvl(r.horas_digitacion), bold: true, alignment: 'center' },
                                    { text: nvl(r.estado_digitacion), fontSize: 8, alignment: 'center', color: '#FFFFFF' }
                                ],
                                fillColor: colorEstado(r.estado_digitacion)
                            },
                            {
                                stack: [
                                    { text: nvl(r.horas_laboratorio), bold: true, alignment: 'center' },
                                    { text: nvl(r.estado_laboratorio), fontSize: 8, alignment: 'center', color: '#FFFFFF' }
                                ],
                                fillColor: colorEstado(r.estado_laboratorio)
                            },
                            {
                                stack: [
                                    { text: nvl(r.horas_entrega), bold: true, alignment: 'center' },
                                    { text: nvl(r.estado_entrega), fontSize: 8, alignment: 'center', color: '#FFFFFF' }
                                ],
                                fillColor: colorEstado(r.estado_entrega)
                            }
                        ])
                    ]
                },
                layout: 'lightHorizontalLines'
            }
        ],
        styles: {
            header: { fontSize: 11, bold: true }
        },
        defaultStyle: { fontSize: 8 }
    };
}

module.exports = { contruirDataInfoTrackTime };