const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const clientesRoutes = require("./routes/clientes.routes");

app.use("/clientes", clientesRoutes);

app.get("/", (req, res) => {
  res.send("API CRMonitoreo funcionando 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});

const monitoreoRoutes = require("./routes/monitoreo.routes");

app.use("/monitoreo", monitoreoRoutes);

const alertasRoutes = require("./routes/alertas.routes");

app.use("/alertas", alertasRoutes);