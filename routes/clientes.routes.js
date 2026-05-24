const express = require("express");
const router = express.Router();

const Cliente = require("../models/Cliente");


// ======================================
// GET -> Obtener todos los clientes
// ======================================

router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();

    res.json(clientes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
    mensaje: error.message
  });
}
});


// ======================================
// POST -> Crear cliente
// ======================================

router.post("/", async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);

    const clienteGuardado = await nuevoCliente.save();

    res.status(201).json(clienteGuardado);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear cliente"
    });
  }
});


// ======================================
// PUT -> Actualizar cliente
// ======================================

router.put("/:id", async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(clienteActualizado);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar cliente"
    });
  }
});


// ======================================
// DELETE -> Eliminar cliente
// ======================================

router.delete("/:id", async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);

    res.json({
      mensaje: "Cliente eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar cliente"
    });
  }
});

module.exports = router;