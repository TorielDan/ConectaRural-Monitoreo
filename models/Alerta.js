const mongoose = require("mongoose");

const alertaSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true
  },

  tipo_alerta: {
    type: String
  },

  mensaje: {
    type: String
  },

  fecha: {
    type: Date,
    default: Date.now
  },

  estado: {
    type: String,
    default: "Activa"
  }
});

module.exports = mongoose.model("Alerta", alertaSchema);