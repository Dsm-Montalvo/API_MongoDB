const mongoose = require("mongoose");

const usuariosSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true  
    },
    app:{
        type:String,
        required: true
    },
    apm:{
        type:String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required:true
    },
    // agrege el campo huella a la coleccion de roles 
    huellaId: {
        type: String,
        required: true
    },
},
// se agrego el timestamp ya que me va ayudar hacer otras peticiones a los maestro
{
    timestamps:true,
}
);

module.exports = mongoose.model('Usuarios', usuariosSchema);    