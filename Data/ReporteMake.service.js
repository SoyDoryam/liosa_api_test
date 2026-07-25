const trackingGeneral = require("../mock/trackingGeneral2606_1520.json");
const trackingOrden = require("../mock/TrackingOrden.json");
const InfoTrackTime06 = require("../mock/InfoTrackTime06.json");
const ListadoOrdenes = require("../mock/ListadoOrdenes.json");


const getTrackingGeneralV2 = async (request) => {
    const ahora = new Date().toLocaleTimeString('es-NI', {
        hour12: false
    });
    try {
        console.log('--------------getTrackingGeneralV2---------------------');
        console.log(`[${ahora}]`, request.query);
        console.log('-------------------------------------------------------');

        // PEGA TU JSON AQUÍ - estructura: { lista: [[{...}, {...}], [{...}]] }
        const data = trackingGeneral;

        return data;

    } catch (e) {
        console.error('Error en getTrackingGeneralV2:', e);
        throw e;
    }
};

const getTrackingOrdenV2 = async (request) => {
    const ahora = new Date().toLocaleTimeString('es-NI', {
        hour12: false
    });
    try {
        console.log('--------------getTrackingOrdenV2---------------------');
        console.log(`[${ahora}]`, request.query);
        console.log('-------------------------------------------------------');

        // PEGA TU JSON AQUÍ - estructura: { lista: [[{...}, {...}], [{...}]] }
        const data = trackingOrden;

        return data;

    } catch (e) {
        console.error('Error en getTrackingOrdenV2:', e);
        throw e;
    }
};

const getinfoTrackTime = async (request) => {
    const ahora = new Date().toLocaleTimeString('es-NI', {
        hour12: false
    });
    try {
        console.log('--------------getinfoTrackTime---------------------');
        console.log(`[${ahora}]`, request.query);
        console.log('-----------------------------------');

        // PEGA TU JSON AQUÍ - estructura: [{...}, {...}]
        const data = InfoTrackTime06;


        return data;

    } catch (e) {
        console.error('Error en getinfoTrackTime:', e);
        throw e;
    }
};

const getDispositivos = async (descripcion = null, ip = null) => {
    const ahora = new Date().toLocaleTimeString('es-NI', {
        hour12: false
    });
    let obj = {
        respuesta: null,
        Ok: false,
        numeroError: -1,
    };

    try {
        console.log('--------------getDispositivos---------------------');
        console.log({ descripcion, ip });
        console.log('-----------------------------------');

        // PEGA TU JSON AQUÍ - estructura: [{...}, {...}]
        const data = [
            {
                // PEGA TU JSON AQUÍ
            }
        ];

        obj = {
            respuesta: data,
            Ok: true,
            numeroError: -1,
        };

    } catch (err) {
        obj = {
            respuesta: err.message,
            numeroError: -1,
            Ok: false,
        };
    } finally {
        return obj;
    }
};

const getListadoOrdenes = async (request = null) => {

    const ahora = new Date().toLocaleTimeString('es-NI', {
        hour12: false
    });


    let obj = {
        respuesta: null,
        Ok: false,
        numeroError: -1,
    };


    try {

        console.log('--------------getListadoOrdenes---------------------');
        console.log("Hora:", ahora);
        console.log('-----------------------------------');


        // SIMULACION API JSON
        const data = ListadoOrdenes;

        return data;


    } catch(err){


        console.error('Error en getTrackingOrdenV2:', e);
        throw e;


    } 
};
module.exports = {
    getTrackingGeneralV2,
    getTrackingOrdenV2,
    getinfoTrackTime,
    getDispositivos,
    getListadoOrdenes

};