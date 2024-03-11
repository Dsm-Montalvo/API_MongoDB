const mongoose = require("mongoose");

const usuariosSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('Usuarios', usuariosSchema);    