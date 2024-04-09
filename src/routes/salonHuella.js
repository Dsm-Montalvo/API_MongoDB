const express = require("express");
const router = express.Router();
const  Modelosalones = require('../models/salonHuella');
const  usuariosSchema = require("../models/usuarios");


let salonOcupado = false;
let profesorActual = null;

router.get('/enrolarhuella/:id', async (req, res) => {
    try {
        const user = await usuariosSchema.findOne({ huellaId: req.params.id });
        if (!user) {
            return res.status(404).send({ error: 'No se encontró un usuario con ese ID de huella' });
        }

        const userData = {
            name: user.name,
            app: user.app,
            apm: user.apm,
            // Añade la hora actual como hora de entrada o salida
            hora: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
        };

        if (!salonOcupado) {
            salonOcupado = true;
            profesorActual = user;
            // Guarda la hora de entrada en el registro del profesor
            user.horaEntrada = userData.hora;
            await user.save();
            res.send({ message: 'Huella encontrada, salón ocupado', profesor: userData });
        } else if (profesorActual && profesorActual.huellaId === user.huellaId) {
            salonOcupado = false;
            profesorActual = null;
            // Guarda la hora de salida en el registro del profesor
            user.horaSalida = userData.hora;
            await user.save();
            res.send({ message: 'Huella encontrada, salón libre', profesor: userData });
        } else {
            res.send({ message: 'El salón ya está ocupado por otro profesor', profesor: userData });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// recibir datos del estatus del salon ***************funcional 
router.post('/recibirdatos', async (req, res) => {
    try {
      // Crear un nuevo documento en la colección 'Datosalon' con los datos recibidos
      const nuevoSalon = new Modelosalones({
        nombre: req.body.name,
        app: req.body.app,
        apm: req.body.apm,
        hora: req.body.hora,
        mensaje: req.body.mensaje
      });
  
      // Guardar el nuevo documento en la base de datos
      await nuevoSalon.save();
  
      // Enviar una respuesta de éxito con el documento guardado
      res.status(201).json({
        success: true,
        message: 'Datos recibidos y almacenados correctamente.',
        data: nuevoSalon
      });
    } catch (error) {
      // Enviar una respuesta de error si algo sale mal
      res.status(500).json({
        success: false,
        message: 'Error al procesar los datos recibidos.',
        error: error.message
      });
    }
  });

// Validaciones con la api d elos saloens ***********************funcional
router.get('/salon', async (req, res) => {
    try {
      const ultimoSalon = await Modelosalones.findOne().sort({ createdAt: -1 });
      res.json(ultimoSalon);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;
  