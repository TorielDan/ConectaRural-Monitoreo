const express = require("express");
const router = express.Router();

const Monitoreo = require("../models/Monitoreo");


// ======================================
// GET monitoreo
// ======================================

router.get("/", async (req, res) => {
  try {

    const monitoreo = await Monitoreo.find();

    res.json(monitoreo);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
});


// ======================================
// POST monitoreo
// ======================================

router.post("/", async (req, res) => {
  try {

    const nuevoMonitoreo = new Monitoreo(req.body);

    const monitoreoGuardado = await nuevoMonitoreo.save();

    res.status(201).json(monitoreoGuardado);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
});


// ======================================
// PUT monitoreo
// ======================================

router.put("/:id", async (req, res) => {
  try {

    const monitoreoActualizado =
      await Monitoreo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(monitoreoActualizado);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
});


// ======================================
// DELETE monitoreo
// ======================================

router.delete("/:id", async (req, res) => {
  try {

    await Monitoreo.findByIdAndDelete(req.params.id);

    res.json({
      mensaje: "Registro eliminado"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
});

module.exports = router;