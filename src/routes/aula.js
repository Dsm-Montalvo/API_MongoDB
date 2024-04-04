const express = require("express");
const aulasSchema = require("../models/aula");

const router = express.Router();


router.post("/aula", (req,res) => {
    const datos = aulasSchema(req.body);
    datos
        .save()
        .then((data)=> res.json(data))
        .catch((error) => res.json ({ message: error }));
});

//Get all users
router.get("/aula",(req, res )=>{
    aulasSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Get a data   
router.get("/aula/:clave", (req, res) => {
    const { clave } = req.params;
    aulasSchema
        .findOne({ clave })
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Delete
router.delete("/aula/:id", (req, res) => {
    const { id } = req.params;
    aulasSchema
        .deleteOne({ _id : id })
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});



module.exports = router; 