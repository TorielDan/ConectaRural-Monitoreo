const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  ip: {
    type: String,
    required: true
  },

  ubicacion: {
    type: String
  },

  estado: {
    type: String,
    default: "Activo"
  },

  fecha_registro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Cliente", clienteSchema);