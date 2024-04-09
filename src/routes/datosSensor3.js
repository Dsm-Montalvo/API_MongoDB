const express = require("express");
const datosSchema3 = require("../models/datosSensor3");

const router = express.Router();


router.post("/datosSensor3", (req,res) => {
    const datos = datosSchema3(req.body);
    datos
        .save()
        .then((data)=> res.json(data))
        .catch((error) => res.json ({ message: error }));
});

//Get all users
router.get("/datosSensor3",(req, res )=>{
    datosSchema3
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Get a data   
router.get("/datosSensor3/:aula", (req, res) => {
    const { aula } = req.params;
    datosSchema3
        .findOne({ aula })
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Delete
router.delete("/datosSensor3/:id", (req, res) => {
    const { id } = req.params;
    datosSchema3
        .deleteOne({ _id : id })
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/ultimosDatos3", (req, res) => {
    datosSchema3
        .findOne({}, {}, { sort: { 'fechaHora': -1 } })
        .select('temperatura humedad movimiento')
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


module.exports = router; 