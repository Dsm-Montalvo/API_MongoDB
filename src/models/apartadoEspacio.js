const mongoose = require("mongoose");

const apartadoSchema = mongoose.Schema({
    fechaRegistro:{
        type: String,
        required: true  
    },
    fechaUtilizar:{
        type:String,
        required: true
    },
    horaInicio:{
        type: String,
        required: true  
    },
    horaFinal:{
        type: String,
        required: true  
    },
    aula:{
        type:String,
        required: true
    },
    idUsuario:{
        type:String,
        required: true
    },
});

module.exports = mongoose.model('aparadoEspacio', apartadoSchema);    