const express = require("express");
const apartadoSchema = require("../models/apartadoEspacio");

const router = express.Router();


router.post("/apartadoEspacio", (req,res) => {
    const datos = apartadoSchema(req.body);
    datos
        .save()
        .then((data)=> res.json(data))
        .catch((error) => res.json ({ message: error }));
});

//Get all data
router.get("/apartadoEspacio",(req, res )=>{
    apartadoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Get a data   
router.get("/apartadoEspacio/:aula", (req, res) => {
    const { aula } = req.params;
    apartadoSchema
        .findOne({ aula })
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Delete
router.delete("/apartadoEspacio/:id", (req, res) => {
    const { id } = req.params;
    apartadoSchema
        .deleteOne({ _id : id })
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});



module.exports = router; 