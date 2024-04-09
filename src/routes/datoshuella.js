const express = require("express");
const router = express.Router();
const Modelhuella = require('../models/asignarHuella');

router.get('/idshuella', async (req, res) => {
    try {
        // Obtiene todos los documentos de la colección
        const huellas = await Modelhuella.find();

        // Extrae solo los IDs de los documentos
        const ids = huellas.map(huella => huella.id);

        // Envía los IDs como respuesta
        res.json(ids);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//guardar huellas en el modelo huellas  
router.post('/huella', async (req, res) => {
    try {
      // Crear una nueva instancia del modelo con los datos del cuerpo de la solicitud
      const nuevaHuella = new Modelhuella({
        id: req.body.id
      });
  
      // Guardar la nueva huella en la base de datos
      const huellaGuardada = await nuevaHuella.save();
  
      // Enviar la huella guardada como respuesta
      res.status(201).json(huellaGuardada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  module.exports = router;
  

