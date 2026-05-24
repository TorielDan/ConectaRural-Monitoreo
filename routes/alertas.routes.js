const express = require("express");
const router = express.Router();

const Alerta = require("../models/Alerta");


// ======================================
// GET alertas
// ======================================

router.get("/", async (req, res) => {

  try {

    const alertas = await Alerta.find();

    res.json(alertas);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

});


// ======================================
// POST alertas
// ======================================

router.post("/", async (req, res) => {

  try {

    const nuevaAlerta =
      new Alerta(req.body);

    const alertaGuardada =
      await nuevaAlerta.save();

    res.status(201).json(alertaGuardada);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

});


// ======================================
// DELETE alertas
// ======================================

router.delete("/:id", async (req, res) => {

  try {

    await Alerta.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensaje: "Alerta eliminada"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

});

module.exports = router;