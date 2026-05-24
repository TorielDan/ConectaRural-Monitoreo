const mongoose = require("mongoose");

const monitoreoSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true
  },

  latencia: {
    type: String
  },

  consumo_red: {
    type: String
  },

  estado_enlace: {
    type: String
  },

  ultima_revision: {
    type: Date,
    default: Date.now
  },

  observacion: {
    type: String
  }
});

module.exports = mongoose.model("Monitoreo", monitoreoSchema);