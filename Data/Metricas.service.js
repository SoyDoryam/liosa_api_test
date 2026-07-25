const veomasMetricas = require("../mock/veomasMetricas.json");
const ocentralMetricas = require("../mock/ocentralMetricas.json");

const getVeomasMetricas = async () => {
    return veomasMetricas;
};

const getOcentralMetricas = async () => {
    return ocentralMetricas;
};

const getAllMetricas = async () => {
    return {
        veomas: veomasMetricas,
        ocentral: ocentralMetricas
    };
};

module.exports = {
    getVeomasMetricas,
    getOcentralMetricas,
    getAllMetricas
};
