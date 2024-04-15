const express = require("express");
const datosSchema = require("../models/datosSensor");

const router = express.Router();


router.post("/datosSensor", (req,res) => {
    const datos = datosSchema(req.body);
    datos
        .save()
        .then((data)=> res.json(data))
        .catch((error) => res.json ({ message: error }));
});

//Get all users
router.get("/datosSensor",(req, res )=>{
    datosSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Get a data   
router.get("/datosSensor/:aula", (req, res) => {
    const { aula } = req.params;
    datosSchema
        .findOne({ aula })
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Delete
router.delete("/datosSensor/:id", (req, res) => {
    const { id } = req.params;
    datosSchema
        .deleteOne({ _id : id })
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});



router.get("/ultimosDatos", (req, res) => {
    datosSchema
        .findOne({}, {}, { sort: { '_id': -1 } }) // Ordenar por _id en orden descendente
        .select('temperatura humedad movimiento')
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router; 