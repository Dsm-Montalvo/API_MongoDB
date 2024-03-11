const express = require("express");
const usuariosSchema = require("../models/usuarios");
const router = express.Router();

//create User

router.post("/usuarios", (req,res) => {
    const user = usuariosSchema(req.body);
    user
        .save()
        .then((data)=> res.json(data))
        .catch((error) => res.json ({ message: error }));
});

//Get all users 
router.get("/usuarios",(req, res )=>{
    usuariosSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Get a user   
router.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    usuariosSchema
        .findById( id )
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Get a user for email   
router.get("/usuarios/:email/:password", (req, res) => {
    const { email, password } = req.params;
    usuariosSchema
        .findOne({ email, password })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
// update a user 
router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { name, app, apm, date, email, password } = req.body;
    usuariosSchema
        .updateOne({ _id : id}, {$set : { name, app, apm, date, email, password} })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//delete a user
router.delete("/usuarios/:id", (req, res) =>{
    const { id } = req.params;
    usuariosSchema
        .deleteOne({ _id : id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router; 