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

//Get a user   
router.get("/datosSensor/:id", (req, res) => {
    const { id } = req.params;
    datosSchema
        .findById( id )
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


module.exports = router; 