const express = require("express");
const cors = require("cors");
const reporteMakeRoutes = require("./Routes/ReporteMake.route");
const infografiaRoutes = require("./Routes/Infografia.route");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/", reporteMakeRoutes);
app.use("/", infografiaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor de pruebas corriendo en http://localhost:${PORT}`);
});
