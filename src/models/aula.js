const mongoose = require("mongoose");

const aulasSchema = mongoose.Schema({
    clave:{
        type: String,
        required: true  
    },
    grupos:{
        type:String,
        required: true
    },
    descripcion:{
        type: String,
        required: true  
    },
});

module.exports = mongoose.model('aula', aulasSchema);    